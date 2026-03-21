-- ─── Fundamentals App — Database Schema ──────────────────────────────────────
-- Run this once in Supabase Dashboard → SQL Editor

-- Activity bank (one row per unique activity)
CREATE TABLE IF NOT EXISTS public.activities (
  id            TEXT PRIMARY KEY,
  name          TEXT    NOT NULL,
  type          TEXT    NOT NULL CHECK (type IN ('warmup','throwing','kicking','cooldown')),
  skill_cue     TEXT,
  equipment     TEXT[]  DEFAULT '{}',
  images        TEXT[]  DEFAULT '{}',   -- filenames only, e.g. ['cone-rescue.png']
  instructions  TEXT[]  DEFAULT '{}',
  coaching_note TEXT,
  p1_note       TEXT,
  extension     TEXT[]  DEFAULT '{}',
  easier        TEXT,
  harder        TEXT,
  games_data    JSONB,                  -- used by cooldown activities (Parachute games)
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- One row per week (1–24)
CREATE TABLE IF NOT EXISTS public.week_plans (
  week_number  INTEGER PRIMARY KEY CHECK (week_number BETWEEN 1 AND 24),
  focus        TEXT,
  layout_notes TEXT[]  DEFAULT '{}',
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Maps activities → week slots
CREATE TABLE IF NOT EXISTS public.session_slots (
  id           SERIAL  PRIMARY KEY,
  week_number  INTEGER NOT NULL REFERENCES public.week_plans(week_number) ON DELETE CASCADE,
  section      TEXT    NOT NULL CHECK (section IN ('warmup','throwing','kicking','cooldown')),
  slot_order   INTEGER NOT NULL DEFAULT 1,
  activity_id  TEXT    NOT NULL REFERENCES public.activities(id),
  UNIQUE (week_number, section, slot_order)
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.activities     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week_plans     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_slots  ENABLE ROW LEVEL SECURITY;

-- Anyone can read (coaches, parents)
CREATE POLICY "public read activities"    ON public.activities    FOR SELECT USING (true);
CREATE POLICY "public read week_plans"    ON public.week_plans    FOR SELECT USING (true);
CREATE POLICY "public read session_slots" ON public.session_slots FOR SELECT USING (true);

-- Anon key can write (access controlled by PIN in the app)
CREATE POLICY "anon insert activities"   ON public.activities    FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update activities"   ON public.activities    FOR UPDATE USING (true);
CREATE POLICY "anon insert week_plans"   ON public.week_plans    FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update week_plans"   ON public.week_plans    FOR UPDATE USING (true);
CREATE POLICY "anon insert slots"        ON public.session_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "anon delete slots"        ON public.session_slots FOR DELETE USING (true);
