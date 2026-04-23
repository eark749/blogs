import { View, StyleSheet, ScrollView } from 'react-native';
import { ContentLayout, Section } from '../src/components/Layout';
import { Footer } from '../src/components/Footer';
import { Typography } from '../src/components/Typography';
import { theme as lightTheme, darkTheme } from '../src/theme';
import { useTheme } from '../src/context/ThemeContext';
import { useRef } from 'react';
import { Feather } from '@expo/vector-icons';

export default function ServicesScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const services = [
    {
      icon: 'cpu',
      title: 'End-to-End AI/ML Solutions',
      description: 'Designing, building, and deploying scalable AI-powered systems and automation tools. From backend architecture to client-facing product delivery.'
    },
    {
      icon: 'git-branch',
      title: 'Agentic Workflows & Orchestration',
      description: 'Developing autonomous agents and complex LLM orchestrations using frameworks like LangChain, LlamaIndex, ADK, and CrewAI for Python and FastAPI.'
    },
    {
      icon: 'database',
      title: 'Enterprise RAG Systems',
      description: 'Architecting Retrieval-Augmented Generation platforms with vector databases, custom embedding search, and intelligent QA for compliance and data handling.'
    },
    {
      icon: 'mic',
      title: 'Real-time Voice AI',
      description: 'Building production-grade voice AI pipelines with WebRTC, achieving sub-500ms latency via optimized STT→LLM→TTS streaming and semantic turn detection.'
    }
  ];

  return (
    <ContentLayout ref={scrollRef}>
      <Section style={styles.header}>
        <Typography variant="labelMd" color={currentTheme.colors.outlineVariant} style={styles.category}>
          SERVICES
        </Typography>
        <Typography variant="displaySm" weight="bold" style={styles.title}>
          What I can do for you.
        </Typography>
        <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.subtitle}>
          I specialize in transforming complex problems into elegant software solutions.
        </Typography>
      </Section>

      <Section style={styles.servicesGrid}>
        {services.map((service, idx) => (
          <View key={idx} style={[styles.serviceCard, { borderColor: currentTheme.colors.surfaceContainerHighest }]}>
            <View style={[styles.iconBox, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
              <Feather name={service.icon as any} size={24} color={currentTheme.colors.primary} />
            </View>
            <Typography variant="headlineLg" weight="bold" style={styles.serviceTitle}>
              {service.title}
            </Typography>
            <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.serviceDesc}>
              {service.description}
            </Typography>
          </View>
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
  servicesGrid: {
    marginBottom: lightTheme.spacing.xxl,
    gap: 32,
  },
  serviceCard: {
    borderTopWidth: 1,
    paddingTop: 32,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  serviceTitle: {
    marginBottom: 16,
  },
  serviceDesc: {
    lineHeight: 28,
  },
});
