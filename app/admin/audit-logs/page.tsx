"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  User as UserIcon, 
  Coins, 
  Ticket, 
  Ban, 
  Activity, 
  Info,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuditLog {
  _id: string;
  adminId?: {
    _id: string;
    fullName: string;
    email: string;
  };
  action: string;
  targetEntityId?: string;
  targetEntityType?: string;
  details?: Record<string, any>;
  createdAt: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports/audit-logs?page=${page}&limit=20`);
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "REDEMPTION_APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "REDEMPTION_REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "MANUAL_POINTS_CREDIT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "USER_BANNED":
      case "USER_SUSPENDED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "REDEMPTION_APPROVED":
        return <CheckIcon className="w-3.5 h-3.5 mr-1" />;
      case "REDEMPTION_REJECTED":
        return <Ban className="w-3.5 h-3.5 mr-1" />;
      case "MANUAL_POINTS_CREDIT":
        return <Coins className="w-3.5 h-3.5 mr-1" />;
      case "USER_BANNED":
      case "USER_SUSPENDED":
        return <Ban className="w-3.5 h-3.5 mr-1" />;
      default:
        return <Activity className="w-3.5 h-3.5 mr-1" />;
    }
  };

  // Helper icons
  function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  // Frontend filter
  const filteredLogs = logs.filter((log) => {
    const adminMatch = 
      !search.trim() ||
      log.adminId?.fullName.toLowerCase().includes(search.toLowerCase()) ||
      log.adminId?.email.toLowerCase().includes(search.toLowerCase()) ||
      log.targetEntityId?.includes(search) ||
      (log.details && JSON.stringify(log.details).toLowerCase().includes(search.toLowerCase()));

    const actionMatch = 
      actionFilter === "all" || 
      log.action === actionFilter;

    return adminMatch && actionMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
          
          <span>Admin Audit Logs</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review a complete history of administrative operations, balance adjustments, and platform actions.
        </p>
      </div>

      {/* Filters Card */}
      <Card className="glass border-zinc-200">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 w-full sm:w-auto items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-zinc-500 shrink-0" />
            <Input
              placeholder="Search by Admin name, email, target ID or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm w-full outline-none"
            />
          </div>

          <div className="flex w-full sm:w-auto gap-3 items-center">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg px-3 py-2 text-sm font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-48 shadow-sm"
            >
              <option value="all">All Actions</option>
              <option value="REDEMPTION_APPROVED">Redemption Approved</option>
              <option value="REDEMPTION_REJECTED">Redemption Rejected</option>
              <option value="MANUAL_POINTS_CREDIT">Points Adjusted</option>
              <option value="USER_BANNED">User Banned</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table Card */}
      <Card className="glass border-zinc-200 overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground flex flex-col items-center justify-center">
              <Activity className="w-12 h-12 text-zinc-300 mb-2" />
              <p className="font-bold text-zinc-700">No logs found</p>
              <p className="text-xs">Adjust your search query or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 bg-zinc-50/50 hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Date & Time</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Admin</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Action</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Target Entity</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    // Extract a clean description text from details snapshot
                    let desc = "Processed operation";
                    if (log.action === "MANUAL_POINTS_CREDIT") {
                      desc = `Manually adjusted balance by ${log.details?.pointsAmount > 0 ? "+" : ""}${log.details?.pointsAmount?.toLocaleString()} pts`;
                    } else if (log.action === "REDEMPTION_APPROVED") {
                      desc = `Approved $${log.details?.usdAmount} ${log.details?.requestedBrand} card`;
                    } else if (log.action === "REDEMPTION_REJECTED") {
                      desc = `Rejected $${log.details?.usdAmount} ${log.details?.requestedBrand} card`;
                    }

                    return (
                      <TableRow key={log._id} className="border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                        <TableCell className="text-xs font-medium text-zinc-500 whitespace-nowrap">
                          {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="font-semibold text-xs text-zinc-900">
                          {log.adminId ? (
                            <div>
                              <p className="font-bold text-zinc-800">{log.adminId.fullName}</p>
                              <p className="text-[10px] text-zinc-400 font-medium">{log.adminId.email}</p>
                            </div>
                          ) : (
                            <span className="text-zinc-400 font-medium">System Auto</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] font-bold uppercase tracking-wider flex items-center w-fit px-2 py-0.5 ${getActionBadgeColor(log.action)}`}
                          >
                            {getActionIcon(log.action)}
                            <span>{log.action.replace(/_/g, " ")}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                          {log.targetEntityType && (
                            <div className="space-y-0.5">
                              <span className="bg-zinc-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-zinc-600 border border-zinc-200">
                                {log.targetEntityType}
                              </span>
                              <p className="text-[9px] text-zinc-400 mt-1 select-all">{log.targetEntityId}</p>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-zinc-700 max-w-xs truncate">
                          {desc}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            <Info className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="border-zinc-200 font-semibold text-zinc-700 text-xs shadow-sm bg-white hover:bg-zinc-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="text-xs font-bold text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="border-zinc-200 font-semibold text-zinc-700 text-xs shadow-sm bg-white hover:bg-zinc-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Log Details Modal */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="sm:max-w-md bg-white border-zinc-200">
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span>Audit Event Snapshot</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  Detailed JSON context and snapshot details for Event ID: {selectedLog._id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Event Summary Grid */}
                <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs font-medium">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Timestamp</p>
                    <p className="text-zinc-800">{new Date(selectedLog.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Operation Type</p>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border ${getActionBadgeColor(selectedLog.action)}`}>
                      {selectedLog.action}
                    </span>
                  </div>
                  <div className="space-y-1 col-span-2 border-t pt-2 border-zinc-200">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Admin</p>
                    <p className="text-zinc-800">{selectedLog.adminId ? `${selectedLog.adminId.fullName} (${selectedLog.adminId.email})` : "System / Automated Job"}</p>
                  </div>
                  {selectedLog.targetEntityId && (
                    <div className="space-y-1 col-span-2 border-t pt-2 border-zinc-200">
                      <p className="text-[10px] uppercase font-bold text-zinc-400">Target Entity ({selectedLog.targetEntityType})</p>
                      <p className="font-mono text-zinc-600 select-all">{selectedLog.targetEntityId}</p>
                    </div>
                  )}
                </div>

                {/* Raw Details JSON block */}
                {selectedLog.details && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Detailed Snapshot Fields</p>
                    <pre className="bg-zinc-900 text-cyan-400 font-mono text-[11px] p-4 rounded-xl overflow-x-auto max-h-60 shadow-inner select-all">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setSelectedLog(null)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-xs px-4"
                >
                  Close Snapshot
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
