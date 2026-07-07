"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProvider, useDBUser } from "@/components/context/UserContext";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wallet, 
  Gift, 
  Users, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Coins,
  MenuIcon,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { dbUser } = useDBUser();

  const navItems = [
    { label: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
    { label: "Surveys", href: "/user-dashboard/surveys", icon: ClipboardList },
    { label: "Wallet & History", href: "/user-dashboard/wallet", icon: Wallet },
    { label: "Redeem Gift Cards", href: "/user-dashboard/redeem", icon: Gift },
    { label: "Referrals", href: "/user-dashboard/referrals", icon: Users },
    { label: "Notifications", href: "/user-dashboard/notifications", icon: Bell },
    { label: "My Profile", href: "/user-dashboard/profile", icon: User },
  ];

  return (
    <Sidebar className="bg-zinc-50 border-r border-zinc-200">
      <SidebarHeader className="p-4 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-zinc-200">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-zinc-100 text-zinc-900 font-bold">
              {user?.firstName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-zinc-900">{dbUser?.fullName || user?.fullName || "User"}</p>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-blue-600 font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>{(dbUser?.currentPoints || 0).toLocaleString()} PTS</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild
                  isActive={isActive}
                  className={isActive 
                    ? "bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 hover:text-blue-800" 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }
                >
                  <Link href={item.href}>
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-200">
        <SignOutButton redirectUrl="/">
          <SidebarMenuButton className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { dbUser, loading } = useDBUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-zinc-900">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-blue-500 border-r-cyan-400 animate-spin" />
          <Coins className="absolute inset-0 m-auto text-blue-500 w-6 h-6 animate-pulse" />
        </div>
        <p className="mt-4 text-zinc-500 text-sm tracking-widest font-mono">LOADING PORTAL...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white text-zinc-900 font-sans">
        <DashboardSidebar />
        
        <SidebarInset 
          className="flex flex-col flex-1 min-w-0 bg-white"
          style={{
            backgroundImage: "radial-gradient(#E4E4E7 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        >
          <header className="lg:hidden h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-zinc-600 hover:text-zinc-900" />
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs font-bold gap-1 px-2.5 py-0.5">
                <Coins className="w-3.5 h-3.5" />
                <span>{(dbUser?.currentPoints || 0).toLocaleString()}</span>
              </Badge>
              <Avatar className="h-8 w-8 border border-zinc-200">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback className="bg-zinc-100 text-zinc-900 font-bold text-xs">
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  );
}
