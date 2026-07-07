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
import { Plus, Loader2, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Game {
  _id: string;
  title: string;
  description: string;
  provider: string;
  rewardPoints: number;
  status: string;
  thumbnailUrl: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    provider: "",
    rewardPoints: "",
    thumbnailUrl: "",
    trackingUrl: "",
    status: "active",
  });

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/games");
      const data = await res.json();
      if (data.success) {
        setGames(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch games", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rewardPoints: Number(formData.rewardPoints),
          deviceCompatibility: ["ios", "android", "desktop"], // default for now
        }),
      });

      if (res.ok) {
        setIsDialogOpen(false);
        setFormData({
          title: "",
          description: "",
          provider: "",
          rewardPoints: "",
          thumbnailUrl: "",
          trackingUrl: "",
          status: "active",
        });
        fetchGames(); // Refresh the list
      }
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Games</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your game offerings and their rewards.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-white hover:bg-brand-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Game</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new game to the platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateGame} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Input
                    id="provider"
                    required
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rewardPoints">Reward Points</Label>
                  <Input
                    id="rewardPoints"
                    type="number"
                    required
                    value={formData.rewardPoints}
                    onChange={(e) => setFormData({ ...formData, rewardPoints: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  type="url"
                  required
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackingUrl">Tracking URL</Label>
                <Input
                  id="trackingUrl"
                  type="url"
                  required
                  value={formData.trackingUrl}
                  onChange={(e) => setFormData({ ...formData, trackingUrl: e.target.value })}
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating} className="bg-brand text-white hover:bg-brand-dark">
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Game"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : games.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No games found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                games.map((game) => (
                  <TableRow key={game._id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {game.thumbnailUrl ? (
                          <img src={game.thumbnailUrl} alt={game.title} className="h-full w-full object-cover" />
                        ) : (
                          <Gamepad2 className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{game.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{game.description}</div>
                    </TableCell>
                    <TableCell>{game.provider}</TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      {game.rewardPoints?.toLocaleString() || 0} pts
                    </TableCell>
                    <TableCell>
                      <Badge variant={game.status === 'active' ? 'default' : 'secondary'} className={game.status === 'active' ? 'bg-success text-white' : ''}>
                        {game.status}
                      </Badge>
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
