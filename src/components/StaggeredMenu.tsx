import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions, Platform, useWindowDimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Typography } from './Typography';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; link: string }[];
  socialItems: { label: string; link: string }[];
}

export function StaggeredMenu({ isOpen, onClose, items, socialItems }: MenuProps) {
  const { theme: mode, toggleTheme } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(SCREEN_HEIGHT, { 
        duration: 400, 
        easing: Easing.bezier(0.25, 1, 0.5, 1) 
      });
    }
  }, [isOpen]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: isOpen ? 'auto' : 'none',
  }));

  const animatedMenuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isOpen && opacity.value === 0) return null;

  return (
    <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      
      <Animated.View style={[
        styles.menuContent, 
        animatedMenuStyle,
        { backgroundColor: mode === 'light' ? '#ffffff' : '#1a1a1a' }
      ]}>
        <View style={styles.header}>
          <Typography variant="headlineLg" weight="bold" style={{ color: currentTheme.colors.primary }}>Æ</Typography>
          <View style={styles.headerRight}>
            {/* Theme Toggle - Only visible on Mobile when it's hidden from the navbar */}
            {isMobile && (
              <Pressable onPress={toggleTheme} style={styles.themeToggle}>
                <Feather 
                  name={mode === 'light' ? 'moon' : 'sun'} 
                  size={20} 
                  color={currentTheme.colors.primary} 
                />
              </Pressable>
            )}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={32} color={currentTheme.colors.primary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.linksContainer}>
          {items.map((item, index) => (
            <AnimatedItem key={item.label} index={index} isOpen={isOpen}>
               <Typography variant="displayLg" style={[styles.menuItem, { color: currentTheme.colors.primary }]}>
                  {item.label}
               </Typography>
            </AnimatedItem>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.socials}>
            {socialItems.map((social, index) => (
               <AnimatedItem key={social.label} index={items.length + index} isOpen={isOpen}>
                  <Typography variant="labelMd" style={[styles.socialItem, { color: currentTheme.colors.primary }]}>
                    {social.label}
                  </Typography>
               </AnimatedItem>
            ))}
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

function AnimatedItem({ children, index, isOpen }: { children: React.ReactNode, index: number, isOpen: boolean }) {
  const itemOpacity = useSharedValue(0);
  const itemX = useSharedValue(-20);

  useEffect(() => {
    if (isOpen) {
      itemOpacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
      itemX.value = withDelay(index * 100, withSpring(0));
    } else {
      itemOpacity.value = withTiming(0);
      itemX.value = withTiming(-20);
    }
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: itemOpacity.value,
    transform: [{ translateX: itemX.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2000,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuContent: {
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
    padding: lightTheme.spacing.lg,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 80,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e020',
  },
  closeButton: {
    padding: 10,
  },
  linksContainer: {
    gap: 20,
  },
  menuItem: {
    fontSize: 48,
    marginBottom: 10,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 40,
  },
  socials: {
    flexDirection: 'row',
    gap: 20,
  },
  socialItem: {
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});
