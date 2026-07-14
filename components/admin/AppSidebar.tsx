"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Users,
  Gamepad2,
  Gift,
  Ticket,
  ClipboardList,
  Coins,
  FileText,
  FileSpreadsheet,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Games",
    url: "/admin/games",
    icon: Gamepad2,
  },
  {
    title: "Gift Cards",
    url: "/admin/gift-cards",
    icon: Gift,
  },
  {
    title: "Redemptions",
    url: "/admin/redemptions",
    icon: Ticket,
  },
  {
    title: "Surveys",
    url: "/admin/surveys",
    icon: ClipboardList,
  },
  {
    title: "Providers",
    url: "/admin/providers",
    icon: ShieldCheck,
  },
  {
    title: "Survey Sessions",
    url: "/admin/survey-sessions",
    icon: Activity,
  },
  {
    title: "Points Adjustment",
    url: "/admin/points",
    icon: Coins,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "Audit Logs",
    url: "/admin/audit-logs",
    icon: FileText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border h-[60px] flex items-center justify-center">
        <h2 className="text-xl font-bold brand-gradient-text tracking-tight truncate w-full">EvoGlobal Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || (pathname.startsWith(item.url) && item.url !== "/admin");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
