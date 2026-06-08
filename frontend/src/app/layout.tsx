import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Customer Support',
  description: 'Get instant help from our AI-powered support assistant. Fast, friendly, and available 24/7.',
};

export const viewport: Viewport = {
  themeColor: '#0b0f1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className={`${inter.className} ${inter.variable}`}>{children}</body>
    </html>
  );
}