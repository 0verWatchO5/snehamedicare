"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Users, 
  User, 
  Heart, 
  Shield, 
  CheckCircle2, 
  Hospital, 
  PhoneCall, 
  Zap, 
  Award,
  Building2,
  Check,
  UserCheck,
  Car,
  Plane,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onOpenQuote: () => void;
  onOpenTracker: () => void;
}

export const HeroSection = ({ onOpenQuote, onOpenTracker }: HeroSectionProps) => {
  const [selectedProfile, setSelectedProfile] = useState<"health" | "car" | "travel" | "life">("health");

  const profileOptions = [
    {
      id: "health",
      label: "Health & Family Floater",
      icon: ShieldCheck,
      desc: "Zero room rent capping, 100% restore & hospital bedside advocacy",
      startingAt: "₹980/mo",
      cover: "Up to ₹1 Crore"
    },
    {
      id: "car",
      label: "Car & Motor (Zero Dep)",
      icon: Car,
      desc: "Bumper-to-bumper zero dep, 7,500+ cashless garages & 24/7 towing",
      startingAt: "₹690/mo",
      cover: "Full IDV Protection"
    },
    {
      id: "travel",
      label: "Travel & Schengen Visa",
      icon: Plane,
      desc: "Embassy approved overseas medical, baggage loss & trip delay",
      startingAt: "₹420/trip",
      cover: "Up to $500,000"
    },
    {
      id: "life",
      label: "LIC Pure Term & Life",
      icon: HeartHandshake,
      desc: "Govt of India sovereign guarantee with Sec 80C & 10(10D) tax benefits",
      startingAt: "₹790/mo",
      cover: "Up to ₹2 Crore"
    }
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Soft atmospheric background, no harsh spotlights or wireframe grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#060d17] to-[#060d17] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Trust Agent Pill - Authentic, clean, professional credential */}
        <div className="inline-flex items-center flex-wrap justify-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-sm backdrop-blur-md mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            IRDAI Certified Agent
          </span>
          <span className="text-xs font-medium text-slate-200">
            Star Health • LIC of India • Tata AIG
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs font-medium text-slate-300 hidden sm:inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Health, Car, Travel & Life
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.12] mb-6">
          Complete Insurance For Your Health, Car, Travel & Life From An Agent Who{" "}
          <span className="text-emerald-400">
            Actually Answers Your Call.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
          Hi, I am <strong>Sneha</strong>, your licensed advisor representing <strong>Star Health, LIC of India, and Tata AIG</strong>. Whether you need zero room-rent family health cover, zero-dep car insurance, Schengen-compliant travel protection, or guaranteed LIC term security — I compare, issue, and personally stand by your claims.
        </p>

        {/* Partner Insurer Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 text-xs text-slate-400">
          <span className="text-slate-500 font-medium">Licensed Agent for:</span>
          {[
            { name: "Star Health Insurance", tag: "Health Specialist" },
            { name: "LIC of India", tag: "Life & Sovereign Protection" },
            { name: "Tata AIG General Insurance", tag: "Car, Travel & Health" },
          ].map((item) => (
            <span key={item.name} className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{item.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">({item.tag})</span>
            </span>
          ))}
        </div>

        {/* Quick Profile Interactive Selector */}
        <div className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-xl mb-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Who are we protecting today?
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              Official Insurer Pricing • ₹0 Consultation Fee
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {profileOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedProfile === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedProfile(opt.id as any)}
                  className={`relative text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-slate-800/90 border-teal-500/70 ring-1 ring-teal-500/40 shadow-lg shadow-black/40"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-teal-400" />
                  )}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-teal-500/20 text-teal-300" : "bg-slate-800 text-slate-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-white mb-1 line-clamp-1">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mb-2 line-clamp-1">
                    {opt.desc}
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span>From {opt.startingAt}</span>
                    <span className="text-[10px] text-slate-400">{opt.cover}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Unbiased Advice Across Insurers
              </span>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Room Rent Penalties
              </span>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Direct WhatsApp with Sneha
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                onClick={onOpenQuote}
                className="w-full sm:w-auto font-bold text-sm px-7"
              >
                <PhoneCall className="w-4 h-4" />
                Speak Directly with Sneha
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Live Trust Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-black text-white">
              Top 6+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Underwriter Partners</div>
            <div className="text-[11px] text-slate-400">Star, HDFC, Care & More</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-black text-white">
              12,000+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Cashless Hospitals</div>
            <div className="text-[11px] text-slate-400">Personal TPA coordination</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-black text-white">
              45 Mins
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Cashless Pre-Auth Target</div>
            <div className="text-[11px] text-slate-400">Sneha follows up directly</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              ₹0 Fee
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">100% Free Consultation</div>
            <div className="text-[11px] text-slate-400">Official Insurer Rates Only</div>
          </div>
        </div>
      </div>
    </div>
  );
};
