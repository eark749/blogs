import { View, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../src/components/Typography';
import { ContentLayout } from '../../src/components/Layout';
import { Footer } from '../../src/components/Footer';
import { theme as lightTheme, darkTheme } from '../../src/theme';
import { useTheme } from '../../src/context/ThemeContext';
import { MOCK_POSTS } from '../../src/data/posts';
import { Feather } from '@expo/vector-icons';
import { useRef } from 'react';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const scrollRef = useRef<ScrollView>(null);
  
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <ContentLayout>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={currentTheme.colors.onBackground} />
          <Typography variant="labelMd" style={{ marginLeft: lightTheme.spacing.sm }}>Back</Typography>
        </Pressable>
        <Typography variant="headlineLg" style={{ marginTop: 100 }}>Post not found.</Typography>
      </ContentLayout>
    );
  }

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ContentLayout ref={scrollRef}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color={currentTheme.colors.onBackground} />
        <Typography variant="labelMd" style={{ marginLeft: lightTheme.spacing.sm }}>Back</Typography>
      </Pressable>

      <View style={styles.header}>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
          {post.category}
        </Typography>
        <Typography variant="displaySm" weight="bold" style={styles.title}>
          {post.title}
        </Typography>
        
        <View style={styles.byline}>
          <Typography variant="labelMd" color={currentTheme.colors.secondary} style={styles.author}>
            {post.author}
          </Typography>
          <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.dateDot}>
            {' '}•{' '}
          </Typography>
          <Typography variant="labelMd" color={currentTheme.colors.outlineVariant}>
            Posted on {post.date}
          </Typography>
        </View>
      </View>

      {post.imageUrl && (
        <View style={[styles.imageContainer, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
          <Image source={{ uri: post.imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
      )}

      <View style={styles.content}>
        <Typography variant="bodyLg" style={styles.paragraph}>
          {post.content || post.excerpt}
        </Typography>
      </View>

      <Footer onBackToTop={handleBackToTop} />
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: lightTheme.spacing.xl,
    paddingTop: lightTheme.spacing.md,
  },
  header: {
    marginBottom: lightTheme.spacing.xl,
  },
  category: {
    marginBottom: lightTheme.spacing.sm,
    textTransform: 'capitalize',
  },
  title: {
    marginBottom: lightTheme.spacing.md,
  },
  byline: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  author: {
    textDecorationLine: 'underline',
  },
  dateDot: {
    marginHorizontal: lightTheme.spacing.xs,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: lightTheme.radii.default,
    overflow: 'hidden',
    marginBottom: lightTheme.spacing.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    marginBottom: lightTheme.spacing.xxl,
  },
  paragraph: {
    lineHeight: 32,
  }
});
