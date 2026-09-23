import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  badge?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl hover:shadow-cyan-950/40 transition duration-200 p-6 bg-[#0e2a4d]/80 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400/50 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              {icon}
            </div>
          )}
          {badge && (
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {badge}
            </span>
          )}
        </div>
        <div className="font-bold text-cyan-200 mb-2 text-lg">
          {title}
        </div>
        <div className="font-normal text-sky-200/70 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
