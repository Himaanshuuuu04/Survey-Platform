"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, AlertCircle, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Using sonner for notifications as it's in package.json

interface User {
  _id: string;
  fullName: string;
  email: string;
  status: string;
}

interface Redemption {
  _id: string;
  user: User;
  requestedBrand: string;
  usdAmount: number;
  pointsDeducted: number;
  status: string;
  createdAt: string;
}

const getBrandBadge = (brand: string) => {
  const colors: Record<string, string> = {
    amazon: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
    "google play": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
    apple: "bg-neutral-500/10 text-neutral-600 border-neutral-500/20 dark:text-neutral-400 dark:border-neutral-500/30",
    steam: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400 dark:border-sky-500/30",
    flipkart: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    paypal: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30",
  };
  
  const normalized = (brand || "").toLowerCase();
  const colorClass = colors[normalized] || "bg-muted text-muted-foreground border-muted-foreground/20";
  return (
    <Badge variant="outline" className={`${colorClass} font-medium capitalize text-[10px] px-2 py-0.5 rounded-full`}>
      {brand}
    </Badge>
  );
};

export default function RedemptionsPage() {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Approve Dialog State
  const [approveDialog, setApproveDialog] = useState<{ isOpen: boolean; redemption: Redemption | null }>({ isOpen: false, redemption: null });
  const [availableCards, setAvailableCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [cardsLoading, setCardsLoading] = useState(false);

  // Reject Dialog State
  const [rejectDialog, setRejectDialog] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [rejectReason, setRejectReason] = useState("");

  const fetchRedemptions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/redemptions/pending");
      const data = await res.json();
      if (data.success) {
        setRedemptions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch redemptions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedemptions();
  }, []);

  const fetchAvailableCards = async (brand: string, amount: number) => {
    setCardsLoading(true);
    try {
      const res = await fetch(`/api/admin/gift-cards/list?brand=${encodeURIComponent(brand)}&usdAmount=${amount}`);
      const data = await res.json();
      if (data.success) {
        setAvailableCards(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch available gift cards", error);
      toast.error("Failed to fetch available gift cards");
    } finally {
      setCardsLoading(false);
    }
  };

  const openApproveDialog = (redemption: Redemption) => {
    setApproveDialog({ isOpen: true, redemption });
    setSelectedCardId("");
    setAvailableCards([]);
    fetchAvailableCards(redemption.requestedBrand, redemption.usdAmount);
  };

  const handleAction = async (id: string, action: "approve" | "reject", reason?: string, giftCardId?: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/redemptions/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason, giftCardId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || `Redemption ${action}d successfully`);
        fetchRedemptions();
        if (action === "reject") setRejectDialog({ isOpen: false, id: null });
        if (action === "approve") setApproveDialog({ isOpen: false, redemption: null });
      } else {
        toast.error(data.error || `Failed to ${action} redemption`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Pending Redemptions</h1>
            {redemptions.length > 0 && (
              <Badge className="bg-brand/10 text-brand hover:bg-brand/20 border-brand/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {redemptions.length} Request{redemptions.length > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-xs mt-0.5">
            Review and approve or reject user reward redemptions.
          </p>
        </div>
      </div>

      <Card className="glass overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Reward Type</TableHead>
                <TableHead>Value (USD)</TableHead>
                <TableHead>Points Cost</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : redemptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center py-4">
                      <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
                      <p className="text-sm">No pending redemptions.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                redemptions.map((redemption) => (
                  <TableRow key={redemption._id}>
                    <TableCell>
                      <div className="font-medium">{redemption.user?.fullName || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground">{redemption.user?.email || "N/A"}</div>
                      {redemption.user?.status !== 'active' && (
                        <Badge variant="destructive" className="mt-1 text-[10px]">
                          {redemption.user?.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {getBrandBadge(redemption.requestedBrand)}
                    </TableCell>
                    <TableCell className="font-sharp font-semibold text-success">
                      ${redemption.usdAmount}
                    </TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      <div className="flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>{redemption.pointsDeducted?.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(redemption.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-success text-success hover:bg-success hover:text-white"
                          disabled={actionLoading === redemption._id}
                          onClick={() => openApproveDialog(redemption)}
                        >
                          {actionLoading === redemption._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5 mr-1" />}
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-destructive text-destructive hover:bg-destructive hover:text-white"
                          disabled={actionLoading === redemption._id}
                          onClick={() => {
                            setRejectReason("");
                            setRejectDialog({ isOpen: true, id: redemption._id });
                          }}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={rejectDialog.isOpen} onOpenChange={(open) => setRejectDialog({ isOpen: open, id: open ? rejectDialog.id : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this redemption? The points will be refunded to the user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason (Optional)</Label>
              <Input
                id="reason"
                placeholder="e.g. Violation of terms"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ isOpen: false, id: null })}>Cancel</Button>
            <Button 
              variant="destructive" 
              disabled={actionLoading === rejectDialog.id}
              onClick={() => {
                if (rejectDialog.id) {
                  handleAction(rejectDialog.id, "reject", rejectReason);
                }
              }}
            >
              {actionLoading === rejectDialog.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={approveDialog.isOpen} onOpenChange={(open) => setApproveDialog({ isOpen: open, redemption: open ? approveDialog.redemption : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Redemption</DialogTitle>
            <DialogDescription>
              Select a gift card to assign for this redemption.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Available Gift Cards ({approveDialog.redemption?.requestedBrand} - ${approveDialog.redemption?.usdAmount})</Label>
              {cardsLoading ? (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading cards...</span>
                </div>
              ) : availableCards.length === 0 ? (
                <p className="text-sm text-destructive">No available gift cards for this brand and amount. Please add inventory first.</p>
              ) : (
                <Select value={selectedCardId} onValueChange={setSelectedCardId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gift card to assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCards.map((card) => (
                      <SelectItem key={card._id} value={card._id}>
                        {card.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialog({ isOpen: false, redemption: null })}>Cancel</Button>
            <Button 
              className="bg-success text-white hover:bg-success/90"
              disabled={actionLoading === approveDialog.redemption?._id || !selectedCardId}
              onClick={() => {
                if (approveDialog.redemption) {
                  handleAction(approveDialog.redemption._id, "approve", undefined, selectedCardId);
                }
              }}
            >
              {actionLoading === approveDialog.redemption?._id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm & Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
