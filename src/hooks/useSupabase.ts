import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Author = Database['public']['Tables']['authors']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuthors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addAuthor = async (author: Database['public']['Tables']['authors']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .insert([author])
        .select()
        .single();

      if (error) throw error;
      setAuthors(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateAuthor = async (id: string, updates: Database['public']['Tables']['authors']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAuthors(prev => prev.map(author => author.id === id ? data : author));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return { authors, loading, error, addAuthor, updateAuthor, refetch: fetchAuthors };
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: Database['public']['Tables']['posts']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Database['public']['Tables']['posts']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => prev.map(post => post.id === id ? data : post));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return { posts, loading, error, addPost, updatePost, deletePost, refetch: fetchPosts };
};