# Supabase Setup Guide

This guide will help you set up Supabase to power your timeline confetti chips.

## Quick Setup Steps

### 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Create a new project
3. Note your project URL and anon key (Settings > API)

### 2. Set Up Database

1. Go to SQL Editor in Supabase
2. Open `supabase-setup.sql` from the project root
3. **IMPORTANT**: Before running, you need to:
   - Go to Authentication > Users > Add user
   - Create your admin account (email + password)
   - Copy your user UUID (click on the user to see it)
   - Replace `'YOUR_USER_UUID_HERE'` in the SQL file with your actual UUID (keep the quotes)
4. Run the SQL script

### 3. Create Storage Bucket

1. Go to Storage in Supabase
2. Create a new bucket named `timeline_images`
3. Make it **public**
4. After creation, go back to SQL Editor and run the storage policies from the SQL file (step 9)

### 4. Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example` if it exists)
2. Add your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Restart your dev server after adding environment variables

### 5. Test the Integration

1. Start your dev server: `npm run dev`
2. The confetti particles should now load data from Supabase
3. If you have chips in your database, they will appear as confetti particles

## Category Mapping

The system maps between your frontend categories and Supabase categories:

- **Listening** → `article` (or create `listening` in Supabase)
- **Loving** → `product`
- **Building** → `career`
- **Reading** → `article` (or create `reading` in Supabase)
- **Doing** → `memory`
- **Creating** → `baking`

You can customize this mapping in `src/lib/api.ts` in the `categoryMap` object.

## Adding Your First Chip

### Option 1: Via Supabase Dashboard

1. Go to Table Editor > timeline_chips
2. Click "Insert row"
3. Fill in:
   - `event_date`: Date of the event
   - `category`: One of: `article`, `career`, `baking`, `memory`, `product`
   - `title`: Title of the chip
   - `description`: Description text
   - `image_url`: URL to an image (or upload to Storage first)
   - `is_published`: Set to `true`
   - `metadata`: JSON object with category-specific data (optional)

### Option 2: Via Admin Panel (Coming Soon)

An admin panel component is available in `claude/admin.tsx` that you can integrate if needed.

## Troubleshooting

**Particles not showing?**
- Check browser console for errors
- Verify `is_published = true` in Supabase
- Check that environment variables are set correctly
- Restart dev server after adding environment variables

**Images not loading?**
- Verify storage bucket is public
- Check storage policies are applied
- Ensure image URLs are correct

**Categories not matching?**
- Check the `categoryMap` in `src/lib/api.ts`
- Update Supabase categories to match your needs
- Or update the mapping to match your Supabase categories

## Next Steps

Once set up, you can:
- Add chips via Supabase dashboard
- Customize category colors in the database
- Integrate the admin panel for easier content management
- Add more categories as needed

For detailed documentation, see the files in the `claude/` folder.


