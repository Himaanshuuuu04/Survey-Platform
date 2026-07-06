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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Loader2, 
  Trash2, 
  Eye, 
  Shield, 
  Globe, 
  Fingerprint, 
  User as UserIcon, 
  Calendar,
  DollarSign,
  History,
  AlertCircle,
  Mail,
  MapPin,
  Activity,
  Coins,
  TrendingUp,
  Clock,
  ClipboardCheck,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Toaster, toast } from "sonner";

interface User {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  country?: string;
  currentPoints: number;
  createdAt: string;
  clerkId: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// DetailRow Component for reusable key-value presentation with copy ability
const DetailRow = ({ 
  icon: Icon, 
  label, 
  value, 
  isMono = false,
  isCopyable = false,
  className = ""
}: { 
  icon: any, 
  label: string, 
  value: string, 
  isMono?: boolean,
  isCopyable?: boolean,
  className?: string
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/10 px-2 rounded-lg transition-colors">
      <div className="flex items-center gap-2 shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 min-w-0 max-w-[60%] sm:max-w-[75%] lg:max-w-[80%]">
        <span className={`text-sm truncate font-medium ${isMono ? 'font-mono text-xs bg-muted/40 px-1.5 py-0.5 rounded border border-border/50' : ''} ${className}`}>
          {value}
        </span>
        {isCopyable && (
          <button 
            onClick={handleCopy} 
            className="text-muted-foreground hover:text-foreground shrink-0 focus:outline-none cursor-pointer"
            title="Copy"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-success" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // User detail states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // User delete states
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const fetchUsers = async (search = "", pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?page=${pageNum}&limit=10&search=${search}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchTerm, page);
  }, [page]); // Re-fetch when page changes

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(searchTerm, 1);
  };

  const handleViewDetails = async (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
    setLoadingDetail(true);
    setUserDetail(null);
    try {
      const res = await fetch(`/api/admin/users/${user._id}`);
      const data = await res.json();
      if (data.success) {
        setUserDetail(data.data);
      } else {
        toast.error(data.error || "Failed to fetch user details");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user details");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedUser) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User status updated successfully");
        // Update local list state
        setUsers(users.map(u => u._id === selectedUser._id ? { ...u, status: newStatus } : u));
        // Update current details view status
        if (userDetail) {
          setUserDetail({
            ...userDetail,
            profile: {
              ...userDetail.profile,
              status: newStatus
            }
          });
        }
      } else {
        toast.error(data.error || "Failed to update user status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    setDeletingUserId(user._id);
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User and all associated data deleted successfully");
        setUsers(users.filter(u => u._id !== user._id));
        setDeleteConfirmUser(null);
        setDetailOpen(false);
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success text-white shadow-xs">Active</Badge>;
      case "suspended":
        return <Badge variant="secondary" className="bg-amber-500 text-white shadow-xs">Suspended</Badge>;
      case "banned":
        return <Badge variant="destructive" className="shadow-xs">Banned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Toaster richColors position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage your platform's users, view their status, and points balance.
          </p>
        </div>
      </div>

      <Card className="glass overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearch} className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow 
                    key={user._id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleViewDetails(user)}
                  >
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.country || "N/A"}</TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      {user.currentPoints?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status || 'active')}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          onClick={() => handleViewDetails(user)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirmUser(user)}
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of <span className="font-medium">{pagination.total}</span> users
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1 || loading}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* User Details Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col p-4 sm:p-5 overflow-hidden">
          <DialogHeader className="border-b pb-2.5 shrink-0">
            <DialogTitle className="text-xl font-bold flex flex-wrap items-center gap-2">
              <UserIcon className="h-5 w-5 text-brand" />
              <span>{selectedUser?.fullName || "User Details"}</span>
              {selectedUser && (
                <span className="inline-flex">
                  {getStatusBadge(selectedUser.status)}
                </span>
              )}
            </DialogTitle>
            {selectedUser && (
              <DialogDescription className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="font-medium text-foreground/80">{selectedUser.email}</span>
                <span>•</span>
                <span>{selectedUser.country || "Unknown Country"}</span>
                <span>•</span>
                <span>Joined {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
              </DialogDescription>
            )}
          </DialogHeader>

          {loadingDetail ? (
            <div className="flex-1 flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
          ) : userDetail ? (
            <div className="flex-1 flex flex-col overflow-hidden min-h-0 mt-2">
              <Tabs defaultValue="profile" className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="grid grid-cols-3 w-full shrink-0 h-auto p-1 bg-muted/30">
                  <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 px-1">
                    <span className="hidden sm:inline">Profile & Security</span>
                    <span className="sm:hidden">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="text-xs sm:text-sm py-2 px-1">
                    <span className="hidden sm:inline">Earnings & Activity</span>
                    <span className="sm:hidden">Earnings</span>
                  </TabsTrigger>
                  <TabsTrigger value="redemptions" className="text-xs sm:text-sm py-2 px-1">
                    <span className="hidden sm:inline">Redemptions ({userDetail.history?.redemptions?.length || 0})</span>
                    <span className="sm:hidden">Redeems ({userDetail.history?.redemptions?.length || 0})</span>
                  </TabsTrigger>
                </TabsList>

                {/* Profile & Security Tab */}
                <TabsContent value="profile" className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1 min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Account Demographics */}
                    <Card className="p-4 sm:p-5 border bg-muted/5 rounded-2xl space-y-3 sm:space-y-3.5">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <UserIcon className="h-4.5 w-4.5 text-brand" />
                        <h3 className="font-bold text-sm tracking-wide text-ink">Account Demographics</h3>
                      </div>
                      <div className="space-y-1">
                        <DetailRow icon={UserIcon} label="Full Name" value={userDetail.profile.fullName} />
                        <DetailRow icon={Mail} label="Email Address" value={userDetail.profile.email} isCopyable />
                        <DetailRow icon={Fingerprint} label="Clerk Account ID" value={userDetail.profile.clerkId} isMono isCopyable />
                        <DetailRow icon={Calendar} label="Join Timestamp" value={new Date(userDetail.profile.createdAt).toLocaleString()} />
                        <DetailRow icon={Globe} label="User Country" value={userDetail.profile.country || "Unknown"} />
                      </div>
                    </Card>

                    {/* Security & Controls */}
                    <Card className="p-4 sm:p-5 border bg-muted/5 rounded-2xl space-y-3 sm:space-y-3.5">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Shield className="h-4.5 w-4.5 text-amber-500" />
                        <h3 className="font-bold text-sm tracking-wide text-ink">Security & Controls</h3>
                      </div>
                      <div className="space-y-1">
                        {/* Interactive Status Selector */}
                        <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0 hover:bg-muted/10 px-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Portal Status</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <NativeSelect 
                              value={userDetail.profile.status || "active"} 
                              onChange={(e) => handleStatusChange(e.target.value)}
                              disabled={updatingStatus}
                              size="sm"
                              className="w-[120px]"
                            >
                              <NativeSelectOption value="active">Active</NativeSelectOption>
                              <NativeSelectOption value="suspended">Suspended</NativeSelectOption>
                              <NativeSelectOption value="banned">Banned</NativeSelectOption>
                            </NativeSelect>
                            {updatingStatus && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                          </div>
                        </div>

                        {/* VPN Status */}
                        <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0 hover:bg-muted/10 px-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">VPN Connection</span>
                          </div>
                          <span>
                            {userDetail.profile.vpnDetected ? (
                              <Badge variant="destructive" className="text-[10px] font-bold px-2 py-0.5 shadow-xs">VPN ACTIVE</Badge>
                            ) : (
                              <Badge variant="default" className="bg-success text-white text-[10px] font-bold px-2 py-0.5 shadow-xs">SECURE</Badge>
                            )}
                          </span>
                        </div>

                        <DetailRow icon={Globe} label="Last Login IP" value={userDetail.profile.lastLoginIp || "N/A"} isMono isCopyable={!!userDetail.profile.lastLoginIp} />
                        <DetailRow icon={UserIcon} label="Account Role" value={userDetail.profile.role || "user"} className="capitalize font-semibold text-brand" />
                      </div>
                    </Card>
                  </div>

                  {/* Platform & Preferences */}
                  <Card className="p-4 sm:p-5 border bg-muted/5 rounded-2xl space-y-3 sm:space-y-3.5">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Fingerprint className="h-4.5 w-4.5 text-blue-500" />
                      <h3 className="font-bold text-sm tracking-wide text-ink">Platform & Referral Preferences</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                      <DetailRow icon={Coins} label="Referral Code" value={userDetail.profile.referralCode || "None"} isMono isCopyable={!!userDetail.profile.referralCode} />
                      <DetailRow icon={UserIcon} label="Referred By" value={userDetail.profile.referredBy || "Organic Sign Up"} />
                      <DetailRow icon={Check} label="Is Email Verified" value={userDetail.profile.isEmailVerified ? "Verified" : "Unverified"} className={userDetail.profile.isEmailVerified ? "text-success" : "text-destructive"} />
                      <DetailRow icon={Coins} label="Preferences" value={`Dark Mode: ${userDetail.profile.preferences?.darkMode !== false ? 'On' : 'Off'}`} />
                    </div>
                  </Card>
                </TabsContent>

                {/* Earnings & Activity Tab */}
                <TabsContent value="earnings" className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1 min-h-0">
                  
                  {/* Compact Earning Statistics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
                    <Card className="border bg-gradient-to-b from-brand/5 to-transparent rounded-xl shadow-xs">
                      <div className="p-3 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Current Balance</p>
                          <Coins className="h-3.5 w-3.5 text-brand" />
                        </div>
                        <p className="text-xl font-bold font-sharp text-brand mt-0.5">
                          {(userDetail.profile.currentPoints || 0).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                    <Card className="border bg-gradient-to-b from-success/5 to-transparent rounded-xl shadow-xs">
                      <div className="p-3 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Lifetime Earned</p>
                          <TrendingUp className="h-3.5 w-3.5 text-success" />
                        </div>
                        <p className="text-xl font-bold font-sharp text-success mt-0.5">
                          {(userDetail.profile.lifetimeEarnings || 0).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                    <Card className="border bg-gradient-to-b from-amber-500/5 to-transparent rounded-xl shadow-xs">
                      <div className="p-3 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Pending Points</p>
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                        </div>
                        <p className="text-xl font-bold font-sharp text-amber-500 mt-0.5">
                          {(userDetail.profile.pendingPoints || 0).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                    <Card className="border bg-gradient-to-b from-indigo-500/5 to-transparent rounded-xl shadow-xs">
                      <div className="p-3 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Surveys Done</p>
                          <ClipboardCheck className="h-3.5 w-3.5 text-indigo-500" />
                        </div>
                        <p className="text-xl font-bold font-sharp text-indigo-500 mt-0.5">
                          {userDetail.profile.surveysCompleted || 0}
                        </p>
                      </div>
                    </Card>
                  </div>

                  <h3 className="font-semibold text-sm flex items-center gap-1.5 shrink-0">
                    <History className="h-4 w-4 text-muted-foreground" />
                    Points Ledger History
                  </h3>
                  
                  <div className="border rounded-2xl bg-muted/5 overflow-hidden">
                    <Table>
                      <TableHeader className="sticky top-0 bg-background z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
                        <TableRow>
                          <TableHead className="font-semibold">Category</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                          <TableHead className="font-semibold">Amount</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!userDetail.history?.transactions || userDetail.history.transactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                              No transaction logs found for this user.
                            </TableCell>
                          </TableRow>
                        ) : (
                          userDetail.history.transactions.map((tx: any) => (
                            <TableRow key={tx._id} className="hover:bg-muted/10">
                              <TableCell className="capitalize font-semibold text-xs whitespace-nowrap">
                                {tx.category?.replace(/_/g, " ")}
                              </TableCell>
                              <TableCell className="max-w-[200px] truncate" title={tx.description}>
                                {tx.description || "No description"}
                              </TableCell>
                              <TableCell className={`font-medium whitespace-nowrap ${tx.type === "credit" ? "text-success font-semibold" : "text-destructive font-semibold"}`}>
                                {tx.type === "credit" ? "+" : "-"}{tx.amount?.toLocaleString()} PTS
                              </TableCell>
                              <TableCell className="capitalize text-xs">
                                <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="shadow-xs text-[10px]">
                                  {tx.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                {new Date(tx.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* Redemptions Tab */}
                <TabsContent value="redemptions" className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1 min-h-0">
                  <h3 className="font-semibold text-sm flex items-center gap-1.5 shrink-0">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Cashout Redemptions Ledger
                  </h3>
                  
                  <div className="border rounded-2xl bg-muted/5 overflow-hidden">
                    <Table>
                      <TableHeader className="sticky top-0 bg-background z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
                        <TableRow>
                          <TableHead className="font-semibold">Requested Brand</TableHead>
                          <TableHead className="font-semibold">USD Amount</TableHead>
                          <TableHead className="font-semibold">Points Cost</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!userDetail.history?.redemptions || userDetail.history.redemptions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                              No redemption requests logged.
                            </TableCell>
                          </TableRow>
                        ) : (
                          userDetail.history.redemptions.map((red: any) => (
                            <TableRow key={red._id} className="hover:bg-muted/10">
                              <TableCell className="font-bold">{red.requestedBrand}</TableCell>
                              <TableCell className="font-semibold text-ink">${red.usdAmount}</TableCell>
                              <TableCell className="font-sharp font-semibold text-brand whitespace-nowrap">
                                {red.pointsDeducted?.toLocaleString()} PTS
                              </TableCell>
                              <TableCell className="capitalize">
                                <Badge 
                                  variant={
                                    red.status === "completed" || red.status === "approved" 
                                      ? "default" 
                                      : red.status === "pending" 
                                      ? "secondary" 
                                      : "destructive"
                                  }
                                  className="shadow-xs text-[10px]"
                                >
                                  {red.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                {new Date(red.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-16">
              Failed to load user details.
            </div>
          )}

          <DialogFooter className="border-t pt-4 shrink-0 flex flex-row justify-between items-center mt-4">
            {selectedUser && (
              <Button 
                variant="destructive"
                className="gap-1.5 shadow-sm"
                onClick={() => setDeleteConfirmUser(selectedUser)}
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            )}
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Close Panel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmUser} onOpenChange={(open) => !open && setDeleteConfirmUser(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Confirm User Deletion
            </DialogTitle>
            <DialogDescription className="mt-2 text-zinc-400">
              Are you absolutely sure you want to delete <strong className="text-white">{deleteConfirmUser?.fullName}</strong> ({deleteConfirmUser?.email})?
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 text-sm text-muted-foreground bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-1">
            <p className="font-semibold text-destructive">⚠️ WARNING: Critical & Permanent Action</p>
            <ul className="list-disc list-inside text-xs space-y-0.5">
              <li>Attempts to permanently remove the user from Clerk Authentication.</li>
              <li>Deletes the user profile completely from MongoDB.</li>
              <li>Purges all transaction logs, points, and redemption requests.</li>
              <li>This action is permanent and cannot be undone.</li>
            </ul>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmUser(null)}
              disabled={deletingUserId !== null}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmUser && handleDeleteUser(deleteConfirmUser)}
              disabled={deletingUserId !== null}
              className="gap-1.5"
            >
              {deletingUserId ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Confirm Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
