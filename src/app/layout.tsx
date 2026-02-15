import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/src/styles/globals.css';

import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import QueryProvider from '@/src/components/QueryProvider';
import { ThemeProvider } from '@/src/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'BlogHub - Beautiful Blog Platform',
  description: 'Read amazing blog posts about tech, life, and more',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-text`}
      >
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
