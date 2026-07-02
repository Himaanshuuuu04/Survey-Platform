import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Learn about our comprehensive market research platform: Audience recruitment, multi-channel survey distribution, and response validation.',
  openGraph: {
    title: 'Our Services | EvoGlobalInsight',
    description: 'Learn about our comprehensive market research platform: Audience recruitment, multi-channel survey distribution, and response validation.',
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
