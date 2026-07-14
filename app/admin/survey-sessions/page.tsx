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
import { Loader2, Activity, Copy, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserPopulated {
  _id: string;
  fullName: string;
  email: string;
}

interface SurveyPopulated {
  _id: string;
  title: string;
  provider: string;
}

interface SurveySession {
  _id: string;
  user?: UserPopulated;
  survey?: SurveyPopulated;
  sessionId: string;
  supplierName: string;
  status: string;
  potentialReward: number;
  ipAddress?: string;
  createdAt: string;
  completedAt?: string;
}

export default function SurveySessionsPage() {
  const [sessions, setSessions] = useState<SurveySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/survey-sessions");
      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch survey sessions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white">Completed</Badge>;
      case 'redirected':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Redirected</Badge>;
      case 'screened_out':
        return <Badge variant="outline" className="border-zinc-300 text-zinc-500">Screened Out</Badge>;
      case 'quota_full':
        return <Badge variant="outline" className="border-amber-300 text-amber-600">Quota Full</Badge>;
      case 'security_failure':
      case 'screener_failed':
        return <Badge variant="destructive">Security / Failed</Badge>;
      case 'abandoned':
        return <Badge variant="secondary" className="bg-zinc-100 text-zinc-500">Abandoned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
            <Activity className="h-6 w-6 text-brand" />
            Survey Sessions
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor real-time survey attempts and S2S callback statuses.
          </p>
        </div>
        <Button variant="outline" onClick={fetchSessions} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Refresh"}
        </Button>
      </div>

      <Card className="glass overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Survey</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No survey sessions found.
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow key={session._id}>
                    <TableCell>
                      <div className="font-medium text-sm">{session.user?.fullName || 'Unknown User'}</div>
                      <div className="text-xs text-muted-foreground">{session.user?.email || 'N/A'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm max-w-[200px] truncate" title={session.survey?.title}>
                        {session.survey?.title || 'Unknown Survey'}
                      </div>
                      <div className="text-xs text-brand font-semibold">{session.supplierName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs font-mono bg-zinc-50 px-2 py-1 rounded w-fit border border-zinc-100">
                        <span className="truncate w-24" title={session.sessionId}>
                          {session.sessionId.substring(0, 12)}...
                        </span>
                        <button 
                          onClick={() => copyToClipboard(session.sessionId)}
                          className="text-zinc-400 hover:text-zinc-700 transition-colors"
                          title="Copy full Session ID"
                        >
                          {copiedId === session.sessionId ? (
                            <CheckCircle className="h-3.5 w-3.5 text-success" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="font-sharp font-semibold text-brand text-sm">
                      {session.potentialReward?.toLocaleString() || 0} pts
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(session.status)}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      <div>{new Date(session.createdAt).toLocaleDateString()}</div>
                      <div>{new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
