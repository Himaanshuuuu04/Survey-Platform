import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "../components/layout/AudienceContext";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${inter.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AudienceProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AudienceProvider>
      </body>
    </html>
  );
}
