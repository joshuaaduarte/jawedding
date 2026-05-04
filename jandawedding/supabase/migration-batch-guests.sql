-- ============================================================
-- Migration: Allow multiple guests to share the same invite_code
-- Run this in the Supabase SQL Editor before deploying batch add.
-- ============================================================

-- Drop the unique constraint on invite_code
ALTER TABLE guests DROP CONSTRAINT IF EXISTS guests_invite_code_key;

-- Add a non-unique index for fast lookups by invite_code
CREATE INDEX IF NOT EXISTS idx_guests_invite_code ON guests (invite_code);

-- ============================================================
-- Migration: Add family_name column for locale-aware greetings
-- e.g. EN: "the Lima Family" / ES: "la familia Lima"
-- ============================================================
ALTER TABLE guests ADD COLUMN IF NOT EXISTS family_name TEXT NOT NULL DEFAULT '';
