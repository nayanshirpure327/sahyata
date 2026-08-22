"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocationStore } from "@/stores/useLocationStore";
import { Compass, Home, PlusCircle, ShoppingBag, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const { setPostModalOpen } = useLocationStore();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "#post", label: "Post", icon: PlusCircle, isAction: true },
    { href: "/marketplace", label: "Market", icon: ShoppingBag },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D16]/90 backdrop-blur-2xl border-t border-white/10 px-3 py-2 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={() => setPostModalOpen(true)}
                className="flex flex-col items-center justify-center -mt-6 focus:outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-lg shadow-[#F59E0B]/40 group-hover:scale-110 transition-transform font-black">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-[#F59E0B] mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                isActive
                  ? "text-[#38BDF8] font-black scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#38BDF8]" : "text-slate-400"}`} />
              <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
