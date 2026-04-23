import { View, StyleSheet, ScrollView, useWindowDimensions, Platform } from 'react-native';
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
  const { width } = useWindowDimensions();
  const isDesktop = width >= 800;

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
    <ScrollView 
      ref={scrollRef}
      style={[styles.container, { backgroundColor: currentTheme.colors.background || currentTheme.colors.surface }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
            <Feather name="layers" size={14} color={currentTheme.colors.primary} />
            <Typography variant="labelMd" style={{ color: currentTheme.colors.primary, letterSpacing: 1 }}>
              SERVICES & EXPERTISE
            </Typography>
          </View>
          
          <Typography variant="displayLg" weight="bold" style={styles.title}>
            What I can do for you.
          </Typography>
          
          <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.subtitle}>
            I specialize in transforming complex problems into elegant software solutions, focusing heavily on modern AI orchestration and intelligent backend architectures.
          </Typography>
        </View>

        <View style={[styles.gridContainer, isDesktop && styles.gridContainerDesktop]}>
          {services.map((service, idx) => (
            <View 
              key={idx} 
              style={[
                styles.serviceCard, 
                isDesktop && styles.serviceCardDesktop,
                { 
                  backgroundColor: currentTheme.colors.surface, 
                  borderColor: currentTheme.colors.surfaceContainerHighest 
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: currentTheme.colors.surfaceContainerLow }]}>
                  <Feather name={service.icon as any} size={28} color={currentTheme.colors.primary} />
                </View>
                <Typography variant="displaySm" weight="bold" color={currentTheme.colors.surfaceContainerHighest} style={styles.numberWatermark}>
                  0{idx + 1}
                </Typography>
              </View>
              
              <View style={styles.cardBody}>
                <Typography variant="headlineLg" weight="bold" style={styles.serviceTitle}>
                  {service.title}
                </Typography>
                <Typography variant="bodyLg" color={currentTheme.colors.outlineVariant} style={styles.serviceDesc}>
                  {service.description}
                </Typography>
              </View>
            </View>
          ))}
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
  header: {
    width: '100%',
    maxWidth: 1100,
    paddingHorizontal: lightTheme.spacing.lg,
    marginBottom: 64,
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
  title: {
    fontSize: Platform.OS === 'web' ? 64 : 48,
    lineHeight: Platform.OS === 'web' ? 72 : 56,
    marginBottom: 24,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 32,
    maxWidth: 600,
  },
  gridContainer: {
    width: '100%',
    maxWidth: 1100,
    paddingHorizontal: lightTheme.spacing.lg,
    flexDirection: 'column',
    gap: 24,
    marginBottom: 80,
  },
  gridContainerDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceCard: {
    width: '100%',
    padding: 40,
    borderRadius: lightTheme.radii.lg,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  serviceCardDesktop: {
    width: '48%', // Leaves a small gap in the wrap
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberWatermark: {
    fontSize: 56,
    lineHeight: 56,
    opacity: 0.5, // Faint watermark number in top right
  },
  cardBody: {
    gap: 16,
  },
  serviceTitle: {
    fontSize: 28,
  },
  serviceDesc: {
    fontSize: 18,
    lineHeight: 30,
  },
  footerWrapper: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: lightTheme.spacing.lg,
    paddingBottom: 40,
  }
});
