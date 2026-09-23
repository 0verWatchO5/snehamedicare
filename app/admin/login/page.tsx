"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sneha.chaubal@snehamedicare.in");
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
    <div className="min-h-screen bg-gradient-to-b from-[#0c2340] via-[#0e2a4d] to-[#091b30] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 mb-4 shadow-lg shadow-cyan-950/40">
          <HeartHandshake className="w-8 h-8 text-cyan-300" />
        </div>
        <h2 className="text-3xl font-black text-cyan-200 tracking-tight">
          Sneha MediCare
        </h2>
        <p className="text-xs text-cyan-300 font-semibold tracking-wider uppercase mt-1">
          Agent & Lead Management Portal
        </p>
        <p className="text-xs text-sky-200/75 mt-2">
          Authorized agent for Star Health, LIC of India & Tata AIG
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between border-b border-cyan-900/30 pb-4">
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              Agent Authentication
            </span>
            <Badge variant="outline" className="text-[10px] border-cyan-500/35 text-cyan-300 bg-cyan-950/40">
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
              <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                Agent Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="sneha.chaubal@snehamedicare.in"
                  className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1.5">
                Admin Password / Access Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter SEED_ADMIN_KEY from .env"
                  className="w-full bg-[#0b213c] border border-cyan-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-sky-100 placeholder:text-sky-400/40 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-sky-950 font-bold text-xs py-3 rounded-xl shadow-md shadow-cyan-950/50 transition-all mt-2"
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

          <div className="mt-6 pt-6 border-t border-cyan-900/30 text-center">
            <a
              href="/"
              className="text-xs text-sky-300/70 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              ← Back to Main Public Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
