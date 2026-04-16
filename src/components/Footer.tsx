import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

interface FooterProps {
  onBackToTop?: () => void;
}

export function Footer({ onBackToTop }: FooterProps) {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;


  return (
    <View style={styles.footer}>
      <View style={[styles.divider, { backgroundColor: currentTheme.colors.surfaceContainerHighest }]} />

      <View style={styles.content}>
        <View style={styles.left}>
          <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.copyright}>
            © 2026 Vansh soni — All rights reserved.
          </Typography>
        </View>

        <TouchableOpacity 
          style={[styles.backToTop, { backgroundColor: currentTheme.colors.primary }]} 
          onPress={onBackToTop}
          activeOpacity={0.7}
        >
          <Feather 
            name="arrow-up" 
            size={20} 
            color={currentTheme.colors.onPrimary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: lightTheme.spacing.xxl,
    paddingBottom: lightTheme.spacing.xl,
  },
  divider: {
    height: 1,
    marginBottom: lightTheme.spacing.sm,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
  },
  copyright: {
    fontSize: 12,
  },
  backToTop: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});
