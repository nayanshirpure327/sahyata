"use client";

import React from "react";
import Image from "next/image";

interface SahaytaLogoProps {
  className?: string;
  size?: number | "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "badge";
  animated?: boolean;
}

export default function SahaytaLogo({
  className = "",
  size = "md",
  variant = "full",
  animated = true,
}: SahaytaLogoProps) {
  // Dimension mapping
  const sizeMap: Record<string, { iconSize: number; fontSize: string; subSize: string; gap: string }> = {
    sm: { iconSize: 28, fontSize: "text-sm sm:text-base", subSize: "text-[9px]", gap: "gap-2" },
    md: { iconSize: 36, fontSize: "text-lg sm:text-xl", subSize: "text-[10px]", gap: "gap-2 sm:gap-2.5" },
    lg: { iconSize: 48, fontSize: "text-2xl", subSize: "text-xs", gap: "gap-3" },
    xl: { iconSize: 64, fontSize: "text-4xl", subSize: "text-sm", gap: "gap-4" },
  };

  const dim = typeof size === "string" ? sizeMap[size] || sizeMap.md : { iconSize: size, fontSize: "text-xl", subSize: "text-[10px]", gap: "gap-2.5" };

  return (
    <div className={`inline-flex items-center ${dim.gap} select-none group ${className}`}>
      {/* Premium AI Generated Emblem Icon */}
      <div
        style={{ width: dim.iconSize, height: dim.iconSize }}
        className={`relative shrink-0 rounded-xl sm:rounded-2xl p-[1.5px] bg-gradient-to-br from-[#38BDF8] via-[#2563EB] to-[#F59E0B] shadow-lg shadow-[#2563EB]/35 ${
          animated ? "transition-all duration-300 group-hover:scale-105 group-hover:shadow-sky-500/50 group-hover:shadow-xl" : ""
        }`}
      >
        {/* Inner Glass Container with Generated App Logo */}
        <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-[#090D16] flex items-center justify-center relative overflow-hidden border border-white/20">
          <img
            src="/logo.jpg"
            alt="Sahayta Logo"
            className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px]"
          />
        </div>
      </div>

      {/* Typography for "Full" or "Badge" variant */}
      {variant !== "icon" && (
        <div className="flex flex-col shrink-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`${dim.fontSize} font-black tracking-tight text-white flex items-center`}>
              Sahayta
            </span>
            <span className="hidden sm:inline-flex text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#2563EB]/25 text-sky-300 font-black tracking-wider border border-[#2563EB]/40 shadow-sm">
              City Hub
            </span>
          </div>
          <p className={`${dim.subSize} font-medium text-slate-400 mt-0.5 leading-tight hidden xs:block`}>
            Settle Down Fast in Any City
          </p>
        </div>
      )}
    </div>
  );
}
