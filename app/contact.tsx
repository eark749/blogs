import { View, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
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
    <ContentLayout ref={scrollRef}>
      <Section style={styles.header}>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
          CONTACT
        </Typography>
        <Typography variant="displaySm" weight="bold" style={styles.title}>
          Let's talk.
        </Typography>
        <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.subtitle}>
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </Typography>
      </Section>

      <Section style={styles.contactList}>
        {contactMethods.map((method, idx) => (
          <Pressable 
            key={idx} 
            style={[styles.contactCard, { borderColor: currentTheme.colors.surfaceContainerHighest }]}
            onPress={method.action}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
                <Feather name={method.icon as any} size={20} color={currentTheme.colors.primary} />
              </View>
              <View>
                <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={{ marginBottom: 4 }}>
                  {method.label}
                </Typography>
                <Typography variant="headlineLg" weight="bold" style={{ color: currentTheme.colors.primary }}>
                  {method.value}
                </Typography>
              </View>
            </View>
            <Feather name="arrow-up-right" size={24} color={currentTheme.colors.outlineVariant} />
          </Pressable>
        ))}
      </Section>

      <Section>
        <Footer onBackToTop={handleBackToTop} />
      </Section>
    </ContentLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 100,
    marginBottom: lightTheme.spacing.xxl,
  },
  category: {
    marginBottom: lightTheme.spacing.md,
    letterSpacing: 1,
  },
  title: {
    marginBottom: lightTheme.spacing.sm,
  },
  subtitle: {
    lineHeight: 30,
  },
  contactList: {
    marginBottom: lightTheme.spacing.xxl,
    gap: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderWidth: 1,
    borderRadius: lightTheme.radii.default,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
