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
import { Upload, Loader2, Gift, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

interface InventoryStat {
  brand: string;
  usdAmount: number;
  availableCount: number;
  status: string;
}

export default function GiftCardsPage() {
  const [inventory, setInventory] = useState<InventoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Single Card form
  const [singleCard, setSingleCard] = useState({
    brand: "",
    usdAmount: "",
    code: "",
    pin: "",
  });
  const [isAddingSingle, setIsAddingSingle] = useState(false);

  // Bulk JSON
  const [bulkJson, setBulkJson] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gift-cards/inventory");
      const data = await res.json();
      if (data.success) {
        setInventory(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingSingle(true);
    try {
      const payload = {
        cards: [
          {
            brand: singleCard.brand,
            usdAmount: Number(singleCard.usdAmount),
            code: singleCard.code,
            pin: singleCard.pin || undefined,
          }
        ]
      };
      
      const res = await fetch("/api/admin/gift-cards/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Gift card added successfully");
        setSingleCard({ brand: "", usdAmount: "", code: "", pin: "" });
        fetchInventory();
      } else {
        toast.error(data.error || "Failed to add gift card");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to add gift card");
    } finally {
      setIsAddingSingle(false);
    }
  };

  const handleBulkUpload = async () => {
    try {
      setUploadMessage("");
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) {
        setUploadMessage("Error: Input must be a JSON array of objects.");
        toast.error("Input must be a JSON array of objects.");
        return;
      }
      
      setIsUploading(true);
      const res = await fetch("/api/admin/gift-cards/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards: parsed }),
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Gift cards uploaded successfully");
        setUploadMessage(`Success: ${data.message}`);
        setBulkJson("");
        fetchInventory();
      } else {
        toast.error(data.error || "Failed to upload gift cards");
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch (error: any) {
      toast.error("Invalid JSON format.");
      setUploadMessage("Error: Invalid JSON format.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster richColors position="top-right" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Gift Cards</h1>
        <p className="text-muted-foreground mt-1">
          Manage your gift card inventory and upload new codes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass flex flex-col">
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Amount (USD)</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : inventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No gift cards in inventory.
                    </TableCell>
                  </TableRow>
                ) : (
                  inventory.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Gift className="h-4 w-4 text-brand" />
                        {item.brand}
                      </TableCell>
                      <TableCell>${item.usdAmount}</TableCell>
                      <TableCell className="font-sharp font-semibold">{item.availableCount}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Healthy' ? 'default' : 'destructive'} className={item.status === 'Healthy' ? 'bg-success text-white' : ''}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Add Gift Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk (JSON)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single" className="space-y-4 pt-4">
                  <form onSubmit={handleAddSingle} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Brand</Label>
                      <Input required placeholder="e.g. Amazon" value={singleCard.brand} onChange={(e) => setSingleCard({...singleCard, brand: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount (USD)</Label>
                      <Input type="number" required placeholder="e.g. 10" value={singleCard.usdAmount} onChange={(e) => setSingleCard({...singleCard, usdAmount: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Code</Label>
                      <Input required placeholder="XXXX-XXXX-XXXX" value={singleCard.code} onChange={(e) => setSingleCard({...singleCard, code: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>PIN (Optional)</Label>
                      <Input placeholder="1234" value={singleCard.pin} onChange={(e) => setSingleCard({...singleCard, pin: e.target.value})} />
                    </div>
                    <Button type="submit" disabled={isAddingSingle} className="w-full bg-brand text-white hover:bg-brand-dark">
                      {isAddingSingle ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                      Add Card
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="bulk" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>JSON Array of Cards</Label>
                    <Textarea 
                      placeholder={`[\n  {\n    "brand": "Amazon",\n    "usdAmount": 10,\n    "code": "XYZ123"\n  }\n]`}
                      className="font-mono text-xs min-h-[200px]"
                      value={bulkJson}
                      onChange={(e) => setBulkJson(e.target.value)}
                    />
                  </div>
                  {uploadMessage && (
                    <div className={`text-sm ${uploadMessage.startsWith('Error') ? 'text-destructive' : 'text-success'}`}>
                      {uploadMessage}
                    </div>
                  )}
                  <Button onClick={handleBulkUpload} disabled={isUploading || !bulkJson} className="w-full bg-brand text-white hover:bg-brand-dark">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                    Bulk Upload
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
