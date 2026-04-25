import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Primary Meta Tags */}
        <title>Æ Blog</title>
        <meta name="title" content="Æ Blog" />
        <meta
          name="description"
          content="Personal blog by Vansh Soni — thoughts on tech, design, and development."
        />

        {/* Open Graph / Facebook / LinkedIn / iMessage */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ae-blog.vercel.app/" />
        <meta property="og:title" content="Æ Blog" />
        <meta
          property="og:description"
          content="Personal blog by Vansh Soni — thoughts on tech, design, and development."
        />
        <meta
          property="og:image"
          content="https://ae-blog.vercel.app/assets/og-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ae-blog.vercel.app/" />
        <meta property="twitter:title" content="Æ Blog" />
        <meta
          property="twitter:description"
          content="Personal blog by Vansh Soni — thoughts on tech, design, and development."
        />
        <meta
          property="twitter:image"
          content="https://ae-blog.vercel.app/assets/og-image.png"
        />

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
