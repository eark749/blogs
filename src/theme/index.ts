const lightColors = {
  primary: '#000000',
  primaryContainer: '#3c3b3b',
  onPrimary: '#ffffff',
  secondary: '#aa3621',
  surface: '#f9f9f9',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHighest: '#e2e2e2',
  outlineVariant: '#c6c6c6',
  onSurface: '#1a1c1c',
};

const darkColors = {
  primary: '#ffffff',
  primaryContainer: '#e2e2e2',
  onPrimary: '#000000',
  secondary: '#ff4d29',
  surface: '#121212',
  surfaceContainerLow: '#1e1e1e',
  surfaceContainerLowest: '#252525',
  surfaceContainerHighest: '#333333',
  outlineVariant: '#444444',
  onSurface: '#f1f1f1',
};

const common = {
  typography: {
    fonts: {
      headline: 'Newsreader',
      body: 'WorkSans',
    },
    sizes: {
      displayLg: 56,
      headlineLg: 32,
      bodyLg: 16,
      labelMd: 14,
    },
    lineHeights: {
      displayLg: 1.1,
      headlineLg: 1.2,
      bodyLg: 1.6,
      labelMd: 1.5,
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64,
    gallery: 80,
  },
  radii: {
    default: 4,
    full: 9999,
  }
};

export const theme = {
  ...common,
  colors: lightColors,
  shadows: {
    ambient: {
      shadowColor: 'rgba(0, 0, 0, 0.06)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 40,
      elevation: 5,
    }
  }
};

export const darkTheme = {
  ...common,
  colors: darkColors,
  shadows: {
    ambient: {
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 40,
      elevation: 5,
    }
  }
};

export type ThemeType = typeof theme;
