-- ============================================================
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Lifestyle',
  author text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL DEFAULT '',
  image_url text,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 3. Public can read published posts
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (is_published = true);

-- 4. Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users can manage posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 6. Seed with the 3 demo posts (optional)
-- ============================================================
INSERT INTO public.posts (title, category, author, excerpt, content, image_url, is_published)
VALUES
  (
    'Moments that matter',
    'Lifestyle',
    'Jessica Williams',
    'We celebrate the small yet profound experiences like a page from a calendar. Daily reflections with extraordinary events throughout the day — about lifestyle stories, moments and inspirations that remind us of what truly matters.',
    E'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros ut felis consectetur hendrerit. Nulla facilisi. Praesent vitae justo in est tincidunt lobortis et quis nulla.\n\nPhasellus euismod, leo ac ultrices facilisis, lectus sem faucibus tortor, in pellentesque ipsum metus ut dui. Suspendisse potenti. Vivamus aliquet, lectus eget ullamcorper ultricies.\n\nVivamus eu nisi et lorem varius bibendum. Integer et urna ac mauris facilisis luctus. Integer non nulla eu ligula lacinia mattis.',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
    true
  ),
  (
    'Simplicity direction and digital minimalism',
    'Design',
    'Jessica Williams',
    'The power of minimalism in design focuses on simplicity, eliminating unnecessary details to bring out the essence of the main element — Strong works that encourage deeper reflection on what really matters.',
    E'Simplicity is not about removing everything, but about removing the unnecessary so the necessary may speak. When it comes to digital minimalism, the focus shifts to reducing cognitive load and creating experiences that are intuitive and empowering.\n\nThe philosophy of less is more applies not only to aesthetics but also to functionality. A well-designed product does not overwhelm the user with choices; it guides them naturally towards their goals with minimal friction.',
    null,
    true
  ),
  (
    'Daily routine for vitality',
    'Lifestyle',
    'Jessica Williams',
    'Vitality refers to physical, mental, and emotional well-being. Effective methods to bring more energy into your daily life to find balance, build strength, and optimize potential through rest and mindfulness strategies.',
    E'Establishing a solid morning routine can set the tone for the rest of your day. It does not have to be complicated or time-consuming—just a few intentional habits to ground yourself before diving into your schedule.\n\nConsider incorporating elements like mindful breathing, light stretching, or even just taking a moment to appreciate your morning coffee without distractions. The key is consistency and finding what makes you feel energized and ready to face the day.',
    null,
    true
  );
