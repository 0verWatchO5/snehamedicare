"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Sparkles, 
  FileSearch, 
  Menu, 
  X, 
  HeartHandshake,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTracker: () => void;
}

export const Navbar = ({ onOpenQuote, onOpenTracker }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "My Services", href: "#services" },
    { name: "Top Insurer Plans", href: "#plans" },
    { name: "Premium Calculator", href: "#calculator" },
    { name: "Cashless Hospitals", href: "#hospitals" },
    { name: "Claim Support", href: "#concierge" },
    { name: "Why Sneha?", href: "#why-sneha" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 text-xs text-slate-300 py-2 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">Direct Contact with Sneha:</span>
            <a 
              href="tel:9876543210" 
              className="font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              +91 98765 43210
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Certified Advisor for: <strong className="text-white">Star Health, HDFC ERGO, Care & Niva Bupa</strong>
            </span>
            <span className="h-3 w-[1px] bg-slate-700" />
            <span className="text-emerald-300 font-medium">100% Free Consultation • Official Insurer Rates</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-[37px] z-40 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-slate-950/50"
            : "bg-slate-950/40 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700/80 group-hover:border-teal-500/50 shadow-sm transition-all duration-300">
              <HeartHandshake className="w-6 h-6 text-teal-400 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  Sneha
                </span>
                <span className="text-2xl font-light tracking-tight text-teal-400">
                  Medicare
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Personal Health Insurance Advisor
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 px-3.5 py-2 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTracker}
              className="text-xs border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              Track Claim
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onOpenQuote}
              className="text-xs px-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Consult Sneha (Free)
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 px-3 py-2.5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full justify-center"
              >
                <FileSearch className="w-4 h-4 text-cyan-400" />
                Track Cashless Claim
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full justify-center"
              >
                <Sparkles className="w-4 h-4" />
                Consult Sneha Directly
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
