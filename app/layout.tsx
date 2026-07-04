import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AudienceProvider } from "../components/layout/AudienceContext";
import { RootLayoutWrapper } from "../components/layout/RootLayoutWrapper";
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs";

const calSans = localFont({
  src: [
    {
      path: "../public/fonts/calsans-static-ui/CalSansUI-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/calsans-static-ui/CalSansUI-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/calsans-static-ui/CalSansUI-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/calsans-static-ui/CalSansUI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cal-sans",
});

const fenwick = localFont({
  src: "../public/fonts/Fenwick-outline/Fenwick Outline.otf",
  variable: "--font-fenwick",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evoglobalinsight.com"),
  title: {
    default: "EvoGlobalInsight | Global Market Research",
    template: "%s | EvoGlobalInsight",
  },
  description: "Global market research and audience intelligence helping brands decide with confidence.",
  keywords: [
    "market research",
    "audience intelligence",
    "consumer insights",
    "brand strategy",
    "global panels",
    "B2B research",
    "qualitative research",
    "quantitative research",
  ],
  openGraph: {
    title: "EvoGlobalInsight | Global Market Research",
    description: "Global market research and audience intelligence helping brands decide with confidence.",
    url: "https://evoglobalinsight.com",
    siteName: "EvoGlobalInsight",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EvoGlobalInsight | Global Market Research",
    description: "Global market research and audience intelligence helping brands decide with confidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${calSans.variable} ${fenwick.variable} min-h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-white " suppressHydrationWarning style={{
          backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}>
          <AudienceProvider>
            <RootLayoutWrapper>
              {children}
            </RootLayoutWrapper>
          </AudienceProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
