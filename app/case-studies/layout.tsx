import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore real-world market research impact across consumer electronics, fintech, healthcare, retail, automotive, and education.',
  openGraph: {
    title: 'Case Studies | EvoGlobalInsight',
    description: 'Explore real-world market research impact across consumer electronics, fintech, healthcare, retail, automotive, and education.',
  }
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
