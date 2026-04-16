import { View, StyleSheet, TextInput, Pressable, Platform, useWindowDimensions } from 'react-native';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

export function Header() {
  const { theme: mode, toggleTheme, setIsMenuOpen } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const { width } = useWindowDimensions();
  const [isFocused, setIsFocused] = useState(false);

  const isMobile = width < 600;

  return (
    <View style={[
      styles.header, 
      { 
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(18, 18, 18, 0.85)' 
      }
    ]}>
      {/* Brand Logo Container */}
      <View style={styles.logoContainer}>
        <Typography variant="displayLg" weight="bold" style={styles.logo}>
          Æ
        </Typography>
      </View>

      <View style={styles.rightActions}>
        {/* Theme Toggle - Hidden on mobile to reduce clutter */}
        {!isMobile && (
          <Pressable onPress={toggleTheme} style={styles.iconButton}>
            <Feather 
              name={mode === 'light' ? 'moon' : 'sun'} 
              size={20} 
              color={currentTheme.colors.primary} 
            />
          </Pressable>
        )}

        {/* Search Input */}
        <View style={[
          styles.searchContainer, 
          { backgroundColor: currentTheme.colors.surfaceContainerLow },
          isMobile && { width: 120 },
          isFocused && { 
            backgroundColor: currentTheme.colors.surfaceContainerLowest,
            borderColor: currentTheme.colors.outlineVariant + '40'
          }
        ]}>
          <Feather name="search" size={14} color={currentTheme.colors.outlineVariant} style={styles.searchIcon} />
          <TextInput 
            style={[
              styles.searchInput,
              { 
                fontFamily: 'WorkSans_400Regular',
                color: currentTheme.colors.primary,
                // @ts-ignore
                outlineStyle: 'none'
              }
            ]}
            placeholder={isMobile ? "Search" : "Search posts..."}
            placeholderTextColor={currentTheme.colors.outlineVariant}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Hamburger Menu Toggle */}
        <Pressable style={styles.iconButton} onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={24} color={currentTheme.colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
    alignSelf: 'center',
    marginBottom: lightTheme.spacing.gallery,
    height: 52, // Sleeker height
    paddingHorizontal: 24,
    borderRadius: 26, // Keep perfect pill geometry (height / 2)
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 24, 
        left: '50%',
        // @ts-ignore
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: 800,
        backdropFilter: 'blur(24px)',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      default: {
        marginTop: 16,
      }
    })
  },
  logoContainer: {
    flexShrink: 0,
  },
  logo: {
    fontSize: 22,
    lineHeight: 22,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: lightTheme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 34, // Adjusted for sleeker header
    width: 180,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    height: '100%',
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
