import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with EvoGlobalInsight's audience intelligence experts to discuss your custom research needs.",
  openGraph: {
    title: 'Contact Us | EvoGlobalInsight',
    description: "Get in touch with EvoGlobalInsight's audience intelligence experts to discuss your custom research needs.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
