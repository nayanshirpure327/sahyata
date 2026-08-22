"use client";

import { SahaytaListing } from "@/lib/constants/seedData";
import {
  X,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  CheckCircle,
  ShieldCheck,
  Building,
  Tag,
  Share2,
  Calendar,
} from "lucide-react";

interface ListingDetailModalProps {
  listing: SahaytaListing | null;
  onClose: () => void;
}

export default function ListingDetailModal({ listing, onClose }: ListingDetailModalProps) {
  if (!listing) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Image Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={listing.images[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-black/30" />

          {/* Action Header Overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 bg-white/90 hover:bg-white text-[#0F172A] rounded-full backdrop-blur-md transition shadow-md"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-white/90 hover:bg-white text-[#0F172A] rounded-full backdrop-blur-md transition shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Badge & Price Tag on Image */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 bg-[#2563EB]/90 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {listing.subCategory}
              </span>
              <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#0EA5E9]" />
                <span className="truncate max-w-[200px] sm:max-w-none">{listing.localityName}</span>
              </div>
            </div>
            <div className="bg-[#0F172A]/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-right border border-white/10 shrink-0">
              <div className="text-xl sm:text-2xl font-black text-white">
                {listing.price === 0 ? "FREE" : `₹${listing.price.toLocaleString("en-IN")}`}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-medium">{listing.priceUnit}</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5 bg-white dark:bg-slate-900">
          {/* Title & Verified Status */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {listing.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Sahayta Listing
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45309] bg-[#FFFBEB] px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" /> {listing.rating} ({listing.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white leading-tight">
              {listing.title}
            </h2>
          </div>

          {/* Address & Posted Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-[#0F172A] dark:text-slate-300">
              <Building className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>{listing.address}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Posted {listing.postedAt}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
              About this Listing
            </h3>
            <p className="text-[#0F172A] dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Tags */}
          {listing.tags && listing.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                Highlights & Features
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {listing.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] text-xs font-medium rounded-xl border border-[#BFDBFE]"
                  >
                    <Tag className="w-3 h-3 text-[#2563EB]" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Provider / Contact Card with Warm Amber CTA button & GPS Directions */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EFF6FF] to-[#F0F9FF] dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-[#BFDBFE] dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white font-black flex items-center justify-center text-lg shadow-md shrink-0">
                {listing.contactName.charAt(0)}
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#64748B] uppercase">Provider / Contact</div>
                <div className="font-bold text-[#0F172A] dark:text-white text-sm sm:text-base">{listing.contactName}</div>
                <div className="text-xs text-[#10B981] flex items-center gap-1 mt-0.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified Provider
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${listing.address}, ${listing.localityName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
              >
                🧭 Directions
              </a>
              <a
                href={`tel:${listing.contactPhone}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
              {listing.contactWhatsapp && (
                <a
                  href={`https://wa.me/${listing.contactWhatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(listing.contactName)},%20I%20saw%20your%20listing%20"${encodeURIComponent(listing.title)}"%20on%20Sahayta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
