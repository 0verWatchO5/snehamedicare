"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  borderWidth?: number;
  className?: string;
  variant?: "cyan" | "default" | "amber";
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  movementDuration?: number;
  blur?: number;
}

export const GlowingEffect = ({
  spread = 450,
  glow = false,
  borderWidth = 1.5,
  className,
  variant = "cyan",
  disabled = false,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -2000, y: -2000 });
  const [isNear, setIsNear] = useState(glow);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if mouse is in proximity of this card
    const proximity = 80;
    if (
      x >= -proximity &&
      x <= rect.width + proximity &&
      y >= -proximity &&
      y <= rect.height + proximity
    ) {
      setPosition({ x, y });
      setIsNear(true);
    } else if (!glow) {
      setIsNear(false);
    }
  }, [disabled, glow]);

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, handleMouseMove]);

  if (disabled) return null;

  const borderColors =
    variant === "amber"
      ? "rgba(245, 158, 11, 0.75), rgba(251, 191, 36, 0.35)"
      : "rgba(6, 182, 212, 0.8), rgba(20, 184, 166, 0.45)";

  const ambientColor =
    variant === "amber"
      ? "rgba(245, 158, 11, 0.07)"
      : "rgba(6, 182, 212, 0.08)";

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300",
        isNear || glow ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Glowing 1.5px Border Highlight that tracks the cursor */}
      <div
        className="absolute -inset-[1px] rounded-[inherit] pointer-events-none"
        style={{
          padding: `${borderWidth}px`,
          background: `radial-gradient(${spread}px circle at ${position.x}px ${position.y}px, ${borderColors}, transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />

      {/* Subtle Inner Ambient Glow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `radial-gradient(${spread * 0.75}px circle at ${position.x}px ${position.y}px, ${ambientColor}, transparent 80%)`,
        }}
      />
    </div>
  );
};
