"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sneha@snehamedicare.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid access key or credentials. Please check SEED_ADMIN_KEY.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred during sign-in.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 mb-4">
          <HeartHandshake className="w-8 h-8 text-teal-400" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Sneha Medicare
        </h2>
        <p className="text-xs text-teal-400 font-semibold tracking-wider uppercase mt-1">
          Agent & Lead Management Portal
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Authorized agent for Star Health, LIC of India & Tata AIG
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
          <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Agent Authentication
            </span>
            <Badge variant="outline" className="text-[10px] border-teal-500/30 text-teal-400">
              NextAuth v5 Protected
            </Badge>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Agent Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="sneha@snehamedicare.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password / Access Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter SEED_ADMIN_KEY from .env"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 rounded-xl transition-colors mt-2"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-teal-400 transition-colors inline-flex items-center gap-1"
            >
              ← Back to Main Public Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
