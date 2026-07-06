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
  Trash2,
  CheckCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationType {
  _id: string;
  type: "survey_alert" | "points_credited" | "redemption_update" | "promo";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const { user } = useUser();
  const { refreshUser } = useDBUser();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/notifications?limit=20", {
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
        // Toggle in local state
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
        return <Coins className="w-5 h-5 text-amber-400" />;
      case "redemption_update":
        return <Gift className="w-5 h-5 text-teal-400" />;
      case "survey_alert":
        return <Mail className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#5C8EFF]" />
            <span>Notifications</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            Stay updated with point additions, redemption status changes, promotional campaigns, and new survey releases.
          </p>
        </div>

        {hasUnread && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-xs font-bold text-zinc-300 hover:text-white transition-all self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-[#5C8EFF]" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-xs">
          <div className="w-8 h-8 border-2 border-[#5C8EFF] border-t-transparent animate-spin rounded-full mb-3" />
          <span>Fetching notification channels...</span>
        </div>
      ) : notifications.length === 0 ? (
        <div className="h-64 border border-dashed border-zinc-850 rounded-2xl flex flex-col items-center justify-center text-zinc-500 text-xs text-center">
          <Bell className="w-8 h-8 text-zinc-700 mb-2" />
          <p>You have no notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          <AnimatePresence initial={false}>
            {notifications.map((n) => (
              <motion.div
                key={n._id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 relative overflow-hidden group ${
                  n.isRead 
                    ? "bg-zinc-900/10 border-zinc-900 text-zinc-400" 
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-200"
                }`}
              >
                {/* Left Colored status border */}
                {!n.isRead && <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#5C8EFF]" />}

                {/* Icon Wrapper */}
                <div className={`p-2.5 rounded-xl border ${
                  n.isRead 
                    ? "bg-zinc-900/20 border-zinc-900/80" 
                    : "bg-zinc-850 border-zinc-800"
                }`}>
                  {getIcon(n.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold truncate ${n.isRead ? "text-zinc-450" : "text-white"}`}>
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5C8EFF]" />
                    )}
                  </div>
                  
                  <p className="text-xs text-zinc-450 mt-1 leading-relaxed">{n.message}</p>
                  
                  <span className="text-[10px] text-zinc-550 mt-2 block font-medium">
                    {new Date(n.createdAt).toLocaleDateString() + " " + new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Mark as read button */}
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id)}
                    className="absolute right-4 top-4 p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
