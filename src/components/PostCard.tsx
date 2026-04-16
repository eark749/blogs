import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface PostCardProps {
  category: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
}

export function PostCard({ category, title, author, date, excerpt, imageUrl }: PostCardProps) {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      {/* Category */}
      <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
        {category}
      </Typography>

      {/* Title with Em-Dash */}
      <Typography variant="headlineLg" weight="bold" style={styles.title}>
        {title} —
      </Typography>

      {/* Byline */}
      <View style={styles.byline}>
        <Typography variant="labelMd" color={currentTheme.colors.secondary} style={styles.author}>
          {author}
        </Typography>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.dateDot}>
          {' '}•{' '}
        </Typography>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant}>
          Posted on {date}
        </Typography>
      </View>

      {/* Excerpt */}
      <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.excerpt}>
        {excerpt}
      </Typography>

      {/* Read More Link */}
      <Pressable style={styles.readMoreContainer}>
        <Typography variant="bodyLg" weight="semiBold" style={{ color: currentTheme.colors.primary }}>
          Read more
        </Typography>
        <View style={[styles.underline, { backgroundColor: currentTheme.colors.primary }]} />
      </Pressable>

      {/* Optional Featured Image */}
      {imageUrl && (
        <View style={[styles.imageContainer, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: lightTheme.spacing.xxl,
    width: '100%',
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
    marginBottom: lightTheme.spacing.lg,
    flexWrap: 'wrap',
  },
  author: {
    textDecorationLine: 'underline',
  },
  dateDot: {
    marginHorizontal: lightTheme.spacing.xs,
  },
  excerpt: {
    marginBottom: lightTheme.spacing.lg,
    maxWidth: 700,
  },
  readMoreContainer: {
    alignSelf: 'flex-start',
    marginBottom: lightTheme.spacing.xl,
  },
  underline: {
    height: 1,
    marginTop: 2,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: lightTheme.radii.default,
    overflow: 'hidden',
    marginTop: lightTheme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
