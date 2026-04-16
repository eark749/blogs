import { View, StyleSheet, ScrollView } from 'react-native';
import { ContentLayout } from '../src/components/Layout';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { PostCard } from '../src/components/PostCard';
import { Footer } from '../src/components/Footer';
import { AuthorProfile } from '../src/components/AuthorProfile';
import { useRef } from 'react';

const MOCK_POSTS = [
  {
    id: '1',
    category: 'Lifestyle',
    title: 'Moments that matter',
    author: 'Jessica Williams',
    date: 'January 22, 2025',
    excerpt: 'We celebrate the small yet profound experiences like a page from a calendar. Daily reflections with extraordinary events throughout the day — about lifestyle stories, moments and inspirations that remind us of what truly matters.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    category: 'Design',
    title: 'Simplicity direction and digital minimalism',
    author: 'Jessica Williams',
    date: 'January 21, 2025',
    excerpt: 'The power of minimalism in design and design focuses on simplicity eliminating unnecessary details to bring out the essence of the image or the main element — Strong works that encourage deeper reflection on what really matters.',
  },
  {
    id: '3',
    category: 'Lifestyle',
    title: 'Daily routine for vitality',
    author: 'Jessica Williams',
    date: 'January 14, 2025',
    excerpt: 'Vitality refers to physical, mental, and emotional well-being. Effective methods to bring more energy into your daily life to find balance, build strength, and optimize potential through rest and mindfulness strategies.',
  }
];

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ContentLayout ref={scrollRef}>
      <Header />
      <Hero />
      
      <View style={styles.postsContainer}>
        {MOCK_POSTS.map(post => (
          <PostCard
            key={post.id}
            category={post.category}
            title={post.title}
            author={post.author}
            date={post.date}
            excerpt={post.excerpt}
            imageUrl={post.imageUrl}
          />
        ))}
      </View>

      <AuthorProfile />
      <Footer onBackToTop={handleBackToTop} />
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: '100%',
  }
});
