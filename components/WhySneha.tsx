"use client";

import React from "react";
import { 
  Building2, 
  RotateCcw, 
  Sparkles, 
  Stethoscope, 
  ShieldCheck, 
  Coins, 
  HeartHandshake, 
  PhoneCall, 
  BadgeCheck,
  UserCheck,
  Scale,
  DollarSign,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export const WhySneha = () => {
  return (
    <section id="why-sneha" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            The Personal Agent Advantage
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Why Work With a Dedicated Personal Agent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Instead of an Online Aggregator?
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            When you buy from faceless websites, you are just an anonymous policy number. With Sneha Medicare, you get a trusted, licensed advisor who knows your family by name and answers when it matters most.
          </p>
        </div>

        {/* Bento Grid layout */}
        <BentoGrid>
          {/* Card 1: Direct Human Call (Span 2 cols on md) */}
          <BentoGridItem
            className="md:col-span-2 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border-cyan-500/30"
            title="A Real Human In Your Corner 24/7"
            description="When hospitalization happens unexpectedly at midnight, an online algorithm won't help you with hospital paperwork. You reach Sneha directly on phone or WhatsApp. I liaise with the hospital's TPA desk and insurer claims team to ensure your cashless approval goes through smoothly."
            badge="Direct Human Touch"
            icon={<UserCheck className="w-5 h-5" />}
            header={
              <div className="h-28 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-emerald-950/40 border border-cyan-500/20 p-4 flex items-center justify-around">
                <div className="text-center">
                  <div className="text-xs text-rose-400 font-semibold">Online Aggregator</div>
                  <div className="text-[10px] text-slate-500">IVR Robot & Hold Music</div>
                </div>
                <div className="text-xl font-bold text-cyan-400">VS</div>
                <div className="text-center">
                  <div className="text-sm text-emerald-400 font-bold">Sneha (Personal Advisor)</div>
                  <div className="text-[10px] text-emerald-300/80">Direct Call & WhatsApp</div>
                </div>
              </div>
            }
          />

          {/* Card 2: 100% Unbiased Multi-Insurer Advice */}
          <BentoGridItem
            title="100% Unbiased Multi-Line Advice"
            description="I am an independent licensed advisor representing the Big 3: Star Health for specialized medical shields, Tata AIG for zero-dep car and Schengen travel insurance, and LIC of India for life and family security."
            badge="Star Health • LIC • Tata AIG"
            icon={<Scale className="w-5 h-5" />}
            header={
              <div className="h-28 rounded-xl bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-center items-center">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Zero Bias
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Health • Car • Travel • Life Insurance</span>
              </div>
            }
          />

          {/* Card 3: Zero Extra Fee */}
          <BentoGridItem
            title="Guaranteed Official Pricing (Zero Extra Fee)"
            description="You pay the exact same price as buying directly from the insurance company — with zero agent markups, plus I ensure you receive all eligible multi-year and family discounts."
            badge="100% Free Consultation"
            icon={<DollarSign className="w-5 h-5" />}
            header={
              <div className="h-28 rounded-xl bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-center items-center">
                <div className="text-2xl font-black text-emerald-400">₹0 Extra</div>
                <span className="text-[10px] text-slate-400 mt-1">Regulated IRDAI premium tariffs</span>
              </div>
            }
          />

          {/* Card 4: Hidden Clause Buster */}
          <BentoGridItem
            title="I Filter Out Fine-Print Traps"
            description="I scrutinize policies to protect you from nasty clauses like 1% room rent capping, disease sub-limits, and excessive copayments."
            badge="No Fine-Print Traps"
            icon={<ShieldCheck className="w-5 h-5" />}
            header={
              <div className="h-28 rounded-xl bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-center items-center">
                <div className="text-xl font-bold text-white">Zero Room Rent Penalties</div>
                <span className="text-[11px] text-cyan-400 font-semibold mt-1">100% Bill Clearance</span>
              </div>
            }
          />

          {/* Card 5: Lifelong Personal Relationship */}
          <BentoGridItem
            title="Lifelong Personal Support For Your Family"
            description="Adding a newborn, updating address, switching sum insured tiers, or tax certificates — just send me a WhatsApp message and I take care of everything."
            badge="One Trusted Advisor"
            icon={<HeartHandshake className="w-5 h-5" />}
            header={
              <div className="h-28 rounded-xl bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-center items-center">
                <div className="text-xl font-bold text-white">Direct WhatsApp with Sneha</div>
                <span className="text-[11px] text-emerald-400 font-semibold mt-1">Lifelong Policy Assistance</span>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
};
