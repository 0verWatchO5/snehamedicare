"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  FileSearch,
  Clock,
  Heart,
  Zap,
  HeartHandshake,
  ArrowRight,
  Check,
  Sparkles,
  PhoneCall,
  MessageSquare
} from "lucide-react";
import { AGENT_SERVICES, AgentService } from "@/app/data/insuranceData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onOpenConsultation: (serviceTitle: string) => void;
}

export const ServicesSection = ({ onOpenConsultation }: ServicesSectionProps) => {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    FileSearch,
    Clock,
    Heart,
    Zap,
    HeartHandshake,
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a1e36]/70 border-t border-b border-cyan-500/20">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="amber" className="mb-4">
            Services & Support
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            How I Can Help You as Your{" "}
            <span className="text-gradient-cyan">
              Personal Insurance Advisor
            </span>
          </h2>
          <p className="text-sky-200/80 text-base sm:text-lg">
            I am Sneha, an authorized agent representing <strong className="text-cyan-200">Star Health, LIC of India, and Tata AIG</strong>. Here are the dedicated services I provide across health, car, travel, and life insurance with <strong className="text-amber-300 font-bold">₹0 advisory markup</strong>.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {AGENT_SERVICES.map((srv) => {
            const Icon = iconMap[srv.iconName] || ShieldCheck;
            return (
              <div
                key={srv.id}
                className="rounded-3xl p-7 bg-[#0e2a4d]/80 border border-cyan-500/25 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-200 flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-cyan-200 mb-2 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium mb-3">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-sky-200/70 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-cyan-900/40 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
                      What I Do For You:
                    </div>
                    {srv.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-sky-200/90">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenConsultation(srv.title)}
                    className="w-full text-xs font-bold border-cyan-500/30 bg-[#132f54]/70 hover:bg-[#183d6b] text-sky-200 hover:text-cyan-100"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    Consult Sneha on This Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Policy Review Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#0e2a4d]/90 border border-cyan-500/30 shadow-xl shadow-cyan-950/40 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
              <FileSearch className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-cyan-200 mb-1">
                Already have a health, car, or life policy? Let Sneha audit it for free.
              </h4>
              <p className="text-xs text-sky-200/80 max-w-xl">
                Send your current policy schedule on WhatsApp. I will review it for hidden room-rent caps, zero-dep clauses, or sum insured gaps before your next renewal.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/917400319725?text=Hi%20Sneha,%20I%20would%20like%20a%20free%20audit%20of%20my%20insurance%20policy."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-cyan-950/50"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp My Schedule
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenConsultation("Policy Audit & Portfolio Review")}
              className="w-full sm:w-auto text-xs font-semibold border-cyan-500/30 bg-[#132f54]/80 text-sky-200 hover:bg-[#183d6b]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              Book Audit Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
