import { View, StyleSheet, ScrollView, ViewProps } from 'react-native';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { forwardRef } from 'react';

interface LayoutProps extends ViewProps {
  children: React.ReactNode;
}

export const ContentLayout = forwardRef<ScrollView, LayoutProps>(({ children, style, ...props }, ref) => {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ScrollView 
      ref={ref}
      style={[styles.container, { backgroundColor: currentTheme.colors.surface }]} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
});

export const Section = ({ children, style, ...props }: any) => (
  <View style={[styles.innerContainer, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: lightTheme.spacing.lg,
    paddingTop: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.xxl,
  },
});
