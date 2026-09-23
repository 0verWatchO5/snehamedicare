import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors border",
  {
    variants: {
      variant: {
        default:
          "border-cyan-400/40 bg-cyan-500/20 text-cyan-200",
        emerald:
          "border-amber-400/40 bg-amber-500/20 text-amber-200",
        amber:
          "border-amber-400/40 bg-amber-500/20 text-amber-200",
        secondary:
          "border-cyan-500/30 bg-[#132f54] text-sky-200",
        outline:
          "border-cyan-500/30 text-sky-200",
        pulse:
          "border-amber-400/40 bg-amber-950/40 text-amber-200",
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
