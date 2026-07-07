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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  { name: "Amazon", logo: "/giftcards/amazon.png", desc: "Digital shopping voucher" },
  { name: "Google Play", logo: "/giftcards/google-play.webp", desc: "Apps, games & books credit" },
  { name: "Apple", logo: "/giftcards/apple.png", desc: "Apps, subscriptions & hardware" },
  { name: "Steam", logo: "/giftcards/steam.png", desc: "PC gaming marketplace key" },
  { name: "Flipkart", logo: "/giftcards/flipkart.png", desc: "Ecommerce shopping card" },
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
        fetchRedemptions(); // Refresh history
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
  const selectedBrandLogo = GIFT_CARD_BRANDS.find((b) => b.name === selectedBrand)?.logo;

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
          <Gift className="w-8 h-8 text-blue-600" />
          <span>Redeem Rewards</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-xl">
          Convert your accumulated Evo Points into digital gift cards. Minimum redemption is $5.00 (5,000 Points).
        </p>
      </div>

      {/* Threshold Warning Banner */}
      {!isRedemptionEligible && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="font-bold text-amber-900">Redemption Threshold Locked</AlertTitle>
          <AlertDescription>
            You need at least <span className="font-semibold">5,000 Evo Points</span> before you can make a request. Complete more surveys to reach the goal.
          </AlertDescription>
        </Alert>
      )}

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GIFT_CARD_BRANDS.map((brand) => (
          <Card key={brand.name} className="group hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white">
            <CardHeader>
              {/* Brand Logo Design */}
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm mb-4 border border-zinc-100 bg-white flex items-center justify-center">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <CardTitle className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{brand.name} Gift Card</CardTitle>
              <CardDescription>{brand.desc}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-xs text-zinc-500 font-semibold">Min: 5,000 pts ($5)</span>
              <Button
                disabled={!isRedemptionEligible}
                onClick={() => handleOpenRedeemModal(brand.name)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider"
              >
                Redeem
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Past Redemptions */}
      <Card className="border-zinc-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-zinc-900">Redemption Requests</CardTitle>
          <CardDescription>View your past gift card redemption history and status.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-32 flex items-center justify-center text-zinc-500 text-sm">
              Fetching redemption history...
            </div>
          ) : redemptions.length === 0 ? (
            <div className="h-32 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-sm bg-zinc-50">
              <Gift className="w-8 h-8 text-zinc-400 mb-2" />
              <p>No past redemptions found. Redeem your first card once you hit 5,000 points!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-200 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Gift Card</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">USD Value</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Points Debited</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Gift Card Code</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redemptions.map((red) => (
                  <TableRow key={red._id} className="border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                    <TableCell className="font-semibold text-sm text-zinc-900">{red.requestedBrand} Gift Card</TableCell>
                    <TableCell className="font-bold text-sm text-zinc-700">${red.usdAmount.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold text-sm text-zinc-600">{red.pointsDeducted.toLocaleString()} pts</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          red.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : red.status === "approved"
                              ? "bg-teal-50 text-teal-700 border-teal-200"
                              : red.status === "pending"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {red.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">
                      {red.status === "completed" && red.deliveredGiftCard ? (
                        <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded select-all font-bold text-emerald-600">
                          {red.deliveredGiftCard.code}
                        </span>
                      ) : red.status === "completed" ? (
                        <span className="text-zinc-500">Delivered</span>
                      ) : red.status === "approved" ? (
                        <span className="text-teal-600 italic">Code generation pending</span>
                      ) : red.status === "rejected" ? (
                        <span className="text-rose-500/70 line-through">Rejected</span>
                      ) : (
                        <span className="text-zinc-400">Awaiting admin review</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-xs text-zinc-500 font-medium">
                      {new Date(red.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Redemption Form Dialog */}
      <Dialog open={!!selectedBrand} onOpenChange={(open) => !open && handleCloseRedeemModal()}>
        <DialogContent className="sm:max-w-md bg-white border-zinc-200">
          {!successMessage ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {selectedBrandLogo ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 bg-white flex items-center justify-center p-1.5 shrink-0">
                      <img 
                        src={selectedBrandLogo} 
                        alt={`${selectedBrand} logo`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-xl font-bold text-zinc-900">{selectedBrand} Gift Card</DialogTitle>
                    <DialogDescription>Redeem points for digital codes</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Options */}
                <div className="space-y-3">
                  <label className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Select Value</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { usd: 5, pts: 5000 },
                      { usd: 10, pts: 10000 },
                      { usd: 25, pts: 25000 },
                      { usd: 50, pts: 50000 },
                    ].map((item) => (
                      <Button
                        key={item.usd}
                        variant="outline"
                        disabled={currentPoints < item.pts}
                        onClick={() => setUsdAmount(item.usd)}
                        className={`flex flex-col items-center justify-center h-auto py-4 rounded-xl transition-all ${
                          usdAmount === item.usd
                            ? "bg-blue-50 border-blue-400 text-blue-700 ring-1 ring-blue-400"
                            : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        <span className="text-lg font-bold">${item.usd} USD</span>
                        <span className="text-xs mt-1 text-zinc-500 font-semibold">{item.pts.toLocaleString()} PTS</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Review box */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Your points balance:</span>
                    <span className="text-zinc-900 font-bold">{currentPoints.toLocaleString()} PTS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Points required:</span>
                    <span className="text-zinc-900 font-bold">{pointsRequired.toLocaleString()} PTS</span>
                  </div>
                  <div className="h-px bg-zinc-200 my-2" />
                  <div className="flex justify-between font-bold">
                    <span className="text-zinc-700">Balance after:</span>
                    <span className={hasEnoughForSelected ? "text-emerald-600" : "text-rose-600"}>
                      {hasEnoughForSelected ? (currentPoints - pointsRequired).toLocaleString() : "Insufficient Balance"} PTS
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Button
                  disabled={!hasEnoughForSelected || requesting}
                  onClick={handleRequestRedemption}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold uppercase tracking-wider text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {requesting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Coins className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto animate-bounce shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">Request Submitted!</h3>
              <p className="text-sm text-zinc-600 max-w-sm mx-auto">
                {successMessage}
              </p>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800">
                Points have been deducted. The gift card code will be visible here once an administrator approves.
              </div>
              <Button
                variant="outline"
                onClick={handleCloseRedeemModal}
                className="w-full mt-4 h-12 rounded-xl border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-xs hover:bg-zinc-50"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
