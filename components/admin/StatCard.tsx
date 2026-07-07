"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  size?: "default" | "sm";
  chartData?: any[];
  chartDataKey?: string;
  chartColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  className,
  size = "sm",
  chartData,
  chartDataKey = "value",
  chartColor = "#1FC5F7",
}: StatCardProps) {
  // Import Recharts dynamically to avoid SSR issues if needed, or rely on the parent's import.
  // Actually, we'll just import it at the top of the file.
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card size={size} className={cn("glass overflow-hidden relative group border-l-4 border-l-brand/30 h-full flex flex-col", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
          <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{title}</CardTitle>
          <div className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <Icon className="h-3.5 w-3.5 text-brand" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col flex-1 justify-between">
          <div>
            <div className="text-xl md:text-2xl font-bold font-sharp leading-tight">{value}</div>
            {(description || trendValue) && (
              <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                {trendValue && (
                  <span
                    className={cn(
                      "font-medium",
                      trend === "up" && "text-success",
                      trend === "down" && "text-destructive",
                      trend === "neutral" && "text-muted-foreground"
                    )}
                  >
                    {trendValue}
                  </span>
                )}
                {description}
              </p>
            )}
          </div>
          {chartData && chartData.length > 0 && (
            <div className="h-12 w-full mt-2 -ml-2 -mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={chartDataKey}
                    stroke={chartColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
