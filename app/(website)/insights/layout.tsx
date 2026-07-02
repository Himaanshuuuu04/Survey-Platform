import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Insights & Research Reports',
  description: 'Access the latest market research findings, methodology frameworks, and consumer behavior analysis from EvoGlobalInsight.',
  openGraph: {
    title: 'Insights & Research Reports | EvoGlobalInsight',
    description: 'Access the latest market research findings, methodology frameworks, and consumer behavior analysis from EvoGlobalInsight.',
  }
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
