"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Coins, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowUpRight, 
  ChevronRight, 
  Gift
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import Link from "next/link";

interface DashboardData {
  stats: {
    fullName: string;
    email: string;
    currentPoints: number;
    usdBalance: number;
    lifetimeEarnings: number;
    pendingPoints: number;
    surveysCompleted: number;
    referralCode: string;
    referralEarnings: number;
    status: string;
  };
  recentActivity: Array<{
    _id: string;
    type: "credit" | "debit";
    amount: number;
    category: string;
    status: "pending" | "completed" | "rejected";
    description: string;
    createdAt: string;
  }>;
}

const mockChartData = [
  { day: "Mon", points: 250 },
  { day: "Tue", points: 450 },
  { day: "Wed", points: 400 },
  { day: "Thu", points: 800 },
  { day: "Fri", points: 950 },
  { day: "Sat", points: 1250 },
  { day: "Sun", points: 1250 },
];

export default function DashboardPage() {
  const { user } = useUser();
  const { dbUser, refreshUser } = useDBUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/dashboard", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user, dbUser?.currentPoints]); // Refresh when user changes or points update

  const stats = data?.stats || {
    currentPoints: dbUser?.currentPoints || 0,
    usdBalance: (dbUser?.currentPoints || 0) / 1000,
    lifetimeEarnings: dbUser?.lifetimeEarnings || 0,
    pendingPoints: dbUser?.pendingPoints || 0,
    surveysCompleted: dbUser?.surveysCompleted || 0,
  };

  // Dynamically compute chart data from user's current points balance
  const chartData = mockChartData.map(d => ({
    day: d.day,
    points: stats.currentPoints > 0 ? Math.round((d.points / 1250) * stats.currentPoints) : 0
  }));

  // 5,000 points ($5) is the minimum redemption threshold
  const pointsGoal = 5000;
  const progressPercent = Math.min((stats.currentPoints / pointsGoal) * 100, 100);
  const isGoalReached = stats.currentPoints >= pointsGoal;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" as const }
    })
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C8EFF]/10 border border-[#5C8EFF]/25 text-[#5C8EFF] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Member</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
              Welcome back, {dbUser?.fullName || user?.firstName || "Explorer"}!
            </h1>
            <p className="mt-1.5 text-zinc-400 text-sm max-w-xl">
              Complete high-paying surveys, accumulate points, and redeem them instantly for premium gift cards.
            </p>
          </div>
          
          <Link
            href="/dashboard/surveys"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#5C8EFF]/20 hover:scale-[1.03] transition-all duration-300 self-start md:self-auto"
          >
            <span>Start Surveys</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { 
            label: "Evo Points Balance", 
            value: stats.currentPoints.toLocaleString(), 
            sub: `Equivalent to $${stats.usdBalance.toFixed(2)} USD`,
            icon: Coins, 
            color: "from-amber-400/20 to-yellow-500/10 border-amber-500/20 text-amber-400" 
          },
          { 
            label: "Lifetime Earnings", 
            value: `$${stats.lifetimeEarnings.toFixed(2)}`, 
            sub: "Total earned all-time", 
            icon: DollarSign, 
            color: "from-emerald-400/20 to-teal-500/10 border-emerald-500/20 text-emerald-400" 
          },
          { 
            label: "Pending Rewards", 
            value: stats.pendingPoints.toLocaleString(), 
            sub: "Under verification reviews", 
            icon: Clock, 
            color: "from-blue-400/20 to-indigo-500/10 border-blue-500/20 text-blue-400" 
          },
          { 
            label: "Surveys Completed", 
            value: stats.surveysCompleted.toString(), 
            sub: "All time surveys", 
            icon: CheckCircle, 
            color: "from-purple-400/20 to-pink-500/10 border-purple-500/20 text-purple-400" 
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className={`rounded-2xl border bg-zinc-900/30 backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden group hover:bg-zinc-900/50 transition-all duration-300 border-zinc-800/80`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-450 tracking-wider uppercase">{card.label}</p>
                <p className="text-2xl font-bold text-white mt-2 font-sans tracking-tight">{card.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4 font-medium">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="lg:col-span-1 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white">Redemption Progress</span>
              <Gift className={`w-5 h-5 ${isGoalReached ? "text-[#02E8F8]" : "text-zinc-550"}`} />
            </div>
            
            <p className="text-xs text-zinc-450">
              You need a minimum of <span className="font-semibold text-white">5,000 Evo Points ($5)</span> to request your first gift card.
            </p>

            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-400">Progress</span>
                <span className={isGoalReached ? "text-[#02E8F8]" : "text-amber-400"}>
                  {progressPercent.toFixed(0)}% ({stats.currentPoints.toLocaleString()} / 5,000)
                </span>
              </div>
              
              <div className="h-2 w-full bg-zinc-850 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${
                    isGoalReached ? "from-[#5C8EFF] to-[#02E8F8]" : "from-amber-500 to-yellow-400"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            {isGoalReached ? (
              <Link 
                href="/user-dashboard/redeem"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-sm font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition-transform duration-200"
              >
                <span>Redeem Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Earn {(5000 - stats.currentPoints).toLocaleString()} points to redeem
              </div>
            )}
          </div>
        </div>

        {/* Charts Card */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm font-bold text-white block">Earnings Analytics</span>
              <span className="text-xs text-zinc-550">Overview of recent points accumulations</span>
            </div>
            {stats.currentPoints > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.5%</span>
              </div>
            )}
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5C8EFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5C8EFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#52525b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#18181b", 
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#5C8EFF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPoints)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-sm font-bold text-white block">Recent Activity</span>
            <span className="text-xs text-zinc-550">Latest transactions logged in your wallet</span>
          </div>
          <Link 
            href="/dashboard/wallet"
            className="flex items-center gap-1 text-xs text-[#5C8EFF] font-semibold hover:text-[#5C8EFF]/80 transition-colors"
          >
            <span>Full History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="h-32 flex items-center justify-center text-zinc-500 text-xs">
            Fetching activity history...
          </div>
        ) : !data || data.recentActivity.length === 0 ? (
          <div className="h-32 flex flex-col items-center justify-center text-zinc-500 text-xs text-center border border-dashed border-zinc-800 rounded-xl">
            <Coins className="w-8 h-8 text-zinc-700 mb-2" />
            <p>No recent activity. Complete your first survey to start earning!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Activity</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850/50">
                {data.recentActivity.map((activity) => (
                  <tr key={activity._id} className="text-zinc-300 hover:bg-zinc-900/20 transition-colors">
                    <td className="py-3.5 font-medium max-w-xs sm:max-w-sm truncate text-white">{activity.description}</td>
                    <td className="py-3.5 text-xs capitalize font-semibold">{activity.category.replace("_", " ")}</td>
                    <td className={`py-3.5 font-bold ${activity.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
                      {activity.type === "credit" ? "+" : "-"}{activity.amount.toLocaleString()} pts
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        activity.status === "completed" 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : activity.status === "pending"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-xs text-zinc-500">
                      {new Date(activity.createdAt).toLocaleDateString()}
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
