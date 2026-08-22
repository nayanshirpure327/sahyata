/**
 * Dictionary of popular search keywords, categories, and common misspellings in India
 */
export const POPULAR_SEARCH_RECOMMENDATIONS = [
  "Co-living PG with Food",
  "Daily Tiffin Service",
  "House Maid & Cook",
  "Pre-owned Study Table",
  "Freshers Jobs",
  "Packers and Movers",
  "Single Room Hinjawadi",
  "Mumbai Dabbawala",
  "Allen Kota Hostel",
  "Zolo Stays AC Room",
];

export const TYPO_DICTIONARY: Record<string, string> = {
  // Food & Tiffin typos
  tifin: "tiffin",
  tifinns: "tiffin",
  tffn: "tiffin",
  tiffinbox: "tiffin",
  daba: "dabba",
  dabbawala: "dabbawala",
  dabawala: "dabbawala",
  khana: "food",
  mess: "tiffin",
  mes: "tiffin",
  cok: "cook",
  kook: "cook",
  cock: "cook",

  // PG & Stay typos
  pgg: "pg",
  pgs: "pg",
  peegee: "pg",
  coliving: "co-living",
  colivng: "co-living",
  hostle: "hostel",
  hostl: "hostel",
  rom: "room",
  rooom: "room",
  flatmat: "flatmate",
  fltmate: "flatmate",
  aprtment: "apartment",
  appartment: "apartment",

  // Services & Maids
  mad: "maid",
  made: "maid",
  mayd: "maid",
  cleening: "cleaning",
  clening: "cleaning",
  electrisian: "electrician",
  electrian: "electrician",
  plumberr: "plumber",
  paker: "packers",
  packr: "packers",
  pakcers: "packers",

  // Marketplace & Furniture
  furiture: "furniture",
  funiture: "furniture",
  furnitur: "furniture",
  tabl: "table",
  chairr: "chair",
  char: "chair",
  bbed: "bed",
  matres: "mattress",
  matress: "mattress",
  frige: "fridge",
  refrigrator: "fridge",

  // City & Locality typos
  banglore: "bengaluru",
  bangalore: "bengaluru",
  benglore: "bengaluru",
  hinjewadi: "hinjawadi",
  hinjwadi: "hinjawadi",
  wakadd: "wakad",
  koramangla: "koramangala",
  kormangala: "koramangala",
  gurgao: "gurgaon",
  gachibowli: "gachibowli",
  viman: "viman nagar",
};

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Returns a spelling suggestion if a typo is detected
 */
export function getSpellingSuggestion(rawQuery: string): string | null {
  if (!rawQuery || rawQuery.trim().length < 3) return null;

  const normalized = rawQuery.toLowerCase().trim();

  // 1. Direct typo dictionary check
  if (TYPO_DICTIONARY[normalized]) {
    return TYPO_DICTIONARY[normalized];
  }

  // 2. Token-by-token check
  const words = normalized.split(/\s+/);
  let changed = false;
  const correctedWords = words.map((word) => {
    if (TYPO_DICTIONARY[word]) {
      changed = true;
      return TYPO_DICTIONARY[word];
    }

    // Levenshtein check against known keywords
    for (const [typo, fix] of Object.entries(TYPO_DICTIONARY)) {
      if (word.length >= 3 && levenshteinDistance(word, typo) === 1) {
        changed = true;
        return fix;
      }
      if (word.length >= 4 && levenshteinDistance(word, fix) === 1 && word !== fix) {
        changed = true;
        return fix;
      }
    }

    return word;
  });

  if (changed) {
    return correctedWords.join(" ");
  }

  return null;
}
