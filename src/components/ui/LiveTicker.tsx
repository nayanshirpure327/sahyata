"use client";

import { useState, useEffect, memo } from "react";
import { Activity } from "lucide-react";

const liveActivities = [
  { text: "Rahul connected with Stanza Living PG in Hinjawadi", time: "Just now", badge: "Stay" },
  { text: "Sunita Aunty accepted 3 new monthly tiffin orders in Viman Nagar", time: "1 min ago", badge: "Food" },
  { text: "Full Bedroom Furniture Set sold in Wakad", time: "3 mins ago", badge: "Market" },
  { text: "Ananya joined Flatmate Search in Baner", time: "5 mins ago", badge: "Flatmate" },
  { text: "Operations Executive job application submitted in Kharadi", time: "8 mins ago", badge: "Job" },
];

function LiveTickerComponent() {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = liveActivities[tickerIndex];

  return (
    <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-slate-300 shadow-lg">
      <Activity className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
      <span className="text-[10px] bg-[#2563EB]/40 text-sky-300 font-bold px-1.5 py-0.5 rounded">
        {current.badge}
      </span>
      <span className="text-white font-medium truncate max-w-[280px]">
        {current.text}
      </span>
      <span className="text-[10px] text-slate-400">({current.time})</span>
    </div>
  );
}

export default memo(LiveTickerComponent);
