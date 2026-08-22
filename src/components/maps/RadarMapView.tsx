"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SahaytaListing } from "@/lib/constants/seedData";
import { City, Locality } from "@/lib/constants/citiesAndLocalities";
import { Compass, Loader2 } from "lucide-react";

interface RadarMapViewProps {
  listings: SahaytaListing[];
  selectedCity: City;
  selectedLocality: Locality | null;
  onSelectListing?: (listing: SahaytaListing) => void;
  activeNavListing?: SahaytaListing | null;
  className?: string;
}

// Dynamically import Leaflet with SSR disabled to prevent `window is not defined` error
const DynamicLeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] w-full rounded-3xl bg-[#090D16] border border-white/10 flex flex-col items-center justify-center space-y-4 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute w-72 h-72 border border-[#2563EB]/20 rounded-full animate-ping pointer-events-none" />
      <div className="z-10 flex flex-col items-center space-y-3 glass-panel p-6 rounded-2xl border border-white/15">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
        <div className="text-center">
          <p className="text-sm font-black text-white flex items-center gap-1.5 justify-center">
            <Compass className="w-4 h-4 text-sky-400" /> Initializing Leaflet GPS Radar & Navigation Engine...
          </p>
          <p className="text-xs text-slate-400 mt-1">Calibrating turn-by-turn routing & live geo-layers</p>
        </div>
      </div>
    </div>
  ),
});

export default function RadarMapView(props: RadarMapViewProps) {
  return <DynamicLeafletMap {...props} />;
}
