"use client";

import React, { useState } from "react";
import { RouteResult, getExternalNavigationUrl } from "@/lib/services/routingService";
import { SahaytaListing } from "@/lib/constants/seedData";
import {
  Navigation,
  Car,
  Bike,
  Footprints,
  Train,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Clock,
  Milestone,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface NavigationPanelProps {
  destinationListing: SahaytaListing;
  destinationCoords: [number, number];
  routeResult: RouteResult | null;
  isLoading: boolean;
  selectedMode: "drive" | "motorcycle" | "walk" | "transit";
  onModeChange: (mode: "drive" | "motorcycle" | "walk" | "transit") => void;
  onClose: () => void;
}

export default function NavigationPanel({
  destinationListing,
  destinationCoords,
  routeResult,
  isLoading,
  selectedMode,
  onModeChange,
  onClose,
}: NavigationPanelProps) {
  const [showTurnList, setShowTurnList] = useState(false);

  const [destLat, destLng] = destinationCoords;
  const externalMapsUrl = getExternalNavigationUrl(destLat, destLng, selectedMode);

  return (
    <div className="absolute top-4 left-4 right-4 z-[450] sm:right-auto sm:max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="glass-panel rounded-3xl border border-sky-400/30 p-4 sm:p-5 shadow-2xl space-y-4 bg-[#090D16]/95 backdrop-blur-2xl">
        {/* Header with Exit Button */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#0EA5E9] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/40 animate-pulse">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1">
                <Compass className="w-3 h-3" /> Live GPS Navigator
              </span>
              <h3 className="text-xs font-black text-white truncate max-w-[230px]">
                To: {destinationListing.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition hover:scale-105"
            title="Exit Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Travel Mode Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10">
          {[
            { id: "drive", label: "Drive", icon: Car },
            { id: "motorcycle", label: "Bike", icon: Bike },
            { id: "walk", label: "Walk", icon: Footprints },
            { id: "transit", label: "Transit", icon: Train },
          ].map((mode) => {
            const Icon = mode.icon;
            const active = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id as any)}
                className={`py-2 px-1 rounded-xl text-xs font-black flex flex-col items-center gap-1 transition ${
                  active
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/50 scale-100"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Route Stats (ETA, Distance, Traffic) */}
        {isLoading ? (
          <div className="py-4 text-center space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-300">Calculating best route...</p>
          </div>
        ) : routeResult ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {/* ETA */}
              <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                  <Clock className="w-3 h-3 text-sky-400" /> Estimated Time
                </div>
                <div className="text-xl font-black text-white flex items-baseline gap-1">
                  <span>{routeResult.durationMinutes}</span>
                  <span className="text-xs font-bold text-sky-400">mins</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">Fastest Route</div>
              </div>

              {/* Distance */}
              <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                  <Milestone className="w-3 h-3 text-amber-400" /> Distance
                </div>
                <div className="text-xl font-black text-white flex items-baseline gap-1">
                  <span>{routeResult.distanceKm}</span>
                  <span className="text-xs font-bold text-amber-400">km</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  📍 {destinationListing.localityName}
                </div>
              </div>
            </div>

            {/* Turn-by-Turn Expandable Accordion */}
            {routeResult.steps.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#0F172A]/70 overflow-hidden">
                <button
                  onClick={() => setShowTurnList(!showTurnList)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-black text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-1.5">
                    <Milestone className="w-3.5 h-3.5 text-sky-400" />
                    Turn-by-Turn Guide ({routeResult.steps.length} steps)
                  </span>
                  {showTurnList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showTurnList && (
                  <div className="max-h-48 overflow-y-auto px-3.5 pb-3 pt-1 space-y-2 text-xs border-t border-white/10 divide-y divide-white/5 scrollbar-thin">
                    {routeResult.steps.map((step, idx) => (
                      <div key={idx} className="pt-2 flex items-start gap-2 text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white leading-tight">{step.instruction}</p>
                          <span className="text-[10px] text-slate-400">
                            {step.distanceMeters >= 1000
                              ? `${(step.distanceMeters / 1000).toFixed(1)} km`
                              : `${Math.round(step.distanceMeters)} meters`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
          {/* Open in Google Maps Turn-by-Turn Button */}
          <a
            href={externalMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] hover:from-[#1D4ED8] hover:to-[#0284C7] text-white font-black text-xs rounded-xl shadow-lg shadow-[#2563EB]/40 flex items-center justify-center gap-2 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Launch Google Maps GPS
          </a>

          {/* Call Owner Direct Button */}
          <a
            href={`tel:${destinationListing.contactPhone}`}
            className="w-full sm:w-auto py-2.5 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-black font-black text-xs rounded-xl shadow-md shadow-[#F59E0B]/25 flex items-center justify-center gap-1.5 transition whitespace-nowrap"
          >
            📞 Call Provider
          </a>
        </div>
      </div>
    </div>
  );
}
