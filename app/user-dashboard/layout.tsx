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
  Coins 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { dbUser, loading } = useDBUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
    { label: "Surveys", href: "/user-dashboard/surveys", icon: ClipboardList },
    { label: "Wallet & History", href: "/user-dashboard/wallet", icon: Wallet },
    { label: "Redeem Gift Cards", href: "/user-dashboard/redeem", icon: Gift },
    { label: "Referrals", href: "/user-dashboard/referrals", icon: Users },
    { label: "Notifications", href: "/user-dashboard/notifications", icon: Bell },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-[#5C8EFF] border-r-[#02E8F8] animate-spin" />
          <Coins className="absolute inset-0 m-auto text-[#5C8EFF] w-6 h-6 animate-pulse" />
        </div>
        <p className="mt-4 text-zinc-400 text-sm tracking-widest font-mono">LOADING PORTAL...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-900 bg-zinc-900/40 backdrop-blur-xl shrink-0">
        {/* User Quick Info */}
        <div className="p-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-zinc-800"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#5C8EFF] font-bold">
                {user?.firstName?.charAt(0) || "U"}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-white">{dbUser?.fullName || user?.fullName || "User"}</p>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-amber-400 font-bold">
                <Coins className="w-3.5 h-3.5" />
                <span>{(dbUser?.currentPoints || 0).toLocaleString()} PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  isActive 
                    ? "text-white font-bold bg-[#5C8EFF]/10 border border-[#5C8EFF]/20" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#5C8EFF]" : "text-zinc-400 group-hover:text-white"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActivePill" 
                    className="absolute left-0 w-1 h-6 bg-[#5C8EFF] rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-900">
          <SignOutButton redirectUrl="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-300">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* Mobile Header & Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>{(dbUser?.currentPoints || 0).toLocaleString()}</span>
            </div>
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-zinc-800"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#5C8EFF] font-bold text-xs">
                {user?.firstName?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col z-50 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-1" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? "text-white font-bold bg-[#5C8EFF]/10 border border-[#5C8EFF]/20" 
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-[#5C8EFF]" : "text-zinc-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="pt-4 border-t border-zinc-800 mt-auto">
                <SignOutButton redirectUrl="/">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/5 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </SignOutButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  );
}
