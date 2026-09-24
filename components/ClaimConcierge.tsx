"use client";

import React from "react";
import {
  UserCheck,
  CheckCircle2,
  Zap,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const ClaimConcierge = () => {
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
    <section id="concierge" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a1e36]/70 border-t border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="amber" className="mb-4">
            Personal Claim Assistance
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            How I Assist Your Family With{" "}
            <span className="text-gradient-cyan">
              45-Minute Cashless Hospitalization
            </span>
          </h2>
          <p className="text-sky-200/80 text-base sm:text-lg">
            You don't need to navigate hospital billing counters alone. When an emergency strikes, message me and I take over the coordination.
          </p>
        </div>

        {/* 4-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl p-6 bg-[#0e2a4d]/75 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <GlowingEffect variant="cyan" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#1e4677] group-hover:text-cyan-400/50 transition-colors">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-cyan-200 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-sky-200/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-cyan-900/40 flex items-center text-[11px] text-cyan-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Handled by Sneha
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
