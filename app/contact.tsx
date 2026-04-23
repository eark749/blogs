import { View, StyleSheet, ScrollView, Pressable, Linking, useWindowDimensions, Platform } from 'react-native';
import { ContentLayout, Section } from '../src/components/Layout';
import { Footer } from '../src/components/Footer';
import { Typography } from '../src/components/Typography';
import { theme as lightTheme, darkTheme } from '../src/theme';
import { useTheme } from '../src/context/ThemeContext';
import { useRef } from 'react';
import { Feather } from '@expo/vector-icons';

export default function ContactScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const { width } = useWindowDimensions();
  const isDesktop = width >= 800;

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const contactMethods = [
    {
      icon: 'mail',
      label: 'Email',
      value: 'vanshsoniofficial@gmail.com',
      action: () => Linking.openURL('mailto:vanshsoniofficial@gmail.com')
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/vanshsoni',
      action: () => Linking.openURL('https://linkedin.com/in/vanshsoni')
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/eark749',
      action: () => Linking.openURL('https://github.com/eark749')
    }
  ];

  return (
    <ScrollView 
      ref={scrollRef}
      style={[styles.container, { backgroundColor: currentTheme.colors.surface }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainWrapper}>
        <View style={[styles.gridContainer, isDesktop && styles.gridContainerDesktop]}>
          
          {/* Left Column: Big Statement */}
          <View style={[styles.leftColumn, isDesktop && styles.leftColumnDesktop]}>
            <View style={[styles.badge, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
              <View style={[styles.dot, { backgroundColor: currentTheme.colors.primary }]} />
              <Typography variant="labelMd" style={{ color: currentTheme.colors.primary, letterSpacing: 1 }}>
                AVAILABLE FOR WORK
              </Typography>
            </View>
            
            <Typography variant="displayLg" weight="bold" style={styles.heroTitle}>
              Let's build something extraordinary.
            </Typography>
            
            <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.heroSubtitle}>
              Whether you need a scalable AI architecture or a high-performance web application, I'm ready to help you turn complex problems into elegant solutions.
            </Typography>
          </View>

          {/* Right Column: Premium Contact Cards */}
          <View style={[styles.rightColumn, isDesktop && styles.rightColumnDesktop]}>
            {contactMethods.map((method, idx) => (
              <Pressable 
                key={idx} 
                style={({ pressed }) => [
                  styles.contactCard, 
                  { 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.surfaceContainerHighest,
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
                onPress={method.action}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconBox, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
                    <Feather name={method.icon as any} size={22} color={currentTheme.colors.primary} />
                  </View>
                  <Feather name="arrow-up-right" size={20} color={currentTheme.colors.outlineVariant} />
                </View>
                
                <View style={styles.cardBody}>
                  <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.methodLabel}>
                    {method.label}
                  </Typography>
                  <Typography variant="titleLg" weight="bold" style={{ color: currentTheme.colors.onSurface }}>
                    {method.value}
                  </Typography>
                </View>
              </Pressable>
            ))}
          </View>
          
        </View>

        <View style={styles.footerWrapper}>
          <Footer onBackToTop={handleBackToTop} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 120 : 80,
  },
  gridContainer: {
    width: '100%',
    maxWidth: 1100,
    paddingHorizontal: lightTheme.spacing.lg,
    flexDirection: 'column',
    gap: 64,
    marginBottom: 80,
  },
  gridContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 80,
  },
  leftColumn: {
    width: '100%',
  },
  leftColumnDesktop: {
    flex: 1.2,
    paddingRight: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  heroTitle: {
    fontSize: Platform.OS === 'web' ? 64 : 48,
    lineHeight: Platform.OS === 'web' ? 72 : 56,
    marginBottom: 24,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 20,
    lineHeight: 32,
    maxWidth: 500,
  },
  rightColumn: {
    width: '100%',
    gap: 20,
  },
  rightColumnDesktop: {
    flex: 1,
  },
  contactCard: {
    width: '100%',
    padding: 32,
    borderRadius: lightTheme.radii.lg,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    gap: 8,
  },
  methodLabel: {
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footerWrapper: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: lightTheme.spacing.lg,
    paddingBottom: 40,
  }
});
