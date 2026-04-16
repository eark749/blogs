import { Stack } from 'expo-router';
import { 
  useFonts as useNewsreaderFonts, 
  Newsreader_400Regular, 
  Newsreader_500Medium, 
  Newsreader_600SemiBold, 
  Newsreader_700Bold 
} from '@expo-google-fonts/newsreader';
import { 
  useFonts as useWorkSansFonts, 
  WorkSans_400Regular, 
  WorkSans_500Medium, 
  WorkSans_600SemiBold, 
  WorkSans_700Bold 
} from '@expo-google-fonts/work-sans';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import { StaggeredMenu } from '../src/components/StaggeredMenu';

function RootContent() {
  const { isMenuOpen, setIsMenuOpen } = useTheme();

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'Dribbble', link: '#' },
    { label: 'Facebook', link: '#' }
  ];

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <StaggeredMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        items={menuItems}
        socialItems={socialItems}
      />
    </View>
  );
}

export default function RootLayout() {
  const [newsreaderLoaded] = useNewsreaderFonts({
    Newsreader_400Regular,
    Newsreader_500Medium,
    Newsreader_600SemiBold,
    Newsreader_700Bold,
  });

  const [workSansLoaded] = useWorkSansFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
  });

  const fontsLoaded = newsreaderLoaded && workSansLoaded;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ThemeProvider>
       <RootContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
