"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { Users, UserCheck, ClipboardList, Gamepad2, Ticket } from "lucide-react";
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

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  activeSurveys: number;
  activeGames: number;
  pendingRedemptions: number;
}

interface UserGrowthData {
  date: string;
  newUsers: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [growthData, setGrowthData] = useState<UserGrowthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashRes, growthRes] = await Promise.all([
          fetch("/api/admin/analytics/dashboard"),
          fetch("/api/admin/analytics/user-growth?days=30"),
        ]);

        const dashJson = await dashRes.json();
        const growthJson = await growthRes.json();

        if (dashJson.success) setData(dashJson.data);
        if (growthJson.success) setGrowthData(growthJson.data);
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the EvoGlobal Admin Panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Users"
          value={loading ? <Skeleton className="h-8 w-20" /> : data?.totalUsers || 0}
          icon={Users}
        />
        <StatCard
          title="Active Users"
          value={loading ? <Skeleton className="h-8 w-20" /> : data?.activeUsers || 0}
          icon={UserCheck}
        />
        <StatCard
          title="Active Surveys"
          value={loading ? <Skeleton className="h-8 w-20" /> : data?.activeSurveys || 0}
          icon={ClipboardList}
        />
        <StatCard
          title="Active Games"
          value={loading ? <Skeleton className="h-8 w-20" /> : data?.activeGames || 0}
          icon={Gamepad2}
        />
        <StatCard
          title="Pending Redemptions"
          value={loading ? <Skeleton className="h-8 w-20" /> : data?.pendingRedemptions || 0}
          icon={Ticket}
          trend={data?.pendingRedemptions && data.pendingRedemptions > 0 ? "down" : "neutral"}
          trendValue={data?.pendingRedemptions && data.pendingRedemptions > 0 ? "Action Required" : "All clear"}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full glass">
          <CardHeader>
            <CardTitle>User Growth (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {loading ? (
              <Skeleton className="w-full h-[350px]" />
            ) : growthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                  data={growthData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1FC5F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1FC5F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--bg)", borderRadius: "8px", border: "1px solid var(--line)" }}
                    itemStyle={{ color: "var(--ink)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#1FC5F7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                No data available for this period.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
