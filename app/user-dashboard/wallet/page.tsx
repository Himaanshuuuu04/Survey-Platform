"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Wallet, 
  Coins, 
  DollarSign, 
  Clock, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Filter
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TransactionType {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  category: "survey" | "redemption" | "referral_bonus" | "daily_login" | "admin_adjustment";
  status: "pending" | "completed" | "rejected";
  description: string;
  createdAt: string;
}

export default function WalletPage() {
  const { user } = useUser();
  const { dbUser } = useDBUser();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("all"); // 'all' | 'survey' | 'redemption' | 'referral_bonus' | etc.
  const [txType, setTxType] = useState("all"); // 'all' | 'credit' | 'debit'

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let url = `/api/user/wallet?page=${page}&limit=10`;
      if (category !== "all") url += `&category=${category}`;
      if (txType !== "all") url += `&type=${txType}`;

      const res = await fetch(url, {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, page, category, txType, dbUser?.currentPoints]); // Refresh when page/filter/balance updates

  const balance = {
    currentPoints: dbUser?.currentPoints || 0,
    usdBalance: (dbUser?.currentPoints || 0) / 1000,
    pendingPoints: dbUser?.pendingPoints || 0,
    lifetimeEarnings: dbUser?.lifetimeEarnings || 0,
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
          <Wallet className="w-8 h-8 text-blue-600" />
          <span>My Wallet</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-xl">
          Monitor your reward transactions, track lifetime earnings, and audit point additions and deductions.
        </p>
      </div>

      {/* Balance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { 
            label: "Current Balance", 
            value: `${balance.currentPoints.toLocaleString()} PTS`, 
            sub: `$${balance.usdBalance.toFixed(2)} USD`,
            icon: Coins, 
            color: "text-amber-600 border-amber-200 bg-amber-50"
          },
          { 
            label: "Dollar Value", 
            value: `$${balance.usdBalance.toFixed(2)}`, 
            sub: "1,000 Points = $1.00 USD", 
            icon: DollarSign, 
            color: "text-emerald-600 border-emerald-200 bg-emerald-50"
          },
          { 
            label: "Pending Verification", 
            value: `${balance.pendingPoints.toLocaleString()} PTS`, 
            sub: "Pending confirmations", 
            icon: Clock, 
            color: "text-blue-600 border-blue-200 bg-blue-50"
          },
          { 
            label: "Lifetime Earnings", 
            value: `$${balance.lifetimeEarnings.toFixed(2)}`, 
            sub: "Total rewards accumulated", 
            icon: CheckCircle, 
            color: "text-purple-600 border-purple-200 bg-purple-50"
          },
        ].map((card) => (
          <Card key={card.label} className="bg-white border-zinc-200 shadow-sm flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">{card.label}</p>
                  <p className="text-xl font-bold text-zinc-900 mt-2 font-sans tracking-tight">{card.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-4 font-medium">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction History Section */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-900">Transaction Ledger</CardTitle>
            <CardDescription>Audit report of all reward actions</CardDescription>
          </div>

          {/* Filtering Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 shadow-sm">
              <Filter className="w-4 h-4 text-zinc-500" />
              <select 
                value={category} 
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-zinc-700 text-sm outline-none cursor-pointer font-medium"
              >
                <option value="all">All Categories</option>
                <option value="survey">Surveys</option>
                <option value="redemption">Redemptions</option>
                <option value="referral_bonus">Referral Bonus</option>
                <option value="daily_login">Daily Reward</option>
                <option value="admin_adjustment">Adjustments</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 shadow-sm">
              <select 
                value={txType} 
                onChange={(e) => { setTxType(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-zinc-700 text-sm outline-none cursor-pointer font-medium"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits (+)</option>
                <option value="debit">Debits (-)</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Ledger Table */}
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-sm">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mb-3" />
              <span>Loading ledger history...</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-sm text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50">
              <Wallet className="w-8 h-8 text-zinc-400 mb-2" />
              <p className="font-bold text-zinc-700">No matching transactions found.</p>
              <p>Adjust your filters or complete more surveys.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Amount</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx._id} className="border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <TableCell className="font-semibold text-sm max-w-xs sm:max-w-sm truncate text-zinc-900">{tx.description}</TableCell>
                      <TableCell className="text-xs capitalize font-medium text-zinc-600">{tx.category.replace("_", " ")}</TableCell>
                      <TableCell className="text-xs font-semibold uppercase text-zinc-500">{tx.type}</TableCell>
                      <TableCell className={`font-bold text-sm ${tx.type === "credit" ? "text-emerald-600" : "text-rose-600"}`}>
                        {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString()} pts
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            tx.status === "completed" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : tx.status === "pending"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-zinc-500 font-medium">
                        {new Date(tx.createdAt).toLocaleDateString() + " " + new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-4">
                  <span className="text-sm text-zinc-500 font-medium">
                    Page {page} of {totalPages}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
