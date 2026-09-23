"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold shadow-md shadow-cyan-950/40",
        primary:
          "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold shadow-md shadow-cyan-950/40",
        secondary:
          "bg-[#132f54] hover:bg-[#183d6b] text-cyan-200 border border-cyan-500/30",
        outline:
          "border border-cyan-500/30 hover:border-cyan-400/60 bg-[#0e2a4d]/70 hover:bg-[#132f54] text-sky-200 hover:text-cyan-200",
        ghost:
          "hover:bg-[#132f54] text-sky-200 hover:text-cyan-200",
        link:
          "text-cyan-300 underline-offset-4 hover:underline",
        emerald:
          "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold shadow-md shadow-cyan-950/40",
        amber:
          "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-md shadow-amber-950/40",
        glow:
          "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/30",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
