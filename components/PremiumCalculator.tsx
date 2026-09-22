"use client";

import React, { useState, useId } from "react";
import confetti from "canvas-confetti";
import { 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  TrendingDown, 
  Check, 
  Info, 
  ArrowRight, 
  Building, 
  Users, 
  HeartHandshake 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PremiumCalculatorProps {
  onSelectQuote: (quoteDetails: {
    age: number;
    sumInsured: string;
    members: string;
    monthlyPremium: number;
    annualPremium: number;
    taxSavings: number;
  }) => void;
}

export const PremiumCalculator = ({ onSelectQuote }: PremiumCalculatorProps) => {
  const [age, setAge] = useState<number>(32);
  const [sumInsuredIndex, setSumInsuredIndex] = useState<number>(2); // Default ₹25 Lakh
  const [memberType, setMemberType] = useState<string>("family"); // individual, couple, family, parents
  const [tenure, setTenure] = useState<number>(1); // 1 yr, 2 yrs (10% off), 3 yrs (15% off)

  const sumInsuredTiers = [
    { label: "₹5 Lakh", value: 500000, baseMultiplier: 1.0 },
    { label: "₹10 Lakh", value: 1000000, baseMultiplier: 1.35 },
    { label: "₹25 Lakh", value: 2500000, baseMultiplier: 1.75 },
    { label: "₹50 Lakh", value: 5000000, baseMultiplier: 2.2 },
    { label: "₹1 Crore", value: 10000000, baseMultiplier: 2.8 },
  ];

  const memberOptions = [
    { id: "individual", label: "Individual (1 Adult)", factor: 1.0, taxLimit: 25000 },
    { id: "couple", label: "Self + Spouse (2 Adults)", factor: 1.6, taxLimit: 25000 },
    { id: "family", label: "Family (2 Adults + 2 Kids)", factor: 1.95, taxLimit: 25000 },
    { id: "parents", label: "Senior Parents (60+)", factor: 2.4, taxLimit: 50000 },
  ];

  // Calculate premium based on Age, Sum Insured, Members, and Tenure discount
  const currentTier = sumInsuredTiers[sumInsuredIndex];
  const currentMember = memberOptions.find((m) => m.id === memberType) || memberOptions[2];

  let ageFactor = 1.0;
  if (age < 25) ageFactor = 0.85;
  else if (age <= 35) ageFactor = 1.0;
  else if (age <= 45) ageFactor = 1.35;
  else if (age <= 55) ageFactor = 1.85;
  else if (age <= 65) ageFactor = 2.65;
  else ageFactor = 3.4;

  const baseAnnual = 6800;
  const rawAnnual = Math.round(baseAnnual * currentTier.baseMultiplier * currentMember.factor * ageFactor);
  
  // Tenure discounts: 2 years (10% discount), 3 years (15% discount)
  const discountRate = tenure === 3 ? 0.15 : tenure === 2 ? 0.10 : 0;
  const discountedAnnual = Math.round(rawAnnual * (1 - discountRate));
  const monthlyEquivalent = Math.round(discountedAnnual / 12);

  // Tax calculation under Section 80D (30% tax bracket estimated savings)
  const estimatedTaxSavings = Math.round(Math.min(discountedAnnual, currentMember.taxLimit) * 0.312);
  const effectiveMonthlyCost = Math.max(0, Math.round((discountedAnnual - estimatedTaxSavings) / 12));

  const handleLockQuote = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    onSelectQuote({
      age,
      sumInsured: currentTier.label,
      members: currentMember.label,
      monthlyPremium: monthlyEquivalent,
      annualPremium: discountedAnnual,
      taxSavings: estimatedTaxSavings,
    });
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-4">
            Interactive Premium Calculator
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Transparent Pricing.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Zero Hidden Clauses.
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Customize your health shield in real time. See exact monthly costs and Section 80D tax deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {/* 1. Who to Insure */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  1. Select Members to Cover
                </span>
                <span className="text-xs text-slate-400 font-normal">Choose family composition</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {memberOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMemberType(opt.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col justify-between ${
                      memberType === opt.id
                        ? "bg-teal-500/15 border-teal-500/80 text-teal-200 shadow-sm"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span>{opt.label.split("(")[0]}</span>
                    <span className="text-[10px] text-slate-500 font-normal mt-1">
                      {opt.label.includes("(") ? `(${opt.label.split("(")[1]}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Eldest Member Age Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-teal-400" />
                  2. Age of Eldest Member:{" "}
                  <span className="text-teal-400 font-bold text-lg">{age} years</span>
                </label>
                <span className="text-xs text-slate-400">Range: 18 - 75 Yrs</span>
              </div>
              <input
                type="range"
                min="18"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>18 Yrs (Young Pro)</span>
                <span>35 Yrs (Prime Family)</span>
                <span>55 Yrs (Mid Senior)</span>
                <span>75 Yrs (Senior Care)</span>
              </div>
            </div>

            {/* 3. Desired Sum Insured */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  3. Choose Sum Insured (Coverage Amount)
                </span>
                <span className="text-xs text-emerald-400 font-medium">100% Unlimited Restores</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {sumInsuredTiers.map((tier, idx) => (
                  <button
                    key={tier.label}
                    onClick={() => setSumInsuredIndex(idx)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      sumInsuredIndex === idx
                        ? "bg-emerald-500/15 border-emerald-500/80 text-emerald-200 font-bold shadow-sm"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 font-medium hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs">{tier.label}</div>
                    {tier.label === "₹1 Crore" && (
                      <span className="inline-block text-[9px] text-emerald-400 mt-0.5 font-bold uppercase">
                        Mega Cover
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Policy Tenure & Discount Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                  4. Select Policy Tenure (Multi-Year Discount)
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { yr: 1, label: "1 Year", badge: "Standard" },
                  { yr: 2, label: "2 Years", badge: "Save 10%" },
                  { yr: 3, label: "3 Years", badge: "Save 15%" },
                ].map((t) => (
                  <button
                    key={t.yr}
                    onClick={() => setTenure(t.yr)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      tenure === t.yr
                        ? "bg-amber-500/15 border-amber-500/80 text-amber-200 font-bold shadow-sm"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{t.label}</div>
                    <span className="text-[10px] text-amber-400/90 font-medium">{t.badge}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Premium Breakdown & Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Calculated Premium
                </span>
                <div className="text-sm text-slate-300 font-medium mt-0.5">
                  {currentMember.label.split("(")[0]} • Age {age}
                </div>
              </div>
              <Badge variant="emerald">
                {currentTier.label} Cover
              </Badge>
            </div>

            {/* Pricing Big Numbers */}
            <div className="py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ₹{monthlyEquivalent.toLocaleString()}
                    <span className="text-sm font-medium text-slate-400"> /month</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Billed as ₹{discountedAnnual.toLocaleString()} for {tenure} {tenure > 1 ? "years" : "year"} (incl. GST)
                  </div>
                </div>
              </div>

              {/* Tax Benefit Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-xs">
                    80D
                  </div>
                  <div>
                    <div className="text-xs font-bold">Estimated Section 80D Tax Saved</div>
                    <div className="text-[11px] text-emerald-400/80">Reduces effective tax outgo</div>
                  </div>
                </div>
                <div className="text-right font-black text-base text-emerald-300">
                  ₹{estimatedTaxSavings.toLocaleString()}
                </div>
              </div>

              {/* Effective Monthly Cost after Tax Savings */}
              <div className="text-xs text-slate-300 flex items-center justify-between px-1">
                <span>Effective monthly cost after tax deduction:</span>
                <strong className="text-cyan-400 font-bold text-sm">
                  ₹{effectiveMonthlyCost.toLocaleString()} /mo
                </strong>
              </div>
            </div>

            {/* Included Super Benefits */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 mb-8">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Guaranteed Policy Inclusions
              </div>
              {[
                "Zero Room Rent Capping (Any single AC room)",
                "100% Unlimited Restores for unrelated illnesses",
                "45-Minute Cashless Pre-Auth at 12,000+ Hospitals",
                "Free Annual Full-Body Preventive Health Checkup",
                "540+ Day Care & Robotic Surgeries Included"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Lock Quote CTA */}
            <Button
              variant="glow"
              size="lg"
              onClick={handleLockQuote}
              className="w-full text-sm font-bold shadow-lg shadow-cyan-500/25"
            >
              <Sparkles className="w-4 h-4" />
              Lock This Quote & Get Callback
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center mt-3 text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              Instant quote, no spam policy, 100% confidential.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
