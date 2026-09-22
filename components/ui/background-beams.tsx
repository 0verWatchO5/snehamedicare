"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-slate-950 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]",
        className
      )}
    >
      {/* Radial fade mask */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,#020617_100%)]" />
      {children}
    </div>
  );
};

export const GlowingBeams = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-emerald-500/15 to-blue-500/10 blur-[130px] rounded-full" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[500px] bg-gradient-to-bl from-teal-500/10 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
      <div className="absolute top-[70%] -left-40 w-[600px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-transparent blur-[120px] rounded-full" />
    </div>
  );
};
