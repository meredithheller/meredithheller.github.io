// API functions for timeline chips
import { supabase } from './supabase';
import type { TimelineItem, TimelineCategory } from '../types/timeline';

// Map frontend categories to Supabase categories
// You can customize this mapping in your Supabase database
const categoryMap: Record<TimelineCategory, string> = {
  'Listening': 'article', // or create 'listening' category in Supabase
  'Loving': 'product',
  'Building': 'career',
  'Reading': 'article', // or create 'reading' category in Supabase
  'Doing': 'memory',
  'Creating': 'baking'
};

// Reverse map for converting Supabase categories back
const reverseCategoryMap: Record<string, TimelineCategory> = {
  'article': 'Reading', // Default mapping
  'career': 'Building',
  'baking': 'Creating',
  'memory': 'Doing',
  'product': 'Loving',
  'listening': 'Listening', // If you add this to Supabase
  'reading': 'Reading' // If you add this to Supabase
};

// Supabase chip type
interface SupabaseChip {
  id: string;
  created_at: string;
  event_date: string;
  category: string;
  title: string;
  description: string | null;
  image_url: string | null;
  color: string | null;
  is_published: boolean;
  sort_order: number;
  metadata: Record<string, any>;
}

// Convert Supabase chip to TimelineItem
function convertSupabaseChipToTimelineItem(chip: SupabaseChip): TimelineItem {
  const frontendCategory = reverseCategoryMap[chip.category] || 'Doing';
  
  // Base properties
  const baseItem = {
    id: chip.id,
    category: frontendCategory,
    title: chip.title,
    description: chip.description || '',
    image: chip.image_url || '',
    date: chip.event_date,
  };

  // Add category-specific properties based on metadata
  const metadata = chip.metadata || {};
  
  switch (frontendCategory) {
    case 'Listening':
      return {
        ...baseItem,
        category: 'Listening',
        spotifyLink: metadata.url || metadata.spotifyLink || '',
      };
    
    case 'Loving':
      return {
        ...baseItem,
        category: 'Loving',
        productLink: metadata.purchase_url || metadata.productLink || metadata.url,
      };
    
    case 'Building':
      return {
        ...baseItem,
        category: 'Building',
        projectType: metadata.projectType || (metadata.company ? 'career' : 'personal'),
      };
    
    case 'Reading':
      return {
        ...baseItem,
        category: 'Reading',
      };
    
    case 'Doing':
      return {
        ...baseItem,
        category: 'Doing',
      };
    
    case 'Creating':
      return {
        ...baseItem,
        category: 'Creating',
      };
    
    default:
      return {
        ...baseItem,
        category: 'Doing',
      };
  }
}

/**
 * Fetch the most recent published chips
 * @param limit - Number of chips to fetch (default: 50)
 * @param category - Optional category filter (frontend category)
 */
export async function fetchRecentChips(
  limit: number = 50,
  category?: TimelineCategory
): Promise<TimelineItem[]> {
  try {
    let query = supabase
      .from('timeline_chips')
      .select('*')
      .eq('is_published', true)
      .order('event_date', { ascending: false })
      .limit(limit);

    // If category filter is provided, map it to Supabase category
    if (category) {
      const supabaseCategory = categoryMap[category];
      if (supabaseCategory) {
        query = query.eq('category', supabaseCategory);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching chips:', error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Convert Supabase chips to TimelineItems
    return data.map(convertSupabaseChipToTimelineItem);
  } catch (error) {
    console.error('Error in fetchRecentChips:', error);
    return [];
  }
}

/**
 * Fetch all categories from Supabase
 */
export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
}

/**
 * Fetch a single chip by ID
 */
export async function fetchChipById(id: string): Promise<TimelineItem | null> {
  try {
    const { data, error } = await supabase
      .from('timeline_chips')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Error fetching chip:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return convertSupabaseChipToTimelineItem(data);
  } catch (error) {
    console.error('Error in fetchChipById:', error);
    return null;
  }
}

// ============================================================================
// ADMIN API - For admin interface (requires auth)
// ============================================================================

/**
 * Upload image to Supabase Storage
 * @returns Public URL of uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('timeline_images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('timeline_images')
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session;
}


