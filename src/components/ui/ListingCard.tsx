"use client";

import { useState } from "react";
import { SahaytaListing } from "@/lib/constants/seedData";
import ListingDetailModal from "./ListingDetailModal";
import {
  MapPin,
  Star,
  CheckCircle,
  Phone,
  MessageSquare,
  Bookmark,
  ExternalLink,
  Zap,
} from "lucide-react";

interface ListingCardProps {
  listing: SahaytaListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Optimize image URL resolution for fast thumbnail loading
  const rawImg = listing.images[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af";
  const optimizedImg = rawImg.includes("unsplash.com") && !rawImg.includes("w=")
    ? `${rawImg}?auto=format&fit=crop&w=500&q=75`
    : rawImg;

  return (
    <>
      <div className="group glass-card rounded-3xl overflow-hidden flex flex-col relative [contain:layout_style]">
        {/* Image Header with Frosted Glass Badge Overlays */}
        <div
          className="relative h-52 sm:h-56 w-full bg-slate-900 overflow-hidden cursor-pointer"
          onClick={() => setIsDetailOpen(true)}
        >
          <img
            src={optimizedImg}
            alt={listing.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

          {/* Subcategory & Verified Badge Floating Glass Pills */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span className="px-3 py-1 glass-pill text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-lg">
              {listing.subCategory}
            </span>
            {listing.verified && (
              <span className="px-2.5 py-1 bg-[#10B981] text-white text-[10px] font-black rounded-full flex items-center gap-1 shadow-md shadow-[#10B981]/40">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Bookmark Glass Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full glass-pill btn-tactile z-10 ${
              isSaved
                ? "bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/40 scale-110"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-black" : ""}`} />
          </button>

          {/* Rating Badge Overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-black glass-pill px-3 py-1 rounded-full shadow-md z-10">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{listing.rating}</span>
            <span className="text-slate-300 font-normal">({listing.reviewsCount})</span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 bg-[#2563EB] text-white font-black text-sm px-3.5 py-1.5 rounded-2xl shadow-xl shadow-[#2563EB]/50 border border-white/20 z-10 group-hover:scale-105 transition-transform">
            {listing.price === 0 ? "FREE" : `₹${listing.price.toLocaleString("en-IN")}`}
            <span className="text-[10px] font-medium text-blue-100 ml-1">{listing.priceUnit}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#38BDF8] font-bold">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{listing.localityName}</span>
            </div>

            <h3
              onClick={() => setIsDetailOpen(true)}
              className="font-black text-white text-sm sm:text-base leading-snug hover:text-[#38BDF8] cursor-pointer line-clamp-2 transition-colors duration-200"
            >
              {listing.title}
            </h3>

            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
              {listing.description}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {listing.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-white/5 hover:bg-white/10 text-slate-300 px-2.5 py-0.5 rounded-lg font-bold border border-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {listing.tags.length > 3 && (
                <span className="text-[10px] text-slate-500 font-bold">+{listing.tags.length - 3}</span>
              )}
            </div>
          </div>

          {/* Footer Actions with Warm Amber CTA button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={() => setIsDetailOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-black text-[#38BDF8] hover:text-white"
            >
              View Details <ExternalLink className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${listing.contactPhone}`}
                className="px-3.5 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-black rounded-xl text-xs font-black transition flex items-center gap-1 shadow-md shadow-[#F59E0B]/30 btn-tactile"
                title="Call Contact"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              {listing.contactWhatsapp && (
                <a
                  href={`https://wa.me/${listing.contactWhatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(listing.contactName)},%20I%20saw%20your%20listing%20"${encodeURIComponent(listing.title)}"%20on%20Sahayta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-medium transition shadow-md shadow-[#10B981]/30 btn-tactile"
                  title="WhatsApp Contact"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <ListingDetailModal listing={listing} onClose={() => setIsDetailOpen(false)} />
      )}
    </>
  );
}
