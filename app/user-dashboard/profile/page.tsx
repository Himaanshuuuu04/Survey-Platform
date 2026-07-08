"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  User, 
  Mail, 
  Globe, 
  Bell, 
  Coins, 
  Gift, 
  CheckCircle, 
  Shield, 
  Calendar,
  Save,
  Check
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user } = useUser();
  const { dbUser, refreshUser } = useDBUser();
  
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [hasCountry, setHasCountry] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);

  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dbUser) {
      setFullName(dbUser.fullName || "");
      
      setCountry(dbUser.country || "");
      if (dbUser.country) setHasCountry(true);

      setEmailNotifications(dbUser.preferences?.emailNotifications ?? true);
    }
  }, [dbUser]);

  useEffect(() => {
    if (!hasCountry) {
      fetch("https://countriesnow.space/api/v0.1/countries")
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setCountries(data.data.map((c: any) => c.country).sort());
          }
        })
        .catch(err => console.error("Error fetching countries", err));
    }
  }, [hasCountry]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({
          fullName,
          country,
          preferences: {
            emailNotifications,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        await refreshUser(); // Update state globally
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to update profile changes");
      }
    } catch (err) {
      console.error("Failed saving profile:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const stats = {
    balance: dbUser?.currentPoints || 0,
    usdVal: (dbUser?.currentPoints || 0) / 1000,
    lifetime: dbUser?.lifetimeEarnings || 0,
    surveys: dbUser?.surveysCompleted || 0,
    referrals: dbUser?.referralEarnings || 0,
  };

  const isChanged = !!dbUser && (
    fullName !== (dbUser.fullName || "") ||
    country !== (dbUser.country || "") ||
    emailNotifications !== (dbUser.preferences?.emailNotifications ?? true)
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          <span>My Profile</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-xl">
          Manage your personal details, verify earnings records, and adjust security notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary Info */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden text-center p-6">
            <CardContent className="pt-6 space-y-4">
              <Avatar className="w-24 h-24 mx-auto border-2 border-blue-500 shadow-sm">
                <AvatarImage src={user?.imageUrl} alt={dbUser?.fullName || "User"} className="object-cover" />
                <AvatarFallback className="bg-zinc-100 text-zinc-900 font-bold text-2xl">
                  {(dbUser?.fullName || user?.fullName || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-bold text-zinc-900">{dbUser?.fullName || user?.fullName}</h2>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">{dbUser?.email || user?.primaryEmailAddress?.emailAddress}</p>
              </div>

              <div className="flex justify-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    dbUser?.role === "admin" 
                      ? "bg-purple-50 text-purple-700 border border-purple-200" 
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {dbUser?.role || "User"}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    dbUser?.status === "suspended" 
                      ? "bg-amber-50 text-amber-700 border border-amber-200" 
                      : dbUser?.status === "banned"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {dbUser?.status || "Active"}
                </Badge>
              </div>

              <div className="pt-4 border-t border-zinc-100 text-left space-y-3 text-xs text-zinc-600">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-zinc-400" />
                  <div>
                    <p className="font-bold text-zinc-900">Clerk ID</p>
                    <p className="font-mono text-[10px] text-zinc-500 truncate max-w-[180px]" title={user?.id}>
                      {user?.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <div>
                    <p className="font-bold text-zinc-900">Joined Date</p>
                    <p className="text-zinc-500">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <Card className="bg-white border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-900">Evo Status Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm pb-3 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-500" /> Current Points
                </span>
                <span className="font-extrabold text-zinc-900">
                  {stats.balance.toLocaleString()} PTS <span className="text-xs font-normal text-zinc-500">(${stats.usdVal.toFixed(2)} USD)</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-sm pb-3 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Gift className="w-4 h-4 text-teal-500" /> Lifetime Earned
                </span>
                <span className="font-extrabold text-zinc-900">${stats.lifetime.toFixed(2)} USD</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" /> Surveys Completed
                </span>
                <span className="font-extrabold text-zinc-900">{stats.surveys}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-zinc-900">Profile Details & Settings</CardTitle>
              <CardDescription>Update your personal information and adjust default account preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveChanges} className="space-y-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs font-bold text-zinc-650 uppercase tracking-wider">Full Name</label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name" 
                    required
                    className="border-zinc-200 text-zinc-800 focus-visible:ring-blue-500"
                  />
                </div>

                {/* Email Address (Disabled) */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-650 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={dbUser?.email || user?.primaryEmailAddress?.emailAddress || ""} 
                    disabled 
                    className="bg-zinc-50 border-zinc-200 text-zinc-500 cursor-not-allowed font-mono text-sm"
                  />
                  <p className="text-[10px] text-zinc-450">Email addresses are synchronized directly from your OAuth/Clerk Identity and cannot be updated manually.</p>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label htmlFor="country" className="text-xs font-bold text-zinc-650 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Country / Region
                  </label>
                  {hasCountry ? (
                    <Input 
                      id="country" 
                      type="text" 
                      value={country} 
                      disabled 
                      className="bg-zinc-50 border-zinc-200 text-zinc-500 cursor-not-allowed text-sm font-mono"
                    />
                  ) : (
                    <select 
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 ring-offset-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  )}
                  {hasCountry && <p className="text-[10px] text-zinc-450">Country cannot be changed once set.</p>}
                </div>



                {/* Preferences */}
                <div className="space-y-4 pt-4 border-t border-zinc-100">
                  <h3 className="text-xs font-bold text-zinc-650 uppercase tracking-wider flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-zinc-400" /> Notifications & Preferences
                  </h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-xs">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-zinc-900">Email Marketing & Alerts</p>
                      <p className="text-xs text-zinc-500">Receive alert summaries for newly launched surveys and platform promos.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications} 
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Feedback Messages */}
                {success && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Your profile updates have been saved successfully!</span>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                    <span>{error}</span>
                  </div>
                )}

                {/* Actions */}
                <Button
                  type="submit"
                  disabled={saving || !isChanged}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* Demographics Summary */}
          {dbUser && (
            <Card className="bg-white border-zinc-200 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-900">Demographic Profile</CardTitle>
                <CardDescription>Your demographic information helps us match you with the best surveys.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Age</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.age || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Gender</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.gender || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Employment</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.employmentStatus || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Occupation</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.occupation || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Education</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.educationLevel || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Marital Status</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.maritalStatus || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Household Income</p>
                    <p className="text-sm font-medium text-zinc-900">{dbUser.demographics?.householdIncome || "N/A"}</p>
                  </div>
                  <div className="space-y-1 border-b border-zinc-100 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium text-zinc-900">
                      {[dbUser.demographics?.city, dbUser.demographics?.state, dbUser.demographics?.country].filter(Boolean).join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
