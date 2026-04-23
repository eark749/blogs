import { View, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { ContentLayout, Section } from '../src/components/Layout';
import { Footer } from '../src/components/Footer';
import { Typography } from '../src/components/Typography';
import { theme as lightTheme, darkTheme } from '../src/theme';
import { useTheme } from '../src/context/ThemeContext';
import { useRef } from 'react';

export default function AboutScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ScrollView 
      ref={scrollRef}
      style={[styles.container, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Full-width premium banner */}
      <View style={styles.bannerWrapper}>
        <Image 
          source={{ uri: 'https://i.imgur.com/1ZvVkDc.gif' }} 
          style={styles.bannerImage} 
          resizeMode="cover" 
          alt="banner gif"
        />
        {/* Subtle gradient overlay to make it blend */}
        <View style={[styles.bannerOverlay, { backgroundColor: currentTheme.colors.surfaceContainerLow }]} />
      </View>

      {/* Overlapping Content Card */}
      <View style={styles.cardContainer}>
        <View style={[
          styles.contentCard, 
          { 
            backgroundColor: currentTheme.colors.surface,
            borderColor: currentTheme.colors.surfaceContainerHighest
          }
        ]}>
          <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
            ABOUT ME
          </Typography>
          
          <Typography variant="displaySm" weight="bold" style={styles.title}>
            I'm Vansh Soni, an Applied AI Engineer specializing in developing and deploying end-to-end AI/ML and custom solutions.
          </Typography>

          <View style={styles.divider} />

          <Typography variant="bodyLg" style={styles.paragraph}>
            My expertise lies in building intelligent systems from the ground up. I have deep experience working with Large Language Models (RAG, Fine-tuning), Deep Learning architectures (CNN, RNN, Transformers), and cloud platforms like AWS and Azure.
          </Typography>
          <Typography variant="bodyLg" style={styles.paragraph}>
            Currently, my work heavily involves agent orchestration frameworks such as LangChain, LlamaIndex, Multiple Agent Development Kit (ADK), and CrewAI. I've designed and delivered high-impact systems ranging from real-time Voice AI applications with sub-500ms latency to enterprise-scale HR automation bots and intelligent medical data retrieval backends.
          </Typography>
          <Typography variant="bodyLg" style={styles.paragraph}>
            I am passionate about transforming complex datasets into strategic insights and architecting custom AI solutions that drive real business value. Whether it's optimizing an STT→LLM→TTS streaming pipeline or building a scalable backend with Python and FastAPI, I thrive on navigating the ambiguity of modern AI engineering.
          </Typography>
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
  bannerWrapper: {
    width: '100%',
    height: 450,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2, // Subtle tint matching the theme
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: lightTheme.spacing.lg,
    marginTop: -150, // Pulls the card up over the banner
  },
  contentCard: {
    width: '100%',
    maxWidth: 900,
    borderRadius: lightTheme.radii.lg,
    borderWidth: 1,
    padding: Platform.OS === 'web' ? 64 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 10,
    marginBottom: lightTheme.spacing.xxl,
  },
  category: {
    marginBottom: lightTheme.spacing.md,
    letterSpacing: 2,
  },
  title: {
    marginBottom: lightTheme.spacing.xl,
    lineHeight: 48,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: lightTheme.colors.primary,
    marginBottom: 40,
    borderRadius: 2,
  },
  paragraph: {
    lineHeight: 34,
    marginBottom: lightTheme.spacing.xl,
    fontSize: 19,
  },
  footerWrapper: {
    width: '100%',
    maxWidth: 800,
    paddingBottom: 40,
  }
});
