import { View, StyleSheet, Platform } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { DottedSurface } from '../../components/ui/dotted-surface';

export function Hero() {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      {/* Editorial Headline */}
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Typography variant="displayLg" weight="bold" style={styles.headline}>
            Tech, decoded for humans by Human.
          </Typography>
          <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.subheadline}>
            (P.S. — Won't bore you with AI-generated text)
          </Typography>
        </View>
      </View>

      {/* 3D Dots Section - Now Sequential */}
      {Platform.OS === 'web' && (
        <View style={styles.dotsWrapper}>
          <DottedSurface />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : 500, // Full screen height on web
    justifyContent: 'flex-start', // Top align
    alignItems: 'center', // Center the innerContainer horizontally
    paddingTop: Platform.OS === 'web' ? 280 : 120, // Increased to clear fixed navbar
    marginBottom: lightTheme.spacing.xxl,
    position: 'relative',
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: lightTheme.spacing.lg,
    marginBottom: 40, // Space between text and dots
  },
  textContainer: {
    maxWidth: 700,
  },
  dotsWrapper: {
    width: '100%',
    height: 400, // Explicit height for the sequential animation block
    marginTop: -20, // Pull dots up slightly closer to text
  },
  headline: {
    marginBottom: lightTheme.spacing.md,
  },
  subheadline: {
    fontSize: 20,
    lineHeight: 30,
  },
});

