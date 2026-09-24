"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Car,
  Plane,
  HeartHandshake,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  UserCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Key,
  Download,
  UserPlus,
  Users,
  Settings,
  Database,
  CheckCircle,
  AlertCircle,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Eye,
  Calendar,
  Tag,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AdminGalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
  featured?: boolean;
}

interface LeadItem {
  _id: string;
  name: string;
  mobile: string;
  city: string;
  insuranceType: "health" | "car" | "travel" | "life" | "senior" | "audit";
  sumInsured?: string;
  planName?: string;
  monthlyPremium?: number;
  members?: string;
  hasPED: "yes" | "no";
  status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED";
  notes?: string;
  createdAt: string;
}

interface UserAccount {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "agent";
  createdAt: string;
}

interface AdminDashboardClientProps {
  initialLeads: LeadItem[];
  dbError: string | null;
  user: { name?: string | null; email?: string | null };
}

export default function AdminDashboardClient({
  initialLeads,
  dbError,
  user,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"leads" | "gallery" | "security">("leads");
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState("all");

  // Gallery upload form states
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Awards & Honors");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Security tab states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New user creation states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"agent" | "admin">("agent");
  const [userCreateLoading, setUserCreateLoading] = useState(false);
  const [userCreateMsg, setUserCreateMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Users list in security tab
  const [userList, setUserList] = useState<UserAccount[]>([]);
  const [securityStatus, setSecurityStatus] = useState<{
    dbConnected: boolean;
    hasNextAuthSecret: boolean;
    hasSeedKey: boolean;
    sessionStrategy: string;
    authVersion: string;
  } | null>(null);

  // Initial load
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Fetch security info when entering security tab, or gallery items on tab switch
  useEffect(() => {
    if (activeTab === "security") {
      fetchSecurityData();
    } else if (activeTab === "gallery") {
      fetchGalleryItems();
    }
  }, [activeTab]);

  const fetchGalleryItems = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/gallery?limit=100");
      const data = await res.json();
      if (data.items) {
        setGalleryItems(data.items);
      }
    } catch (err) {
      console.error("Failed to load gallery items", err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadMessage(null);

    if (!uploadFile) {
      setUploadMessage({ type: "error", text: "Please select an image file to upload." });
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadMessage({ type: "error", text: "Please enter a title for this photo." });
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setUploadMessage({
        type: "error",
        text: "Cloudinary is not configured. Please ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set in your environment.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress("Uploading directly to Cloudinary CDN...");

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", uploadPreset);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed");
      }

      setUploadProgress("Saving record to database...");

      const saveRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadTitle.trim(),
          category: uploadCategory,
          description: uploadDescription.trim(),
          imageUrl: uploadData.secure_url,
          publicId: uploadData.public_id,
          width: uploadData.width,
          height: uploadData.height,
          format: uploadData.format,
        }),
      });

      const saveData = await saveRes.json();
      if (!saveRes.ok) {
        throw new Error(saveData.error || "Failed to save photo record to database");
      }

      setUploadMessage({ type: "success", text: "Photo uploaded & published to gallery successfully!" });
      setUploadTitle("");
      setUploadDescription("");
      setUploadFile(null);
      setUploadPreview(null);
      fetchGalleryItems();
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadMessage({ type: "error", text: err.message || "Failed to complete upload" });
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery and Cloudinary CDN?")) {
      return;
    }
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGalleryItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete photo");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the image.");
    }
  };

  const fetchSecurityData = async () => {
    try {
      const res = await fetch("/api/admin/security");
      const data = await res.json();
      if (data.users) {
        setUserList(data.users);
      }
      if (data.securityStatus) {
        setSecurityStatus(data.securityStatus);
      }
    } catch (e) {
      console.error("Failed to load security data", e);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);

    if (newPassword !== confirmPassword) {
      setPwMessage({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPwMessage({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPwMessage({ type: "success", text: data.message });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        fetchSecurityData();
      } else {
        setPwMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch {
      setPwMessage({ type: "error", text: "Failed to connect to server." });
    } finally {
      setPwLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserCreateMsg(null);
    setUserCreateLoading(true);

    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-user",
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUserCreateMsg({ type: "success", text: data.message });
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        fetchSecurityData();
      } else {
        setUserCreateMsg({ type: "error", text: data.error || "Failed to create user." });
      }
    } catch {
      setUserCreateMsg({ type: "error", text: "Server communication error." });
    } finally {
      setUserCreateLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to remove this user account?")) return;

    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-user", id }),
      });

      if (res.ok) {
        setUserList((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (e) {
      console.error("Failed to delete user", e);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["Inquiry_ID", "Name", "Mobile", "City", "Type", "Plan", "Sum_Insured", "PED_Declared", "Status", "Date"];
    const rows = leads.map((l) => [
      l._id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.mobile}"`,
      `"${l.city}"`,
      `"${l.insuranceType}"`,
      `"${(l.planName || "").replace(/"/g, '""')}"`,
      `"${l.sumInsured || ""}"`,
      `"${l.hasPED}"`,
      `"${l.status}"`,
      `"${new Date(l.createdAt).toLocaleString("en-IN")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sneha_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile.includes(searchTerm) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.planName && lead.planName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesType = typeFilter === "all" || lead.insuranceType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Stats calculation
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "NEW").length;
  const healthCount = leads.filter((l) => l.insuranceType === "health" || l.insuranceType === "senior").length;
  const motorCount = leads.filter((l) => l.insuranceType === "car").length;
  const travelCount = leads.filter((l) => l.insuranceType === "travel").length;
  const lifeCount = leads.filter((l) => l.insuranceType === "life").length;

  const handleUpdateStatus = async (id: string, newStatus: "NEW" | "CONTACTED" | "CLOSED") => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to remove this lead inquiry?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (e) {
      console.error("Failed to delete lead", e);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Refresh error", err);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (lead: LeadItem) => {
    const typeName =
      lead.insuranceType === "car"
        ? "Car (Zero-Dep)"
        : lead.insuranceType === "travel"
          ? "Schengen/Overseas Travel"
          : lead.insuranceType === "life"
            ? "LIC Term Life"
            : "Health Insurance";

    const msg = `Hi ${lead.name}, this is Sneha from Sneha MediCare. I received your inquiry for *${typeName}* (${lead.planName || lead.sumInsured || "Cover"}). When is a convenient time to discuss your policy quote?`;
    return `https://wa.me/91${lead.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c2340] via-[#0e2a4d] to-[#091b30] text-sky-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0c2340]/90 backdrop-blur-md border-b border-cyan-900/35 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-200 text-sm sm:text-base">Sneha MediCare</span>
                <Badge variant="outline" className="text-[10px] text-cyan-300 border-cyan-500/30 bg-cyan-950/40">
                  Agent CRM
                </Badge>
              </div>
              <div className="text-[11px] text-sky-300/70">
                Star Health • LIC of India • Tata AIG
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#091b30]/85 p-1 rounded-xl border border-cyan-900/40">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "leads"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-sky-950 font-bold shadow-sm shadow-cyan-950/40"
                : "text-sky-300/70 hover:text-sky-100"
                }`}
            >
              <Users className="w-3.5 h-3.5" />
              Leads CRM
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "gallery"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-sky-950 font-bold shadow-sm shadow-cyan-950/40"
                : "text-sky-300/70 hover:text-sky-100"
                }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Gallery {galleryItems.length > 0 && `(${galleryItems.length})`}
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "security"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-sky-950 font-bold shadow-sm shadow-cyan-950/40"
                : "text-sky-300/70 hover:text-sky-100"
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Security Settings
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-sky-100">{user.name || "Sneha"}</div>
              <div className="text-[10px] text-sky-300/60">{user.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-xs border-cyan-900/40 text-sky-200 hover:text-cyan-200 hover:bg-[#123359]"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ================= TAB 1: LEADS CRM ================= */}
        {activeTab === "leads" && (
          <>
            {/* MongoDB Notice if cluster needs IP whitelist */}
            {dbError && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-300">Atlas IP Whitelist Required:</span> MongoDB Atlas returned a connection notice.
                    <div className="text-sky-200/80 text-[11px] mt-0.5">
                      Go to <strong>MongoDB Atlas &gt; Network Access &gt; Add IP Address &gt; Allow Access From Anywhere (0.0.0.0/0)</strong> or add your current IP.
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/20 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry Connection
                </Button>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/20 backdrop-blur-sm">
                <div className="text-[11px] text-sky-300/70 uppercase font-semibold">Total Leads</div>
                <div className="text-2xl font-black text-cyan-200 mt-1">{totalCount}</div>
                <div className="text-[10px] text-sky-400/50 mt-0.5">All time submissions</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-amber-500/35 backdrop-blur-sm">
                <div className="text-[11px] text-amber-400 uppercase font-semibold">New Uncontacted</div>
                <div className="text-2xl font-black text-amber-300 mt-1">{newCount}</div>
                <div className="text-[10px] text-amber-300/70 mt-0.5">Needs follow-up</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/20 backdrop-blur-sm">
                <div className="text-[11px] text-teal-300 uppercase font-semibold">Health & Senior</div>
                <div className="text-2xl font-black text-teal-300 mt-1">{healthCount}</div>
                <div className="text-[10px] text-sky-400/50 mt-0.5">Star Health / Tata AIG</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/20 backdrop-blur-sm">
                <div className="text-[11px] text-cyan-300 uppercase font-semibold">Car (Zero-Dep)</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">{motorCount}</div>
                <div className="text-[10px] text-sky-400/50 mt-0.5">Tata AIG Auto</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/20 backdrop-blur-sm">
                <div className="text-[11px] text-sky-300 uppercase font-semibold">Travel Schengen</div>
                <div className="text-2xl font-black text-sky-300 mt-1">{travelCount}</div>
                <div className="text-[10px] text-sky-400/50 mt-0.5">Tata AIG Travel Guard</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-amber-500/25 backdrop-blur-sm">
                <div className="text-[11px] text-amber-300 uppercase font-semibold">LIC Term Life</div>
                <div className="text-2xl font-black text-amber-300 mt-1">{lifeCount}</div>
                <div className="text-[10px] text-sky-400/50 mt-0.5">LIC Sovereign Security</div>
              </div>
            </div>

            {/* Filter Controls, Search & Export */}
            <div className="p-4 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/20 flex flex-col lg:flex-row items-center justify-between gap-4 backdrop-blur-sm">
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400/50" />
                <input
                  type="text"
                  placeholder="Search name, phone, city, or plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl pl-10 pr-4 py-2 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3 py-2 text-xs text-sky-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="all">All Insurance Types</option>
                  <option value="health">Health Insurance</option>
                  <option value="car">Car (Zero-Dep)</option>
                  <option value="travel">Travel (Schengen)</option>
                  <option value="life">LIC Term Life</option>
                  <option value="senior">Senior Citizen</option>
                  <option value="audit">Policy Audit</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3 py-2 text-xs text-sky-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="NEW">New Inquiries</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CLOSED">Closed / Issued</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportLeadsToCSV}
                  className="text-xs border-cyan-900/40 text-sky-200 hover:text-cyan-200 hover:bg-[#123359]"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  Export CSV
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="text-xs border-cyan-900/40 text-sky-200 hover:text-cyan-200 hover:bg-[#123359]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Leads Table / Card List */}
            <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
              <div className="p-4 border-b border-cyan-900/35 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-cyan-200">Client Inquiries</span>
                  <span className="text-xs text-sky-300/70">({filteredLeads.length} showing)</span>
                </div>
                <div className="text-xs text-cyan-300 font-medium">
                  Direct 1-Click WhatsApp & Call follow-up
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0b213c] border border-cyan-900/40 flex items-center justify-center mx-auto mb-3 text-sky-400/50">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-sky-200">No leads match your filter</div>
                  <p className="text-xs text-sky-400/60 mt-1 max-w-sm mx-auto">
                    When visitors lock a quote on the website, their details appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-cyan-900/25">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="p-4 sm:p-5 hover:bg-[#133763]/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Client Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-bold text-cyan-200 text-sm sm:text-base">
                            {lead.name}
                          </span>
                          <span className="text-xs text-cyan-300 font-mono">
                            +91 {lead.mobile}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#0b213c] text-sky-200 border border-cyan-900/40">
                            {lead.city}
                          </span>

                          {/* Status Tag */}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${lead.status === "NEW"
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : lead.status === "CONTACTED"
                                ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                                : "bg-[#0b213c] text-sky-300/70 border-cyan-900/40"
                              }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-sky-200/90 flex-wrap">
                          <span className="text-cyan-300 font-semibold">
                            Type: {lead.insuranceType.toUpperCase()}
                          </span>
                          <span className="text-cyan-800">•</span>
                          <span>Plan: {lead.planName || "General Consultation"}</span>
                          {lead.sumInsured && (
                            <>
                              <span className="text-cyan-800">•</span>
                              <span>Sum Insured: {lead.sumInsured}</span>
                            </>
                          )}
                          {lead.hasPED === "yes" && (
                            <>
                              <span className="text-cyan-800">•</span>
                              <span className="text-amber-300 font-semibold">
                                ⚠️ Existing Medical History Declared
                              </span>
                            </>
                          )}
                        </div>

                        <div className="text-[10px] text-sky-400/60 flex items-center gap-2">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>Received: {new Date(lead.createdAt).toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Quick Action Controls */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {/* Status Dropdown */}
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleUpdateStatus(lead._id, e.target.value as "NEW" | "CONTACTED" | "CLOSED")
                          }
                          className="bg-[#0b213c] border border-cyan-900/40 rounded-lg px-2.5 py-1.5 text-xs text-sky-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                        >
                          <option value="NEW">Mark: NEW</option>
                          <option value="CONTACTED">Mark: CONTACTED</option>
                          <option value="CLOSED">Mark: CLOSED</option>
                        </select>

                        {/* WhatsApp Client Button */}
                        <a
                          href={getWhatsAppLink(lead)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          WhatsApp Client
                        </a>

                        {/* Direct Call Button */}
                        <a
                          href={`tel:+91${lead.mobile.replace(/\D/g, "")}`}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#0b213c] hover:bg-[#123359] text-sky-200 font-semibold text-xs border border-cyan-900/40 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                          Call
                        </a>

                        {/* Delete Lead */}
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          title="Delete Lead"
                          className="p-1.5 rounded-lg text-sky-400/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= TAB 2: GALLERY MANAGER ================= */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Gallery Header Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-sm shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-cyan-200">Gallery & Milestone Manager</h2>
                </div>
                <p className="text-xs text-sky-300/70 mt-1">
                  Upload authentic photos directly to Cloudinary CDN and feature them on your public gallery.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="/gallery"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/35 text-cyan-300 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live Gallery
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchGalleryItems}
                  disabled={galleryLoading}
                  className="text-xs border-cyan-900/50 text-sky-200 hover:bg-[#123359]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${galleryLoading ? "animate-spin text-cyan-400" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Upload Box Card */}
            <div className="p-6 rounded-2xl bg-[#0e2a4d]/80 border border-cyan-500/25 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-sky-100 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-cyan-400" />
                    Upload New Photo
                  </h3>
                  <p className="text-xs text-sky-300/70 mt-0.5">
                    Images are uploaded directly to your Cloudinary storage and saved to MongoDB.
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] text-teal-300 border-teal-500/40 bg-teal-950/30">
                  Cloudinary CDN Direct
                </Badge>
              </div>

              {uploadMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 mb-6 ${
                    uploadMessage.type === "success"
                      ? "bg-teal-500/15 border border-teal-500/40 text-teal-200"
                      : "bg-rose-500/15 border border-rose-500/40 text-rose-200"
                  }`}
                >
                  {uploadMessage.type === "success" ? (
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{uploadMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleUploadImage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* File Dropzone / Preview */}
                  <div className="md:col-span-5 flex flex-col">
                    <label className="text-xs font-semibold text-sky-200 mb-2">
                      Photo File <span className="text-rose-400">*</span>
                    </label>

                    {uploadPreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-[#091b30] flex flex-col items-center justify-center p-2 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uploadPreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUploadFile(null);
                            setUploadPreview(null);
                          }}
                          className="absolute top-4 right-4 p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs shadow-lg transition-colors cursor-pointer"
                          title="Remove Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-[11px] text-sky-300/80 mt-2 truncate max-w-full">
                          {uploadFile?.name} ({(uploadFile?.size ? (uploadFile.size / 1024).toFixed(0) : 0)} KB)
                        </div>
                      </div>
                    ) : (
                      <label className="flex-1 min-h-[190px] border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/60 rounded-xl bg-[#091b30]/60 hover:bg-[#091b30]/90 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/jpg"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 transition-colors">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-sky-100 group-hover:text-cyan-200">
                          Click to select photo
                        </span>
                        <span className="text-[11px] text-sky-400/60 mt-1">
                          Supports PNG, JPG, WebP (up to 10MB)
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Form Details */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-sky-200 block mb-1.5">
                        Photo Title <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        placeholder="e.g. Star Health Top Performer Trophy 2024"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#091b30] border border-cyan-900/60 focus:border-cyan-400 focus:outline-none text-sky-100 text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-sky-200 block mb-1.5">
                        Category <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#091b30] border border-cyan-900/60 focus:border-cyan-400 focus:outline-none text-sky-100 text-xs transition-colors cursor-pointer"
                      >
                        <option value="Awards & Honors">Awards & Honors</option>
                        <option value="Customer Handover">Customer Handover</option>
                        <option value="Claim Settlement">Claim Settlement</option>
                        <option value="Partner Meets">Partner Meets</option>
                        <option value="Office & Community">Office & Community</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-sky-200 block mb-1.5">
                        Description / Story <span className="text-sky-400/60 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        placeholder="e.g. Received at the Annual Star Health Partner Conclave in Pune for achieving 100% claim settlement advocacy."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#091b30] border border-cyan-900/60 focus:border-cyan-400 focus:outline-none text-sky-100 text-xs transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4">
                      {isUploading ? (
                        <div className="flex items-center gap-2 text-xs text-cyan-300">
                          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                          <span>{uploadProgress || "Uploading..."}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-sky-400/60">
                          Published instantly to public gallery
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isUploading || !uploadFile || !uploadTitle.trim()}
                        className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl shadow-lg shadow-cyan-950/50 cursor-pointer disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" />
                            Upload & Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Published Gallery Items */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-bold text-cyan-200">
                    Published Photos ({galleryItems.length})
                  </h3>
                  <Badge variant="outline" className="text-[10px] text-sky-300 border-sky-600/30">
                    Live on Website
                  </Badge>
                </div>

                {/* Category filters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    "all",
                    "Awards & Honors",
                    "Customer Handover",
                    "Claim Settlement",
                    "Partner Meets",
                    "Office & Community",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`text-xs px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        galleryCategoryFilter === cat
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-sky-950 font-bold shadow-sm"
                          : "bg-[#091b30] text-sky-300/70 hover:text-sky-100 border border-cyan-900/40"
                      }`}
                    >
                      {cat === "all" ? "All Photos" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {galleryLoading && galleryItems.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#0e2a4d]/40 border border-cyan-900/40 flex flex-col items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
                  <p className="text-xs text-sky-300">Loading gallery photos...</p>
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#0e2a4d]/40 border border-dashed border-cyan-900/60 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-sky-200">No photos uploaded yet</h4>
                  <p className="text-xs text-sky-400/70 max-w-sm mt-1 mb-4">
                    Your public gallery is currently displaying fallback showcase photos. Use the upload box above to publish your first real photo!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {galleryItems
                    .filter((item) =>
                      galleryCategoryFilter === "all" ? true : item.category === galleryCategoryFilter
                    )
                    .map((item) => (
                      <div
                        key={item._id}
                        className="group rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/25 overflow-hidden flex flex-col shadow-lg hover:border-cyan-400/50 transition-all"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-video w-full bg-[#091b30] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-[#0c2340]/90 backdrop-blur-md text-cyan-300 border-cyan-500/30"
                            >
                              {item.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-sky-100 line-clamp-1 group-hover:text-cyan-200 transition-colors">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className="text-[11px] text-sky-300/70 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="pt-3 mt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px]">
                            <span className="text-sky-400/60 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={item.imageUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="View original image on Cloudinary"
                                className="p-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                onClick={() => handleDeleteGalleryItem(item._id)}
                                title="Delete from Gallery & Cloudinary"
                                className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SECURITY SETTINGS ================= */}
        {activeTab === "security" && (
          <div className="space-y-8">

            {/* Security Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Auth Engine
                </div>
                <div className="text-lg font-bold text-cyan-200">NextAuth.js v5 (Beta)</div>
                <div className="text-xs text-sky-200/80 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Encrypted JWT Session Cookie
                </div>
                <div className="mt-3 text-[11px] text-sky-400/60">
                  Secret: Configured in environment
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Database className="w-4 h-4" />
                  Database Security
                </div>
                <div className="text-lg font-bold text-cyan-200">MongoDB Atlas (SSL/TLS)</div>
                <div className="text-xs text-sky-200/80 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Connection string with credentials
                </div>
                <div className="mt-3 text-[11px] text-sky-400/60">
                  Database: MainDB / leads collection
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Key className="w-4 h-4" />
                  Master Access Key
                </div>
                <div className="text-lg font-bold text-cyan-200">SEED_ADMIN_KEY Active</div>
                <div className="text-xs text-sky-200/80 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Emergency recovery access available
                </div>
                <div className="mt-3 text-[11px] text-sky-400/60">
                  Allows instant login without database dependency
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Change / Set Password */}
              <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-900/35">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-300">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-200 text-base">Change Agent Password</h3>
                    <p className="text-xs text-sky-300/70">
                      Set a custom database password for {user.email || "Sneha"}
                    </p>
                  </div>
                </div>

                {pwMessage && (
                  <div
                    className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${pwMessage.type === "success"
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      }`}
                  >
                    {pwMessage.type === "success" ? (
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{pwMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Current Password or Master Access Key
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="Enter current password or SEED_ADMIN_KEY"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      New Password (minimum 6 characters)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Enter new strong password"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-enter new password"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={pwLoading}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-sky-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-cyan-950/40 mt-2"
                  >
                    {pwLoading ? "Updating Password..." : "Save New Password"}
                  </Button>
                </form>
              </div>

              {/* Card 2: Create Sub-Agent or Staff Account */}
              <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-900/35">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-300">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-200 text-base">Add Agent / Assistant</h3>
                    <p className="text-xs text-sky-300/70">
                      Grant staff or co-advisors access to client inquiries
                    </p>
                  </div>
                </div>

                {userCreateMsg && (
                  <div
                    className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${userCreateMsg.type === "success"
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      }`}
                  >
                    {userCreateMsg.type === "success" ? (
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{userCreateMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      placeholder="e.g. Ramesh Kumar (Assistant)"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Email Address (Login Username)
                    </label>
                    <input
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                      placeholder="assistant@snehaMediCare.com"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Temporary Password
                    </label>
                    <input
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                      placeholder="Set initial login password"
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                      Access Role
                    </label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as "agent" | "admin")}
                      className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-sky-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="agent">Agent (View & Contact Leads)</option>
                      <option value="admin">Administrator (Full Access & Security)</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={userCreateLoading}
                    className="w-full bg-[#133863] hover:bg-[#1a4a82] text-sky-100 font-bold text-xs py-2.5 rounded-xl border border-cyan-500/30 transition-colors mt-2"
                  >
                    {userCreateLoading ? "Creating Account..." : "Create User Account"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Registered Users List */}
            <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-900/35">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-200 text-base">Authorized Admin & Agent Users</h3>
                    <p className="text-xs text-sky-300/70">
                      Accounts registered in database with credentials login access
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 text-xs bg-cyan-950/40">
                  {userList.length} User{userList.length === 1 ? "" : "s"}
                </Badge>
              </div>

              {userList.length === 0 ? (
                <div className="p-8 text-center text-xs text-sky-400/60">
                  No individual user accounts registered yet. You are currently authenticated via the Master Seed Key (Super Admin). Change your password above to create your persistent database user.
                </div>
              ) : (
                <div className="divide-y divide-cyan-900/25">
                  {userList.map((u) => (
                    <div
                      key={u._id}
                      className="py-3.5 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-cyan-200 text-xs sm:text-sm">{u.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-[#0b213c] text-cyan-300 border border-cyan-900/40">
                            {u.role}
                          </span>
                        </div>
                        <div className="text-xs text-sky-300/70">{u.email}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-sky-400/60 hidden sm:inline">
                          Created: {new Date(u.createdAt).toLocaleDateString("en-IN")}
                        </span>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1.5 rounded-lg text-sky-400/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer info & public website link */}
        <div className="pt-4 flex items-center justify-between text-xs text-sky-400/60 border-t border-cyan-900/20">
          <div>
            Sneha MediCare Advisory • IRDAI Certified Agent Portal
          </div>
          <a
            href="/"
            className="text-cyan-300 hover:text-cyan-200 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            Visit Public Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
