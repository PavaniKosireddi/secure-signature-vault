import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Upload, History, Users, LogOut, ArrowLeft, Loader2, Search, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VerificationLog {
  id: number;
  user_id: number;
  username: string;
  person_name: string;
  result: string;
  confidence: number;
  similarity_score: number;
  tamper_score: number;
  timestamp: string;
}

interface StoredSignature {
  id: number;
  person_name: string;
  image_count: number;
  created_at: string;
}

type Tab = "results" | "signatures";

const Admin = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("results");
  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [signatures, setSignatures] = useState<StoredSignature[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Add signature form
  const [personName, setPersonName] = useState("");
  const [signatureFiles, setSignatureFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "true",
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!isAdmin) {
      toast({ title: "Access Denied", description: "Admin access required.", variant: "destructive" });
      navigate("/");
      return;
    }
    fetchData();
  }, [user, isAdmin]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [logsRes, sigsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/logs`, { headers }),
        fetch(`${API_BASE_URL}/admin/signatures`, { headers }),
      ]);
      if (logsRes.ok) setLogs(await logsRes.json().then(d => d.logs || []));
      if (sigsRes.ok) setSignatures(await sigsRes.json().then(d => d.signatures || []));
    } catch {
      toast({ title: "Error", description: "Could not fetch data. Is the backend running?", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleAddSignature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || signatureFiles.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("person_name", personName.trim());
      signatureFiles.forEach((file) => formData.append("signatures", file));

      const res = await fetch(`${API_BASE_URL}/admin/signatures/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "true" },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      toast({ title: "Success", description: `Added ${signatureFiles.length} signature(s) for ${personName}` });
      setPersonName("");
      setSignatureFiles([]);
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSignature = async (id: number, name: string) => {
    if (!confirm(`Delete all signatures for "${name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/signatures/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        toast({ title: "Deleted", description: `Removed signatures for ${name}` });
        fetchData();
      }
    } catch {
      toast({ title: "Error", description: "Delete failed", variant: "destructive" });
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.person_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.result?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                <span className="text-gradient">Admin</span> Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.username}</span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container relative mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "results" as Tab, label: "Verification History", icon: History },
            { id: "signatures" as Tab, label: "Manage Signatures", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : activeTab === "results" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, result, user..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Results Table */}
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium">Person</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">User</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Result</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Confidence</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Similarity</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          No verification logs found
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="border-b border-border/50 hover:bg-secondary/30">
                          <td className="p-4 font-medium text-foreground">{log.person_name}</td>
                          <td className="p-4 text-muted-foreground">{log.username}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-1 rounded-md text-xs font-medium uppercase",
                              log.result === "genuine" ? "bg-success/10 text-success" :
                              log.result === "forged" ? "bg-destructive/10 text-destructive" :
                              "bg-warning/10 text-warning"
                            )}>
                              {log.result}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-foreground">{(log.confidence * 100).toFixed(1)}%</td>
                          <td className="p-4 font-mono text-muted-foreground">{(log.similarity_score * 100).toFixed(1)}%</td>
                          <td className="p-4 text-muted-foreground">{new Date(log.timestamp).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Add Signature Form */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add Reference Signatures
              </h3>
              <form onSubmit={handleAddSignature} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Person Name</label>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    required
                    className="w-full max-w-md h-10 px-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Signature Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setSignatureFiles(Array.from(e.target.files || []))}
                    className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {signatureFiles.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">{signatureFiles.length} file(s) selected</p>
                  )}
                </div>
                <Button type="submit" variant="hero" disabled={uploading || !personName.trim() || signatureFiles.length === 0}>
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload Signatures
                </Button>
              </form>
            </div>

            {/* Stored Signatures List */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Stored Reference Signatures</h3>
              {signatures.length === 0 ? (
                <p className="text-muted-foreground text-sm">No reference signatures stored yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {signatures.map((sig) => (
                    <div key={sig.id} className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{sig.person_name}</div>
                        <div className="text-xs text-muted-foreground">{sig.image_count} sample(s) • {new Date(sig.created_at).toLocaleDateString()}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteSignature(sig.id, sig.person_name)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Admin;
