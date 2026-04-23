import { View, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../src/components/Typography';
import { ContentLayout, Section } from '../../src/components/Layout';
import { Footer } from '../../src/components/Footer';
import { theme as lightTheme, darkTheme } from '../../src/theme';
import { useTheme } from '../../src/context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useRef } from 'react';
import { usePost } from '../../src/hooks/usePost';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const scrollRef = useRef<ScrollView>(null);

  const { post, loading, error } = usePost(id ?? '');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (loading) {
    return (
      <ContentLayout>
        <Section style={{ paddingTop: 80 }}>
          <Pressable onPress={() => router.push('/')} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={currentTheme.colors.onBackground} />
            <Typography variant="labelMd" style={{ marginLeft: lightTheme.spacing.sm }}>Back to Posts</Typography>
          </Pressable>
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={currentTheme.colors.primary} />
          </View>
        </Section>
      </ContentLayout>
    );
  }

  if (error || !post) {
    return (
      <ContentLayout>
        <Section style={{ paddingTop: 80 }}>
          <Pressable onPress={() => router.push('/')} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={currentTheme.colors.onBackground} />
            <Typography variant="labelMd" style={{ marginLeft: lightTheme.spacing.sm }}>Back to Posts</Typography>
          </Pressable>
          <Typography variant="headlineLg" style={{ marginTop: 100 }}>Post not found.</Typography>
        </Section>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout ref={scrollRef}>
      <Section style={{ paddingTop: 80 }}>
        <Pressable onPress={() => router.push('/')} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={currentTheme.colors.onBackground} />
          <Typography variant="labelMd" style={{ marginLeft: lightTheme.spacing.sm }}>Back to Posts</Typography>
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
            Posted on {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </Typography>
        </View>
      </View>

      {post.image_url && (
        <View style={[styles.imageContainer, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
          <Image source={{ uri: post.image_url }} style={styles.image} resizeMode="cover" />
        </View>
      )}

      <View style={styles.content}>
        <Markdown style={getMarkdownTheme(currentTheme) as any} rules={markdownRules}>
          {post.content}
        </Markdown>
      </View>

      <Footer onBackToTop={handleBackToTop} />
      </Section>
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
    marginBottom: lightTheme.spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  }
});

const markdownRules = {
  image: (node: any, children: any, parent: any, styles: any) => {
    return (
      <Image
        key={node.key}
        source={{ uri: node.attributes.src }}
        style={[styles.image, { width: '100%', aspectRatio: 16/9 }]}
        resizeMode="cover"
        alt={node.attributes.alt}
      />
    );
  }
};

const getMarkdownTheme = (theme: any) => ({
  body: {
    fontFamily: 'Work Sans',
    fontSize: 18,
    lineHeight: 32,
    color: theme.colors.primary,
  },
  heading1: {
    fontFamily: 'Newsreader',
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 32,
    marginBottom: 16,
  },
  heading2: {
    fontFamily: 'Newsreader',
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  heading3: {
    fontFamily: 'Newsreader',
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  link: {
    color: theme.colors.secondary,
    textDecorationLine: 'underline',
  },
  image: {
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  code_inline: {
    backgroundColor: theme.colors.surfaceContainerHighest,
    padding: 4,
    borderRadius: 4,
    fontFamily: 'monospace',
    color: theme.colors.primary,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
    paddingLeft: 20,
    color: theme.colors.outlineVariant,
    fontStyle: 'italic',
    marginTop: 24,
    marginBottom: 24,
  },
  hr: {
    backgroundColor: theme.colors.surfaceContainerHighest,
    height: 1,
    marginTop: 32,
    marginBottom: 32,
  }
});
