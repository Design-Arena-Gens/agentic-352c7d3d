import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Best Restaurants in Hong Kong',
  description: 'Curated list of top Hong Kong restaurants with filters and search.',
  metadataBase: new URL('https://agentic-352c7d3d.vercel.app'),
  openGraph: {
    title: 'Best Restaurants in Hong Kong',
    description: 'Curated list of top Hong Kong restaurants with filters and search.',
    url: 'https://agentic-352c7d3d.vercel.app',
    siteName: 'HK Eats',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
