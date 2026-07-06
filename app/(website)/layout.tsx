import { AudienceProvider } from "@/components/layout/AudienceContext";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudienceProvider>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </AudienceProvider>
  );
}
