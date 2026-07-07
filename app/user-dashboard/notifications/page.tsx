"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Bell, 
  Coins, 
  Gift, 
  Sparkles, 
  Mail, 
  Check, 
  CheckCheck,
  Inbox,
  AlertCircle,
  TrendingUp,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationType {
  _id: string;
  type: "survey_alert" | "points_credited" | "redemption_update" | "promo";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

type FilterType = "all" | "unread" | "points_credited" | "redemption_update" | "survey_alert" | "promo";

export default function NotificationsPage() {
  const { user } = useUser();
  const { refreshUser } = useDBUser();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/notifications?limit=50", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async (notificationId: string) => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({ notificationId }),
      });
      const json = await res.json();
      if (json.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
        refreshUser();
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user || notifications.length === 0) return;
    try {
      const res = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({ all: true }),
      });
      const json = await res.json();
      if (json.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        refreshUser();
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "points_credited":
        return <Coins className="w-5 h-5 text-amber-500" />;
      case "redemption_update":
        return <Gift className="w-5 h-5 text-teal-500" />;
      case "survey_alert":
        return <Mail className="w-5 h-5 text-blue-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  const getCategoryBadge = (type: string) => {
    switch (type) {
      case "points_credited":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-semibold" variant="outline">Earnings</Badge>;
      case "redemption_update":
        return <Badge className="bg-teal-50 text-teal-700 border-teal-200 font-semibold" variant="outline">Redemption</Badge>;
      case "survey_alert":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold" variant="outline">Survey Invite</Badge>;
      default:
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-semibold" variant="outline">System</Badge>;
    }
  };

  // Metrics calculations
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const earningsCount = notifications.filter((n) => n.type === "points_credited").length;
  const redemptionCount = notifications.filter((n) => n.type === "redemption_update").length;
  const surveyCount = notifications.filter((n) => n.type === "survey_alert").length;
  const systemCount = notifications.filter((n) => n.type === "promo").length;

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.isRead;
    return n.type === activeFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <span>Notification Center</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600 max-w-xl">
            Stay updated with your earnings history, survey invitations, rewards processing status, and system updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 bg-white text-zinc-700 font-bold self-start sm:self-auto hover:bg-zinc-50 border-zinc-200 shadow-sm"
          >
            <CheckCheck className="w-4 h-4 text-blue-600" />
            <span>Mark All as Read</span>
          </Button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Unread</span>
              <p className="text-2xl font-black text-zinc-900">{unreadCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Bell className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Earnings</span>
              <p className="text-2xl font-black text-zinc-900">{earningsCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Coins className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Surveys</span>
              <p className="text-2xl font-black text-zinc-900">{surveyCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-650">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Redemptions</span>
              <p className="text-2xl font-black text-zinc-900">{redemptionCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650">
              <Gift className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs & Content Card */}
      <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/50 p-2 flex flex-wrap gap-1.5">
          {[
            { id: "all", label: `All (${totalCount})` },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "points_credited", label: `Earnings (${earningsCount})` },
            { id: "survey_alert", label: `Surveys (${surveyCount})` },
            { id: "redemption_update", label: `Redemptions (${redemptionCount})` },
            { id: "promo", label: `System (${systemCount})` },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeFilter === tab.id ? "secondary" : "ghost"}
              onClick={() => setActiveFilter(tab.id as FilterType)}
              className={`text-xs font-semibold px-4 py-2 h-auto rounded-lg transition-colors ${
                activeFilter === tab.id 
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-200" 
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <CardContent className="p-0 divide-y divide-zinc-100">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-zinc-550 text-sm">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mb-3" />
              <span>Fetching notification ledger...</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-sm text-center p-6 bg-zinc-50/50">
              <Inbox className="w-10 h-10 text-zinc-400 mb-3" />
              <p className="font-bold text-zinc-700">No matching notifications</p>
              <p className="text-xs text-zinc-550 mt-1">There are no alerts matching your active view selection.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              <AnimatePresence initial={false}>
                {filteredNotifications.map((n) => (
                  <motion.div
                    key={n._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-5 transition-all flex items-start gap-4 relative overflow-hidden group ${
                      n.isRead 
                        ? "bg-white text-zinc-650 hover:bg-zinc-50/20" 
                        : "bg-blue-50/15 text-zinc-900 hover:bg-blue-50/25"
                    }`}
                  >
                    {/* Left Colored status border */}
                    {!n.isRead && <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500" />}

                    {/* Icon Wrapper */}
                    <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                      n.isRead 
                        ? "bg-zinc-50 border-zinc-100 text-zinc-400" 
                        : "bg-white border-blue-100 shadow-sm text-blue-600"
                    }`}>
                      {getIcon(n.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-10">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {getCategoryBadge(n.type)}
                        
                        {!n.isRead && (
                          <Badge className="bg-blue-600 text-white font-semibold" variant="default">New</Badge>
                        )}

                        <span className="text-xs text-zinc-450 font-medium ml-auto">
                          {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold tracking-tight ${n.isRead ? "text-zinc-700" : "text-zinc-900"}`}>
                        {n.title}
                      </h3>
                      
                      <p className={`text-sm mt-1 leading-relaxed ${n.isRead ? "text-zinc-500" : "text-zinc-700 font-medium"}`}>{n.message}</p>
                    </div>

                    {/* Mark as read button */}
                    {!n.isRead && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(n._id)}
                        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-all h-8 w-8"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
