"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { Users, UserCheck, ClipboardList, Gamepad2, Ticket, Coins, Banknote, Gift, TrendingUp, Layers } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  activeSurveys: number;
  activeGames: number;
  pendingRedemptions: number;
  availableGiftCards: number;
  outstandingPoints: number;
  lifetimePoints: number;
  totalRedeemedUSD: number;
}

interface UserGrowthData {
  date: string;
  newUsers: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [growthData, setGrowthData] = useState<UserGrowthData[]>([]);
  const [recentRedemptions, setRecentRedemptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const [dashRes, growthRes, redRes] = await Promise.all([
          fetch("/api/admin/analytics/dashboard"),
          fetch("/api/admin/analytics/user-growth?days=30"),
          fetch("/api/admin/redemptions/pending?limit=5"),
        ]);
 
        const dashJson = await dashRes.json();
        const growthJson = await growthRes.json();
        const redJson = await redRes.json();
 
        if (dashJson.success) setData(dashJson.data);
        if (growthJson.success) setGrowthData(growthJson.data);
        if (redJson.success) setRecentRedemptions(redJson.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
 
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Welcome to the EvoGlobal Admin Panel.
          </p>
        </div>
      </div>

      {/* Stats columns: Differentiated by category and vertically stacked */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category 1: Users & Audience */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 px-1 pb-1 border-b">
            <Users className="h-4 w-4 text-sky-500 shrink-0" />
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Users & Audience
            </h2>
          </div>
          <div className="space-y-2">
            <StatCard
              title="Total Users"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.totalUsers?.toLocaleString() || 0}
              icon={Users}
              className="border-l-sky-500"
            />
            <StatCard
              title="Active Users"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.activeUsers?.toLocaleString() || 0}
              icon={UserCheck}
              className="border-l-sky-500"
            />
            <StatCard
              title="New Users Today"
              value={loading ? <Skeleton className="h-5 w-12" /> : growthData[growthData.length - 1]?.newUsers || 0}
              icon={TrendingUp}
              className="border-l-sky-500"
            />
          </div>
        </div>

        {/* Category 2: Economy & Financials */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 px-1 pb-1 border-b">
            <Coins className="h-4 w-4 text-emerald-500 shrink-0" />
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Economy & Financials
            </h2>
          </div>
          <div className="space-y-2">
            <StatCard
              title="Outstanding Pts"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.outstandingPoints?.toLocaleString() || 0}
              icon={Coins}
              className="border-l-emerald-500"
            />
            <StatCard
              title="Lifetime Issued"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.lifetimePoints?.toLocaleString() || 0}
              icon={Banknote}
              className="border-l-emerald-500"
            />
            <StatCard
              title="Value Redeemed"
              value={loading ? <Skeleton className="h-5 w-12" /> : `$${data?.totalRedeemedUSD?.toLocaleString() || 0}`}
              icon={Gift}
              className="border-l-emerald-500"
            />
          </div>
        </div>

        {/* Category 3: Operations & Inventory */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 px-1 pb-1 border-b">
            <Layers className="h-4 w-4 text-indigo-500 shrink-0" />
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Operations & Inventory
            </h2>
          </div>
          <div className="space-y-2">
            <StatCard
              title="Available Cards"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.availableGiftCards || 0}
              icon={Gift}
              className="border-l-indigo-500"
              trend={data?.availableGiftCards !== undefined && data.availableGiftCards < 10 ? "down" : "neutral"}
              trendValue={data?.availableGiftCards !== undefined && data.availableGiftCards < 10 ? "Low" : "OK"}
            />
            <StatCard
              title="Active Surveys"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.activeSurveys || 0}
              icon={ClipboardList}
              className="border-l-indigo-500"
            />
            <StatCard
              title="Active Games"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.activeGames || 0}
              icon={Gamepad2}
              className="border-l-indigo-500"
            />
            <StatCard
              title="Pending Redeem"
              value={loading ? <Skeleton className="h-5 w-12" /> : data?.pendingRedemptions || 0}
              icon={Ticket}
              className="border-l-indigo-500"
              trend={data?.pendingRedemptions && data.pendingRedemptions > 0 ? "down" : "neutral"}
              trendValue={data?.pendingRedemptions && data.pendingRedemptions > 0 ? "Pending" : "None"}
            />
          </div>
        </div>
      </div>

      {/* Charts & Actions split below */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Left: User Growth Chart */}
        <div className="lg:col-span-4">
          <Card className="glass h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">User Growth (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="w-full h-[220px]" />
              ) : growthData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={growthData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1FC5F7" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1FC5F7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--bg)", borderRadius: "8px", border: "1px solid var(--line)", fontSize: "12px" }}
                      itemStyle={{ color: "var(--ink)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="newUsers"
                      stroke="#1FC5F7"
                      strokeWidth={1.5}
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-xs text-muted-foreground">
                  No data available for this period.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Recent Pending Redemptions */}
        <div className="lg:col-span-3">
          <Card className="glass h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Pending Redemptions</CardTitle>
              <Link href="/admin/redemptions" className="text-xs text-brand hover:underline font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : recentRedemptions.length === 0 ? (
                <div className="text-xs text-muted-foreground py-4 text-center">
                  No pending redemptions.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="w-full text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-1.5 h-auto text-muted-foreground">User</TableHead>
                        <TableHead className="py-1.5 h-auto text-muted-foreground">Reward</TableHead>
                        <TableHead className="py-1.5 h-auto text-muted-foreground">Value</TableHead>
                        <TableHead className="py-1.5 h-auto text-muted-foreground text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentRedemptions.map((red) => (
                        <TableRow key={red._id} className="hover:bg-muted/5">
                          <TableCell className="py-1.5 font-medium">
                            <div className="text-xs">{red.user?.fullName || "Unknown"}</div>
                            <div className="text-[9px] text-muted-foreground">{red.user?.email || ""}</div>
                          </TableCell>
                          <TableCell className="py-1.5 capitalize text-xs">{red.requestedBrand}</TableCell>
                          <TableCell className="py-1.5 font-semibold text-success text-xs">${red.usdAmount}</TableCell>
                          <TableCell className="py-1.5 text-right">
                            <Link href="/admin/redemptions">
                              <Badge className="cursor-pointer hover:bg-brand/80 text-[9px] px-1.5 py-0 h-auto" variant="secondary">
                                Review
                              </Badge>
                            </Link>
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
      </div>
    </div>
  );
}
