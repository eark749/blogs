import { View, StyleSheet, Image } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

export function Hero() {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      {/* Editorial Headline */}
      <View style={styles.textContainer}>
        <Typography variant="displayLg" weight="bold" style={styles.headline}>
          Tech, decoded for humans by Human.
        </Typography>
        <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.subheadline}>
          (P.S. — Won't bore you with AI-generated text)
        </Typography>
      </View>

      {/* Featured Asset */}
      <View style={[styles.imageContainer, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
        <Image
          source={require('../../assets/hero.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.captionContainer}>
          <Typography variant="labelMd" color={currentTheme.colors.outlineVariant}>
            Fig. 01 — Theoretical Surface Studies, 2025
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: lightTheme.spacing.xxl,
  },
  textContainer: {
    marginBottom: lightTheme.spacing.xl,
    maxWidth: 700,
  },
  headline: {
    marginBottom: lightTheme.spacing.md,
  },
  subheadline: {
    fontSize: 20,
    lineHeight: 30,
    opacity: 0.8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    borderRadius: lightTheme.radii.default,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captionContainer: {
    paddingTop: lightTheme.spacing.sm,
    alignItems: 'flex-start',
  }
});
