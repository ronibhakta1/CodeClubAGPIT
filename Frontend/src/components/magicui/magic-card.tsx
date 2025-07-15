"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientColor?: string;
  className?: string;
  children: React.ReactNode;
}

export function MagicCard({ gradientColor = "#262626", className, children, ...props }: MagicCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-[2px] transition-shadow duration-300",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${gradientColor}, transparent 80%)`,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 6px 0 rgba(0,0,0,0.10)",
      }}
      {...props}
    >
      <div className="rounded-2xl bg-zinc-900 w-full h-full">
        {children}
      </div>
    </div>
  );
} 