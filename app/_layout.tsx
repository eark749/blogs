import { Stack, usePathname } from 'expo-router';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import { StaggeredMenu } from '../src/components/StaggeredMenu';
import { Header } from '../src/components/Header';
import { useEffect, useState } from 'react';

// On web, inject Google Fonts via a <link> tag instead of relying on the broken npm font packages
function injectWebFonts() {
  if (Platform.OS !== 'web') return;
  if (typeof document === 'undefined') return;
  if (document.getElementById('google-fonts-inject')) return;
  const link = document.createElement('link');
  link.id = 'google-fonts-inject';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Work+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

// Inject OG meta tags for link previews
function injectOGMetaTags() {
  if (Platform.OS !== 'web') return;
  if (typeof document === 'undefined') return;
  if (document.getElementById('og-meta-inject')) return;

  const siteUrl = 'https://blogs-murex-psi.vercel.app';
  const tags = [
    { id: 'og-meta-inject', property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: 'Æ Blog' },
    { property: 'og:description', content: 'Tech, decoded for humans by Human.' },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Æ Blog' },
    { name: 'twitter:description', content: 'Tech, decoded for humans by Human.' },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
  ];

  tags.forEach((tag) => {
    const meta = document.createElement('meta');
    if ('id' in tag) meta.id = tag.id as string;
    if ('property' in tag) meta.setAttribute('property', tag.property as string);
    if ('name' in tag) meta.setAttribute('name', tag.name as string);
    meta.setAttribute('content', tag.content);
    document.head.appendChild(meta);
  });

  document.title = 'Æ Blog';
}

function RootContent() {
  const { isMenuOpen, setIsMenuOpen } = useTheme();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Email', link: 'mailto:vanshsoniofficial@gmail.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/vanshsoni' },
    { label: 'GitHub', link: 'https://github.com/eark749' }
  ];

  return (
    <View style={styles.container}>
      {!isAdmin && <Header />}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      {!isAdmin && (
        <StaggeredMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          items={menuItems}
          socialItems={socialItems}
        />
      )}
    </View>
  );
}

export default function RootLayout() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      injectWebFonts();
      injectOGMetaTags();
      // Give fonts a moment to start loading, then proceed
      const t = setTimeout(() => setFontsReady(true), 100);
      return () => clearTimeout(t);
    } else {
      setFontsReady(true);
    }
  }, []);

  if (!fontsReady) {
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
