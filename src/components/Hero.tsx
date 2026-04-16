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
      {/* 3D Dots Field - Background Model */}
      {Platform.OS === 'web' && <DottedSurface style={styles.background} />}

      {/* Editorial Headline - Centered Over Dots */}
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Typography variant="displayLg" weight="bold" style={styles.headline}>
            Tech, decoded for humans by Human.
          </Typography>
          <View style={[
            styles.subheadlineGlass, 
            { 
              backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
              borderColor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' 
            }
          ]}>
            <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.subheadline}>
              (P.S. — Won't bore you with AI-generated text)
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : 500, // Immersive full height
    justifyContent: 'center', // Exactly centered vertically
    alignItems: 'center', // Exactly centered horizontally
    marginBottom: lightTheme.spacing.xxl,
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: lightTheme.spacing.lg,
    alignItems: 'center', // Center content horizontally
    zIndex: 1,
    marginTop: -50, // Slight upward shift for perfect balance
  },
  textContainer: {
    maxWidth: 700,
    alignItems: 'center', // Center text alignment
  },
  headline: {
    marginBottom: lightTheme.spacing.md,
    textAlign: 'center',
    // Monospace aesthetic to match user reference
    fontFamily: Platform.OS === 'web' ? '"JetBrains Mono", "Fira Code", monospace' : 'monospace',
    letterSpacing: -0.5,
  },
  subheadlineGlass: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    marginTop: lightTheme.spacing.md,
    ...Platform.select({
      web: {
        // @ts-ignore
        backdropFilter: 'blur(12px)',
      }
    })
  },
  subheadline: {
    fontSize: 16,
    lineHeight: 16, // Tight for pill centering
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? '"JetBrains Mono", "Fira Code", monospace' : 'monospace',
    letterSpacing: 0.5,
  },
});

