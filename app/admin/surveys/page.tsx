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
import { Plus, Loader2, ClipboardList } from "lucide-react";
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

interface Survey {
  _id: string;
  title: string;
  provider: string;
  rewardPoints: number;
  estimatedTimeMins: number;
  status: string;
}

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    rewardPoints: "",
    estimatedTimeMins: "",
    urlOrApiEndpoint: "",
    status: "active",
  });

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/surveys");
      const data = await res.json();
      if (data.success) {
        setSurveys(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch surveys", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleCreateSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rewardPoints: Number(formData.rewardPoints),
          estimatedTimeMins: Number(formData.estimatedTimeMins),
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile", "ios", "android"], 
        }),
      });

      if (res.ok) {
        setIsDialogOpen(false);
        setFormData({
          title: "",
          provider: "",
          rewardPoints: "",
          estimatedTimeMins: "",
          urlOrApiEndpoint: "",
          status: "active",
        });
        fetchSurveys(); 
      }
    } catch (error) {
      console.error("Error creating survey:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Surveys</h1>
          <p className="text-muted-foreground mt-1">
            Manage available surveys and their reward points.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-white hover:bg-brand-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Survey</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new survey to the platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSurvey} className="space-y-4 pt-4">
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
                <Label htmlFor="provider">Provider (e.g. BitLabs)</Label>
                <Input
                  id="provider"
                  required
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="estimatedTimeMins">Est. Time (Mins)</Label>
                  <Input
                    id="estimatedTimeMins"
                    type="number"
                    required
                    value={formData.estimatedTimeMins}
                    onChange={(e) => setFormData({ ...formData, estimatedTimeMins: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urlOrApiEndpoint">URL / API Endpoint</Label>
                <Input
                  id="urlOrApiEndpoint"
                  type="url"
                  required
                  value={formData.urlOrApiEndpoint}
                  onChange={(e) => setFormData({ ...formData, urlOrApiEndpoint: e.target.value })}
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating} className="bg-brand text-white hover:bg-brand-dark">
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Survey"}
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
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Est. Time</TableHead>
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
              ) : surveys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No surveys found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                surveys.map((survey) => (
                  <TableRow key={survey._id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-brand" />
                      {survey.title}
                    </TableCell>
                    <TableCell>{survey.provider}</TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      {survey.rewardPoints?.toLocaleString() || 0} pts
                    </TableCell>
                    <TableCell>{survey.estimatedTimeMins} mins</TableCell>
                    <TableCell>
                      <Badge variant={survey.status === 'active' ? 'default' : 'secondary'} className={survey.status === 'active' ? 'bg-success text-white' : ''}>
                        {survey.status}
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
