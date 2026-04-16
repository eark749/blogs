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
      {Platform.OS === 'web' && <DottedSurface style={styles.background} />}
      
      {/* Editorial Headline */}
      <View style={styles.textContainer}>
        <Typography variant="displayLg" weight="bold" style={styles.headline}>
          Tech, decoded for humans by Human.
        </Typography>
        <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.subheadline}>
          (P.S. — Won't bore you with AI-generated text)
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500, // Fixed height for the hero section to contain the dots
    justifyContent: 'center',
    marginBottom: lightTheme.spacing.xxl,
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: -100, // Extend slightly beyond container for better parallax/movement coverage
    right: -100,
    bottom: 0,
    zIndex: -1,
  },
  textContainer: {
    maxWidth: 700,
    zIndex: 1, // Ensure text is above dots
  },
  headline: {
    marginBottom: lightTheme.spacing.md,
  },
  subheadline: {
    fontSize: 20,
    lineHeight: 30,
    opacity: 0.8,
  },
});
