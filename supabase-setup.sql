-- Supabase Setup for Personal Website Timeline Chips
-- Run this in your Supabase SQL Editor

-- 1. Create categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  color TEXT NOT NULL, -- hex color for UI
  icon TEXT, -- emoji or icon identifier
  sort_order INTEGER DEFAULT 0
);

-- 2. Create timeline_chips table
CREATE TABLE timeline_chips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_date DATE NOT NULL, -- when the event actually happened
  category TEXT NOT NULL REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT, -- will store Supabase Storage path
  color TEXT, -- optional override color for this specific chip
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0, -- for manual ordering if needed
  metadata JSONB DEFAULT '{}'::jsonb -- flexible field for category-specific data
);

-- 3. Create indexes for performance
CREATE INDEX idx_timeline_chips_category ON timeline_chips(category);
CREATE INDEX idx_timeline_chips_event_date ON timeline_chips(event_date DESC);
CREATE INDEX idx_timeline_chips_published ON timeline_chips(is_published);

-- 4. Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_chips ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Public can read published content
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view published chips"
  ON timeline_chips FOR SELECT
  USING (is_published = true);

-- 6. RLS Policies - Only authenticated admin can modify
-- IMPORTANT: After running this, get your user UUID by running:
-- SELECT auth.uid();
-- Then replace 'YOUR_USER_UUID_HERE' with your actual UUID

CREATE POLICY "Admin can do everything with categories"
  ON categories FOR ALL
  USING (auth.uid() = 'YOUR_USER_UUID_HERE'::uuid);

CREATE POLICY "Admin can do everything with chips"
  ON timeline_chips FOR ALL
  USING (auth.uid() = 'YOUR_USER_UUID_HERE'::uuid);

-- 7. Insert default categories
INSERT INTO categories (id, display_name, color, icon, sort_order) VALUES
  ('article', 'Articles & Media', '#3B82F6', '📚', 1),
  ('career', 'Career Achievements', '#10B981', '🏆', 2),
  ('baking', 'Baking Adventures', '#F59E0B', '🧁', 3),
  ('memory', 'Life Memories', '#EC4899', '💭', 4),
  ('product', 'Product Recommendations', '#8B5CF6', '⭐', 5);

-- 8. Create storage bucket for images
-- Run this separately or through Supabase Dashboard -> Storage
-- CREATE BUCKET IF NOT EXISTS timeline_images;

-- 9. Set storage bucket policy (public read, authenticated write)
-- Run after creating bucket:
/*
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'timeline_images');

CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'timeline_images' 
    AND auth.uid() = 'YOUR_USER_UUID_HERE'::uuid
  );

CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'timeline_images' 
    AND auth.uid() = 'YOUR_USER_UUID_HERE'::uuid
  );
*/

-- 10. Sample data for testing (optional)
INSERT INTO timeline_chips (event_date, category, title, description, metadata) VALUES
  (
    '2024-11-15',
    'article',
    'Building Better Animations',
    'A deep dive into performant web animations using Framer Motion',
    '{"url": "https://example.com/article", "my_rating": 4.5, "media_type": "article"}'::jsonb
  ),
  (
    '2024-10-20',
    'baking',
    'Sourdough Success',
    'Finally nailed my sourdough recipe after months of practice',
    '{"recipe_url": "https://example.com/recipe", "difficulty": "medium"}'::jsonb
  ),
  (
    '2024-09-05',
    'career',
    'Launched New Product Feature',
    'Led the development of a new user dashboard that increased engagement by 40%',
    '{"company": "TechCorp", "situation": "Low user engagement", "behavior": "Led cross-functional team", "action": "Built analytics dashboard", "context": "Increased engagement 40%"}'::jsonb
  );

-- SETUP CHECKLIST:
-- [ ] Run main schema creation (steps 1-7)
-- [ ] Get your user UUID: SELECT auth.uid(); (while logged in)
-- [ ] Replace 'YOUR_USER_UUID_HERE' in policies
-- [ ] Create storage bucket 'timeline_images' in Supabase Dashboard
-- [ ] Run storage policies (step 9) with your UUID
-- [ ] Test by inserting sample data
