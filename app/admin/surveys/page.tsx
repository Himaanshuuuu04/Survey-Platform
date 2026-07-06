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
import { Plus, Loader2, ClipboardList, Pencil, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

interface Survey {
  _id: string;
  title: string;
  provider: string;
  rewardPoints: number;
  estimatedTimeMins: number;
  urlOrApiEndpoint?: string;
  status: string;
  questions?: Array<{
    questionText: string;
    options: string[];
  }>;
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
    q1Text: "",
    q1Options: "",
    q2Text: "",
    q2Options: "",
    q3Text: "",
    q3Options: "",
  });

  // Edit & Delete States
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    provider: "",
    rewardPoints: "",
    estimatedTimeMins: "",
    urlOrApiEndpoint: "",
    status: "active",
    q1Text: "",
    q1Options: "",
    q2Text: "",
    q2Options: "",
    q3Text: "",
    q3Options: "",
  });

  const [deleteConfirmSurvey, setDeleteConfirmSurvey] = useState<Survey | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (survey: Survey) => {
    setEditingSurvey(survey);
    setEditFormData({
      title: survey.title,
      provider: survey.provider,
      rewardPoints: String(survey.rewardPoints),
      estimatedTimeMins: String(survey.estimatedTimeMins),
      urlOrApiEndpoint: survey.urlOrApiEndpoint || "",
      status: survey.status,
      q1Text: survey.questions?.[0]?.questionText || "",
      q1Options: survey.questions?.[0]?.options?.join(", ") || "",
      q2Text: survey.questions?.[1]?.questionText || "",
      q2Options: survey.questions?.[1]?.options?.join(", ") || "",
      q3Text: survey.questions?.[2]?.questionText || "",
      q3Options: survey.questions?.[2]?.options?.join(", ") || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdateSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSurvey) return;
    setIsUpdating(true);

    const questions = [];
    if (editFormData.q1Text && editFormData.q1Options) {
      questions.push({
        questionText: editFormData.q1Text,
        options: editFormData.q1Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }
    if (editFormData.q2Text && editFormData.q2Options) {
      questions.push({
        questionText: editFormData.q2Text,
        options: editFormData.q2Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }
    if (editFormData.q3Text && editFormData.q3Options) {
      questions.push({
        questionText: editFormData.q3Text,
        options: editFormData.q3Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }

    try {
      const res = await fetch(`/api/admin/surveys/${editingSurvey._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editFormData.title,
          provider: editFormData.provider,
          rewardPoints: Number(editFormData.rewardPoints),
          estimatedTimeMins: Number(editFormData.estimatedTimeMins),
          urlOrApiEndpoint: editFormData.urlOrApiEndpoint,
          status: editFormData.status,
          questions
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Survey updated successfully");
        setIsEditOpen(false);
        setEditingSurvey(null);
        fetchSurveys();
      } else {
        toast.error(data.error || "Failed to update survey");
      }
    } catch (error: any) {
      console.error("Error updating survey:", error);
      toast.error(error.message || "Failed to update survey");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSurvey = async () => {
    if (!deleteConfirmSurvey) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/surveys/${deleteConfirmSurvey._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Survey deleted successfully");
        setDeleteConfirmSurvey(null);
        fetchSurveys();
      } else {
        toast.error(data.error || "Failed to delete survey");
      }
    } catch (error: any) {
      console.error("Error deleting survey:", error);
      toast.error(error.message || "Failed to delete survey");
    } finally {
      setIsDeleting(false);
    }
  };

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

    const questions = [];
    if (formData.q1Text && formData.q1Options) {
      questions.push({
        questionText: formData.q1Text,
        options: formData.q1Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }
    if (formData.q2Text && formData.q2Options) {
      questions.push({
        questionText: formData.q2Text,
        options: formData.q2Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }
    if (formData.q3Text && formData.q3Options) {
      questions.push({
        questionText: formData.q3Text,
        options: formData.q3Options.split(",").map(o => o.trim()).filter(Boolean)
      });
    }

    try {
      const res = await fetch("/api/admin/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          provider: formData.provider,
          rewardPoints: Number(formData.rewardPoints),
          estimatedTimeMins: Number(formData.estimatedTimeMins),
          urlOrApiEndpoint: formData.urlOrApiEndpoint,
          status: formData.status,
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile", "ios", "android"], 
          questions
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Survey created successfully");
        setIsDialogOpen(false);
        setFormData({
          title: "",
          provider: "",
          rewardPoints: "",
          estimatedTimeMins: "",
          urlOrApiEndpoint: "",
          status: "active",
          q1Text: "",
          q1Options: "",
          q2Text: "",
          q2Options: "",
          q3Text: "",
          q3Options: "",
        });
        fetchSurveys(); 
      } else {
        toast.error(data.error || "Failed to create survey");
      }
    } catch (error: any) {
      console.error("Error creating survey:", error);
      toast.error(error.message || "Failed to create survey");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster richColors position="top-right" />
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
          <DialogContent className="sm:max-w-[450px] max-h-[85vh] overflow-y-auto">
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

              <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom Questions (Optional)</h4>
                
                <div className="space-y-2">
                  <Label>Question 1</Label>
                  <Input
                    placeholder="Question Text (e.g. How often do you buy gadgets?)"
                    value={formData.q1Text}
                    onChange={(e) => setFormData({ ...formData, q1Text: e.target.value })}
                  />
                  <Input
                    placeholder="Options (comma-separated, e.g. Daily, Weekly, Monthly)"
                    value={formData.q1Options}
                    onChange={(e) => setFormData({ ...formData, q1Options: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question 2</Label>
                  <Input
                    placeholder="Question Text (e.g. Which platform do you prefer?)"
                    value={formData.q2Text}
                    onChange={(e) => setFormData({ ...formData, q2Text: e.target.value })}
                  />
                  <Input
                    placeholder="Options (comma-separated, e.g. Amazon, Apple, Google)"
                    value={formData.q2Options}
                    onChange={(e) => setFormData({ ...formData, q2Options: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question 3</Label>
                  <Input
                    placeholder="Question Text (e.g. Rate your experience from 1 to 5)"
                    value={formData.q3Text}
                    onChange={(e) => setFormData({ ...formData, q3Text: e.target.value })}
                  />
                  <Input
                    placeholder="Options (comma-separated, e.g. 1, 2, 3, 4, 5)"
                    value={formData.q3Options}
                    onChange={(e) => setFormData({ ...formData, q3Options: e.target.value })}
                  />
                </div>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : surveys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          onClick={() => handleEditClick(survey)}
                          title="Edit Survey"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirmSurvey(survey)}
                          title="Delete Survey"
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
      </Card>

      {/* Edit Survey Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[450px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Survey</DialogTitle>
            <DialogDescription>
              Modify the survey details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSurvey} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                required
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-provider">Provider</Label>
              <Input
                id="edit-provider"
                required
                value={editFormData.provider}
                onChange={(e) => setEditFormData({ ...editFormData, provider: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-rewardPoints">Reward Points</Label>
                <Input
                  id="edit-rewardPoints"
                  type="number"
                  required
                  value={editFormData.rewardPoints}
                  onChange={(e) => setEditFormData({ ...editFormData, rewardPoints: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-estimatedTimeMins">Est. Time (Mins)</Label>
                <Input
                  id="edit-estimatedTimeMins"
                  type="number"
                  required
                  value={editFormData.estimatedTimeMins}
                  onChange={(e) => setEditFormData({ ...editFormData, estimatedTimeMins: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-urlOrApiEndpoint">URL / API Endpoint</Label>
              <Input
                id="edit-urlOrApiEndpoint"
                type="url"
                required
                value={editFormData.urlOrApiEndpoint}
                onChange={(e) => setEditFormData({ ...editFormData, urlOrApiEndpoint: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <NativeSelect
                id="edit-status"
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              >
                <NativeSelectOption value="active">Active</NativeSelectOption>
                <NativeSelectOption value="inactive">Inactive</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom Questions (Optional)</h4>
              
              <div className="space-y-2">
                <Label>Question 1</Label>
                <Input
                  placeholder="Question Text"
                  value={editFormData.q1Text}
                  onChange={(e) => setEditFormData({ ...editFormData, q1Text: e.target.value })}
                />
                <Input
                  placeholder="Options (comma-separated)"
                  value={editFormData.q1Options}
                  onChange={(e) => setEditFormData({ ...editFormData, q1Options: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Question 2</Label>
                <Input
                  placeholder="Question Text"
                  value={editFormData.q2Text}
                  onChange={(e) => setEditFormData({ ...editFormData, q2Text: e.target.value })}
                />
                <Input
                  placeholder="Options (comma-separated)"
                  value={editFormData.q2Options}
                  onChange={(e) => setEditFormData({ ...editFormData, q2Options: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Question 3</Label>
                <Input
                  placeholder="Question Text"
                  value={editFormData.q3Text}
                  onChange={(e) => setEditFormData({ ...editFormData, q3Text: e.target.value })}
                />
                <Input
                  placeholder="Options (comma-separated)"
                  value={editFormData.q3Options}
                  onChange={(e) => setEditFormData({ ...editFormData, q3Options: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="bg-brand text-white hover:bg-brand-dark">
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmSurvey} onOpenChange={(open) => !open && setDeleteConfirmSurvey(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Confirm Survey Deletion
            </DialogTitle>
            <DialogDescription className="mt-2">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirmSurvey?.title}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 text-xs text-muted-foreground bg-destructive/5 border border-destructive/10 rounded-lg p-3">
            <p className="font-semibold text-destructive">⚠️ Note about deletion:</p>
            <p className="mt-1">
              If this survey has associated transaction history, it will be soft-deleted (marked as inactive) to maintain database integrity. Otherwise, it will be permanently deleted.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmSurvey(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteSurvey}
              disabled={isDeleting}
              className="gap-1.5"
            >
              {isDeleting ? (
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
