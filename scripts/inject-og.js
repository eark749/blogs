const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run the build first.');
  process.exit(1);
}

const ogTags = `
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://blogs-murex-psi.vercel.app/" />
    <meta property="og:title" content="Æ Blog" />
    <meta property="og:description" content="Tech, decoded for humans by Human." />
    <meta property="og:image" content="https://blogs-murex-psi.vercel.app/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Æ Blog" />
    <meta name="twitter:description" content="Tech, decoded for humans by Human." />
    <meta name="twitter:image" content="https://blogs-murex-psi.vercel.app/og-image.png" />
    <meta name="description" content="Tech, decoded for humans by Human." />`;

let html = fs.readFileSync(indexPath, 'utf-8');
html = html.replace('</head>', `${ogTags}\n</head>`);
fs.writeFileSync(indexPath, html);

console.log('OG meta tags injected into dist/index.html');
