import { GoalStoreProvider } from '@/providers/goal-store-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Momentum - Build Unstoppable Habits',
  description: `Momentum is your intelligent companion for building lasting habits, gaining proactive insights, and achieving continuous personal growth. Join early access!`,
  openGraph: {
    type: 'website',
    locale: 'en-US',
    url: 'https://findmomentum.app',
    title: 'Momentum - Build Unstoppable Habits',
    description: `Your intelligent companion for lasting habits & personal growth. Join early access!`,
    siteName: 'Momentum',
    images: [
      {
        url: 'https://findmomentum.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Momentum - Build Unstoppable Habits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momentum - Build Unstoppable Habits',
    description: `Your intelligent companion for lasting habits & personal growth. Join early access!`,
    creator: '@thisissandipp',
    images: 'https://findmomentum.app/og-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoalStoreProvider>
            <div className="bg-background relative">{children}</div>
          </GoalStoreProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
