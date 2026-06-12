import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Specialized global panel targeting and audience intelligence tailored to technology, fintech, healthcare, retail, automotive, and education.',
  openGraph: {
    title: 'Industries We Serve | EvoGlobalInsight',
    description: 'Specialized global panel targeting and audience intelligence tailored to technology, fintech, healthcare, retail, automotive, and education.',
  }
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
