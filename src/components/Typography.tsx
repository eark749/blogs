import { Text, TextProps, StyleSheet } from 'react-native';
import { theme as lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface TypographyProps extends TextProps {
  variant: 'displayLg' | 'headlineLg' | 'bodyLg' | 'labelMd';
  color?: string;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export function Typography({ variant, color, weight = 'regular', style, ...props }: TypographyProps) {
  const { theme: mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  
  const isHeadline = variant === 'displayLg' || variant === 'headlineLg';
  const fontFamilyBase = isHeadline ? 'Newsreader' : 'WorkSans';
  
  const textColor = color || currentTheme.colors.primary;

  const weightSuffix = 
    weight === 'bold' ? '_700Bold' :
    weight === 'semiBold' ? '_600SemiBold' :
    weight === 'medium' ? '_500Medium' : 
    '_400Regular';
    
  const fontFamily = `${fontFamilyBase}${weightSuffix}`;

  return (
    <Text
      style={[
        styles[variant],
        { color: textColor, fontFamily },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  displayLg: {
    fontSize: lightTheme.typography.sizes.displayLg,
    lineHeight: lightTheme.typography.sizes.displayLg * lightTheme.typography.lineHeights.displayLg,
    letterSpacing: -1,
  },
  headlineLg: {
    fontSize: lightTheme.typography.sizes.headlineLg,
    lineHeight: lightTheme.typography.sizes.headlineLg * lightTheme.typography.lineHeights.headlineLg,
    letterSpacing: -0.5,
  },
  bodyLg: {
    fontSize: lightTheme.typography.sizes.bodyLg,
    lineHeight: lightTheme.typography.sizes.bodyLg * lightTheme.typography.lineHeights.bodyLg,
  },
  labelMd: {
    fontSize: lightTheme.typography.sizes.labelMd,
    lineHeight: lightTheme.typography.sizes.labelMd * lightTheme.typography.lineHeights.labelMd,
  },
});
