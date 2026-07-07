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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Gift, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  // Card list and delete states
  const [selectedInventory, setSelectedInventory] = useState<{ brand: string; usdAmount: number } | null>(null);
  const [cardsList, setCardsList] = useState<any[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  const fetchCards = async (brand: string, usdAmount: number) => {
    setLoadingCards(true);
    try {
      const res = await fetch(`/api/admin/gift-cards/list?brand=${encodeURIComponent(brand)}&usdAmount=${usdAmount}`);
      const data = await res.json();
      if (data.success) {
        setCardsList(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch cards list", error);
    } finally {
      setLoadingCards(false);
    }
  };

  const handleOpenCardsList = (brand: string, usdAmount: number) => {
    setSelectedInventory({ brand, usdAmount });
    fetchCards(brand, usdAmount);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this gift card?")) return;
    setDeletingCardId(cardId);
    try {
      const res = await fetch(`/api/admin/gift-cards/${cardId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Gift card deleted successfully");
        setCardsList((prev) => prev.filter((card) => card._id !== cardId));
        fetchInventory();
      } else {
        toast.error(data.error || "Failed to delete gift card");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete gift card");
    } finally {
      setDeletingCardId(null);
    }
  };

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
    if (!singleCard.brand) {
      toast.error("Please select a brand");
      return;
    }
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Gift Cards</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your gift card inventory. Click on any inventory row to view and delete individual card codes.
          </p>
        </div>
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
                    <TableRow 
                      key={idx} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleOpenCardsList(item.brand, item.usdAmount)}
                    >
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
                      <Select 
                        value={singleCard.brand} 
                        onValueChange={(val) => setSingleCard({ ...singleCard, brand: val })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Amazon">Amazon</SelectItem>
                          <SelectItem value="Google Play">Google Play</SelectItem>
                          <SelectItem value="Apple">Apple</SelectItem>
                          <SelectItem value="Steam">Steam</SelectItem>
                          <SelectItem value="Flipkart">Flipkart</SelectItem>
                        </SelectContent>
                      </Select>
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

      <Dialog open={!!selectedInventory} onOpenChange={(open) => { if (!open) setSelectedInventory(null); }}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {selectedInventory?.brand} - ${selectedInventory?.usdAmount} Gift Cards
            </DialogTitle>
            <DialogDescription>
              View and manage individual codes for this brand and value.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-1 my-4 space-y-3">
            {loadingCards ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : cardsList.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No active gift cards for this denomination.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {cardsList.map((card) => (
                  <div key={card._id} className="flex justify-between items-center py-3">
                    <div className="space-y-1">
                      <div className="font-mono text-sm font-semibold tracking-wider text-foreground">
                        Code: {card.code}
                      </div>
                      {card.pin && (
                        <div className="font-mono text-xs text-muted-foreground">
                          PIN: {card.pin}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground/80">
                        Added: {new Date(card.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCard(card._id)}
                      disabled={deletingCardId === card._id}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      {deletingCardId === card._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
