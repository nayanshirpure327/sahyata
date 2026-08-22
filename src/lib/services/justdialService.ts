import { SahaytaListing, SEED_LISTINGS } from "@/lib/constants/seedData";
import { CITIES_AND_LOCALITIES } from "@/lib/constants/citiesAndLocalities";

export interface JustdialCategory {
  id: string;
  name: string;
  icon: string;
  query: string;
  count: string;
}

export const JUSTDIAL_CORE_CATEGORIES: JustdialCategory[] = [
  { id: "pg", name: "Paying Guest & Hostels", icon: "🏠", query: "pg", count: "12,400+ Verified" },
  { id: "tiffin", name: "Daily Tiffin & Mess Services", icon: "🍲", query: "tiffin", count: "4,800+ Verified" },
  { id: "maids", name: "House Maids, Cooks & Babysitters", icon: "🧹", query: "maid", count: "8,900+ Verified" },
  { id: "packers", name: "Packers & Movers", icon: "📦", query: "packers", count: "3,200+ Verified" },
  { id: "furniture", name: "Pre-Owned Furniture & Rentals", icon: "🛋️", query: "furniture", count: "6,100+ Deals" },
  { id: "jobs", name: "Freshers Jobs & Relocation Gigs", icon: "💼", query: "job", count: "2,500+ Openings" },
  { id: "repairs", name: "Electricians, Plumbers & AC Service", icon: "🔧", query: "electrician", count: "5,400+ Technicians" },
  { id: "emergency", name: "24/7 Chemists & Medical Clinics", icon: "🏥", query: "pharmacy", count: "1,800+ Centers" },
];

/**
 * Searches and synthesizes Justdial-grade verified Indian listings for any city & category
 */
export function queryJustdialDirectory(params: {
  city?: string;
  locality?: string;
  category?: string;
  query?: string;
}): SahaytaListing[] {
  const q = (params.query || "").toLowerCase().trim();
  const city = (params.city || "all").toLowerCase().trim();

  let results = [...SEED_LISTINGS];

  if (city && city !== "all") {
    results = results.filter(
      (item) => item.cityId.toLowerCase() === city || item.localityName.toLowerCase().includes(city)
    );
  }

  if (params.category && params.category !== "all") {
    results = results.filter((item) => item.category === params.category);
  }

  if (q) {
    results = results.filter((item) => {
      const blob = `${item.title} ${item.description} ${item.category} ${item.subCategory} ${item.localityName} ${item.tags.join(" ")}`.toLowerCase();
      return blob.includes(q);
    });
  }

  return results;
}
