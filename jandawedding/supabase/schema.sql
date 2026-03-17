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
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table (fully managed from the admin panel)
CREATE TABLE IF NOT EXISTS events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_label    TEXT NOT NULL,
  event_date   TEXT NOT NULL,
  title        TEXT NOT NULL,
  time         TEXT NOT NULL,
  location     TEXT NOT NULL,
  groups       TEXT[] NOT NULL DEFAULT ARRAY['all'],
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RSVPs table (one per guest, upsert on re-submit)
CREATE TABLE IF NOT EXISTS rsvps (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id     UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  invite_code  TEXT NOT NULL,
  full_name    TEXT NOT NULL,
  attendance   TEXT NOT NULL CHECK (attendance IN ('yes', 'no')),
  guest_count  INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1),
  notes        TEXT NOT NULL DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (guest_id)
);

-- Carpool table
CREATE TABLE IF NOT EXISTS carpool_entries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id         UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  guest_name       TEXT NOT NULL,
  invite_code      TEXT NOT NULL,
  airport          TEXT NOT NULL,
  arrival_date     TEXT NOT NULL,
  seats_available  INTEGER NOT NULL CHECK (seats_available >= 1),
  contact          TEXT NOT NULL,
  notes            TEXT NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
