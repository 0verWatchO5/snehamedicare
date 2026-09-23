"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Award, UserCheck } from "lucide-react";
import { PARTNER_INSURERS } from "@/app/data/insuranceData";
import { Badge } from "@/components/ui/badge";

export const PartnerInsurers = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-cyan-500/20 bg-[#0a1e36]/80 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              Certified Individual Underwriter Agent
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cyan-200 tracking-tight">
              Authorized Agent for{" "}
              <span className="text-gradient-cyan">
                Star Health, LIC & Tata AIG
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-sky-200/80 mt-2 max-w-2xl">
              I bring you official company pricing with <strong className="text-amber-300 font-bold">₹0 advisory markup</strong>. Whether safeguarding your family's health, your car, international travel, or life security — you get direct 1-on-1 access and personal claim advocacy.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-amber-300 font-semibold flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Guaranteed Official Insurer Tariffs</span>
          </div>
        </div>

        {/* 3 Core Partner Insurers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNER_INSURERS.map((partner) => (
            <div
              key={partner.code}
              className="p-6 rounded-3xl bg-[#0e2a4d]/80 border border-cyan-500/25 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-200 group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 rounded-xl bg-[#132f54] border border-cyan-500/30 font-black text-xs text-cyan-300">
                    {partner.code}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {partner.badge}
                  </span>
                </div>

                <h3 className="font-bold text-cyan-200 text-lg leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-sky-200/70 leading-relaxed mb-4">
                  {partner.tagline}
                </p>

                <div className="p-3 rounded-xl bg-[#0b213c]/80 border border-cyan-900/40 mb-4">
                  <span className="text-[10px] text-cyan-300/80 uppercase tracking-wider block font-semibold mb-1">Coverage Scope</span>
                  <span className="text-xs text-sky-200 font-medium">{partner.coverageTypes}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-sky-300/70 block">Claim Settlement</span>
                  <span className="text-xs text-cyan-300 font-bold">{partner.claimRatio}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-sky-300/70 block">Network</span>
                  <span className="text-xs text-sky-200 font-semibold">{partner.networkHospitals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
