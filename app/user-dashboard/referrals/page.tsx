"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Users, 
  Coins, 
  Copy, 
  Check, 
  Gift, 
  ArrowUpRight, 
  Share2 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ReferredUser {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
}

interface ReferralData {
  referralCode: string;
  referralEarnings: number;
  referredUsersCount: number;
  referredUsers: ReferredUser[];
}

export default function ReferralsPage() {
  const { user } = useUser();
  const { dbUser } = useDBUser();
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchReferralDetails = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/referrals", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error loading referrals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralDetails();
  }, [user]);

  const referralCode = data?.referralCode || dbUser?.referralCode || "GETCODE";
  const referralLink = typeof window !== "undefined" 
    ? `${window.location.origin}/register?ref=${referralCode}`
    : `https://evorewards.com/register?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          <span>Referral System</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-xl">
          Invite friends to join Evo Rewards and earn bonus points when they register and participate in activities.
        </p>
      </div>

      {/* Share Widget Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Program Info */}
        <Card className="lg:col-span-1 bg-white border-zinc-200 shadow-sm flex flex-col justify-between">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="space-y-4 flex-grow">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 w-fit">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 leading-tight">Refer & Earn Points</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Earn an instant <span className="font-bold text-zinc-900">500 Evo Points ($0.50)</span> for every friend who signs up using your link and completes their first survey!
              </p>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex justify-between items-center text-sm">
              <span className="text-zinc-600 font-medium">Total Referral Earnings</span>
              <span className="font-bold text-amber-600 flex items-center gap-1.5">
                <Coins className="w-5 h-5 text-amber-500" />
                {(data?.referralEarnings || dbUser?.referralEarnings || 0).toLocaleString()} PTS
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Copy Link / Code widgets */}
        <Card className="lg:col-span-2 bg-white border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-zinc-900">Your Shareable Credentials</CardTitle>
            <CardDescription>Share this link with your friends to start earning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Referral Link */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Unique Referral Link</label>
              <div className="flex gap-3">
                <Input 
                  value={referralLink}
                  readOnly
                  className="bg-zinc-50 border-zinc-200 text-zinc-700 font-medium font-mono text-sm h-12"
                />
                <Button 
                  onClick={handleCopyLink}
                  className="h-12 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md min-w-[120px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-zinc-900">Referred Friends ({data?.referredUsersCount || 0})</CardTitle>
          <CardDescription>Track the status of users who joined via your referral link.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-32 flex items-center justify-center text-zinc-500 text-sm">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mr-3" />
              Loading referred members registry...
            </div>
          ) : !data || data.referredUsers.length === 0 ? (
            <div className="h-32 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-sm bg-zinc-50">
              <Users className="w-8 h-8 text-zinc-400 mb-3" />
              <p className="font-bold text-zinc-700">No Referrals Yet</p>
              <p>You haven&apos;t referred any friends yet. Share your link to start earning commissions!</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Date Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.referredUsers.map((friend) => (
                    <TableRow key={friend._id} className="border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <TableCell className="font-semibold text-sm text-zinc-900">{friend.fullName}</TableCell>
                      <TableCell className="text-xs font-mono text-zinc-600">{friend.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            friend.status === "active" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : friend.status === "suspended"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {friend.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-zinc-500 font-medium">
                        {new Date(friend.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
