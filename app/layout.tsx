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
  title: "EvoGlobalInsight - Global Market Research",
  description: "Global market research and audience intelligence helping brands decide with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
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
