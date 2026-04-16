import React from 'react';
import { View } from 'react-native';

// Empty fallback for native platforms
export function DottedSurface({ children, ...props }: any) {
  return (
    <View
      {...props}
      style={[
        {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        },
        props.style,
      ]}
    >
      {children}
    </View>
  );
}
