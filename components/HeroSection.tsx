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
  Car as Motor,
  Plane,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export const HeroSection = ({ onOpenQuote }: HeroSectionProps) => {
  const [selectedProfile, setSelectedProfile] = useState<"health" | "motor" | "travel" | "life">("health");

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
      id: "motor",
      label: "Motor (Zero Dep)",
      icon: Motor,
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
      {/* Soft atmospheric background with oceanic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-[#0e2a4d]/60 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Trust Agent Pill */}
        <div className="inline-flex items-center flex-wrap justify-center gap-2.5 px-4 py-2 rounded-full bg-[#122e54]/85 border border-cyan-500/30 shadow-md backdrop-blur-md mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            IRDAI Certified Agent
          </span>
          <span className="text-xs font-semibold text-sky-200">
            Star Health • LIC of India • Tata AIG
          </span>
          <span className="text-cyan-700 hidden sm:inline">•</span>
          <span className="text-xs font-semibold text-sky-200 hidden sm:inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-cyan-400" /> Health, Motor, Travel & Life
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-5xl font-extrabold tracking-tight text-cyan-200 max-w-5xl leading-[1.12] mb-6">
          Complete Insurance For Your Health, Motor, Travel & Life From An Agent Who{" "}
          <span className="text-gradient-cyan">
            Actually Answers Your Call.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-base sm:text-2xl text-sky-200/90 font-normal leading-relaxed mb-8">
          Hi, I am <strong className="text-cyan-300 font-bold">Sneha</strong>, your licensed advisor representing <strong className="text-cyan-300 font-bold">Star Health, LIC of India, and Tata AIG</strong>. Whether you need zero room-rent family health cover, zero-dep car insurance, Schengen-compliant travel protection, or guaranteed LIC term security. I compare, issue, and personally stand by your claims.
        </p>

        {/* Partner Insurer Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 text-xs text-sky-300/80">
          <span className="text-sky-300 font-medium">Licensed Agent for:</span>
          {[
            { name: "Star Health Insurance", tag: "Health Specialist" },
            { name: "LIC of India", tag: "Life & Sovereign Protection" },
            { name: "Tata AIG General Insurance", tag: "Motor & Health" },
            { name: "ASEGO Travel Insurance", tag: "Travel" }
          ].map((item) => (
            <span key={item.name} className="px-3.5 py-1.5 rounded-lg bg-[#122e54]/90 border border-cyan-500/25 text-cyan-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{item.name}</span>
              <span className="text-[10px] text-cyan-300/70 font-normal">({item.tag})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
