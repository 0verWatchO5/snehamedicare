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
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState<"leads" | "security">("leads");
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

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

  // Fetch security info when entering security tab
  useEffect(() => {
    if (activeTab === "security") {
      fetchSecurityData();
    }
  }, [activeTab]);

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

    const msg = `Hi ${lead.name}, this is Sneha from Sneha Medicare & Insurance. I received your inquiry for *${typeName}* (${lead.planName || lead.sumInsured || "Cover"}). When is a convenient time to discuss your policy quote?`;
    return `https://wa.me/91${lead.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">Sneha Medicare</span>
                <Badge variant="outline" className="text-[10px] text-teal-400 border-teal-500/30">
                  Agent CRM
                </Badge>
              </div>
              <div className="text-[11px] text-slate-400">
                Star Health • LIC of India • Tata AIG
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "leads"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Leads CRM
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "security"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Security Settings
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-white">{user.name || "Sneha"}</div>
              <div className="text-[10px] text-slate-400">{user.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
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
                    <div className="text-slate-300 text-[11px] mt-0.5">
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
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Leads</div>
                <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">All time submissions</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/30">
                <div className="text-[11px] text-emerald-400 uppercase font-semibold">New Uncontacted</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{newCount}</div>
                <div className="text-[10px] text-emerald-300/70 mt-0.5">Needs follow-up</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-teal-400 uppercase font-semibold">Health & Senior</div>
                <div className="text-2xl font-black text-teal-300 mt-1">{healthCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Star Health / Tata AIG</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-cyan-400 uppercase font-semibold">Car (Zero-Dep)</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">{motorCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tata AIG Auto</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-sky-400 uppercase font-semibold">Travel Schengen</div>
                <div className="text-2xl font-black text-sky-300 mt-1">{travelCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tata AIG Travel Guard</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-amber-400 uppercase font-semibold">LIC Term Life</div>
                <div className="text-2xl font-black text-amber-300 mt-1">{lifeCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">LIC Sovereign Security</div>
              </div>
            </div>

            {/* Filter Controls, Search & Export */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search name, phone, city, or plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
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
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
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
                  className="text-xs border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  Export CSV
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="text-xs border-slate-700 text-slate-300 hover:text-white"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-teal-400" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Leads Table / Card List */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Client Inquiries</span>
                  <span className="text-xs text-slate-400">({filteredLeads.length} showing)</span>
                </div>
                <div className="text-xs text-slate-400">
                  Direct 1-Click WhatsApp & Call follow-up
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-300">No leads match your filter</div>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    When visitors lock a quote on the website, their details appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/70">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="p-4 sm:p-5 hover:bg-slate-900/90 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Client Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-bold text-white text-sm sm:text-base">
                            {lead.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            +91 {lead.mobile}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                            {lead.city}
                          </span>

                          {/* Status Tag */}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                              lead.status === "NEW"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : lead.status === "CONTACTED"
                                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                          <span className="text-teal-400 font-semibold">
                            Type: {lead.insuranceType.toUpperCase()}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span>Plan: {lead.planName || "General Consultation"}</span>
                          {lead.sumInsured && (
                            <>
                              <span className="text-slate-600">•</span>
                              <span>Sum Insured: {lead.sumInsured}</span>
                            </>
                          )}
                          {lead.hasPED === "yes" && (
                            <>
                              <span className="text-slate-600">•</span>
                              <span className="text-amber-400 font-semibold">
                                ⚠️ Existing Medical History Declared
                              </span>
                            </>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
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
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
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
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          WhatsApp Client
                        </a>

                        {/* Direct Call Button */}
                        <a
                          href={`tel:+91${lead.mobile.replace(/\D/g, "")}`}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                          Call
                        </a>

                        {/* Delete Lead */}
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          title="Delete Lead"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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

        {/* ================= TAB 2: SECURITY SETTINGS ================= */}
        {activeTab === "security" && (
          <div className="space-y-8">
            
            {/* Security Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Auth Engine
                </div>
                <div className="text-lg font-bold text-white">NextAuth.js v5 (Beta)</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted JWT Session Cookie
                </div>
                <div className="mt-3 text-[11px] text-slate-500">
                  Secret: Configured in environment
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Database className="w-4 h-4" />
                  Database Security
                </div>
                <div className="text-lg font-bold text-white">MongoDB Atlas (SSL/TLS)</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Connection string with credentials
                </div>
                <div className="mt-3 text-[11px] text-slate-500">
                  Database: MainDB / leads collection
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Key className="w-4 h-4" />
                  Master Access Key
                </div>
                <div className="text-lg font-bold text-white">SEED_ADMIN_KEY Active</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Emergency recovery access available
                </div>
                <div className="mt-3 text-[11px] text-slate-500">
                  Allows instant login without database dependency
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Change / Set Password */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Change Agent Password</h3>
                    <p className="text-xs text-slate-400">
                      Set a custom database password for {user.email || "Sneha"}
                    </p>
                  </div>
                </div>

                {pwMessage && (
                  <div
                    className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                      pwMessage.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    {pwMessage.type === "success" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{pwMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current Password or Master Access Key
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="Enter current password or SEED_ADMIN_KEY"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      New Password (minimum 6 characters)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Enter new strong password"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-enter new password"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={pwLoading}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors mt-2"
                  >
                    {pwLoading ? "Updating Password..." : "Save New Password"}
                  </Button>
                </form>
              </div>

              {/* Card 2: Create Sub-Agent or Staff Account */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Add Agent / Assistant</h3>
                    <p className="text-xs text-slate-400">
                      Grant staff or co-advisors access to client inquiries
                    </p>
                  </div>
                </div>

                {userCreateMsg && (
                  <div
                    className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                      userCreateMsg.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    {userCreateMsg.type === "success" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{userCreateMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      placeholder="e.g. Ramesh Kumar (Assistant)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (Login Username)
                    </label>
                    <input
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                      placeholder="assistant@snehamedicare.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Temporary Password
                    </label>
                    <input
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                      placeholder="Set initial login password"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Access Role
                    </label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as "agent" | "admin")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="agent">Agent (View & Contact Leads)</option>
                      <option value="admin">Administrator (Full Access & Security)</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={userCreateLoading}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition-colors mt-2"
                  >
                    {userCreateLoading ? "Creating Account..." : "Create User Account"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Registered Users List */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Authorized Admin & Agent Users</h3>
                    <p className="text-xs text-slate-400">
                      Accounts registered in database with credentials login access
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-teal-500/30 text-teal-400 text-xs">
                  {userList.length} User{userList.length === 1 ? "" : "s"}
                </Badge>
              </div>

              {userList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No individual user accounts registered yet. You are currently authenticated via the Master Seed Key (Super Admin). Change your password above to create your persistent database user.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {userList.map((u) => (
                    <div
                      key={u._id}
                      className="py-3.5 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-xs sm:text-sm">{u.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-slate-800 text-teal-400 border border-slate-700">
                            {u.role}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          Created: {new Date(u.createdAt).toLocaleDateString("en-IN")}
                        </span>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-900">
          <div>
            Sneha Medicare & Insurance Advisory • IRDAI Certified Agent Portal
          </div>
          <a
            href="/"
            className="text-teal-400 hover:underline inline-flex items-center gap-1"
          >
            Visit Public Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
