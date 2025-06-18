import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          bio: string;
          avatar: string;
          email: string;
          social_links: {
            twitter?: string;
            linkedin?: string;
            website?: string;
          } | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio: string;
          avatar: string;
          email: string;
          social_links?: {
            twitter?: string;
            linkedin?: string;
            website?: string;
          } | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string;
          avatar?: string;
          email?: string;
          social_links?: {
            twitter?: string;
            linkedin?: string;
            website?: string;
          } | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string;
          author_id: string;
          published_at: string;
          reading_time: number;
          tags: string[];
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string;
          author_id: string;
          published_at?: string;
          reading_time: number;
          tags: string[];
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string;
          author_id?: string;
          published_at?: string;
          reading_time?: number;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
        };
      };
    };
  };
};