import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Momentum Story: Why and What',
  description: `Discover the inspiration behind Momentum, the personal growth companion designed to help you bridge the gap between aspiration and action. Share your insights to help shape its development.`,
  keywords: [
    'Momentum',
    'Personal Growth',
    'Habit Tracking',
    'Goal Setting',
    'Productivity',
    'Motivation',
    'Consistency',
    'Solopreneurship',
    'Build in Public',
    'User Feedback',
  ],
  openGraph: {
    type: 'website',
    locale: 'en-US',
    url: 'https://findmomentum.app/story',
    title: 'The Momentum Story: Why and What',
    description: `Discover the inspiration behind Momentum, the personal growth companion designed to help you bridge the gap between aspiration and action. Share your insights to help shape its development.`,
    siteName: 'Momentum',
    images: [
      {
        url: 'https://findmomentum.app/story-og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Momentum Story: Why and What',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@thisissandipp',
    title: 'The Momentum Story: Why and What',
    description: `Discover the inspiration behind Momentum, the personal growth companion designed to help you bridge the gap between aspiration and action. Share your insights to help shape its development.`,
    images: ['https://findmomentum.app/story-og-image.png'],
  },
  alternates: {
    canonical: 'https://findmomentum.app/story',
  },
};

export default function StoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
