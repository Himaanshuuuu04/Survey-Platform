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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-[#5C8EFF]" />
          <span>Referral System</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Invite friends to join Evo Rewards and earn bonus points when they register and participate in activities.
        </p>
      </div>

      {/* Share Widget Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Program Info */}
        <div className="lg:col-span-1 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-[#5C8EFF]/10 border border-[#5C8EFF]/20 text-[#5C8EFF] w-fit">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">Refer & Earn Points</h3>
            <p className="text-xs text-zinc-450 leading-relaxed">
              Earn an instant <span className="font-bold text-white">500 Evo Points ($0.50)</span> for every friend who signs up using your link and completes their first survey!
            </p>
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-zinc-850 flex justify-between items-center text-xs">
            <span className="text-zinc-550">Total Referral Earnings</span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Coins className="w-4.5 h-4.5" />
              {(data?.referralEarnings || dbUser?.referralEarnings || 0).toLocaleString()} PTS
            </span>
          </div>
        </div>

        {/* Copy Link / Code widgets */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6 space-y-6">
          <h3 className="text-sm font-bold text-white">Your Shareable Credentials</h3>



          {/* Referral Link */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-550 tracking-wider">Unique Referral Link</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-zinc-400 truncate select-all flex items-center">
                {referralLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className="px-5 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6">
        <h2 className="text-md font-bold text-white mb-6">Referred Friends ({data?.referredUsersCount || 0})</h2>

        {loading ? (
          <div className="h-32 flex items-center justify-center text-zinc-550 text-xs">
            Loading referred members registry...
          </div>
        ) : !data || data.referredUsers.length === 0 ? (
          <div className="h-32 border border-dashed border-zinc-850 rounded-xl flex flex-col items-center justify-center text-zinc-550 text-xs">
            <Users className="w-8 h-8 text-zinc-700 mb-2" />
            <p>You haven't referred any friends yet. Share your link to start earning commissions!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850/50">
                {data.referredUsers.map((friend) => (
                  <tr key={friend._id} className="text-zinc-350 hover:bg-zinc-900/10 transition-colors">
                    <td className="py-3.5 font-medium text-white">{friend.fullName}</td>
                    <td className="py-3.5 text-xs font-mono">{friend.email}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        friend.status === "active" 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : friend.status === "suspended"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-rose-500/10 text-rose-450"
                      }`}>
                        {friend.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-xs text-zinc-500">
                      {new Date(friend.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
