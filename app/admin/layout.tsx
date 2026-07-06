import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Admin Panel | EvoGlobalInsight",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background flex flex-col w-full h-full min-h-screen">
          <header className="flex h-[60px] items-center border-b px-4 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0 gap-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="text-sm text-muted-foreground">Admin Mode</div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
