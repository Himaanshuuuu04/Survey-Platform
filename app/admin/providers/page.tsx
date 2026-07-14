"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Key, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    providerName: "",
    secretKey: "",
    hashingAlgorithm: "sha1",
    whitelistedIps: "",
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await fetch("/api/admin/providers");
      const json = await res.json();
      if (json.success) {
        setProviders(json.data);
      }
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      providerName: "",
      secretKey: "",
      hashingAlgorithm: "sha1",
      whitelistedIps: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (provider: any) => {
    setEditingId(provider._id);
    setFormData({
      providerName: provider.providerName,
      secretKey: provider.secretKey,
      hashingAlgorithm: provider.hashingAlgorithm || "sha1",
      whitelistedIps: provider.whitelistedIps ? provider.whitelistedIps.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `/api/admin/providers/${editingId}` 
        : "/api/admin/providers";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchProviders();
      } else {
        alert(json.error || "Failed to save provider config");
      }
    } catch (error) {
      console.error("Error saving provider config:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this provider's configuration?")) return;
    try {
      const res = await fetch(`/api/admin/providers/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchProviders();
      } else {
        alert(json.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            Survey Provider Security
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Configure S2S callback secret keys and whitelist IPs for third-party survey suppliers.
          </p>
        </div>
        <Button onClick={openNewModal} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Provider Config
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500 text-center py-10">Loading configurations...</div>
      ) : providers.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 text-zinc-500">
          <Key className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <p className="font-semibold text-zinc-700">No Security Configs Found</p>
          <p className="text-sm mt-1">Add a provider's secret key to securely process S2S callbacks.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => (
            <Card key={p._id} className="border-zinc-200 shadow-sm bg-white hover:border-indigo-200 transition-colors">
              <CardHeader className="pb-3 border-b border-zinc-100 flex flex-row justify-between items-start">
                <div>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-zinc-50 mb-2">
                    {p.providerName}
                  </Badge>
                  <CardTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    {p.providerName} Config
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-blue-600" onClick={() => openEditModal(p)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-600" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-medium">Secret Key:</span>
                  <span className="font-mono bg-zinc-100 px-2 py-0.5 rounded text-zinc-700 text-xs">
                    {p.secretKey ? "••••••••" + p.secretKey.slice(-4) : "Not Set"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-medium">Hashing Alg:</span>
                  <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                    {p.hashingAlgorithm}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 font-medium flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Whitelisted IPs
                  </span>
                  {p.whitelistedIps && p.whitelistedIps.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.whitelistedIps.map((ip: string, i: number) => (
                        <span key={i} className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100">
                          {ip}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-400 italic">No IP restrictions</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Provider Config" : "Add Provider Config"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-700">Provider Name</label>
              <Input 
                required 
                placeholder="e.g., bitlabs"
                value={formData.providerName}
                onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-[10px] text-zinc-500">Must exactly match the provider name used in Survey generation or the webhook URL.</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-700">Secret Key</label>
              <Input 
                required 
                type="password"
                placeholder="Enter secret key from provider dashboard"
                value={formData.secretKey}
                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-700">Hashing Algorithm</label>
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.hashingAlgorithm}
                onChange={(e) => setFormData({ ...formData, hashingAlgorithm: e.target.value })}
              >
                <option value="sha1">HMAC-SHA1</option>
                <option value="sha256">HMAC-SHA256</option>
                <option value="md5">MD5</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-700">Whitelisted IPs (Optional)</label>
              <Input 
                placeholder="e.g., 192.168.1.1, 10.0.0.5"
                value={formData.whitelistedIps}
                onChange={(e) => setFormData({ ...formData, whitelistedIps: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-[10px] text-zinc-500">Comma-separated list of IP addresses allowed to hit the webhook.</p>
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              Save Configuration
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
