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

interface PlanShowcaseProps {
  onSelectPlan: (plan: InsurancePlan) => void;
}

export const PlanShowcase = ({ onSelectPlan }: PlanShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<InsurancePlan | null>(null);

  const categories = [
    { id: "all", label: "All Curated Plans" },
    { id: "family", label: "Family Shield" },
    { id: "senior", label: "Senior Care (60+)" },
    { id: "critical", label: "Critical Illness" },
    { id: "topup", label: "₹1 Cr Super Top-Up" },
    { id: "maternity", label: "Maternity & Newborn" },
  ];

  const filteredPlans = activeTab === "all"
    ? INSURANCE_PLANS
    : INSURANCE_PLANS.filter((p) => p.category === activeTab);

  return (
    <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950/60 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-4">
            Curated Policy Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Handpicked Policies from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              India's Premier Insurers
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Our agents screen 80+ market policies to recommend plans with zero room rent penalties, quickest pre-auth times, and comprehensive coverage.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
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
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                plan.popular
                  ? "bg-slate-900/90 border-teal-500/50 ring-1 ring-teal-500/30 shadow-xl shadow-black/50 -translate-y-1"
                  : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-6">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2 mb-1 pt-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                {/* Underwriter tag */}
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-3">
                  <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{plan.underwriter}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting Premium</span>
                    <div className="text-2xl font-black text-white">
                      ₹{plan.startingPremiumMonthly.toLocaleString()}
                      <span className="text-xs text-slate-400 font-normal"> /mo</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase block">Official Rate</span>
                    <span className="text-xs font-bold text-slate-200">
                      Zero Surcharge
                    </span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Policy Highlights
                  </div>
                  {plan.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Micro specs table */}
                <div className="border-t border-slate-800/80 pt-4 space-y-2 mb-6 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Room Rent:</span>
                    <strong className="text-slate-200">{plan.features.roomRent}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pre & Post Hosp:</span>
                    <strong className="text-slate-200">{plan.features.prePostHosp}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>No-Claim Bonus:</span>
                    <strong className="text-slate-200">{plan.features.noClaimBonus}</strong>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="space-y-2.5 pt-2">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full text-xs font-bold"
                  onClick={() => onSelectPlan(plan)}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Consult Agent on This Plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <button
                  onClick={() => setSelectedPlanDetails(plan)}
                  className="w-full text-center text-xs text-slate-400 hover:text-cyan-400 py-1 transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPlanDetails(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 text-lg cursor-pointer"
              >
                ✕
              </button>

              <Badge variant="emerald" className="mb-2">
                Underwritten by {selectedPlanDetails.underwriter}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-1">
                {selectedPlanDetails.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {selectedPlanDetails.tagline}
              </p>

              <div className="space-y-4 text-xs text-slate-300 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Sum Insured Options:</span>
                    <strong className="text-white">{selectedPlanDetails.sumInsuredOptions.join(", ")}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Room Rent Limits:</span>
                    <strong className="text-white">{selectedPlanDetails.features.roomRent}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Pre & Post Hospitalization:</span>
                    <strong className="text-white">{selectedPlanDetails.features.prePostHosp}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Pre-Existing Condition Waiting:</span>
                    <strong className="text-white">{selectedPlanDetails.features.waitingPeriodPED}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Annual Health Checkup:</span>
                    <strong className="text-white">{selectedPlanDetails.features.healthCheckup}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Day Care Surgeries:</span>
                    <strong className="text-white">{selectedPlanDetails.features.dayCareProcedures}</strong>
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
