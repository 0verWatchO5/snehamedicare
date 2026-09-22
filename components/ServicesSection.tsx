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
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950/70 border-t border-b border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-4">
            Services & Support
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How I Can Help You as Your{" "}
            <span className="text-emerald-400">
              Personal Insurance Advisor
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            I am Sneha, an authorized agent representing <strong>Star Health, LIC of India, and Tata AIG</strong>. Here are the dedicated services I provide across health, car, travel, and life insurance with <strong>₹0 advisory markup</strong>.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {AGENT_SERVICES.map((srv) => {
            const Icon = iconMap[srv.iconName] || ShieldCheck;
            return (
              <div
                key={srv.id}
                className="rounded-3xl p-7 bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-teal-400/90 font-medium mb-3">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      What I Do For You:
                    </div>
                    {srv.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
                    className="w-full text-xs font-bold border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                    Consult Sneha on This Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Policy Review Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 shrink-0">
              <FileSearch className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Already have a health, car, or life policy? Let Sneha audit it for free.
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Send your current policy schedule on WhatsApp. I will review it for hidden room-rent caps, zero-dep clauses, or sum insured gaps before your next renewal.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/919876543210?text=Hi%20Sneha,%20I%20would%20like%20a%20free%20audit%20of%20my%20insurance%20policy."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp My Schedule
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenConsultation("Policy Audit & Portfolio Review")}
              className="w-full sm:w-auto text-xs font-semibold border-slate-700"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              Book Audit Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
