"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Gift, 
  Coins, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  X,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RedemptionType {
  _id: string;
  requestedBrand: string;
  usdAmount: number;
  pointsDeducted: number;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
  adminRemarks?: string;
  deliveredGiftCard?: {
    code: string;
    expiryDate?: string;
  };
}

const GIFT_CARD_BRANDS = [
  { name: "Amazon", logoColor: "from-amber-500 to-orange-600", desc: "Digital shopping voucher" },
  { name: "Google Play", logoColor: "from-emerald-500 to-teal-600", desc: "Apps, games & books credit" },
  { name: "Apple", logoColor: "from-zinc-400 to-zinc-650", desc: "Apps, subscriptions & hardware" },
  { name: "Steam", logoColor: "from-blue-600 to-indigo-800", desc: "PC gaming marketplace key" },
  { name: "Flipkart", logoColor: "from-blue-400 to-sky-600", desc: "Ecommerce shopping card" },
];

export default function RedeemPage() {
  const { user } = useUser();
  const { dbUser, refreshUser } = useDBUser();
  const [redemptions, setRedemptions] = useState<RedemptionType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal / Request states
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [usdAmount, setUsdAmount] = useState<number>(5);
  const [requesting, setRequesting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchRedemptions = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/redemption?limit=10", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRedemptions(data.data);
      }
    } catch (err) {
      console.error("Error loading redemptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedemptions();
  }, [user, dbUser?.currentPoints]); // Refresh when user/points update

  const handleOpenRedeemModal = (brand: string) => {
    setSelectedBrand(brand);
    setUsdAmount(5);
    setSuccessMessage(null);
  };

  const handleCloseRedeemModal = () => {
    setSelectedBrand(null);
    setUsdAmount(5);
    setSuccessMessage(null);
  };

  const handleRequestRedemption = async () => {
    if (!selectedBrand || !user) return;
    setRequesting(true);
    try {
      const res = await fetch("/api/user/redemption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({
          brand: selectedBrand,
          usdAmount: usdAmount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Successfully requested $${usdAmount} ${selectedBrand} Gift Card!`);
        refreshUser(); // Deduct client-side points immediately
        setTimeout(() => {
          handleCloseRedeemModal();
        }, 3000);
      } else {
        alert(data.error || "Failed to request redemption");
      }
    } catch (err) {
      console.error("Redemption request failed:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  const currentPoints = dbUser?.currentPoints || 0;
  const isRedemptionEligible = currentPoints >= 5000;
  const pointsRequired = usdAmount * 1000;
  const hasEnoughForSelected = currentPoints >= pointsRequired;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Gift className="w-8 h-8 text-[#5C8EFF]" />
          <span>Redeem Rewards</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Convert your accumulated Evo Points into digital gift cards. Minimum redemption is $5.00 (5,000 Points).
        </p>
      </div>

      {/* Threshold Warning Banner */}
      {!isRedemptionEligible && (
        <div className="flex gap-3.5 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold">Redemption Threshold Locked</p>
            <p className="mt-0.5 text-zinc-450">
              You need at least <span className="font-semibold text-white">5,000 Evo Points</span> before you can make a request. Complete more surveys to reach the goal.
            </p>
          </div>
        </div>
      )}

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GIFT_CARD_BRANDS.map((brand) => (
          <div
            key={brand.name}
            className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 flex flex-col justify-between hover:bg-zinc-900/50 hover:border-zinc-700/60 transition-all duration-300 group`}
          >
            <div>
              {/* Brand Logo Design */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.logoColor} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                {brand.name.charAt(0)}
              </div>
              
              <h3 className="text-md font-bold text-white mt-4 group-hover:text-[#5C8EFF] transition-colors">{brand.name} Gift Card</h3>
              <p className="text-xs text-zinc-500 mt-1">{brand.desc}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-semibold">Min: 5,000 pts ($5)</span>
              
              <button
                disabled={!isRedemptionEligible}
                onClick={() => handleOpenRedeemModal(brand.name)}
                className="px-4 py-2 rounded-xl bg-[#5C8EFF] hover:bg-[#5C8EFF]/90 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md"
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Redemptions */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md p-6">
        <h2 className="text-md font-bold text-white mb-6">Redemption Requests</h2>
        
        {loading ? (
          <div className="h-32 flex items-center justify-center text-zinc-550 text-xs">
            Fetching redemption history...
          </div>
        ) : redemptions.length === 0 ? (
          <div className="h-32 border border-dashed border-zinc-850 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-xs">
            <Gift className="w-8 h-8 text-zinc-700 mb-2" />
            <p>No past redemptions found. Redeem your first card once you hit 5,000 points!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Gift Card</th>
                  <th className="pb-3 font-semibold">USD Value</th>
                  <th className="pb-3 font-semibold">Points Debited</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Gift Card Code</th>
                  <th className="pb-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850/50">
                {redemptions.map((red) => (
                  <tr key={red._id} className="text-zinc-350 hover:bg-zinc-900/10 transition-colors">
                    <td className="py-3.5 font-medium text-white">{red.requestedBrand} Gift Card</td>
                    <td className="py-3.5 font-bold">${red.usdAmount.toFixed(2)}</td>
                    <td className="py-3.5 font-semibold">{red.pointsDeducted.toLocaleString()} pts</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        red.status === "completed" 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : red.status === "approved"
                          ? "bg-teal-500/10 text-teal-400"
                          : red.status === "pending"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {red.status}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-xs text-zinc-400">
                      {red.status === "completed" && red.deliveredGiftCard ? (
                        <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded select-all font-bold text-amber-400">
                          {red.deliveredGiftCard.code}
                        </span>
                      ) : red.status === "completed" ? (
                        <span className="text-zinc-500">Delivered</span>
                      ) : red.status === "approved" ? (
                        <span className="text-teal-400 italic">Code generation pending</span>
                      ) : red.status === "rejected" ? (
                        <span className="text-rose-500/70 line-through">Rejected</span>
                      ) : (
                        <span className="text-zinc-650">Awaiting admin review</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right text-xs text-zinc-500">
                      {new Date(red.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Redemption Form Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseRedeemModal}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              {/* Close button */}
              {!successMessage && (
                <button 
                  onClick={handleCloseRedeemModal}
                  className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white rounded-lg border border-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {successMessage ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Request Submitted!</h3>
                  <p className="text-xs text-zinc-450 max-w-xs mx-auto">
                    {successMessage}
                  </p>
                  <p className="text-[10px] text-zinc-550 italic">
                    Points have been deducted. The gift card code will be visible here once an administrator approves.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#5C8EFF]/10 border border-[#5C8EFF]/25 text-[#5C8EFF]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedBrand} Gift Card</h3>
                      <p className="text-xs text-zinc-450">Redeem points for digital codes</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 tracking-wider">Select Value</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { usd: 5, pts: 5000 },
                        { usd: 10, pts: 10000 },
                        { usd: 25, pts: 25000 },
                        { usd: 50, pts: 50000 },
                      ].map((item) => (
                        <button
                          key={item.usd}
                          disabled={currentPoints < item.pts}
                          onClick={() => setUsdAmount(item.usd)}
                          className={`flex flex-col items-center py-3.5 border rounded-xl transition-all ${
                            usdAmount === item.usd
                              ? "bg-[#5C8EFF]/10 border-[#5C8EFF] text-white"
                              : "bg-zinc-850/50 border-zinc-800 text-zinc-450 hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none"
                          }`}
                        >
                          <span className="text-md font-bold">${item.usd} USD</span>
                          <span className="text-[10px] mt-1 font-semibold">{item.pts.toLocaleString()} PTS</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review box */}
                  <div className="p-4 rounded-2xl bg-zinc-850/50 border border-zinc-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Your points balance:</span>
                      <span className="text-white font-bold">{currentPoints.toLocaleString()} PTS</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Points required:</span>
                      <span className="text-white font-bold">{pointsRequired.toLocaleString()} PTS</span>
                    </div>
                    <div className="h-px bg-zinc-800 my-1" />
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-zinc-400">Balance after:</span>
                      <span className={hasEnoughForSelected ? "text-emerald-400" : "text-rose-450"}>
                        {hasEnoughForSelected ? (currentPoints - pointsRequired).toLocaleString() : "Insufficient Balance"} PTS
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    disabled={!hasEnoughForSelected || requesting}
                    onClick={handleRequestRedemption}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold uppercase tracking-wider text-xs shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {requesting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Coins className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
