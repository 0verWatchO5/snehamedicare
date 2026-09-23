"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Bed, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";
import { CASHLESS_HOSPITALS, CashlessHospital } from "@/app/data/insuranceData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HospitalFinderProps {
  onOpenAdmissionModal: (hospital: CashlessHospital) => void;
}

export const HospitalFinder = ({ onOpenAdmissionModal }: HospitalFinderProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const cities = ["All", "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata"];

  const filteredHospitals = CASHLESS_HOSPITALS.filter((hosp) => {
    const matchesCity = selectedCity === "All" || hosp.city === selectedCity;
    const matchesSearch =
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <section id="hospitals" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="amber" className="mb-4">
            Network Hospitals
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            12,000+ Cashless Hospitals.{" "}
            <span className="text-gradient-cyan">
              Zero Out-of-Pocket Stress.
            </span>
          </h2>
          <p className="text-sky-200/80 text-base sm:text-lg">
            Walk in with your Sneha Health Card, walk out after top-tier medical care. Our direct TPA hospital desks handle approval in 45 minutes.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#0e2a4d]/85 border border-cyan-500/25 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 mb-10 shadow-2xl shadow-cyan-950/40">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-5 h-5 text-sky-300/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital name, locality, or specialty (e.g., Manipal, Cardiology, Apollo)..."
                className="w-full pl-12 pr-4 py-3 bg-[#0b213c]/90 border border-cyan-900/40 rounded-xl text-sm text-cyan-200 placeholder:text-sky-300/50 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* City pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 text-xs no-scrollbar">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-semibold transition-all ${
                    selectedCity === city
                      ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-950/40"
                      : "bg-[#0b213c]/80 text-sky-200/80 hover:text-cyan-200 border border-cyan-900/40 hover:bg-[#132f54]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="rounded-3xl p-6 bg-[#0e2a4d]/75 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              <div>
                {/* Header with city and cashless badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-sky-300/70">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{hosp.city}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    <Clock className="w-2.5 h-2.5" />
                    {hosp.expressCashlessMinutes} Min Cashless
                  </span>
                </div>

                {/* Hospital Title */}
                <h3 className="text-lg font-bold text-cyan-200 group-hover:text-cyan-300 transition-colors mb-1">
                  {hosp.name}
                </h3>
                <p className="text-xs text-sky-300/70 mb-4 flex items-center gap-1">
                  {hosp.area}
                </p>

                {/* Key stats pill */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#0b213c]/80 border border-cyan-900/40 text-xs">
                  <div className="flex items-center gap-1.5 text-sky-200">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <strong className="text-cyan-200">{hosp.rating}</strong>
                    <span className="text-sky-300/60 text-[10px]">({hosp.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sky-200">
                    <Bed className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{hosp.beds}+ Beds</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="text-[10px] uppercase font-bold text-sky-300/60 tracking-wider mb-1.5">
                    Recognized Specialties
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-[#132f54] text-sky-200 border border-cyan-500/20"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TPA Desk Notice */}
                <div className="text-[11px] text-sky-200/80 bg-cyan-950/30 border border-cyan-900/50 p-2.5 rounded-xl mb-6 flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong className="text-cyan-200">Dedicated Helpdesk:</strong> {hosp.tpaDesk}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-900/40">
                <a
                  href={`tel:${hosp.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#132f54] hover:bg-[#183d6b] text-sky-200 hover:text-cyan-200 border border-cyan-500/30 transition-colors"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  Call Desk
                </a>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onOpenAdmissionModal(hosp)}
                  className="text-xs font-bold"
                >
                  <Sparkles className="w-3 h-3" />
                  Pre-Authorize
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-16 bg-[#0e2a4d]/50 rounded-3xl border border-cyan-900/40">
            <Building2 className="w-12 h-12 text-cyan-500/40 mx-auto mb-3" />
            <div className="text-cyan-200 font-bold text-base mb-1">No networked hospitals match your search</div>
            <p className="text-xs text-sky-300/70">
              Try searching a different city or contact our 24/7 concierge at 1800-888-SNEHA for emergency admission assistance.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
