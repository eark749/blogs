import { View, StyleSheet, Image, ScrollView } from 'react-native';
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
    <ContentLayout ref={scrollRef}>
      <Section style={styles.header}>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
          ABOUT ME
        </Typography>
        <Typography variant="displaySm" weight="bold" style={styles.title}>
          I'm Vansh Soni, an Applied AI Engineer specializing in developing and deploying end-to-end AI/ML and custom solutions.
        </Typography>
      </Section>

      <Section style={styles.imageSection}>
        <View style={[styles.imageContainer, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
          {/* Placeholder image */}
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop' }} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </View>
      </Section>

      <Section style={styles.content}>
        <Typography variant="bodyLg" style={styles.paragraph}>
          My expertise lies in building intelligent systems from the ground up. I have deep experience working with Large Language Models (RAG, Fine-tuning), Deep Learning architectures (CNN, RNN, Transformers), and cloud platforms like AWS and Azure.
        </Typography>
        <Typography variant="bodyLg" style={styles.paragraph}>
          Currently, my work heavily involves agent orchestration frameworks such as LangChain, LlamaIndex, Multiple Agent Development Kit (ADK), and CrewAI. I've designed and delivered high-impact systems ranging from real-time Voice AI applications with sub-500ms latency to enterprise-scale HR automation bots and intelligent medical data retrieval backends.
        </Typography>
        <Typography variant="bodyLg" style={styles.paragraph}>
          I am passionate about transforming complex datasets into strategic insights and architecting custom AI solutions that drive real business value. Whether it's optimizing an STT→LLM→TTS streaming pipeline or building a scalable backend with Python and FastAPI, I thrive on navigating the ambiguity of modern AI engineering.
        </Typography>
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
    marginBottom: lightTheme.spacing.xl,
  },
  category: {
    marginBottom: lightTheme.spacing.md,
    letterSpacing: 1,
  },
  title: {
    marginBottom: lightTheme.spacing.xl,
    lineHeight: 48,
  },
  imageSection: {
    marginBottom: lightTheme.spacing.xxl,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: lightTheme.radii.default,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    marginBottom: lightTheme.spacing.xxl,
  },
  paragraph: {
    lineHeight: 32,
    marginBottom: lightTheme.spacing.lg,
  },
});
