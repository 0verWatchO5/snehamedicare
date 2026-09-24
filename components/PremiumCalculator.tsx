import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calculator,
  ShieldCheck,
  TrendingDown,
  Check,
  Info,
  ArrowRight,
  Building,
  Users,
  HeartHandshake,
  Motor,
  Plane,
  Shield,
  PhoneCall,
  Clock
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
  const [calcType, setCalcType] = useState<"health" | "car" | "travel" | "life">("health");

  // Health state
  const [age, setAge] = useState<number>(32);
  const [sumInsuredIndex, setSumInsuredIndex] = useState<number>(2); // Default ₹25 Lakh
  const [memberType, setMemberType] = useState<string>("family");
  const [tenure, setTenure] = useState<number>(1);

  // Motor state
  const [carValueIndex, setCarValueIndex] = useState<number>(1); // 8 Lakh
  const [zeroDep, setZeroDep] = useState<boolean>(true);
  const [ncbDiscount, setNcbDiscount] = useState<number>(20); // 20%

  // Travel state
  const [travelDest, setTravelDest] = useState<string>("schengen");
  const [travelDays, setTravelDays] = useState<number>(15);
  const [travelersCount, setTravelersCount] = useState<number>(2);

  // LIC Life state
  const [lifeAge, setLifeAge] = useState<number>(30);
  const [lifeSumIndex, setLifeSumIndex] = useState<number>(1); // ₹1 Crore
  const [lifeTerm, setLifeTerm] = useState<number>(30);

  // Health options
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

  // Motor options
  const carValueTiers = [
    { label: "₹4-6 Lakh", sub: "Hatchback (Swift / Tiago)", base: 6400 },
    { label: "₹8-12 Lakh", sub: "Compact SUV / Sedan (Brezza / Creta)", base: 9800 },
    { label: "₹15-22 Lakh", sub: "Mid-size SUV (Harrier / XUV700)", base: 14500 },
    { label: "₹25+ Lakh", sub: "Premium (Fortuner / EV)", base: 22800 },
  ];

  // Travel options
  const travelDestinations = [
    { id: "schengen", label: "Europe / Schengen", ratePerDay: 85, currency: "€30,000" },
    { id: "usa", label: "USA & Canada", ratePerDay: 140, currency: "$250,000" },
    { id: "asia", label: "Asia / Middle East", ratePerDay: 55, currency: "$50,000" },
    { id: "worldwide", label: "Worldwide", ratePerDay: 120, currency: "$100,000" },
  ];

  // LIC options
  const lifeSumTiers = [
    { label: "₹50 Lakh", baseAnnual: 5800 },
    { label: "₹1 Crore", baseAnnual: 9200 },
    { label: "₹1.5 Crore", baseAnnual: 13400 },
    { label: "₹2 Crore", baseAnnual: 17200 },
  ];

  // Calculations
  // 1. Health
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
  const rawHealthAnnual = Math.round(baseAnnual * currentTier.baseMultiplier * currentMember.factor * ageFactor);
  const healthDiscountRate = tenure === 3 ? 0.15 : tenure === 2 ? 0.10 : 0;
  const healthAnnual = Math.round(rawHealthAnnual * (1 - healthDiscountRate));
  const healthMonthly = Math.round(healthAnnual / 12);
  const healthTaxSaved = Math.round(Math.min(healthAnnual, currentMember.taxLimit) * 0.312);

  // 2. Motor
  const currentCar = carValueTiers[carValueIndex];
  const zeroDepAddon = zeroDep ? 2800 : 0;
  const carBeforeDiscount = currentCar.base + zeroDepAddon;
  const carAnnual = Math.round(carBeforeDiscount * (1 - ncbDiscount / 100));
  const carMonthly = Math.round(carAnnual / 12);

  // 3. Travel
  const currentDest = travelDestinations.find((d) => d.id === travelDest) || travelDestinations[0];
  const travelTotal = Math.round(currentDest.ratePerDay * travelDays * travelersCount);

  // 4. LIC
  const currentLifeSum = lifeSumTiers[lifeSumIndex];
  let lifeAgeMultiplier = 1.0;
  if (lifeAge <= 25) lifeAgeMultiplier = 0.85;
  else if (lifeAge <= 35) lifeAgeMultiplier = 1.0;
  else if (lifeAge <= 45) lifeAgeMultiplier = 1.5;
  else lifeAgeMultiplier = 2.2;
  const lifeAnnual = Math.round(currentLifeSum.baseAnnual * lifeAgeMultiplier);
  const lifeMonthly = Math.round(lifeAnnual / 12);
  const lifeTaxSaved = Math.round(Math.min(lifeAnnual, 150000) * 0.312);

  const handleLockQuote = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    if (calcType === "health") {
      onSelectQuote({
        age,
        sumInsured: currentTier.label,
        members: currentMember.label,
        monthlyPremium: healthMonthly,
        annualPremium: healthAnnual,
        taxSavings: healthTaxSaved,
      });
    } else if (calcType === "car") {
      onSelectQuote({
        age: 30,
        sumInsured: `Motor: ${currentCar.label} (NCB ${ncbDiscount}%)`,
        members: zeroDep ? "Zero Depreciation" : "Comprehensive",
        monthlyPremium: carMonthly,
        annualPremium: carAnnual,
        taxSavings: 0,
      });
    } else if (calcType === "travel") {
      onSelectQuote({
        age: 30,
        sumInsured: `Travel: ${currentDest.label} (${currentDest.currency})`,
        members: `${travelersCount} Travelers, ${travelDays} Days`,
        monthlyPremium: travelTotal,
        annualPremium: travelTotal,
        taxSavings: 0,
      });
    } else {
      onSelectQuote({
        age: lifeAge,
        sumInsured: `LIC Life: ${currentLifeSum.label}`,
        members: `${lifeTerm} Year Term`,
        monthlyPremium: lifeMonthly,
        annualPremium: lifeAnnual,
        taxSavings: lifeTaxSaved,
      });
    }
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="amber" className="mb-4">
            Interactive Multi-Insurance Calculator
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            Official Pricing.{" "}
            <span className="text-gradient-cyan">
              Zero Agent Markup.
            </span>
          </h2>
          <p className="text-sky-200/80 text-base sm:text-lg">
            Calculate exact premiums for Health, Motor, Travel, and Life insurance underwritten by Star Health, Tata AIG, and LIC.
          </p>
        </div>

        {/* Insurance Type Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {[
            { id: "health", label: "Health Insurance", underwriter: "Star Health & Tata AIG", icon: ShieldCheck },
            { id: "car", label: "Motor Insurance (Zero Dep)", underwriter: "Tata AIG Auto", icon: Motor },
            { id: "travel", label: "Travel & Schengen Visa", underwriter: "Tata AIG Travel", icon: Plane },
            { id: "life", label: "LIC Term & Life", underwriter: "LIC of India", icon: HeartHandshake },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = calcType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCalcType(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${isSelected
                    ? "bg-[#183d6b] border-cyan-400/80 text-cyan-200 shadow-md ring-1 ring-cyan-400/50"
                    : "bg-[#0e2a4d]/70 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200 hover:bg-[#132f54]"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-sky-400/60"}`} />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <span className="text-[10px] text-cyan-300/70 font-normal block">{tab.underwriter}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl space-y-7">

            {/* 1. HEALTH CALCULATOR CONTROLS */}
            {calcType === "health" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      1. Select Members to Cover
                    </span>
                    <span className="text-xs text-sky-300/70 font-normal">Star Health / Tata AIG</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {memberOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setMemberType(opt.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col justify-between ${memberType === opt.id
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200 hover:border-cyan-500/40"
                          }`}
                      >
                        <span>{opt.label.split("(")[0]}</span>
                        <span className="text-[10px] text-sky-300/60 font-normal mt-1">
                          {opt.label.includes("(") ? `(${opt.label.split("(")[1]}` : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-sky-100 flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-cyan-400" />
                      2. Age of Eldest Member:{" "}
                      <span className="text-cyan-300 font-bold text-lg">{age} years</span>
                    </label>
                    <span className="text-xs text-sky-300/70">18 - 75 Yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="75"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-[#122e54] rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      3. Choose Sum Insured (Coverage Amount)
                    </span>
                    <span className="text-xs text-cyan-300 font-medium">100% Unlimited Restores</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {sumInsuredTiers.map((tier, idx) => (
                      <button
                        key={tier.label}
                        onClick={() => setSumInsuredIndex(idx)}
                        className={`py-3 px-2 rounded-xl border text-center transition-all ${sumInsuredIndex === idx
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 font-bold shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 font-medium hover:text-cyan-200 hover:border-cyan-500/40"
                          }`}
                      >
                        <div className="text-xs">{tier.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    4. Policy Tenure (Multi-Year Discount)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { yr: 1, label: "1 Year", badge: "Standard" },
                      { yr: 2, label: "2 Years", badge: "Save 10%" },
                      { yr: 3, label: "3 Years", badge: "Save 15%" },
                    ].map((t) => (
                      <button
                        key={t.yr}
                        onClick={() => setTenure(t.yr)}
                        className={`p-3 rounded-xl border text-center transition-all ${tenure === t.yr
                            ? "bg-amber-500/20 border-amber-400/80 text-amber-200 font-bold shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        <div className="text-xs font-bold">{t.label}</div>
                        <span className="text-[10px] text-amber-300/90 font-medium">{t.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 2. CAR INSURANCE CONTROLS */}
            {calcType === "car" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Motor className="w-4 h-4 text-cyan-400" />
                      1. Select Vehicle Segment & Approximate Value (IDV)
                    </span>
                    <span className="text-xs text-sky-300/70 font-normal">Tata AIG Auto Secure</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {carValueTiers.map((tier, idx) => (
                      <button
                        key={tier.label}
                        onClick={() => setCarValueIndex(idx)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${carValueIndex === idx
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        <div className="text-sm font-bold text-cyan-200">{tier.label}</div>
                        <div className="text-[11px] text-sky-300/70 mt-0.5">{tier.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    2. Bumper-to-Bumper Zero Depreciation Add-on
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setZeroDep(true)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${zeroDep
                          ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm"
                          : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80"
                        }`}
                    >
                      <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Include Zero-Dep (Recommended)
                      </div>
                      <div className="text-[11px] text-sky-200/70 mt-1">100% replacement cost for plastic, fiber & metal parts</div>
                    </button>
                    <button
                      onClick={() => setZeroDep(false)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${!zeroDep
                          ? "bg-[#183d6b] border-cyan-500/60 text-cyan-200 shadow-sm"
                          : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80"
                        }`}
                    >
                      <div className="text-xs font-bold text-sky-200">Standard Comprehensive</div>
                      <div className="text-[11px] text-sky-300/60 mt-1">Includes standard depreciation deductions</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-amber-400" />
                      3. Existing No Claim Bonus (NCB Transfer)
                    </span>
                    <span className="text-xs text-amber-300 font-semibold">{ncbDiscount}% Discount Applied</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[0, 20, 35, 50].map((ncb) => (
                      <button
                        key={ncb}
                        onClick={() => setNcbDiscount(ncb)}
                        className={`py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${ncbDiscount === ncb
                            ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        {ncb}% NCB
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 3. TRAVEL INSURANCE CONTROLS */}
            {calcType === "travel" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-cyan-400" />
                      1. Destination & Medical Visa Compliance
                    </span>
                    <span className="text-xs text-sky-300/70 font-normal">Tata AIG Travel Guard</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {travelDestinations.map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => setTravelDest(dest.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${travelDest === dest.id
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        <div className="text-xs font-bold text-cyan-200">{dest.label}</div>
                        <div className="text-[11px] text-cyan-300/80 mt-0.5">Emergency Cover: {dest.currency}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-sky-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      2. Trip Duration: <span className="text-cyan-300 font-bold text-lg">{travelDays} Days</span>
                    </label>
                    <span className="text-xs text-sky-300/70">Up to 90 days</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="90"
                    value={travelDays}
                    onChange={(e) => setTravelDays(Number(e.target.value))}
                    className="w-full h-2 bg-[#122e54] rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    3. Number of Travelers
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        onClick={() => setTravelersCount(count)}
                        className={`py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${travelersCount === count
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        {count} {count > 1 ? "Travelers" : "Traveler"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 4. LIC LIFE & TERM CONTROLS */}
            {calcType === "life" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      1. Select Term Life Cover (Sum Assured)
                    </span>
                    <span className="text-xs text-amber-300 font-semibold">100% Sovereign Guarantee</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {lifeSumTiers.map((tier, idx) => (
                      <button
                        key={tier.label}
                        onClick={() => setLifeSumIndex(idx)}
                        className={`py-3 px-2 rounded-xl border text-center transition-all ${lifeSumIndex === idx
                            ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-200 font-bold shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        <div className="text-xs">{tier.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-sky-100 flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      2. Entry Age: <span className="text-cyan-300 font-bold text-lg">{lifeAge} years</span>
                    </label>
                    <span className="text-xs text-sky-300/70">18 - 60 Yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="60"
                    value={lifeAge}
                    onChange={(e) => setLifeAge(Number(e.target.value))}
                    className="w-full h-2 bg-[#122e54] rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-100 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    3. Policy Coverage Term (Years)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[20, 30, 40].map((t) => (
                      <button
                        key={t}
                        onClick={() => setLifeTerm(t)}
                        className={`py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${lifeTerm === t
                            ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                            : "bg-[#0b213c]/80 border-cyan-900/40 text-sky-200/80 hover:text-cyan-200"
                          }`}
                      >
                        {t} Years Protection
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Premium Breakdown & Result Card */}
          <div className="lg:col-span-5 bg-[#0e2a4d]/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-cyan-900/40">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {calcType === "health" && "Star Health & Tata AIG"}
                  {calcType === "car" && "Tata AIG Auto Secure"}
                  {calcType === "travel" && "Tata AIG Travel Guard"}
                  {calcType === "life" && "LIC of India Term Plan"}
                </span>
                <div className="text-sm text-sky-200/90 font-medium mt-0.5">
                  {calcType === "health" && `${currentMember.label.split("(")[0]} • Age ${age}`}
                  {calcType === "car" && `${currentCar.label} • ${zeroDep ? "Zero Dep" : "Comprehensive"}`}
                  {calcType === "travel" && `${currentDest.label} • ${travelDays} Days`}
                  {calcType === "life" && `LIC Tech Term • Age ${lifeAge} • ${lifeTerm} Yrs`}
                </div>
              </div>
              <Badge variant="amber">
                {calcType === "health" && `${currentTier.label} Cover`}
                {calcType === "car" && "Instant Cashless"}
                {calcType === "travel" && `${currentDest.currency}`}
                {calcType === "life" && `${currentLifeSum.label} Cover`}
              </Badge>
            </div>

            {/* Pricing Big Numbers */}
            <div className="py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-cyan-200 tracking-tight">
                    {calcType === "health" && `₹${healthMonthly.toLocaleString()}`}
                    {calcType === "car" && `₹${carAnnual.toLocaleString()}`}
                    {calcType === "travel" && `₹${travelTotal.toLocaleString()}`}
                    {calcType === "life" && `₹${lifeMonthly.toLocaleString()}`}
                    <span className="text-sm font-medium text-sky-300/70">
                      {calcType === "health" || calcType === "life" ? " /month" : " total"}
                    </span>
                  </div>
                  <div className="text-xs text-sky-300/70 mt-1">
                    {calcType === "health" && `Billed as ₹${healthAnnual.toLocaleString()} for ${tenure} yr(s) incl. GST`}
                    {calcType === "car" && `Annual premium with ${ncbDiscount}% NCB discount & 24/7 roadside assistance`}
                    {calcType === "travel" && `Total policy premium for ${travelersCount} traveler(s) for ${travelDays} days`}
                    {calcType === "life" && `Annual ₹${lifeAnnual.toLocaleString()} backed by Govt of India Sovereign Guarantee`}
                  </div>
                </div>
              </div>

              {/* Tax Benefit Box for Health & Life */}
              {(calcType === "health" || calcType === "life") && (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/25 flex items-center justify-center text-amber-300 font-bold text-xs">
                      {calcType === "health" ? "80D" : "80C"}
                    </div>
                    <div>
                      <div className="text-xs font-bold">
                        {calcType === "health" ? "Estimated Sec 80D Tax Saved" : "Section 80C Tax Exemption"}
                      </div>
                      <div className="text-[11px] text-amber-300/80">Reduces your net annual tax outgo</div>
                    </div>
                  </div>
                  <div className="text-right font-black text-base text-amber-300">
                    ₹{(calcType === "health" ? healthTaxSaved : lifeTaxSaved).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Inclusions */}
            <div className="pt-4 border-t border-cyan-900/40 space-y-2 mb-7">
              <div className="text-xs font-semibold text-sky-200 uppercase tracking-wider mb-2">
                Guaranteed Inclusions
              </div>
              {(calcType === "health"
                ? [
                  "Zero Room Rent Capping (Any single AC room)",
                  "100% Unlimited Restores for unrelated illnesses",
                  "45-Minute Cashless Pre-Auth at 14,000+ Hospitals",
                  "Free Annual Full-Body Preventive Health Checkup"
                ]
                : calcType === "car"
                  ? [
                    "Bumper-to-Bumper Zero Depreciation coverage",
                    "Access to 7,500+ Tata AIG cashless network garages",
                    "24/7 Spot Roadside Assistance & towing support",
                    "Key replacement & personal accident cover"
                  ]
                  : calcType === "travel"
                    ? [
                      "Embassy approved Schengen / US visa compliance",
                      "Worldwide cashless hospital emergency coverage",
                      "Passport theft, flight delay & lost baggage compensation",
                      "Emergency medical evacuation back to India"
                    ]
                    : [
                      "100% Sovereign Guarantee under Section 37 of LIC Act",
                      "Tax-free claim payout under Section 10(10D)",
                      "Lowest non-smoker term insurance rates",
                      "Personal claim settlement advocacy by Sneha"
                    ]
              ).map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-sky-200">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Lock Quote CTA */}
            <Button
              variant="default"
              size="lg"
              onClick={handleLockQuote}
              className="w-full text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" />
              Lock Official Quote & Get Direct Call
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center mt-3 text-[11px] text-sky-300/60 flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              Official company rates. Zero spam, 100% confidential.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
