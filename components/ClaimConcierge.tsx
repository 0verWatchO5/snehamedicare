"use client";

import React, { useState } from "react";
import { 
  Clock, 
  ShieldCheck, 
  Send, 
  UserCheck, 
  Building, 
  CheckCircle2, 
  FileText, 
  PhoneCall, 
  Sparkles, 
  Search,
  Zap,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ClaimConcierge = () => {
  const [claimInput, setClaimInput] = useState<string>("SNEHA-9942");

  const steps = [
    {
      num: "01",
      title: "1-Min WhatsApp Intimation",
      desc: "Send a photo of the doctor's prescription or hospital admission advice to Sneha on WhatsApp.",
      badge: "Direct to Sneha",
      icon: MessageSquare,
    },
    {
      num: "02",
      title: "Hospital TPA Coordination",
      desc: "Sneha contacts the hospital billing/TPA desk directly to ensure all paperwork is filed properly.",
      badge: "Personal Follow-up",
      icon: UserCheck,
    },
    {
      num: "03",
      title: "Express Pre-Auth Approval",
      desc: "Sneha tracks the file with the insurer medical desk to expedite cashless pre-auth within 45 mins.",
      badge: "Fast-Track",
      icon: Zap,
    },
    {
      num: "04",
      title: "Zero Out-of-Pocket Stress",
      desc: "Treatment starts seamlessly in your private room with bills settled directly by the insurer.",
      badge: "Peace of Mind",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="concierge" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="amber" className="mb-4">
            Personal Claim Assistance
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How I Assist Your Family With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
              45-Minute Cashless Hospitalization
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            You don't need to navigate hospital billing counters alone. When an emergency strikes, message me and I take over the coordination.
          </p>
        </div>

        {/* 4-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl p-6 bg-slate-900/50 border border-slate-800 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-700 group-hover:text-cyan-400/40 transition-colors">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Handled by Sneha
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Claim Tracker Simulator */}
        <div className="bg-gradient-to-b from-slate-900/80 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4" /> Live Claim Assistance Simulator
              </span>
              <h3 className="text-2xl font-black text-white">
                Track Real-Time Cashless Pre-Authorization
              </h3>
            </div>

            {/* Quick Claim ID search */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value.toUpperCase())}
                  placeholder="e.g., SNEHA-9942"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                />
              </div>
              <Button variant="default" size="sm" className="text-xs font-bold">
                <Search className="w-3.5 h-3.5" />
                Track
              </Button>
            </div>
          </div>

          {/* Claim Status Mock Dashboard */}
          <div className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Claim Reference ID</span>
                <strong className="text-sm font-mono text-cyan-300 font-bold tracking-wider">
                  {claimInput || "SNEHA-9942"}
                </strong>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Hospital Network</span>
                <strong className="text-sm text-white font-bold block truncate">
                  Apollo Multispeciality, Belapur
                </strong>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Dedicated Advisor</span>
                <strong className="text-sm text-emerald-400 font-bold flex items-center gap-1">
                  Sneha (Direct Contact)
                </strong>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Pre-Auth Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  APPROVED (₹3,50,000)
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="relative">
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                {[
                  { title: "Intimation to Sneha", time: "11:02 PM", status: "completed", desc: "Admission advice received via WhatsApp" },
                  { title: "Sneha Liaised with TPA", time: "11:14 PM", status: "completed", desc: "Hospital TPA desk contacted directly" },
                  { title: "Pre-Auth Transmitted", time: "11:36 PM", status: "completed", desc: "Express cashless approval issued" },
                  { title: "Admission Cleared", time: "11:38 PM", status: "active", desc: "Patient admitted in Single AC Room" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-300 text-xs font-bold mb-2 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      ✓
                    </div>
                    <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                    <span className="text-[10px] text-cyan-400 font-mono font-medium mb-1">{item.time}</span>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Turnaround Time: <strong className="text-white">34 Minutes</strong> (Within 45-Min Target)</span>
              </div>
              <a
                href="tel:9876543210"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Need Emergency Assistance? Call Sneha directly at +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
