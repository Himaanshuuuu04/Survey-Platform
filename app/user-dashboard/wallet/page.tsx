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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Wallet className="w-8 h-8 text-[#5C8EFF]" />
          <span>My Wallet</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
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
            color: "text-amber-400 border-amber-500/20 bg-amber-400/5"
          },
          { 
            label: "Dollar Value", 
            value: `$${balance.usdBalance.toFixed(2)}`, 
            sub: "1,000 Points = $1.00 USD", 
            icon: DollarSign, 
            color: "text-emerald-400 border-emerald-500/20 bg-emerald-400/5"
          },
          { 
            label: "Pending Verification", 
            value: `${balance.pendingPoints.toLocaleString()} PTS`, 
            sub: "Pending audit confirmations", 
            icon: Clock, 
            color: "text-blue-400 border-blue-500/20 bg-blue-400/5"
          },
          { 
            label: "Lifetime Earnings", 
            value: `$${balance.lifetimeEarnings.toFixed(2)}`, 
            sub: "Total rewards accumulated", 
            icon: CheckCircle, 
            color: "text-purple-400 border-purple-500/20 bg-purple-400/5"
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6 flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-550 tracking-wider uppercase">{card.label}</p>
                <p className="text-xl font-bold text-white mt-2 font-sans tracking-tight">{card.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl border ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4 font-medium">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Transaction History Section */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-md font-bold text-white">Transaction Ledger</h2>
            <p className="text-xs text-zinc-550">Audit report of all reward actions</p>
          </div>

          {/* Filtering Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-850 border border-zinc-800 rounded-xl px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-zinc-450" />
              <select 
                value={category} 
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-zinc-300 text-xs outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="survey">Surveys</option>
                <option value="redemption">Redemptions</option>
                <option value="referral_bonus">Referral Bonus</option>
                <option value="daily_login">Daily Reward</option>
                <option value="admin_adjustment">Adjustments</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-zinc-850 border border-zinc-800 rounded-xl px-2.5 py-1.5">
              <select 
                value={txType} 
                onChange={(e) => { setTxType(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-zinc-300 text-xs outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits (+)</option>
                <option value="debit">Debits (-)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-xs">
            <div className="w-8 h-8 border-2 border-[#5C8EFF] border-t-transparent animate-spin rounded-full mb-3" />
            <span>Loading ledger history...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-xs text-center border border-dashed border-zinc-850 rounded-xl">
            <Wallet className="w-8 h-8 text-zinc-700 mb-2" />
            <p>No matching transactions found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-850 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/50">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="text-zinc-350 hover:bg-zinc-900/10 transition-colors">
                      <td className="py-3.5 font-medium max-w-xs sm:max-w-sm truncate text-white">{tx.description}</td>
                      <td className="py-3.5 text-xs capitalize font-semibold">{tx.category.replace("_", " ")}</td>
                      <td className="py-3.5 text-xs font-semibold uppercase">{tx.type}</td>
                      <td className={`py-3.5 font-bold ${tx.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
                        {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString()} pts
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          tx.status === "completed" 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : tx.status === "pending"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-xs text-zinc-500">
                        {new Date(tx.createdAt).toLocaleDateString() + " " + new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-zinc-850">
                <span className="text-xs text-zinc-500 font-medium">
                  Page {page} of {totalPages}
                </span>
                
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
