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
  address        TEXT NOT NULL DEFAULT '',
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
INSERT INTO events (day_label, event_date, title, time, location, address, groups, sort_order) VALUES
  ('Thursday',  'September 3',  'Rehearsal',        'Time TBD',  'Carmel Mission Basilica, Monterey', '3080 Rio Rd, Carmel-By-The-Sea, CA 93923',  ARRAY['bridal-party', 'parents'], 1),
  ('Thursday',  'September 3',  'Rehearsal Dinner', 'Time TBD',  'Venue TBD',                         '',                                          ARRAY['bridal-party', 'parents'], 2),
  ('Friday',    'September 4',  'Ceremony',         '2:00 PM',   'Carmel Mission Basilica, Monterey', '3080 Rio Rd, Carmel-By-The-Sea, CA 93923',  ARRAY['all'],                    3),
  ('Friday',    'September 4',  'Reception',        '5:00 PM',   'Fairview Laguna Seca, Monterey',    '',                                          ARRAY['all'],                    4),
  ('Saturday',  'September 5',  'Farewell Brunch',  'Time TBD',  'Venue TBD',                         '',                                          ARRAY['all'],                    5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Migration: Replace carpool_entries with travel_posts
-- Run in Supabase SQL Editor if upgrading an existing database:
-- ============================================================
-- DROP TABLE IF EXISTS carpool_entries;
-- Then run the travel_posts CREATE TABLE above.

-- Messages table (multiple messages per invite code group)
CREATE TABLE IF NOT EXISTS messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id     UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  invite_code  TEXT NOT NULL,
  guest_name   TEXT NOT NULL,
  body         TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Migration: Multi-traveler Travel Board support
-- Run in Supabase SQL Editor if upgrading an existing database:
-- ============================================================
-- ALTER TABLE guests ADD COLUMN party_members TEXT[] NOT NULL DEFAULT '{}';
-- ALTER TABLE travel_posts DROP CONSTRAINT travel_posts_guest_id_key;
-- ALTER TABLE travel_posts DROP COLUMN IF EXISTS traveler_name;
-- ALTER TABLE travel_posts ADD COLUMN traveler_names TEXT[] NOT NULL DEFAULT '{}';

-- ============================================================
-- Migration: Add address field to events
-- Run in Supabase SQL Editor if upgrading an existing database:
-- ============================================================
-- ALTER TABLE events ADD COLUMN address TEXT NOT NULL DEFAULT '';

-- ============================================================
-- Wedding Planning Hub: To-Do, Finance, and Seating
-- ============================================================

-- Tasks table (planning to-do list, grouped by category)
CREATE TABLE IF NOT EXISTS tasks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'General',
  status     TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'done')),
  assignee   TEXT NOT NULL DEFAULT '' CHECK (assignee IN ('', 'joshua', 'ana', 'both')),
  due_date   DATE,
  notes      TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Task milestones (sub-deadlines on a larger task, e.g. custom coasters:
-- design approved -> order placed -> proofs -> delivered). Each milestone
-- has its own due date and lands on the countdown calendar.
CREATE TABLE IF NOT EXISTS task_milestones (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id    UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  due_date   DATE,
  done       BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS task_milestones_task_id_idx ON task_milestones(task_id);

-- Budget items table (finance tracking)
CREATE TABLE IF NOT EXISTS budget_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT NOT NULL DEFAULT 'General',
  vendor      TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  estimated   NUMERIC(10, 2) NOT NULL DEFAULT 0,
  actual      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  paid        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  due_date    DATE,
  notes       TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seating tables (physical reception tables)
CREATE TABLE IF NOT EXISTS seating_tables (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  capacity   INTEGER NOT NULL DEFAULT 8 CHECK (capacity >= 0),
  notes      TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seat assignments (one row per seatable person; table_id NULL = unassigned)
CREATE TABLE IF NOT EXISTS seat_assignments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id   UUID REFERENCES guests(id) ON DELETE CASCADE,
  seat_index INTEGER NOT NULL DEFAULT 0,
  name       TEXT NOT NULL,
  table_id   UUID REFERENCES seating_tables(id) ON DELETE SET NULL,
  notes      TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (guest_id, seat_index)
);

-- Honeymoon itinerary items (Japan trip planner). Undated rows (item_date NULL)
-- are the "Ideas / Unscheduled" wishlist; dated rows form the day-by-day plan.
CREATE TABLE IF NOT EXISTS honeymoon_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  city       TEXT NOT NULL DEFAULT '',
  category   TEXT NOT NULL DEFAULT 'Sightseeing',
  status     TEXT NOT NULL DEFAULT 'idea' CHECK (status IN ('idea', 'planned', 'booked')),
  item_date  DATE,
  end_date   DATE,
  time_label TEXT NOT NULL DEFAULT '',
  cost       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  address    TEXT NOT NULL DEFAULT '',
  url        TEXT NOT NULL DEFAULT '',
  notes      TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
