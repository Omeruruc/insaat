/*
  # Architecture Firm Database Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (text: 'ongoing' or 'completed')
      - `location` (text)
      - `client` (text)
      - `year` (integer)
      - `area` (text)
      - `hero_image` (text, URL)
      - `hero_video` (text, URL)
      - `featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `project_media`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `media_type` (text: 'image' or 'video')
      - `url` (text)
      - `caption` (text)
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `position` (text)
      - `bio` (text)
      - `image_url` (text)
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `company_info`
      - `id` (uuid, primary key)
      - `section` (text: 'vision', 'mission', 'values', 'story')
      - `content` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a public website)
    - Authenticated users can manage content (for future admin panel)
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('ongoing', 'completed')),
  location text DEFAULT '',
  client text DEFAULT '',
  year integer,
  area text DEFAULT '',
  hero_image text DEFAULT '',
  hero_video text DEFAULT '',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Project media table
CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  url text NOT NULL,
  caption text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project media"
  ON project_media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert project media"
  ON project_media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update project media"
  ON project_media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete project media"
  ON project_media FOR DELETE
  TO authenticated
  USING (true);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- Company info table
CREATE TABLE IF NOT EXISTS company_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE CHECK (section IN ('vision', 'mission', 'values', 'story')),
  content text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view company info"
  ON company_info FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert company info"
  ON company_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update company info"
  ON company_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete company info"
  ON company_info FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);