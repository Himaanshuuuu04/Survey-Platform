import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about EvoGlobalInsight's mission, vision, values, and global panel reach across 50+ countries.",
  openGraph: {
    title: 'About Us | EvoGlobalInsight',
    description: "Learn about EvoGlobalInsight's mission, vision, values, and global panel reach across 50+ countries.",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
