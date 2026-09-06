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
  title: 'The Daily Fifth — A daily curiosity game',
  description:
    'Five surprising, source-backed questions with the hidden origins and downstream ripples worth remembering.',
  openGraph: {
    title: 'The Daily Fifth — A daily curiosity game',
    description: 'Five surprising questions. Keep the curious parts.',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Daily Fifth — A daily curiosity game',
    description: 'Five surprising questions. Keep the curious parts.',
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
