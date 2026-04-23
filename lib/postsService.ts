import { supabase } from './supabase';

export interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image_url?: string;
  published_at: string;
  created_at: string;
  is_published: boolean;
}

export interface CreatePostData {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image_url?: string;
  is_published?: boolean;
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createPost(postData: CreatePostData): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...postData, is_published: postData.is_published ?? true }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, postData: Partial<CreatePostData>): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
