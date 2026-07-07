"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Download, Loader2, Table } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (format: "csv" | "xlsx" | "pdf") => {
    setDownloading(format);
    try {
      const response = await fetch(`/api/admin/reports/export?format=${format}`);
      
      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      // Get the filename from the Content-Disposition header if available
      const disposition = response.headers.get('Content-Disposition');
      let filename = `report.${format}`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Convert the response to a blob and download it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Successfully downloaded ${format.toUpperCase()} report`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to download ${format.toUpperCase()} report`);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Platform Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Export and analyze platform performance, redemptions, and payouts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass shadow-sm">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-100">
              <Table className="w-5 h-5" />
            </div>
            <CardTitle>Brand Performance</CardTitle>
            <CardDescription>
              A comprehensive breakdown of all completed redemptions grouped by gift card brand. Includes total payout value in USD and Evo Points burned.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-between hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
              onClick={() => handleDownload("xlsx")}
              disabled={downloading !== null}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export as Excel (.xlsx)</span>
              </div>
              {downloading === "xlsx" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-muted-foreground" />}
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-between hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200"
              onClick={() => handleDownload("csv")}
              disabled={downloading !== null}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Export as CSV (.csv)</span>
              </div>
              {downloading === "csv" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-muted-foreground" />}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
              onClick={() => handleDownload("pdf")}
              disabled={downloading !== null}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Export as PDF (.pdf)</span>
              </div>
              {downloading === "pdf" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-muted-foreground" />}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
