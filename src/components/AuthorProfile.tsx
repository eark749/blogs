import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

export function AuthorProfile() {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.container, { borderTopColor: currentTheme.colors.outlineVariant + '40' }]}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.avatar} 
        />
        <Typography variant="labelMd" weight="medium" color={currentTheme.colors.secondary} style={styles.name}>
          Jessica Williams •
        </Typography>
      </View>
      
      <Typography variant="bodyLg" color={currentTheme.colors.primaryContainer} style={styles.bio}>
        A minimalist and aesthetics enthusiast who gladly shares their life and healthy lifestyle — 
        Inspiring others to take action and achieve success in life. Writer of many interesting entries for publishing houses.
      </Typography>

      <Pressable style={styles.linkContainer}>
        <Typography variant="labelMd" weight="semiBold" style={{ color: currentTheme.colors.primary }}>
          Check all posts
        </Typography>
        <View style={[styles.underline, { backgroundColor: currentTheme.colors.primary }]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: lightTheme.spacing.xl,
    borderTopWidth: 1,
    marginTop: lightTheme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: lightTheme.spacing.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: lightTheme.spacing.sm,
  },
  name: {
    fontSize: 14,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: lightTheme.spacing.lg,
    maxWidth: 600,
  },
  linkContainer: {
    alignSelf: 'flex-start',
  },
  underline: {
    height: 1,
    marginTop: 2,
  }
});
