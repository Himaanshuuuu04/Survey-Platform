"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "../Chatbot";
import { ScrollToTop } from "./ScrollToTop";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide the global landing page Navbar, Footer, and Chatbot on auth and dashboard routes
  const isAuthOrDashboard = 
    pathname.startsWith("/login") || 
    pathname.startsWith("/register") || 
    pathname.startsWith("/user-dashboard");

  if (isAuthOrDashboard) {
    return (
      <>
        <ScrollToTop />
        <main className="flex-1">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
