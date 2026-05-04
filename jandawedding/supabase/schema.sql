-- ============================================================
-- Joshua & Ana Wedding Website — Supabase Schema
-- Run this entire file in the Supabase SQL Editor once.
-- ============================================================

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code   TEXT UNIQUE NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL DEFAULT '',
  "group"       TEXT NOT NULL DEFAULT 'all',
  anecdote      TEXT NOT NULL DEFAULT '',
  anecdote_es   TEXT NOT NULL DEFAULT '',
  display_name  TEXT NOT NULL DEFAULT '',
  family_name   TEXT NOT NULL DEFAULT '',
  party_members TEXT[] NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table (fully managed from the admin panel)
CREATE TABLE IF NOT EXISTS events (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_label      TEXT NOT NULL,
  event_date     TEXT NOT NULL,
  title          TEXT NOT NULL,
  time           TEXT NOT NULL,
  location       TEXT NOT NULL,
  groups         TEXT[] NOT NULL DEFAULT ARRAY['all'],
  sort_order     INTEGER NOT NULL DEFAULT 0,
  start_datetime TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RSVPs table (one per guest, upsert on re-submit)
CREATE TABLE IF NOT EXISTS rsvps (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id     UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  invite_code  TEXT NOT NULL,
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL DEFAULT '',
  attendance   TEXT NOT NULL CHECK (attendance IN ('yes', 'no')),
  guest_count  INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1),
  notes        TEXT NOT NULL DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (guest_id)
);

-- Travel Board table (opt-in travel plan sharing)
CREATE TABLE IF NOT EXISTS travel_posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id       UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  guest_name     TEXT NOT NULL,
  invite_code    TEXT NOT NULL,
  travel_mode    TEXT NOT NULL DEFAULT 'flying' CHECK (travel_mode IN ('flying', 'driving', 'other')),
  flying_from    TEXT NOT NULL DEFAULT '',
  flying_to      TEXT NOT NULL DEFAULT '',
  arrival_date   TEXT NOT NULL DEFAULT '',
  departure_date TEXT NOT NULL DEFAULT '',
  contact        TEXT NOT NULL DEFAULT '',
  notes          TEXT NOT NULL DEFAULT '',
  traveler_names TEXT[] NOT NULL DEFAULT '{}',
  is_visible     BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Groups table (source of truth for guest groups / event visibility)
CREATE TABLE IF NOT EXISTS groups (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT UNIQUE NOT NULL,
  label      TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO groups (name, label, sort_order) VALUES
  ('all',          'All Guests',            1),
  ('family',       'Family',                2),
  ('bridal-party', 'Bridal Party',          3),
  ('parents',      'Parents',               4),
  ('couple',       'Couple (Ana & Joshua)', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Seed: Initial wedding events
-- ============================================================
INSERT INTO events (day_label, event_date, title, time, location, groups, sort_order) VALUES
  ('Thursday',  'September 3',  'Rehearsal',        'Time TBD',  'Carmel Mission Basilica, Monterey', ARRAY['bridal-party', 'parents'], 1),
  ('Thursday',  'September 3',  'Rehearsal Dinner', 'Time TBD',  'Venue TBD',                         ARRAY['bridal-party', 'parents'], 2),
  ('Friday',    'September 4',  'Ceremony',         '2:00 PM',   'Carmel Mission Basilica, Monterey', ARRAY['all'],                    3),
  ('Friday',    'September 4',  'Reception',        '5:00 PM',   'Fairview Laguna Seca, Monterey',    ARRAY['all'],                    4),
  ('Saturday',  'September 5',  'Farewell Brunch',  'Time TBD',  'Venue TBD',                         ARRAY['all'],                    5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Migration: Replace carpool_entries with travel_posts
-- Run in Supabase SQL Editor if upgrading an existing database:
-- ============================================================
-- DROP TABLE IF EXISTS carpool_entries;
-- Then run the travel_posts CREATE TABLE above.

-- ============================================================
-- Migration: Multi-traveler Travel Board support
-- Run in Supabase SQL Editor if upgrading an existing database:
-- ============================================================
-- ALTER TABLE guests ADD COLUMN party_members TEXT[] NOT NULL DEFAULT '{}';
-- ALTER TABLE travel_posts DROP CONSTRAINT travel_posts_guest_id_key;
-- ALTER TABLE travel_posts DROP COLUMN IF EXISTS traveler_name;
-- ALTER TABLE travel_posts ADD COLUMN traveler_names TEXT[] NOT NULL DEFAULT '{}';
