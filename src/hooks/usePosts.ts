import { useState, useEffect } from 'react';
import { Post, fetchPosts } from '../../lib/postsService';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchPosts()
      .then((data) => {
        if (isMounted) {
          setPosts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message ?? 'Failed to load posts');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return { posts, loading, error };
}
