import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const socialImage = `${siteUrl.replace(/\/$/, '')}/og.png`;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Daily Fifth — One story. Five questions.',
  description:
    'Understand one important story in five questions—and have something worth talking about.',
  openGraph: {
    title: 'The Daily Fifth — One story. Five questions.',
    description: 'Understand today. Remember what matters.',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Daily Fifth — One story. Five questions.',
    description: 'Understand today. Remember what matters.',
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
