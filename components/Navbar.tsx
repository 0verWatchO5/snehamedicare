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
    { name: "Services", href: "#services" },
    { name: "Insurance Plans", href: "#plans" },
    { name: "Premium Calculator", href: "#calculator" },
    { name: "Cashless Network", href: "#hospitals" },
    { name: "Claim Advocacy", href: "#concierge" },
    { name: "Why Sneha?", href: "#why-sneha" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-[#091b32] border-b border-cyan-900/40 text-xs text-sky-200 py-2 px-4 w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span className="font-semibold text-amber-400">Direct Contact with Sneha:</span>
            <a
              href="tel:7400319725"
              className="font-bold text-cyan-200 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              +91 7400319725
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-sky-300/80">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Agent for: <strong className="text-cyan-200">Star Health • LIC of India • Tata AIG</strong>
            </span>
            <span className="h-3 w-[1px] bg-cyan-800/60" />
            <span className="text-amber-300 font-medium">Health • Car • Travel • Life • ₹0 Advisory Fee</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`w-full transition-all duration-300 ${scrolled
          ? "bg-[#0c2340]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl shadow-cyan-950/40"
          : "bg-[#0c2340]/80 backdrop-blur-md border-b border-cyan-500/10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#132d50] border border-cyan-500/30 group-hover:border-cyan-400/60 shadow-sm transition-all duration-300">
              <HeartHandshake className="w-6 h-6 text-cyan-400 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-cyan-200 group-hover:text-cyan-300 transition-colors">
                  Sneha
                </span>
                <span className="text-2xl font-light tracking-tight text-cyan-400">
                  MediCare
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-amber-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Health • Car • Travel • Life Insurance
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-sky-200 hover:text-cyan-200 hover:bg-[#163864]/60 px-3.5 py-2 rounded-xl transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTracker}
              className="text-xs border-cyan-500/30 bg-[#132f54]/70 text-sky-200 hover:bg-[#1a3d6b] hover:text-cyan-100"
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
              <PhoneCall className="w-3.5 h-3.5" />
              Consult Sneha (Free)
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-sky-300 hover:text-cyan-200 hover:bg-[#163864]/70 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a1e36]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-sky-200 hover:text-cyan-300 hover:bg-[#143157] px-3 py-2.5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-cyan-900/40 flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full justify-center border-cyan-500/30 bg-[#132f54]"
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
                <PhoneCall className="w-4 h-4" />
                Consult Sneha Directly
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
