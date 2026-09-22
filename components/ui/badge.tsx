import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors border",
  {
    variants: {
      variant: {
        default:
          "border-teal-500/30 bg-teal-500/10 text-teal-300",
        emerald:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        amber:
          "border-amber-500/30 bg-amber-500/10 text-amber-300",
        secondary:
          "border-slate-700 bg-slate-800/80 text-slate-300",
        outline:
          "border-slate-700/80 text-slate-300",
        pulse:
          "border-emerald-500/30 bg-emerald-950/40 text-emerald-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
