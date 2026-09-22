"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/40",
        primary:
          "bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow-md shadow-teal-950/40",
        secondary:
          "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/70",
        outline:
          "border border-slate-700 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white",
        ghost:
          "hover:bg-slate-800 text-slate-300 hover:text-white",
        link:
          "text-teal-400 underline-offset-4 hover:underline",
        emerald:
          "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/40",
        glow:
          "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/40"
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
