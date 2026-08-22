export interface SahaytaListing {
  id: string;
  title: string;
  category: "stay" | "food" | "jobs" | "marketplace" | "services" | "resources" | "events" | "health";
  subCategory: string;
  description: string;
  price: number;
  priceUnit: string; // "per month", "per meal", "per hour", "fixed", "free"
  cityId: string;
  localityId: string;
  localityName: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactWhatsapp?: string;
  images: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  verified: boolean;
  featured: boolean;
  postedAt: string;
  meta: Record<string, any>;
}

export const SEED_LISTINGS: SahaytaListing[] = [
  // 1. STAY & ACCOMMODATION
  {
    id: "stay-1",
    title: "Stanza Living Co-Living Space (Fully Furnished & High-Speed Wi-Fi)",
    category: "stay",
    subCategory: "Co-living PG",
    description: "Ideal for young working professionals and freshers relocating to Bengaluru. Includes 3 daily hygienic meals, housekeeping, high-speed Wi-Fi, gaming zone, and 24/7 security. No brokerage fee.",
    price: 14500,
    priceUnit: "per month",
    cityId: "bengaluru",
    localityId: "koramangala",
    localityName: "Koramangala, Bengaluru",
    address: "Block 4, Near Forum Mall, Koramangala",
    contactName: "Rahul Sharma (Property Manager)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Co-living", "Unisex / Male / Female", "3 Meals Included", "AC", "Power Backup", "No Brokerage"],
    rating: 4.8,
    reviewsCount: 34,
    verified: true,
    featured: true,
    postedAt: "2 hours ago",
    meta: {
      occupancy: "Single & Double Sharing",
      deposit: "1 Month Security Deposit",
      amenities: ["AC", "Wi-Fi", "Daily Food", "Washing Machine", "Biometric Lock", "Geyser"]
    }
  },
  {
    id: "stay-2",
    title: "Spacious 2BHK Flatmate Needed in HSR Layout Sector 1",
    category: "stay",
    subCategory: "Shared Flat",
    description: "Looking for 1 non-smoking working professional replacement for a master bedroom with attached bath in a fully set-up 2BHK. House has fridge, washing machine, sofa, TV, and cook already set up.",
    price: 12000,
    priceUnit: "per month",
    cityId: "bengaluru",
    localityId: "hsr-layout",
    localityName: "HSR Layout, Bengaluru",
    address: "27th Main Rd, Sector 1, HSR Layout",
    contactName: "Ananya Roy",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Flatmate Needed", "Private Bath", "Fully Furnished", "Cook Available"],
    rating: 4.6,
    reviewsCount: 12,
    verified: true,
    featured: false,
    postedAt: "1 day ago",
    meta: {
      occupancy: "Private Room",
      deposit: "₹25,000",
      amenities: ["Kitchen Setup", "Cook", "Maid", "High-speed Wi-Fi"]
    }
  },
  {
    id: "stay-3",
    title: "Executive Luxury PG for Tech Professionals near Cyber City",
    category: "stay",
    subCategory: "Executive PG",
    description: "Single & Double AC rooms for MNC employees working in Cyber City & DLF Phase 3. 5-min walk to Phase 3 Rapid Metro Station. Premium meals, laundry & daily cleaning included.",
    price: 16000,
    priceUnit: "per month",
    cityId: "delhi-ncr",
    localityId: "gurgaon-cyber-city",
    localityName: "Gurgaon Cyber City, Delhi / NCR",
    address: "DLF Phase 3, V-Block, Gurgaon",
    contactName: "Vikram Malhotra",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Executive PG", "Metro 2 Min Walk", "Food Included", "100% Power Backup"],
    rating: 4.7,
    reviewsCount: 28,
    verified: true,
    featured: true,
    postedAt: "3 hours ago",
    meta: {
      occupancy: "Single Room",
      deposit: "1 Month",
      amenities: ["AC", "Breakfast & Dinner", "Gym Access", "Smart TV"]
    }
  },
  {
    id: "stay-4",
    title: "Allen Student & Newcomer Hostel - Rajeev Gandhi Nagar",
    category: "stay",
    subCategory: "Hostel / PG",
    description: "Quiet, peaceful environment for coaching students & freshers in Kota. Separate AC rooms, nutritious mess meals, laundry, study table, and biometric attendance.",
    price: 9500,
    priceUnit: "per month",
    cityId: "kota",
    localityId: "rajeev-gandhi-nagar",
    localityName: "Rajeev Gandhi Nagar, Kota",
    address: "Road No. 2, Rajeev Gandhi Nagar, Kota",
    contactName: "Sanjay Gupta",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Coaching PG", "Study Desk", "North Indian Mess", "Silent Zone"],
    rating: 4.5,
    reviewsCount: 45,
    verified: true,
    featured: false,
    postedAt: "5 hours ago",
    meta: {
      occupancy: "Single AC Room",
      deposit: "₹5,000",
      amenities: ["Study Table", "Geyser", "3 Times Meal", "RO Water"]
    }
  },

  // 2. FOOD & TIFFIN SERVICES
  {
    id: "food-1",
    title: "Maa Ki Rasoi - Homely North & South Indian Daily Tiffin",
    category: "food",
    subCategory: "Daily Tiffin Service",
    description: "Fresh, hygienic, home-cooked daily meals delivered to your PG or flat office in Koramangala & HSR. 4 Chapattis/Rice, Dal, Special Veggie, Salads & Sweet on Sundays. Special trial meals available.",
    price: 3200,
    priceUnit: "per month",
    cityId: "bengaluru",
    localityId: "koramangala",
    localityName: "Koramangala, Bengaluru",
    address: "Free Delivery in 3km Radius",
    contactName: "Sunita Aunty",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Home Cooked", "Free Delivery", "Veg / Jain Option", "Monthly Subscription"],
    rating: 4.9,
    reviewsCount: 89,
    verified: true,
    featured: true,
    postedAt: "Just now",
    meta: {
      mealType: "Veg / Pure Home Cooked",
      trialPrice: "₹100 per meal",
      timing: "Lunch (12:30 PM) & Dinner (8:00 PM)"
    }
  },
  {
    id: "food-2",
    title: "Puneri Swad Tiffin & Unlimited Mess Service",
    category: "food",
    subCategory: "Local Mess",
    description: "Traditional Maharashtrian & North Indian Unlimited Thali Mess in Hinjawadi Phase 1. Pithla Bhakri, Chapati-Bhaji, Poli, Pulao, & Solkadhi.",
    price: 2800,
    priceUnit: "per month",
    cityId: "pune",
    localityId: "hinjawadi",
    localityName: "Hinjawadi Phase 1, Pune",
    address: "Opposite Wipro Circle, Hinjawadi Phase 1",
    contactName: "Ganesh Kadam",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Unlimited Thali", "Non-Veg Sundays", "Budget Mess", "Clean & Hygienic"],
    rating: 4.7,
    reviewsCount: 56,
    verified: true,
    featured: false,
    postedAt: "4 hours ago",
    meta: {
      mealType: "Veg & Non-Veg",
      trialPrice: "₹90 per thali",
      timing: "Open 11:30 AM - 10:30 PM"
    }
  },

  // 3. JOBS & LOCAL GIGS
  {
    id: "job-1",
    title: "Customer Support & Operations Executive (Freshers Welcome)",
    category: "jobs",
    subCategory: "Entry Level Job",
    description: "Fast-growing startup hiring freshers and newcomers in HSR Layout. Excellent spoken English required. Dayshift 9 AM - 6 PM. On-the-job training provided.",
    price: 28000,
    priceUnit: "per month",
    cityId: "bengaluru",
    localityId: "hsr-layout",
    localityName: "HSR Layout, Bengaluru",
    address: "HSR Sector 6, Near BDA Complex",
    contactName: "HR Team (NexStep Ops)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Freshers Hiring", "Day Shift", "Weekend Off", "Onsite HSR"],
    rating: 4.8,
    reviewsCount: 19,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      jobType: "Full-Time",
      experience: "0 - 1 Years",
      openings: 5
    }
  },
  {
    id: "job-2",
    title: "Part-Time Home Tutor for Class 9-10 Maths & Science",
    category: "jobs",
    subCategory: "Part-Time Gig",
    description: "Looking for a patient newcomer/grad student to tutor 2 kids near Kamla Nagar / DU North Campus. 1.5 hours/day, 5 days a week.",
    price: 8000,
    priceUnit: "per month",
    cityId: "delhi-ncr",
    localityId: "du-north-campus",
    localityName: "DU North Campus, Delhi",
    address: "Kamla Nagar, Delhi",
    contactName: "Meenakshi Verma",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Part-Time", "Home Tutor", "Evening Shift", "Flexible Hours"],
    rating: 4.9,
    reviewsCount: 8,
    verified: true,
    featured: false,
    postedAt: "Yesterday",
    meta: {
      jobType: "Part-Time / Evening",
      duration: "5 Hours / Week",
      qualification: "B.Sc / B.Tech Student or Graduate"
    }
  },

  // 4. PRE-OWNED MARKETPLACE (FURNITURE, APPLIANCES, BIKES)
  {
    id: "market-1",
    title: "Full Room Set: Wooden Bed + Mattress + Study Table + Chair",
    category: "marketplace",
    subCategory: "Furniture & Essentials",
    description: "Moving out of Bengaluru. Selling complete bedroom setup purchased 6 months ago. Immaculate condition, scratchless wooden single bed with orthopedic spring mattress, ergonomic mesh chair, and sturdy study desk.",
    price: 6500,
    priceUnit: "fixed",
    cityId: "bengaluru",
    localityId: "koramangala",
    localityName: "Koramangala, Bengaluru",
    address: "Near Sony World Signal, Koramangala",
    contactName: "Karan Patel",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Pre-owned", "Relocation Sale", "Urgent Sale", "Self Pickup"],
    rating: 5.0,
    reviewsCount: 3,
    verified: true,
    featured: true,
    postedAt: "6 hours ago",
    meta: {
      condition: "Like New (6 months used)",
      reason: "City Transfer",
      pickup: "Koramangala 4th Block"
    }
  },
  {
    id: "market-2",
    title: "Symphony 45L Room Desert Cooler with Honeycomb Pads",
    category: "marketplace",
    subCategory: "Home Appliances",
    description: "Essential for Kota/Delhi summers! High air throw, low noise, works great on inverter. Used for just 1 summer season. Castor wheels included.",
    price: 3200,
    priceUnit: "fixed",
    cityId: "kota",
    localityId: "rajeev-gandhi-nagar",
    localityName: "Rajeev Gandhi Nagar, Kota",
    address: "Near Allen Samanvay, Kota",
    contactName: "Abhishek Jha",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Air Cooler", "Summer Must Have", "Bargain Price"],
    rating: 4.6,
    reviewsCount: 7,
    verified: true,
    featured: false,
    postedAt: "1 day ago",
    meta: {
      condition: "Good Condition",
      warranty: "Bill available"
    }
  },
  {
    id: "market-3",
    title: "Honda Activa 5G (2020 Model) - Single Owner",
    category: "marketplace",
    subCategory: "Vehicles / Scooters",
    description: "Well maintained Honda Activa 5G, 22,000 km driven. New tubeless tires, fresh battery, updated insurance till Dec 2026. Perfect for local commuting in Pune.",
    price: 42000,
    priceUnit: "fixed",
    cityId: "pune",
    localityId: "viman-nagar",
    localityName: "Viman Nagar, Pune",
    address: "Datta Mandir Rd, Viman Nagar",
    contactName: "Siddharth Shinde",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Scooter", "Valid Insurance", "MH-12 Passing", "Test Drive Ready"],
    rating: 4.9,
    reviewsCount: 14,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      mileage: "45 kmpl",
      ownership: "First Owner"
    }
  },

  // 5. LOCAL SERVICES (MAIDS, COOKS, LAUNDRY, REPAIR)
  {
    id: "service-1",
    title: "Reliable House Cook & Maid Service (Breakfast + Dinner)",
    category: "services",
    subCategory: "House Maid & Cook",
    description: "Verified local domestic help for working professionals and bachelors in Koramangala & HSR. Prepares Delicious North & South Indian meals, keeps kitchen spotless, dusting & sweeping.",
    price: 3500,
    priceUnit: "per month",
    cityId: "bengaluru",
    localityId: "hsr-layout",
    localityName: "HSR Layout, Bengaluru",
    address: "HSR Layout Sectors 1-7",
    contactName: "Lakshmi Bai (Coordinator: Ramesh)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Verified Helper", "North/South Cooking", "Bachelor Friendly", "Daily Service"],
    rating: 4.8,
    reviewsCount: 42,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      serviceType: "Cooking + Cleaning",
      policeVerification: "Verified Aadhar Copy Available"
    }
  },
  {
    id: "service-2",
    title: "Wash & Fold Laundry Pickup Service (₹49/kg)",
    category: "services",
    subCategory: "Laundry & Dry Cleaning",
    description: "Same day doorstep pickup & delivery within 24 hours. Ironing, steam wash, shoe cleaning & bedsheet washing. Free pickup for orders above ₹300.",
    price: 49,
    priceUnit: "per kg",
    cityId: "delhi-ncr",
    localityId: "gurgaon-cyber-city",
    localityName: "Gurgaon Cyber City, Delhi / NCR",
    address: "Doorstep Pickup across Gurgaon DLF 1-5",
    contactName: "CleanExpress Laundry",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Doorstep Pickup", "24 Hr Express", "Steam Iron", "Shoe Cleaning"],
    rating: 4.7,
    reviewsCount: 67,
    verified: true,
    featured: false,
    postedAt: "2 days ago",
    meta: {
      turnaround: "24 Hours",
      minOrder: "₹200"
    }
  },

  // 6. CITY SURVIVAL GUIDES & RESOURCES
  {
    id: "resource-1",
    title: "Bengaluru Newcomer Survival Guide: Metro, Police Verification & Rent Rules",
    category: "resources",
    subCategory: "City Survival Guide",
    description: "Complete 2026 checklist for anyone relocating to Bengaluru! Includes Namma Metro smartcard hacks, how to get police verification done online, average deposit rates by area, and basic Kannada phrasebook (15 must-know words).",
    price: 0,
    priceUnit: "free",
    cityId: "bengaluru",
    localityId: "koramangala",
    localityName: "Bengaluru Citywide",
    address: "Free PDF Download & Interactive Guide",
    contactName: "Sahayta City Editorial",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Free Download", "Must Read for Newcomers", "Kannada Phrases", "Metro Guide"],
    rating: 4.9,
    reviewsCount: 156,
    verified: true,
    featured: true,
    postedAt: "Updated yesterday",
    meta: {
      format: "Interactive PDF & Checklist",
      topics: ["Tenant Rights", "Local Transit", "Police Verification", "Kannada Essentials"]
    }
  },
  {
    id: "resource-2",
    title: "Delhi/NCR Rent Agreement Format & Police Tenant Verification Portal Link",
    category: "resources",
    subCategory: "Documentation Helper",
    description: "Download ready-to-edit 11-month rental agreement draft template (Word/PDF) along with direct links to Haryana/Delhi Police online tenant verification forms.",
    price: 0,
    priceUnit: "free",
    cityId: "delhi-ncr",
    localityId: "gurgaon-cyber-city",
    localityName: "Delhi NCR Region",
    address: "Digital Resources",
    contactName: "Sahayta Legal Help",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Agreement Draft", "Legal Template", "Police Verification", "Free"],
    rating: 4.8,
    reviewsCount: 94,
    verified: true,
    featured: false,
    postedAt: "3 days ago",
    meta: {
      format: "Editable Word & PDF",
      topics: ["Rental Contract", "Security Deposit Clause", "Tenant Verification"]
    }
  },

  // 7. EVENTS & MEETUPS
  {
    id: "event-1",
    title: "Newcomers in Bengaluru Meetup & Sunday Breakfast Run",
    category: "events",
    subCategory: "Newcomer Meetup",
    description: "Moved to Bengaluru recently? Join 40+ fellow freshers, techies, and city newcomers for an informal filter coffee, breakfast, and city orientation meetup at Cubbon Park!",
    price: 0,
    priceUnit: "free RSVP",
    cityId: "bengaluru",
    localityId: "indiranagar",
    localityName: "Cubbon Park / Indiranagar",
    address: "Cubbon Park Bandstand, Bengaluru",
    contactName: "Bangalore Newcomers Club",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Free Meetup", "Community Networking", "Sunday Morning", "Filter Coffee"],
    rating: 4.9,
    reviewsCount: 31,
    verified: true,
    featured: true,
    postedAt: "This Sunday 8:00 AM",
    meta: {
      eventDate: "Sunday, 8:00 AM",
      attendees: 48,
      locationDetails: "Cubbon Park Bandstand"
    }
  },

  {
    id: "health-1",
    title: "24/7 MedPlus Pharmacy & Doctor Clinic Directory",
    category: "health",
    subCategory: "Emergency Chemists",
    description: "Verified list of 24-hour pharmacies with doorstep medicine delivery, emergency night clinics, and blood sample collection near Koramangala & HSR Layout.",
    price: 0,
    priceUnit: "free directory",
    cityId: "bengaluru",
    localityId: "koramangala",
    localityName: "Koramangala & HSR",
    address: "Multiple locations near 80ft Road",
    contactName: "Emergency Desk",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["24/7 Pharmacy", "Doorstep Medicine", "Emergency Helpline", "Verified"],
    rating: 5.0,
    reviewsCount: 110,
    verified: true,
    featured: true,
    postedAt: "Always Active",
    meta: {
      open24Hrs: true,
      deliveryTime: "30 Mins"
    }
  },

  // 9. PUNE - JUSTDIAL VERIFIED DIRECTORY
  {
    id: "pune-jd-1",
    title: "Zolo Stays Executive AC PG for Techies in Hinjawadi Phase 1",
    category: "stay",
    subCategory: "Co-living PG",
    description: "Justdial Verified 4.9-Star rated PG located 200m from Infosys Circle and Wipro Circle. Includes 3 daily North/South Indian meals, high-speed fiber Wi-Fi, daily housekeeping, biometric access, and 0% brokerage.",
    price: 11000,
    priceUnit: "per month",
    cityId: "pune",
    localityId: "hinjawadi",
    localityName: "Hinjawadi Phase 1, Pune",
    address: "Near Infosys Circle, Phase 1, Hinjawadi, Pune",
    contactName: "Sanjay Kulkarni (Zolo Manager)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Justdial Verified", "Hinjawadi Phase 1", "3 Meals Included", "AC", "Wi-Fi", "0 Brokerage"],
    rating: 4.9,
    reviewsCount: 84,
    verified: true,
    featured: true,
    postedAt: "Just now",
    meta: {
      occupancy: "Single & Double Sharing",
      deposit: "1 Month Rent",
      ratingBadge: "Top Rated on Justdial"
    }
  },
  {
    id: "pune-jd-2",
    title: "Maa Annapurna Daily Tiffin & Maharashtrian Mess Delivery in Wakad",
    category: "food",
    subCategory: "Daily Tiffin",
    description: "Justdial Certified home tiffin delivery in Wakad, Hinjawadi & Pimple Saudagar. 4 hot Chapatis, Dal Tadka, 2 Sabzis, Rice, Pickle & Sweet on Sundays. Customized Jain & No-Onion Garlic options available.",
    price: 2800,
    priceUnit: "per month",
    cityId: "pune",
    localityId: "wakad",
    localityName: "Wakad, Pune",
    address: "Datta Mandir Road, Wakad, Pune",
    contactName: "Mrs. Shailaja Joshi (Annapurna Tiffin)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Home Cooked", "Free Delivery", "Jain Food", "Maharashtrian", "Monthly Mess"],
    rating: 4.8,
    reviewsCount: 142,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      trialMeal: "₹80 per meal",
      deliveryAreas: ["Wakad", "Hinjawadi", "Pimple Saudagar"]
    }
  },
  {
    id: "pune-jd-3",
    title: "Verified Hinjawadi & Wakad House Maid & Cook Agency (Seva Helpers)",
    category: "services",
    subCategory: "Maid & Cooking Service",
    description: "Justdial Verified domestic help agency. Background and Aadhar verified cooks and maids for bachelors and families in Hinjawadi, Wakad, and Baner. Immediate replacement guarantee.",
    price: 3500,
    priceUnit: "per month",
    cityId: "pune",
    localityId: "hinjawadi",
    localityName: "Hinjawadi & Wakad, Pune",
    address: "Bhujbal Chowk, Wakad, Pune",
    contactName: "Rajendra Patil (Agency Head)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Aadhar Verified", "Police Cleared", "Cook", "Maid", "Bachelor Friendly"],
    rating: 4.9,
    reviewsCount: 96,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      agencyName: "Seva Helpers Pune",
      guarantee: "100% Background Checked"
    }
  },
  {
    id: "pune-jd-4",
    title: "Agarwal Express Packers & Movers - Intra-City Pune Relocation",
    category: "services",
    subCategory: "Packers & Movers",
    description: "Justdial 5-Star rated moving service. Safe shifting of furniture, bikes, luggage, and household goods across Pune, Mumbai & Bangalore with bubble wrap protection.",
    price: 2500,
    priceUnit: "starting base",
    cityId: "pune",
    localityId: "viman-nagar",
    localityName: "Viman Nagar & Hinjawadi, Pune",
    address: "Multiple Depots across Pune",
    contactName: "Ramesh Agarwal",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Packers & Movers", "Bike Transport", "Bubble Packing", "Same Day Moving"],
    rating: 4.8,
    reviewsCount: 175,
    verified: true,
    featured: false,
    postedAt: "Active",
    meta: {
      freeQuote: "Available on Call"
    }
  },
  {
    id: "pune-jd-5",
    title: "Pre-Owned Study Table, Ergonomic Office Chair & Single Bed in Viman Nagar",
    category: "marketplace",
    subCategory: "Pre-owned Furniture",
    description: "Techie relocating to US selling high-quality Green Soul ergonomic chair, solid wood study table, and single metal cot. All items in pristine condition.",
    price: 4800,
    priceUnit: "fixed package",
    cityId: "pune",
    localityId: "viman-nagar",
    localityName: "Viman Nagar, Pune",
    address: "Near Phoenix Marketcity, Viman Nagar",
    contactName: "Gaurav Mehta",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Office Chair", "Study Table", "Relocation Sale", "Immediate Pickup"],
    rating: 5.0,
    reviewsCount: 9,
    verified: true,
    featured: true,
    postedAt: "1 hour ago",
    meta: {
      condition: "Like New (6 Months)"
    }
  },

  // 10. MUMBAI - JUSTDIAL VERIFIED DIRECTORY
  {
    id: "mumbai-jd-1",
    title: "HelloWorld Co-Living Luxury PG near IIT Bombay & Hiranandani Powai",
    category: "stay",
    subCategory: "Co-living PG",
    description: "Top-rated Powai co-living space with lake views. AC rooms, daily breakfast & dinner, high-speed Wi-Fi, PlayStation gaming lounge, and zero brokerage for newcomers in Mumbai.",
    price: 18500,
    priceUnit: "per month",
    cityId: "mumbai",
    localityId: "powai",
    localityName: "Powai, Mumbai",
    address: "Central Avenue, Hiranandani Gardens, Powai",
    contactName: "HelloWorld Powai Desk",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Justdial Verified", "Powai Hiranandani", "AC Rooms", "Food Included", "No Brokerage"],
    rating: 4.8,
    reviewsCount: 62,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      occupancy: "Single / Twin Sharing"
    }
  },
  {
    id: "mumbai-jd-2",
    title: "Authentic Mumbai Dabbawala Lunch & Dinner Service in Andheri East",
    category: "food",
    subCategory: "Daily Tiffin",
    description: "Famous Mumbai Dabbawala network daily hot lunch and dinner delivery across Andheri East, MIDC, SEEPZ & BKC. Fresh home-cooked North Indian & Gujarati meals.",
    price: 3200,
    priceUnit: "per month",
    cityId: "mumbai",
    localityId: "andheri-west",
    localityName: "Andheri East & BKC, Mumbai",
    address: "MIDC Station Area, Andheri East",
    contactName: "Dabbawala Association (Subhash)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Dabbawala", "Punctual Delivery", "Home Made", "Gujarati / North Indian"],
    rating: 5.0,
    reviewsCount: 210,
    verified: true,
    featured: true,
    postedAt: "Active",
    meta: {
      service: "Doorstep Dabba"
    }
  },

  // 11. HYDERABAD - JUSTDIAL VERIFIED DIRECTORY
  {
    id: "hyd-jd-1",
    title: "Boston Living Co-Living Hub in Gachibowli Financial District",
    category: "stay",
    subCategory: "Co-living PG",
    description: "Premium tech professional stay 5 mins from Microsoft & Amazon Hyderabad campuses. Features gym, cafeteria, co-working space, rooftop lounge, and 24x7 security.",
    price: 13500,
    priceUnit: "per month",
    cityId: "hyderabad",
    localityId: "gachibowli",
    localityName: "Gachibowli, Hyderabad",
    address: "Financial District Main Rd, Nanakramguda, Gachibowli",
    contactName: "Boston Living Manager",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Justdial Verified", "Financial District", "Gym & Food", "High-speed Wi-Fi"],
    rating: 4.9,
    reviewsCount: 78,
    verified: true,
    featured: true,
    postedAt: "Today",
    meta: {
      occupancy: "Private & Twin Sharing"
    }
  },
  {
    id: "hyd-jd-2",
    title: "Sri Lakshmi Andhra & North Indian Monthly Tiffin Service in Madhapur",
    category: "food",
    subCategory: "Daily Tiffin",
    description: "Authentic homely meals for IT professionals in Madhapur & Hitec City. Choice of Andhra spicy meals or mild North Indian Phulka Thali delivered hot to your PG.",
    price: 2700,
    priceUnit: "per month",
    cityId: "hyderabad",
    localityId: "madhapur",
    localityName: "Madhapur, Hyderabad",
    address: "100ft Road, Ayyappa Society, Madhapur",
    contactName: "K. Venkatesh",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Andhra Meals", "North Indian", "Hot Delivery", "Hitec City / Madhapur"],
    rating: 4.8,
    reviewsCount: 115,
    verified: true,
    featured: false,
    postedAt: "Today",
    meta: {
      mealsPerDay: 2
    }
  },

  // 12. KOTA - STUDENT & COACHING DIRECTORY
  {
    id: "kota-jd-1",
    title: "Resonance & Allen Student Hostel with Pure Veg Mess in Vigyan Nagar",
    category: "stay",
    subCategory: "Hostel / PG",
    description: "Dedicated peaceful student hostel with study tables, biometric attendance, air cooling, 24/7 power backup, and 4 daily hygienic meals for JEE/NEET aspirants in Kota.",
    price: 9500,
    priceUnit: "per month",
    cityId: "kota",
    localityId: "vigyan-nagar",
    localityName: "Vigyan Nagar, Kota",
    address: "Near Allen Samarth Building, Vigyan Nagar, Kota",
    contactName: "Mahesh Agarwal (Hostel Warden)",
    contactPhone: "+91 99601 65693",
    contactWhatsapp: "+91 99601 65693",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Student Hostel", "Allen / Resonance", "4 Meals Daily", "Silent Study Area"],
    rating: 4.9,
    reviewsCount: 156,
    verified: true,
    featured: true,
    postedAt: "Active",
    meta: {
      studentFriendly: true,
      doctorOnCall: true
    }
  }
];
