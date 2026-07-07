"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Coins, Search, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface UserPreview {
  _id: string;
  fullName: string;
  email: string;
  pointsBalance?: number;
  currentPoints?: number;
  status?: string;
  lifetimeEarnings?: number;
  clerkId?: string;
  surveysCompleted?: number;
}

export default function PointsAdjustmentPage() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [rationale, setRationale] = useState("");
  
  const [isSearching, setIsSearching] = useState(false);
  const [userPreview, setUserPreview] = useState<UserPreview | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearchUser = async () => {
    if (!userId.trim()) {
      toast.error("Please enter a User ID to search");
      return;
    }
    
    setIsSearching(true);
    setUserPreview(null);
    try {
      // The endpoint /api/admin/users/[id] exists. Let's use it.
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        // The API returns data: { profile: user, history: ... }
        setUserPreview(data.data.profile || data.data);
      } else {
        toast.error(data.error || "User not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while searching for the user");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !amount || !rationale) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/points/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          rationale,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Successfully adjusted points. New balance: ${data.data.newBalance}`);
        setAmount("");
        setRationale("");
        if (userPreview) {
          // Update preview balance
          setUserPreview({ ...userPreview, pointsBalance: data.data.newBalance, currentPoints: data.data.newBalance });
        }
      } else {
        toast.error(data.error || "Failed to adjust points");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Points Adjustment</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manually credit or debit points from a user&apos;s account.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Adjust Points</CardTitle>
            <CardDescription>Enter the User ID and the amount to adjust.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <div className="flex gap-2">
                  <Input 
                    id="userId" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    placeholder="e.g. 64b8f...21a" 
                  />
                  <Button type="button" variant="secondary" onClick={handleSearchUser} disabled={isSearching || !userId}>
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (+ to credit, - to debit)</Label>
                <Input 
                  id="amount" 
                  type="number"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="e.g. 500 or -200" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rationale">Rationale (Audit Log)</Label>
                <Input 
                  id="rationale" 
                  value={rationale} 
                  onChange={(e) => setRationale(e.target.value)} 
                  placeholder="e.g. Compensation for missing reward" 
                />
              </div>

              <Button type="submit" disabled={isSubmitting || !userId || !amount || !rationale} className="w-full bg-brand text-white hover:bg-brand-dark">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Coins className="h-4 w-4 mr-2" />}
                Process Adjustment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass bg-muted/10">
          <CardHeader>
            <CardTitle>User Preview</CardTitle>
            <CardDescription>Verify the user before making adjustments.</CardDescription>
          </CardHeader>
          <CardContent>
            {userPreview ? (
              <div className="flex flex-col items-center text-center space-y-4 py-6">
                <div className="h-20 w-20 rounded-full bg-brand/10 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-brand" />
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                    {userPreview.fullName}
                    {userPreview.status && (
                      <Badge variant={userPreview.status === "active" ? "default" : "destructive"} className="text-[10px]">
                        {userPreview.status}
                      </Badge>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm">{userPreview.email}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Clerk ID: {userPreview.clerkId}</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                  <Badge variant="outline" className="text-sm px-4 py-1 font-sharp bg-brand/5 border-brand/20">
                    Current Balance: {userPreview.pointsBalance ?? userPreview.currentPoints ?? 0} pts
                  </Badge>
                  <Badge variant="outline" className="text-sm px-4 py-1 font-sharp">
                    Lifetime: {userPreview.lifetimeEarnings ?? 0} pts
                  </Badge>
                  <Badge variant="outline" className="text-sm px-4 py-1 font-sharp">
                    Surveys: {userPreview.surveysCompleted ?? 0}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
                <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p>Search for a user ID to preview their details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
