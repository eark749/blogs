import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ContentLayout, Section } from '../src/components/Layout';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { PostCard } from '../src/components/PostCard';
import { Footer } from '../src/components/Footer';

import { Typography } from '../src/components/Typography';
import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { usePosts } from '../src/hooks/usePosts';
import { theme as lightTheme, darkTheme } from '../src/theme';
import { useTheme } from '../src/context/ThemeContext';

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { posts, loading, error } = usePosts();
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ContentLayout ref={scrollRef}>
      <Hero />

      <Section style={styles.postsContainer}>
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={currentTheme.colors.primary} />
          </View>
        )}
        {error && (
          <View style={styles.centered}>
            <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant}>
              Could not load posts. Please check your Supabase configuration.
            </Typography>
          </View>
        )}
        {!loading && !error && posts.length === 0 && (
          <View style={styles.centered}>
            <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant}>
              No posts yet. Go to /admin to create your first post!
            </Typography>
          </View>
        )}
        {posts.map(post => (
          <PostCard
            key={post.id}
            category={post.category}
            title={post.title}
            author={post.author}
            date={new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
            excerpt={post.excerpt}
            imageUrl={post.image_url}
            onPress={() => router.push(`/post/${post.id}`)}
          />
        ))}
      </Section>

      <Section>
        <Footer onBackToTop={handleBackToTop} />
      </Section>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: '100%',
  },
  centered: {
    paddingVertical: 48,
    alignItems: 'center',
  }
});
