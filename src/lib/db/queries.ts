import { SEED_LISTINGS, SahaytaListing } from "@/lib/constants/seedData";
import { CITIES_AND_LOCALITIES, getOrCreateCity, City } from "@/lib/constants/citiesAndLocalities";

export interface FilterOptions {
  category?: string;
  subCategory?: string;
  cityId?: string;
  cityName?: string;
  localityId?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  featuredOnly?: boolean;
  sortBy?: "newest" | "price-low" | "price-high" | "rating";
}

// In-memory dynamic listings cache for custom user-added cities
const dynamicCityListingsCache: Record<string, SahaytaListing[]> = {};

// Helper to generate dynamic newcomer listings for any city
export function generateListingsForCity(city: City): SahaytaListing[] {
  if (dynamicCityListingsCache[city.id]) {
    return dynamicCityListingsCache[city.id];
  }

  const l1 = city.localities[0]?.name || `${city.name} Central`;
  const l2 = city.localities[1]?.name || `${city.name} Tech Zone`;
  const l3 = city.localities[2]?.name || `${city.name} Suburb`;

  const dynamicListings: SahaytaListing[] = [
    {
      id: `${city.id}-stay-1`,
      title: `Executive Co-Living PG with 3 Meals & High-Speed Wi-Fi in ${l1}`,
      category: "stay",
      subCategory: "Co-living PG",
      description: `Premium accommodation ideal for freshers and working professionals relocating to ${city.name}. Features AC rooms, daily housekeeping, 3 nutritious home-cooked meals, biometric security, and zero brokerage.`,
      price: 11500,
      priceUnit: "per month",
      cityId: city.id,
      localityId: city.localities[0]?.id || `${city.id}-central`,
      localityName: `${l1}, ${city.name}`,
      address: `Main Road, Near Metro / Transit Station, ${l1}`,
      contactName: "Vikram Singhania (Manager)",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Co-living", "Food Included", "AC", "Wi-Fi", "No Brokerage"],
      rating: 4.8,
      reviewsCount: 26,
      verified: true,
      featured: true,
      postedAt: "Just now",
      meta: {
        occupancy: "Single & Double Sharing",
        deposit: "1 Month Rent",
      },
    },
    {
      id: `${city.id}-stay-2`,
      title: `Shared 2BHK Master Bedroom Flatmate Required in ${l2}`,
      category: "stay",
      subCategory: "Shared Flat",
      description: `Looking for 1 friendly, non-smoking newcomer or working professional to share a fully furnished 2BHK flat in ${l2}. Fridge, washing machine, sofa, and cook already available.`,
      price: 9000,
      priceUnit: "per month",
      cityId: city.id,
      localityId: city.localities[1]?.id || `${city.id}-tech-hub`,
      localityName: `${l2}, ${city.name}`,
      address: `Green Avenue, ${l2}`,
      contactName: "Pooja Verma",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Flatmate", "Private Attached Bath", "Cook Setup", "Gated Security"],
      rating: 4.7,
      reviewsCount: 14,
      verified: true,
      featured: false,
      postedAt: "2 hours ago",
      meta: {
        deposit: "₹18,000",
      },
    },
    {
      id: `${city.id}-food-1`,
      title: `Annapurna Daily Tiffin & Homely Meal Delivery in ${l1}`,
      category: "food",
      subCategory: "Daily Tiffin Service",
      description: `Fresh, warm home-cooked meals delivered twice daily to your PG or office in ${l1} & ${l2}. Includes 4 Phulkas, Dal Tadka, Seasonal Veggie, Basmati Rice, and Salad. Free trial meal available for newcomers.`,
      price: 2900,
      priceUnit: "per month",
      cityId: city.id,
      localityId: city.localities[0]?.id || `${city.id}-central`,
      localityName: `${l1}, ${city.name}`,
      address: `Free 4km Doorstep Delivery in ${city.name}`,
      contactName: "Shanti Devi (Home Cook)",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Home Cooked", "Free Delivery", "Trial Meal Available", "Veg / Jain"],
      rating: 4.9,
      reviewsCount: 68,
      verified: true,
      featured: true,
      postedAt: "Today",
      meta: {
        trialPrice: "₹90 per meal",
      },
    },
    {
      id: `${city.id}-job-1`,
      title: `Operations & Customer Associate for Freshers & Relocating Candidates in ${city.name}`,
      category: "jobs",
      subCategory: "Entry Level Job",
      description: `Leading regional hub company hiring freshers and newcomers in ${city.name}. Basic computer proficiency and communication skills required. Fixed day shift with complete training provided.`,
      price: 24000,
      priceUnit: "per month",
      cityId: city.id,
      localityId: city.localities[1]?.id || `${city.id}-tech-hub`,
      localityName: `${l2}, ${city.name}`,
      address: `Business Park Tower, ${l2}`,
      contactName: "HR Recruitment Cell",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Freshers Hiring", "Day Shift", "Office Job", "Immediate Joining"],
      rating: 4.7,
      reviewsCount: 22,
      verified: true,
      featured: true,
      postedAt: "Today",
      meta: {
        openings: 8,
      },
    },
    {
      id: `${city.id}-market-1`,
      title: `Complete Room Setup: Single Wooden Bed + Sleepwell Mattress + Study Table`,
      category: "marketplace",
      subCategory: "Pre-owned Furniture",
      description: `Relocation sale in ${l1}. Selling barely used solid wood single bed with spotless orthopaedic mattress and study desk. Perfect for newcomers looking to settle down quickly on a budget.`,
      price: 5500,
      priceUnit: "fixed",
      cityId: city.id,
      localityId: city.localities[0]?.id || `${city.id}-central`,
      localityName: `${l1}, ${city.name}`,
      address: `Near Main Market, ${l1}`,
      contactName: "Aditya Roy",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Pre-owned", "Relocation Sale", "Immediate Pickup", "Bargain"],
      rating: 5.0,
      reviewsCount: 5,
      verified: true,
      featured: true,
      postedAt: "4 hours ago",
      meta: {
        condition: "Excellent (5 months old)",
      },
    },
    {
      id: `${city.id}-service-1`,
      title: `Verified House Maid & Daily Cook Service in ${l3}`,
      category: "services",
      subCategory: "Maid & Cooking Service",
      description: `Aadhar verified and trustworthy domestic help available for bachelor and professional households across ${city.name}. Expert in North/South Indian cooking, dusting, sweeping, and utensil cleaning.`,
      price: 3200,
      priceUnit: "per month",
      cityId: city.id,
      localityId: city.localities[2]?.id || `${city.id}-residential`,
      localityName: `${l3}, ${city.name}`,
      address: `Servicing across ${city.name}`,
      contactName: "Ganga Bai (Agency: Seva Helpers)",
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Aadhar Verified", "Daily Service", "Experienced Cook", "Bachelor Friendly"],
      rating: 4.8,
      reviewsCount: 41,
      verified: true,
      featured: true,
      postedAt: "Today",
      meta: {
        policeVerification: "Verified",
      },
    },
    {
      id: `${city.id}-resource-1`,
      title: `${city.name} Newcomer Survival Guide & Police Verification Checklist (2026)`,
      category: "resources",
      subCategory: "City Survival Guide",
      description: `The complete starter kit for anyone relocating to ${city.name}! Free downloadable 11-month rental agreement draft, official tenant police verification guide, public transit routes, and essential emergency contacts.`,
      price: 0,
      priceUnit: "free download",
      cityId: city.id,
      localityId: city.localities[0]?.id || `${city.id}-central`,
      localityName: `${city.name} Citywide`,
      address: `Digital Guide & Document Portal`,
      contactName: `Sahayta ${city.name} Desk`,
      contactPhone: "+91 99601 65693",
      contactWhatsapp: "+91 99601 65693",
      images: [
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Free Download", "Rent Agreement", "Police Verification", "Must Read"],
      rating: 4.9,
      reviewsCount: 88,
      verified: true,
      featured: true,
      postedAt: "Updated this week",
      meta: {
        format: "Word & PDF",
      },
    },
  ];

  dynamicCityListingsCache[city.id] = dynamicListings;
  return dynamicListings;
}

export function getFilteredListings(options: FilterOptions = {}): SahaytaListing[] {
  let allListings = [...SEED_LISTINGS];

  // If a cityId is passed, check if we need to load or generate dynamic listings for custom/other cities
  if (options.cityId && options.cityId !== "all") {
    const hasStatic = allListings.some((item) => item.cityId === options.cityId);
    if (!hasStatic) {
      const city = getOrCreateCity(options.cityId);
      const generated = generateListingsForCity(city);
      allListings = [...allListings, ...generated];
    }
  }

  let listings = allListings;

  // Filter by category (if searchQuery is present and matches a category, don't rigidly filter unless explicit)
  if (options.category && options.category !== "all" && !options.searchQuery) {
    listings = listings.filter((item) => item.category === options.category);
  }

  // Filter by subCategory
  if (options.subCategory && options.subCategory !== "all") {
    listings = listings.filter(
      (item) => item.subCategory.toLowerCase() === options.subCategory?.toLowerCase()
    );
  }

  // Filter by City (If search query specifies another city, allow cross-city search)
  const isSearchAcrossCities =
    options.searchQuery &&
    CITIES_AND_LOCALITIES.some(
      (c) =>
        options.searchQuery!.toLowerCase().includes(c.name.toLowerCase()) ||
        options.searchQuery!.toLowerCase().includes(c.id.toLowerCase())
    );

  if (options.cityId && options.cityId !== "all" && !isSearchAcrossCities) {
    listings = listings.filter((item) => item.cityId === options.cityId);
  }

  // Filter by Locality (Only apply strict locality filter if no general search query is active)
  if (options.localityId && options.localityId !== "all" && !options.searchQuery) {
    listings = listings.filter((item) => item.localityId === options.localityId);
  }

  // Filter by Featured
  if (options.featuredOnly) {
    listings = listings.filter((item) => item.featured);
  }

  // Powerful Multi-Field & Token-Based Search Filter
  if (options.searchQuery && options.searchQuery.trim() !== "") {
    const rawQuery = options.searchQuery.toLowerCase().trim();
    const queryTokens = rawQuery.split(/\s+/).filter((t) => t.length > 0);

    listings = listings.filter((item) => {
      const searchTarget = [
        item.title,
        item.description,
        item.category,
        item.subCategory,
        item.localityName,
        item.address,
        item.contactName,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      // Direct full match or all individual tokens match
      if (searchTarget.includes(rawQuery)) return true;
      return queryTokens.every((token) => searchTarget.includes(token));
    });
  }

  // Price Range
  if (options.minPrice !== undefined) {
    listings = listings.filter((item) => item.price >= (options.minPrice || 0));
  }
  if (options.maxPrice !== undefined && options.maxPrice > 0) {
    listings = listings.filter((item) => item.price <= (options.maxPrice || Infinity));
  }

  // Sort
  if (options.sortBy) {
    if (options.sortBy === "price-low") {
      listings.sort((a, b) => a.price - b.price);
    } else if (options.sortBy === "price-high") {
      listings.sort((a, b) => b.price - a.price);
    } else if (options.sortBy === "rating") {
      listings.sort((a, b) => b.rating - a.rating);
    }
  }

  return listings;
}

export function getListingById(id: string): SahaytaListing | undefined {
  return SEED_LISTINGS.find((item) => item.id === id);
}

export function addListing(newListing: Omit<SahaytaListing, "id" | "postedAt" | "rating" | "reviewsCount" | "verified" | "featured">): SahaytaListing {
  const listing: SahaytaListing = {
    ...newListing,
    id: `custom-${Date.now()}`,
    postedAt: "Just now",
    rating: 5.0,
    reviewsCount: 1,
    verified: true,
    featured: false,
  };
  SEED_LISTINGS.unshift(listing);
  return listing;
}
