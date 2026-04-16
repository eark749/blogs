import { View, StyleSheet, ScrollView } from 'react-native';
import { ContentLayout, Section } from '../src/components/Layout';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { PostCard } from '../src/components/PostCard';
import { Footer } from '../src/components/Footer';
import { AuthorProfile } from '../src/components/AuthorProfile';
import { useRef } from 'react';
import { MOCK_POSTS } from '../src/data/posts';
import { useRouter } from 'expo-router';

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ContentLayout ref={scrollRef}>
      <Section>
        <Header />
      </Section>
      
      <Hero />
      
      <Section style={styles.postsContainer}>
        {MOCK_POSTS.map(post => (
          <PostCard
            key={post.id}
            category={post.category}
            title={post.title}
            author={post.author}
            date={post.date}
            excerpt={post.excerpt}
            imageUrl={post.imageUrl}
            onPress={() => router.push(`/post/${post.id}`)}
          />
        ))}
      </Section>

      <Section>
        <AuthorProfile />
        <Footer onBackToTop={handleBackToTop} />
      </Section>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: '100%',
  }
});
