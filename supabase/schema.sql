-- ============================================
-- CapsLink Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- Profiles table (Clerk user ID as primary key)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Links table
CREATE TABLE IF NOT EXISTS links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);
CREATE INDEX IF NOT EXISTS idx_links_order ON links(user_id, order_index);

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can write
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (true);

-- Links: anyone can read, only owner can write
CREATE POLICY "Anyone can view links"
  ON links FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own links"
  ON links FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own links"
  ON links FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own links"
  ON links FOR DELETE
  USING (true);
