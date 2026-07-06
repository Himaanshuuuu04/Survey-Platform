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
import { Loader2, Check, X, AlertCircle } from "lucide-react";
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
  rewardType: string;
  usdAmount: number;
  pointsCost: number;
  status: string;
  createdAt: string;
}

export default function RedemptionsPage() {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  const handleAction = async (id: string, action: "approve" | "reject", reason?: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/redemptions/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || `Redemption ${action}d successfully`);
        fetchRedemptions();
        if (action === "reject") setRejectDialog({ isOpen: false, id: null });
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
          <h1 className="text-3xl font-bold tracking-tight text-ink">Pending Redemptions</h1>
          <p className="text-muted-foreground mt-1">
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
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2 mt-4" />
                    <p className="mb-4">No pending redemptions.</p>
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
                    <TableCell className="capitalize">{redemption.rewardType}</TableCell>
                    <TableCell className="font-sharp font-semibold text-success">
                      ${redemption.usdAmount}
                    </TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      {redemption.pointsCost?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(redemption.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-success text-success hover:bg-success hover:text-white"
                        disabled={actionLoading === redemption._id}
                        onClick={() => handleAction(redemption._id, "approve")}
                      >
                        {actionLoading === redemption._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                        disabled={actionLoading === redemption._id}
                        onClick={() => {
                          setRejectReason("");
                          setRejectDialog({ isOpen: true, id: redemption._id });
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
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
    </div>
  );
}
