import { useState, useEffect } from 'react';
import { Post, fetchPostById } from '../../lib/postsService';

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setLoading(true);
    fetchPostById(id)
      .then((data) => {
        if (isMounted) {
          setPost(data);
          setError(data ? null : 'Post not found');
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message ?? 'Failed to load post');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [id]);

  return { post, loading, error };
}
