"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  HeartHandshake,
  Building2,
  Zap,
  HelpCircle,
  FileText,
  BadgeCheck
} from "lucide-react";
import { INSURANCE_PLANS, InsurancePlan } from "@/app/data/insuranceData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface PlanShowcaseProps {
  onSelectPlan: (plan: InsurancePlan) => void;
}

export const PlanShowcase = ({ onSelectPlan }: PlanShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<InsurancePlan | null>(null);

  const categories = [
    { id: "all", label: "All Curated Plans" },
    { id: "family", label: "Health (Star & Tata)" },
    { id: "car", label: "Motor & Motor (Tata AIG)" },
    { id: "travel", label: "Travel & Schengen (Tata AIG)" },
    { id: "life", label: "Life & Term (LIC)" },
    { id: "senior", label: "Senior Care (Star Health)" },
  ];

  const filteredPlans = activeTab === "all"
    ? INSURANCE_PLANS
    : INSURANCE_PLANS.filter((p) => p.category === activeTab);

  return (
    <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a1e36]/70 border-t border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-4">
            Curated Policy Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            Curated Policies from{" "}
            <span className="text-gradient-cyan">
              Star Health, LIC & Tata AIG
            </span>
          </h2>
          <p className="text-sky-200/80 text-base sm:text-lg">
            Compare official plans across Health, Zero-Dep Motor, Schengen Travel, and LIC Life Insurance with personal 1-on-1 claim advocacy.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === cat.id
                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-950/40"
                  : "bg-[#0e2a4d]/70 text-sky-200/80 hover:text-cyan-200 hover:bg-[#132f54] border border-cyan-900/40"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border group hover:shadow-2xl hover:shadow-cyan-500/25 ${plan.popular
                  ? "bg-[#0e2a4d]/95 border-cyan-400/60 ring-1 ring-cyan-400/30 shadow-2xl shadow-cyan-950/60 -translate-y-1"
                  : "bg-[#0e2a4d]/75 border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#12335c]/90"
                }`}
            >
              <GlowingEffect variant="cyan" glow={plan.popular} />

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-6 z-20">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-1 pt-2">
                  <h3 className="text-xl font-bold text-cyan-200 tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                {/* Underwriter tag */}
                <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold mb-3">
                  <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{plan.underwriter}</span>
                </div>

                <p className="text-xs text-sky-200/70 leading-relaxed mb-6">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#0b213c]/80 border border-cyan-900/40 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-sky-300/70 block">Starting Premium</span>
                    <div className="text-2xl font-black text-cyan-200">
                      ₹{plan.startingPremiumMonthly.toLocaleString()}
                      <span className="text-xs text-sky-300/70 font-normal"> /mo</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-amber-300 font-semibold uppercase block">Official Rate</span>
                    <span className="text-xs font-bold text-sky-200">
                      Zero Surcharge
                    </span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-semibold text-sky-200 uppercase tracking-wider">
                    Policy Highlights
                  </div>
                  {plan.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-sky-200/90 leading-relaxed">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Micro specs table */}
                <div className="border-t border-cyan-900/40 pt-4 space-y-2 mb-6 text-xs text-sky-300/70">
                  <div className="flex justify-between">
                    <span>Room Rent:</span>
                    <strong className="text-sky-100">{plan.features.roomRent}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pre & Post Hosp:</span>
                    <strong className="text-sky-100">{plan.features.prePostHosp}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>No-Claim Bonus:</span>
                    <strong className="text-sky-100">{plan.features.noClaimBonus}</strong>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="relative z-10 space-y-2.5 pt-4">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full text-xs font-bold border-cyan-500/30 bg-[#132f54]/70 hover:bg-[#183d6b] text-sky-200 hover:text-cyan-100 cursor-pointer"
                  onClick={() => onSelectPlan(plan)}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Consult Agent on This Plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <button
                  onClick={() => setSelectedPlanDetails(plan)}
                  className="w-full text-center text-xs text-sky-300/70 hover:text-cyan-300 py-1 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  View Full Benefit Breakdown
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Detail Modal */}
        {selectedPlanDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061528]/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0e2a4d] border border-cyan-500/30 max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPlanDetails(null)}
                className="absolute top-5 right-5 text-sky-300 hover:text-cyan-200 p-2 rounded-full hover:bg-[#143157] text-lg cursor-pointer"
              >
                ✕
              </button>

              <Badge variant="amber" className="mb-2">
                Underwritten by {selectedPlanDetails.underwriter}
              </Badge>
              <h3 className="text-2xl font-bold text-cyan-200 mb-1">
                {selectedPlanDetails.name}
              </h3>
              <p className="text-xs text-sky-200/70 mb-6">
                {selectedPlanDetails.tagline}
              </p>

              <div className="space-y-4 text-xs text-sky-200 mb-6">
                <div className="p-4 rounded-xl bg-[#0b213c]/80 border border-cyan-900/40 space-y-2">
                  <div className="flex justify-between py-1 border-b border-cyan-900/40">
                    <span className="text-sky-300/70">Sum Insured Options:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.sumInsuredOptions.join(", ")}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cyan-900/40">
                    <span className="text-sky-300/70">Room Rent Limits:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.features.roomRent}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cyan-900/40">
                    <span className="text-sky-300/70">Pre & Post Hospitalization:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.features.prePostHosp}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cyan-900/40">
                    <span className="text-sky-300/70">Pre-Existing Condition Waiting:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.features.waitingPeriodPED}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cyan-900/40">
                    <span className="text-sky-300/70">Annual Health Checkup:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.features.healthCheckup}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sky-300/70">Day Care Surgeries:</span>
                    <strong className="text-cyan-200">{selectedPlanDetails.features.dayCareProcedures}</strong>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="default"
                  className="w-full font-bold text-xs"
                  onClick={() => {
                    const plan = selectedPlanDetails;
                    setSelectedPlanDetails(null);
                    onSelectPlan(plan);
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Connect With Sneha Advisor
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
