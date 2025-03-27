import { createClient } from '@supabase/supabase-js';
import type { Database } from '@reactive-resume/schema';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing environment variable: VITE_SUPABASE_URL');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting current user:', error.message);
    return null;
  }

  return session?.user ?? null;
};

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user profile:', error.message);
    return null;
  }

  return profile;
};

// Helper function for storage operations
export const storage = {
  // Upload a file to a specific bucket
  upload: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;
    return data;
  },

  // Get a public URL for a file
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  // Delete a file
  delete: async (bucket: string, path: string) => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
};

// Resume operations
export const resumes = {
  // Get all resumes for a user
  list: async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        *,
        statistics (
          views,
          downloads
        )
      `)
      .order('updatedAt', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get a single resume
  get: async (id: string) => {
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        *,
        statistics (
          views,
          downloads
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create a new resume
  create: async (data: any) => {
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return resume;
  },

  // Update a resume
  update: async (id: string, data: any) => {
    const { data: resume, error } = await supabase
      .from('resumes')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return resume;
  },

  // Delete a resume
  delete: async (id: string) => {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};