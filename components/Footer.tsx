"use client";

import React from "react";
import {
  HeartHandshake,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  UserCheck
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#091b32] border-t border-cyan-500/20 text-sky-200/80 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cyan-900/40">

          {/* Col 1: Identity & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-300 p-[1.5px]">
                <div className="w-full h-full bg-[#0c2340] rounded-[14px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-cyan-200">Sneha </span>
                  <span className="text-xl font-light text-cyan-400">MediCare</span>
                </div>
                <div className="text-[10px] text-amber-400 uppercase font-semibold mt-0.5">
                  Authorized Agent: Star Health • LIC of India • Tata AIG
                </div>
              </div>
            </div>

            <p className="text-xs text-sky-200/80 leading-relaxed">
              Independent licensed insurance advisory by Sneha. Helping families select the ideal coverage across Health, Car, Travel, and Life insurance underwritten by Star Health, LIC of India, and Tata AIG with personal claim concierge at zero extra fee.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-cyan-200 font-semibold">
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Direct / WhatsApp: +91 7400319725</span>
              </div>
              <div className="flex items-center gap-2 text-sky-200">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>sneha.chaubal@snehamedicare.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Insurance Plans Advised */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              Insurance Covered
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#plans" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Health Floater & Senior Care</a></li>
              <li><a href="#plans" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Car Insurance (Zero Depreciation)</a></li>
              <li><a href="#plans" className="text-sky-200/80 hover:text-cyan-300 transition-colors">International & Schengen Travel</a></li>
              <li><a href="#plans" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Term Life & Family Security (LIC)</a></li>
              <li><a href="#plans" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Super Top-Up Health Shields</a></li>
            </ul>
          </div>

          {/* Col 3: Insurer Partners Represented */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              Official Agency Partners
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#insurers" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Star Health & Allied Insurance</a></li>
              <li><a href="#insurers" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Life Insurance Corporation (LIC)</a></li>
              <li><a href="#insurers" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Tata AIG General Insurance</a></li>
              <li><a href="#insurers" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Cashless Garage & Hospital Network</a></li>
              <li><a href="#insurers" className="text-sky-200/80 hover:text-cyan-300 transition-colors">Schengen Visa Approved Policies</a></li>
            </ul>
          </div>

          {/* Col 4: Why An Individual Agent? */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              Why Work With Sneha?
            </div>
            <ul className="space-y-2 text-xs text-sky-300/80">
              <li className="flex items-center gap-1.5 text-sky-200">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct 1-on-1 human contact (no bots)</span>
              </li>
              <li className="flex items-center gap-1.5 text-sky-200">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hospital, garage & travel claim filing</span>
              </li>
              <li className="flex items-center gap-1.5 text-sky-200">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero extra agent fees or markups</span>
              </li>
              <li className="flex items-center gap-1.5 text-sky-200">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant policy endorsement & renewals</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="py-8 space-y-3 text-[11px] text-sky-300/70 leading-relaxed border-b border-cyan-900/40">
          <div className="flex items-center gap-2 text-sky-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>IRDAI Certified Individual Agent Regulatory Notice</span>
          </div>
          <p>
            <strong className="text-sky-100">Sneha</strong> (operating as Sneha MediCare Advisory) is an IRDAI-certified, licensed individual insurance agent authorized to represent <strong className="text-sky-100">Star Health & Allied Insurance Co. Ltd.</strong>, <strong className="text-sky-100">Life Insurance Corporation of India (LIC)</strong>, and <strong className="text-sky-100">Tata AIG General Insurance Co. Ltd.</strong> Insurance is the subject matter of solicitation.
          </p>
          <p>
            All policy terms, coverage conditions, claim settlements, and underwriting rules are governed by respective insurers. All quotes are issued strictly at standard IRDAI-approved insurer tariffs with zero agent markups or surcharge fees. Health insurance premiums qualify for Section 80D deductions, and life insurance premiums qualify for Section 80C deductions under the Income Tax Act, 1961.
          </p>
        </div>

        {/* Bottom copyright & links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sky-300/70 text-xs">
          <div>
            © {new Date().getFullYear()} Sneha MediCare (Agent for Star Health • LIC • Tata AIG). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-300 transition-colors">IRDAI Code of Conduct</a>
            <a href="/admin" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1">
              Agent CRM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
