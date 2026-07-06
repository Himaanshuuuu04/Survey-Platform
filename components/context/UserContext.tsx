"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface DBUser {
  _id: string;
  fullName: string;
  email: string;
  clerkId: string;
  role: string;
  status: string;
  currentPoints: number;
  lifetimeEarnings: number;
  pendingPoints: number;
  surveysCompleted: number;
  referralCode: string;
  referredBy?: string;
  referralEarnings: number;
  country?: string;
  preferences: {
    darkMode: boolean;
    emailNotifications: boolean;
  };
}

interface UserContextType {
  dbUser: DBUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    if (!isSignedIn || !clerkUser) {
      setDbUser(null);
      setLoading(false);
      return;
    }

    try {
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      const fullName = clerkUser.fullName || clerkUser.username || "User";
      const clerkId = clerkUser.id;

      if (!email) return;

      // Sync and retrieve DB user profile
      const res = await fetch(
        `/api/user/profile?email=${encodeURIComponent(email)}&clerkId=${clerkId}&fullName=${encodeURIComponent(fullName)}`,
        {
          headers: {
            "x-clerk-user-id": clerkId,
          },
        }
      );
      const data = await res.json();
      if (data.success && data.data) {
        setDbUser(data.data);
      }
    } catch (err) {
      console.error("Failed to sync/fetch user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clerkLoaded) {
      if (isSignedIn) {
        refreshUser();
      } else {
        setDbUser(null);
        setLoading(false);
      }
    }
  }, [clerkUser, clerkLoaded, isSignedIn]);

  return (
    <UserContext.Provider value={{ dbUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useDBUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useDBUser must be used within a UserProvider");
  }
  return context;
}
