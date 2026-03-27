import { useState, useRef, useEffect, useCallback } from "react";

// ─── VOCABULARY TABLES (from PRD v2.0) ──────────────────────────────────────

const PROPERTY_TYPE_MAP = {
  // ID 1 — Residential Apartment
  "multistorey apartment":1,"multistorey":1,"multi storey":1,"multi-storey":1,
  "flat":1,"flats":1,"apartment":1,"apartments":1,"residential apartment":1,"floor apartment":1,
  // ID 2 — House/Villa
  "independent house":2,"villa":2,"villas":2,"house":2,"houses":2,
  "bungalow":2,"kothi":2,"row house":2,"rowhouse":2,"townhouse":2,"duplex":2,"penthouse":2,
  "independent bungalow":2,"bangla":2,
  // ID 3 — Plot/Land
  "residential plot":3,"residential land":3,"plot":3,"plots":3,"land":3,
  "open plot":3,"bhookhanda":3,"na plot":3,"freehold plot":3,
  // ID 4 — Builder Floor
  "builder floor apartment":4,"builder floor":4,"builder-floor":4,"bf apartment":4,
  // ID 5 — Farm House
  "farm house":5,"farmhouse":5,"farm-house":5,"farm villa":5,"weekend home":5,
  // ID 6 — Shop
  "commercial shop":6,"retail shop":6,"shop":6,"shops":6,"showroom":6,"showrooms":6,"kiosk":6,
  // ID 7 — Office
  "commercial office":7,"office space":7,"office":7,"offices":7,
  "coworking":7,"co-working":7,"business centre":7,"business center":7,"workspace":7,
  // ID 8 — Commercial Land
  "commercial land":8,"commercial plot":8,"industrial land":8,"industrial plot":8,
  // ID 90 — Studio/1RK
  "studio apartment":90,"studio":90,"1 rk":90,"1rk":90,
  "bachelor flat":90,"service apartment":90,"serviced apartment":90,"bachelor apartment":90,
};

const PROPERTY_TYPE_LABELS = {
  1:"Residential Apartment",2:"Independent House/Villa",3:"Residential Plot",
  4:"Builder Floor",5:"Farm House",6:"Commercial Shop",7:"Commercial Office",
  8:"Commercial Land",90:"Studio/1RK",
};

const POSSESSION_MAP = {
  "ready to move":2,"ready-to-move":2,"rtm":2,"immediate possession":2,
  "immediate":2,"move in ready":2,"possession ready":2,"ready possession":2,
  "available immediately":2,"ready":2,
  "under construction":1,"under-construction":1,"uc":1,"ongoing":1,
  "upcoming":1,"in construction":1,"pre-launch":1,"prelaunch":1,"pre launch":1,"booking open":1,
  "new launch":3,"new-launch":3,"newly launched":3,
};

const POSSESSION_LABELS = { 2:"Ready to Move", 1:"Under Construction", 3:"New Launch" };

const FURNISH_MAP = {
  "fully furnished":"F","fully-furnished":"F","furnished":"F","ff":"F","with furniture":"F",
  "semi furnished":"S","semi-furnished":"S","semifurnished":"S",
  "partially furnished":"S","part furnished":"S","sf":"S",
  "unfurnished":"U","un-furnished":"U","bare":"U","without furniture":"U","empty flat":"U","bare shell":"U",
};

const FURNISH_LABELS = { "F":"Furnished", "S":"Semi-Furnished", "U":"Unfurnished" };

const AMENITY_MAP = {
  "swimming pool":1,"swim pool":1,"swimmingpool":1,"pool":1,
  "power backup":2,"power-backup":2,"generator":2,"genset":2,"dg set":2,"inverter backup":2,"inverter":2,
  "club house":3,"clubhouse":3,"club-house":3,"community hall":3,"amenity hall":3,"recreation room":3,
  "reserved parking":4,"covered parking":4,"open parking":4,"car parking":4,"parking":4,
  "stilt parking":4,"basement parking":4,"garage":4,
  "vaastu compliant":5,"vastu compliant":5,"vastu friendly":5,"vastu shastra":5,"vaastu":5,"vastu":5,
  "kids play area":6,"children park":6,"landscaped garden":6,"kids park":6,"play area":6,
  "park":6,"garden":6,"green area":6,
  "24x7 security":9,"gated community":9,"security guard":9,"cctv":9,"intercom":9,
  "24 hour security":9,"gated":9,"security":9,
  "atm":11,"bank atm":11,"nearby atm":11,
  "fitness centre":12,"fitness center":12,"fitness club":12,"workout room":12,"gymnasium":12,"gym":12,
  "elevator":21,"lifts":21,"lift":21,"elevators":21,
  "waste disposal":25,"garbage":25,"waste management":25,
  "piped gas":29,"gas pipeline":29,"png":29,"cooking gas":29,"piped cooking gas":29,
  "wheelchair accessible":34,"disabled access":34,"wheelchair":34,"handicap accessible":34,
  "diesel generator":35,"dg availability":35,"dg":35,"power generator":35,
  "sea facing":100,"sea-facing":100,"sea view":100,"ocean facing":100,"waterfront":100,
};

const AMENITY_LABELS = {
  1:"Swimming Pool",2:"Power Backup",3:"Club House",4:"Parking",5:"Vastu Compliant",
  6:"Park/Garden",9:"Security",11:"ATM",12:"Gymnasium",21:"Lift",
  25:"Waste Disposal",29:"Gas Pipeline",34:"Wheelchair Access",35:"DG Availability",100:"Sea Facing",
};

const FACING_MAP = {
  "north facing":1,"north-facing":1,"north face":1,
  "south facing":2,"south-facing":2,
  "east facing":3,"east-facing":3,"east face":3,
  "west facing":4,"west-facing":4,
  "north east facing":5,"north-east facing":5,"northeast facing":5,"ne facing":5,
  "north west facing":6,"north-west facing":6,"northwest facing":6,"nw facing":6,
  "south east facing":7,"south-east facing":7,"southeast facing":7,"se facing":7,
  "south west facing":8,"south-west facing":8,"southwest facing":8,"sw facing":8,
};

const FACING_LABELS = {
  1:"North",2:"South",3:"East",4:"West",
  5:"North-East",6:"North-West",7:"South-East",8:"South-West",
};

const PROPERTY_FEATURE_MAP = {
  "corner property":1,"corner plot":1,"corner flat":1,"corner unit":1,"corner":1,
  "park facing":2,"garden facing":2,"overlooking park":2,"overlooks garden":2,
  "road facing":3,"main road facing":3,"main road":3,
  "roof rights":4,"terrace rights":4,"with roof":4,"roof access":4,"terrace access":4,
};

const PROPERTY_FEATURE_LABELS = {
  1:"Corner Property",2:"Park Facing",3:"Road Facing",4:"Roof Rights",
};

const BUDGET_TIERS = [
  {id:2,price:500000,label:"5L"},{id:3,price:1000000,label:"10L"},
  {id:4,price:1500000,label:"15L"},{id:5,price:2000000,label:"20L"},
  {id:6,price:2500000,label:"25L"},{id:7,price:3000000,label:"30L"},
  {id:8,price:4000000,label:"40L"},{id:9,price:5000000,label:"50L"},
  {id:10,price:6000000,label:"60L"},{id:11,price:7500000,label:"75L"},
  {id:127,price:8000000,label:"80L"},{id:128,price:8500000,label:"85L"},
  {id:12,price:9000000,label:"90L"},{id:130,price:9500000,label:"95L"},
  {id:13,price:10000000,label:"1Cr"},{id:14,price:15000000,label:"1.5Cr"},
  {id:15,price:20000000,label:"2Cr"},{id:16,price:30000000,label:"3Cr"},
  {id:169,price:40000000,label:"4Cr"},{id:17,price:50000000,label:"5Cr"},
  {id:18,price:100000000,label:"10Cr"},
];

// ─── GEOGRAPHIC DATA ─────────────────────────────────────────────────────────

// Unified geo entity table — cities and localities share same ID space
const GEO_ENTITIES = [
  // Cities
  {id:12,name:"Mumbai",type:"city",listing_count:90000},
  {id:15,name:"Navi Mumbai",type:"city",listing_count:25000},
  {id:218,name:"Western Mumbai",type:"city",listing_count:30000},
  {id:1,name:"Delhi",type:"city",listing_count:80000},
  {id:7,name:"Noida",type:"city",listing_count:50000},
  {id:222,name:"Greater Noida",type:"city",listing_count:30000},
  {id:3,name:"Gurugram",type:"city",listing_count:40000},
  {id:4,name:"Faridabad",type:"city",listing_count:15000},
  {id:9,name:"Bangalore",type:"city",listing_count:70000},
  {id:6,name:"Pune",type:"city",listing_count:45000},
  {id:10,name:"Hyderabad",type:"city",listing_count:55000},
  {id:11,name:"Chennai",type:"city",listing_count:35000},
  {id:2,name:"Kolkata",type:"city",listing_count:30000},
  {id:16,name:"Ahmedabad",type:"city",listing_count:25000},
  {id:18,name:"Jaipur",type:"city",listing_count:20000},
  {id:19,name:"Lucknow",type:"city",listing_count:18000},
  // Localities — Mumbai
  {id:4931,name:"Bandra West",type:"locality",parent_city_id:12,listing_count:8000},
  {id:7913,name:"Bandra",type:"locality",parent_city_id:12,listing_count:3000},
  {id:4932,name:"Bandra East",type:"locality",parent_city_id:12,listing_count:4000},
  {id:4933,name:"BKC",type:"locality",parent_city_id:12,listing_count:5000},
  {id:4900,name:"Andheri",type:"locality",parent_city_id:12,listing_count:12000},
  {id:4901,name:"Andheri West",type:"locality",parent_city_id:12,listing_count:7000},
  {id:4902,name:"Andheri East",type:"locality",parent_city_id:12,listing_count:6000},
  {id:4850,name:"Powai",type:"locality",parent_city_id:12,listing_count:9000},
  {id:4851,name:"Juhu",type:"locality",parent_city_id:12,listing_count:4000},
  {id:4852,name:"Worli",type:"locality",parent_city_id:12,listing_count:5000},
  {id:4853,name:"Lower Parel",type:"locality",parent_city_id:12,listing_count:6000},
  {id:4857,name:"Borivali",type:"locality",parent_city_id:12,listing_count:8000},
  {id:4858,name:"Thane",type:"locality",parent_city_id:12,listing_count:15000},
  // Localities — Delhi NCR
  {id:3100,name:"Sector 62",type:"locality",parent_city_id:7,listing_count:5000},
  {id:2150,name:"Sector 62",type:"locality",parent_city_id:3,listing_count:2000},
  {id:2200,name:"Sector 62",type:"locality",parent_city_id:4,listing_count:800},
  {id:3103,name:"Noida Extension",type:"locality",parent_city_id:7,listing_count:12000},
  {id:2104,name:"Rohini",type:"locality",parent_city_id:1,listing_count:7000},
  {id:2106,name:"Vasant Kunj",type:"locality",parent_city_id:1,listing_count:4000},
  {id:2109,name:"Hauz Khas",type:"locality",parent_city_id:1,listing_count:3000},
  {id:2101,name:"Dwarka Expressway",type:"locality",parent_city_id:3,listing_count:9000},
  {id:2102,name:"Golf Course Road",type:"locality",parent_city_id:3,listing_count:5000},
  // Localities — Bangalore
  {id:5100,name:"Whitefield",type:"locality",parent_city_id:9,listing_count:15000},
  {id:5101,name:"Electronic City",type:"locality",parent_city_id:9,listing_count:12000},
  {id:5102,name:"Koramangala",type:"locality",parent_city_id:9,listing_count:8000},
  {id:5103,name:"HSR Layout",type:"locality",parent_city_id:9,listing_count:6000},
  {id:5104,name:"Indiranagar",type:"locality",parent_city_id:9,listing_count:5000},
  {id:5110,name:"Indira Nagar",type:"locality",parent_city_id:9,listing_count:4000},
  // Localities — Pune
  {id:6101,name:"Hinjewadi",type:"locality",parent_city_id:6,listing_count:10000},
  {id:6102,name:"Baner",type:"locality",parent_city_id:6,listing_count:8000},
  {id:6100,name:"Wakad",type:"locality",parent_city_id:6,listing_count:7000},
  {id:6103,name:"Kothrud",type:"locality",parent_city_id:6,listing_count:5000},
  // Localities — Hyderabad
  {id:7100,name:"Gachibowli",type:"locality",parent_city_id:10,listing_count:12000},
  {id:7101,name:"Hitech City",type:"locality",parent_city_id:10,listing_count:10000},
  {id:7102,name:"Kondapur",type:"locality",parent_city_id:10,listing_count:7000},
  // Ambiguous localities
  {id:2130,name:"Malviya Nagar",type:"locality",parent_city_id:1,listing_count:4000},
  {id:9100,name:"Malviya Nagar",type:"locality",parent_city_id:18,listing_count:1500},
  {id:5110,name:"Indira Nagar",type:"locality",parent_city_id:9,listing_count:4000},
  {id:9220,name:"Indira Nagar",type:"locality",parent_city_id:19,listing_count:3000},
];

// ─── LEVENSHTEIN ─────────────────────────────────────────────────────────────

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const dp = Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}

function fuzzyFind(text, keys, threshold = 0.80) {
  const words = text.split(/\s+/);
  let best = null;
  for (const key of keys.sort((a,b)=>b.length-a.length)) {
    const keyWords = key.split(/\s+/);
    for (let i=0;i<=words.length-keyWords.length;i++) {
      const window = words.slice(i,i+keyWords.length).join(" ");
      const dist = levenshtein(window, key);
      const score = 1 - dist/Math.max(window.length, key.length);
      if (score >= threshold && (!best || score > best.score))
        best = {matched:key, window, score, dist};
    }
  }
  return best;
}

// ─── GEO N-GRAM SCORING (PRD Section 5) ─────────────────────────────────────

const L = 10, E = 7; // scoring constants

function scoreGeoMatch(tokenCount, editDistance) {
  return tokenCount * L - editDistance * E;
}

function resolveGeo(residualTokens, cityOverride = null) {
  const text = residualTokens.join(" ").toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  
  const candidates = [];
  
  // Generate all n-grams (1,2,3 tokens)
  for (let len = 3; len >= 1; len--) {
    for (let i = 0; i <= words.length - len; i++) {
      const ngram = words.slice(i, i + len).join(" ");
      // Exact match
      const exactMatches = GEO_ENTITIES.filter(e => e.name.toLowerCase() === ngram);
      for (const m of exactMatches) {
        candidates.push({entity:m, editDist:0, ngram, score:scoreGeoMatch(len,0)});
      }
      // Fuzzy match (only if no exact)
      if (exactMatches.length === 0 && len <= 2) {
        for (const entity of GEO_ENTITIES) {
          const eName = entity.name.toLowerCase();
          if (Math.abs(eName.split(" ").length - len) > 1) continue;
          const dist = levenshtein(ngram, eName);
          const maxLen = Math.max(ngram.length, eName.length);
          const similarity = 1 - dist / maxLen;
          if (similarity >= 0.78 && dist <= 2) {
            const s = scoreGeoMatch(len, dist);
            candidates.push({entity, editDist:dist, ngram, score:s});
          }
        }
      }
    }
  }
  
  if (candidates.length === 0) return null;
  
  // Sort by score desc, then listing_count desc
  candidates.sort((a,b) => b.score !== a.score ? b.score-a.score : b.entity.listing_count-a.entity.listing_count);
  
  const winner = candidates[0];
  const result = { winner, allCandidates: candidates.slice(0,5) };
  
  // Check ambiguity — same name, multiple cities, similar score
  const sameScore = candidates.filter(c =>
    c.entity.name.toLowerCase() === winner.entity.name.toLowerCase() &&
    c.entity.parent_city_id !== winner.entity.parent_city_id &&
    Math.abs(c.score - winner.score) < 3
  );
  
  if (sameScore.length > 0 && !cityOverride) {
    result.ambiguous = true;
    result.options = [winner, ...sameScore].map(c => c.entity);
  }
  
  // Resolve city + locality
  if (winner.entity.type === "city") {
    result.cityId = winner.entity.id;
    result.cityName = winner.entity.name;
    // Find locality in remaining tokens
    const remaining = words.filter(w => !winner.ngram.includes(w));
    if (remaining.length > 0) {
      const localityCands = candidates.filter(c =>
        c.entity.type === "locality" &&
        c.entity.parent_city_id === winner.entity.id &&
        c !== winner
      );
      if (localityCands.length > 0) {
        result.localityIds = localityCands.map(c=>c.entity.id);
        result.localityName = localityCands[0].entity.name;
      }
    }
  } else {
    // Locality used directly
    result.localityIds = [winner.entity.id];
    result.localityName = winner.entity.name;
    // Infer city from parent
    if (winner.entity.parent_city_id) {
      const parentCity = GEO_ENTITIES.find(e => e.id === winner.entity.parent_city_id && e.type === "city");
      if (parentCity) {
        result.cityId = parentCity.id;
        result.cityName = parentCity.name;
      }
    }
    // Fan-out — same parent name
    const siblings = GEO_ENTITIES.filter(e =>
      e.type === "locality" &&
      e.parent_city_id === winner.entity.parent_city_id &&
      e.name.toLowerCase().startsWith(winner.entity.name.toLowerCase().split(" ")[0])
    );
    if (siblings.length > 1) result.localityIds = siblings.map(e=>e.id);
  }
  
  result.fuzzyCorrection = winner.editDist > 0
    ? { original: winner.ngram, corrected: winner.entity.name, dist: winner.editDist }
    : null;
  
  return result;
}

// ─── MAIN NLP PARSER ─────────────────────────────────────────────────────────

function getBudgetTier(price) {
  return BUDGET_TIERS.reduce((best,t) =>
    Math.abs(t.price-price) < Math.abs(best.price-price) ? t : best
  );
}

function formatPrice(p) {
  if (p >= 10000000) return `₹${(p/10000000).toFixed(p%10000000===0?0:2)} Cr`;
  if (p >= 100000) return `₹${(p/100000).toFixed(p%100000===0?0:1)} L`;
  return `₹${p.toLocaleString()}`;
}

function dictFind(text, map, threshold = 0.80) {
  const keys = Object.keys(map).sort((a,b)=>b.length-a.length);
  // Exact first
  for (const k of keys) if (text.includes(k)) return {key:k, value:map[k], dist:0};
  // Fuzzy
  const f = fuzzyFind(text, keys, threshold);
  if (f) return {key:f.matched, value:map[f.matched], dist:f.dist, original:f.window};
  return null;
}

function parseQuery(raw, geoOverride = null) {
  const text = raw.toLowerCase().trim();
  const entities = {};
  const fuzzyMatches = [];

  // 1. BEDROOM
  const bedMatch = text.match(/(\d)\s*(?:bhk|bhks|bedroom|bedrooms|bed room|bed\b|br\b)/);
  if (bedMatch) entities.bedroom = parseInt(bedMatch[1]);
  else if (/\b1\s*rk\b|1rk\b/.test(text)) { entities.bedroom = 1; entities.isRK = true; }

  // 2. PROPERTY TYPE — exact then fuzzy
  const ptKeys = Object.keys(PROPERTY_TYPE_MAP).sort((a,b)=>b.length-a.length);
  let ptFound = false;
  for (const k of ptKeys) {
    if (text.includes(k)) {
      entities.propertyType = PROPERTY_TYPE_MAP[k];
      entities.propertyTypeLabel = PROPERTY_TYPE_LABELS[PROPERTY_TYPE_MAP[k]];
      ptFound = true; break;
    }
  }
  if (!ptFound) {
    const f = fuzzyFind(text, ptKeys, 0.80);
    if (f) {
      entities.propertyType = PROPERTY_TYPE_MAP[f.matched];
      entities.propertyTypeLabel = PROPERTY_TYPE_LABELS[PROPERTY_TYPE_MAP[f.matched]];
      fuzzyMatches.push({original:f.window, corrected:f.matched, entity:"propertyType"});
    }
  }

  // 3. PREFERENCE
  entities.preference = /\b(rent|renting|for rent|rental|on rent|lease|to let|pg|paying guest)\b/.test(text) ? "R" : "S";

  // 4. SALE TYPE
  if (/\bresale\b|\bre-sale\b|\bsecond hand\b|\bused property\b/.test(text)) entities.saleType = "resale";
  else if (/\bnew (flat|project|property|construction)\b|\bnewly built\b/.test(text)) entities.saleType = "new";

  // 5. PRICE
  const priceRx = /(\b(?:under|below|upto|up to|less than|within|maximum|max|atmost|budget|above|more than|starting from|starting|minimum|min|at least|from)\b)?\s*(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|crore|crores|cr|CR|Cr|L|k|K)?\b/gi;
  let pm;
  while ((pm = priceRx.exec(text)) !== null) {
    const dir = pm[1]?.trim().toLowerCase();
    const num = parseFloat(pm[2]);
    const unit = pm[3]?.toLowerCase();
    if (!unit && num > 1000) continue;
    let price = num;
    if (!unit && num <= 1000) continue;
    if (unit==="lakh"||unit==="lakhs"||unit==="lac"||unit==="lacs"||unit==="l") price=num*100000;
    else if (unit==="crore"||unit==="crores"||unit==="cr") price=num*10000000;
    else if (unit==="k") price=num*1000;
    else continue;
    if (price < 10000) continue;
    const isMax = !dir || /under|below|upto|up to|less than|within|maximum|max|atmost|budget/.test(dir);
    const isMin = dir && /above|more than|starting|minimum|min|at least|from/.test(dir);
    if (isMin) { entities.minPrice=price; entities.minPriceTier=getBudgetTier(price); }
    else { entities.maxPrice=price; entities.maxPriceTier=getBudgetTier(price); }
  }

  // 6. POSSESSION
  const possKeys = Object.keys(POSSESSION_MAP).sort((a,b)=>b.length-a.length);
  for (const k of possKeys) {
    if (text.includes(k)) {
      entities.possession = POSSESSION_MAP[k];
      entities.possessionLabel = POSSESSION_LABELS[POSSESSION_MAP[k]];
      break;
    }
  }
  if (!entities.possession) {
    const f = fuzzyFind(text, possKeys, 0.85);
    if (f) {
      entities.possession = POSSESSION_MAP[f.matched];
      entities.possessionLabel = POSSESSION_LABELS[POSSESSION_MAP[f.matched]];
      fuzzyMatches.push({original:f.window, corrected:f.matched, entity:"possession"});
    }
  }

  // 7. FURNISHING
  const furnKeys = Object.keys(FURNISH_MAP).sort((a,b)=>b.length-a.length);
  for (const k of furnKeys) {
    if (text.includes(k)) {
      entities.furnish = FURNISH_MAP[k];
      entities.furnishLabel = FURNISH_LABELS[FURNISH_MAP[k]];
      break;
    }
  }

  // 8. AMENITIES — collect ALL
  const amenities = [];
  const amenKeys = Object.keys(AMENITY_MAP).sort((a,b)=>b.length-a.length);
  for (const k of amenKeys) {
    if (text.includes(k)) {
      const id = AMENITY_MAP[k];
      if (!amenities.find(a=>a.id===id))
        amenities.push({id, label:AMENITY_LABELS[id]||k});
    }
  }
  if (amenities.length > 0) entities.amenities = amenities;

  // 9. FACING
  const facKeys = Object.keys(FACING_MAP).sort((a,b)=>b.length-a.length);
  for (const k of facKeys) {
    if (text.includes(k)) {
      entities.facing = FACING_MAP[k];
      entities.facingLabel = FACING_LABELS[FACING_MAP[k]];
      break;
    }
  }

  // 10. PROPERTY FEATURES
  const pfKeys = Object.keys(PROPERTY_FEATURE_MAP).sort((a,b)=>b.length-a.length);
  for (const k of pfKeys) {
    if (text.includes(k)) {
      entities.propertyFeature = PROPERTY_FEATURE_MAP[k];
      entities.propertyFeatureLabel = PROPERTY_FEATURE_LABELS[PROPERTY_FEATURE_MAP[k]];
      break;
    }
  }

  // 11. AREA
  const areaM = text.match(/(\d+(?:\.\d+)?)\s*(?:sq\.?\s*ft|sqft|sft|square\s*f(?:eet|oot)|sq\.?\s*yard|sqyard|gaj|gaz|sq\.?\s*m(?:eter|etre|tr)?|sqm|acre|marla)/i);
  if (areaM) {
    let area = parseFloat(areaM[1]);
    const u = areaM[0].toLowerCase();
    if (/yard|gaj|gaz/.test(u)) area = Math.round(area*9);
    else if (/sq\s*m|sqm/.test(u)) area = Math.round(area*10.764);
    else if (/acre/.test(u)) area = Math.round(area*43560);
    entities.minArea = area;
  }

  // 12. POSTED BY
  if (/\b(owner|by owner|direct owner|no broker|no brokerage|without broker|zero brokerage)\b/.test(text))
    entities.postedBy = "O";
  else if (/\b(builder|developer|from builder)\b/.test(text)) entities.postedBy = "B";

  // 13. RERA
  if (/\brera\b/.test(text)) entities.rera = true;

  // 14. BATHROOM
  const bathM = text.match(/(\d)\s*(?:bath(?:room)?s?|washroom|toilet)/);
  if (bathM) entities.bathrooms = parseInt(bathM[1]);

  // 15. GEOGRAPHIC RESOLUTION — N-gram residual
  // Strip known claimed tokens to get geographic residual
  const stopwords = new Set(["in","at","near","for","with","and","or","the","a","an","of","to","from","by"]);
  const allSynonyms = [
    ...Object.keys(PROPERTY_TYPE_MAP),
    ...Object.keys(POSSESSION_MAP),
    ...Object.keys(FURNISH_MAP),
    ...Object.keys(AMENITY_MAP),
    ...Object.keys(FACING_MAP),
    ...Object.keys(PROPERTY_FEATURE_MAP),
  ].sort((a, b) => b.length - a.length);

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const knownPatterns = [
    /\d+\s*(?:bhk|bhks|bedroom|bedrooms|bed\b|br\b)/gi,
    /\d+(?:\.\d+)?\s*(?:lakh|lakhs|lac|lacs|crore|crores|cr|l\b|k\b)/gi,
    /(?:under|below|upto|above|more than|starting|minimum|maximum|budget)\b/gi,
    /(?:sqft|sq\s*ft|square\s*feet|sq\s*yard|gaj)/gi,
    /(?:ready\s*to\s*move|under\s*construction|new\s*launch|rtm)/gi,
    /(?:furnished|unfurnished|semi\s*furnished)/gi,
    /(?:for\s*(?:sale|rent)|buy|purchase|rent|lease)/gi,
    /\d+\s*(?:bath(?:room)?|washroom)/gi,
    /(?:owner|by owner|direct owner|no broker|no brokerage|without broker|zero brokerage)/gi,
    /(?:builder|developer|from builder)/gi,
    /\brk\b/gi,
    /\brera\b/gi,
    ...allSynonyms.map(k => new RegExp("\\b" + escapeRegExp(k) + "\\b", "gi")),
    ...fuzzyMatches.map(m => new RegExp("\\b" + escapeRegExp(m.original) + "\\b", "gi"))
  ];
  let residual = text;
  for (const p of knownPatterns) residual = residual.replace(p, " ");
  const residualTokens = residual.split(/\s+/).filter(t => t.length > 1 && !stopwords.has(t));

  if (residualTokens.length > 0) {
    const geoResult = resolveGeo(residualTokens, geoOverride);
    if (geoResult) {
      entities.geoResult = geoResult;
      if (!geoResult.ambiguous) {
        if (geoResult.cityId) { entities.cityId = geoResult.cityId; entities.cityName = geoResult.cityName; }
        if (geoResult.localityIds) { entities.localityIds = geoResult.localityIds; entities.localityName = geoResult.localityName; }
        if (geoResult.fuzzyCorrection) fuzzyMatches.push({...geoResult.fuzzyCorrection, entity:"location"});
      }
    }
  }

  entities.fuzzyMatches = fuzzyMatches;

  // Build Solr params
  const params = buildParams(entities);

  return { entities, params, raw, residualTokens };
}

function buildParams(e) {
  if (e.geoResult?.ambiguous) return { status:"AWAITING_CITY_DISAMBIGUATION" };
  if (!e.cityId && !e.localityIds) return { status:"NO_LOCATION" };
  const p = {};
  if (e.cityId) p.city = e.cityId;
  if (e.localityIds) p.locality_array = e.localityIds.join(",");
  if (e.bedroom) p.bedroom_num = e.bedroom;
  if (e.propertyType) p.property_type = e.propertyType;
  p.preference = e.preference || "S";
  if (e.maxPriceTier) { p.budget_max = e.maxPriceTier.id; p.maxPrice = e.maxPrice; }
  if (e.minPriceTier) { p.budget_min = e.minPriceTier.id; p.minPrice = e.minPrice; }
  if (e.possession) p.availability = e.possession;
  if (e.furnish) p.furnish = e.furnish;
  if (e.amenities?.length) p.features = e.amenities.map(a=>a.id).join(",");
  if (e.facing) p.facing_direction = e.facing;
  if (e.propertyFeature) p.property_feature = e.propertyFeature;
  if (e.minArea) p.area_min = e.minArea;
  if (e.postedBy) p.class = e.postedBy;
  if (e.rera) p.rera = true;
  if (e.bathrooms) p.bathroom_num = e.bathrooms;
  if (e.saleType) p.sale_type = e.saleType;
  p.area_unit = 1; p.res_com = "R"; p.search_type = "QS"; p.moduleName = "FREE_TEXT";
  return p;
}

// ─── EXAMPLES ────────────────────────────────────────────────────────────────

const EXAMPLES = [
  "3bhk flat in bandra under 1 crore ready to move",
  "2bhk apartment in greater noida under 80 lakhs",
  "villa in koramangala bangalore above 2 crore with gym",
  "furnished studio apartment for rent in delhi under 25k",
  "2bhk in grater noida under 80L",
  "4bhk penthouse worli sea facing north east facing",
  "plot in hinjewadi pune under 50 lakhs",
  "3bhk flat malviya nagar",
  "office space in bkc above 2 crore rera registered",
  "independent house vasant kunj no broker",
];

// ─── UI ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [key, setKey] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const parse = useCallback((q = query, geoOverride = null) => {
    if (!q.trim()) return;
    setResult(parseQuery(q, geoOverride));
    setKey(k => k + 1);
  }, [query]);

  const pickCity = (cityId) => parse(result.raw, cityId);

  const e = result?.entities || {};
  const p = result?.params || {};
  const hasError = p.status === "NO_LOCATION" || p.status === "AWAITING_CITY_DISAMBIGUATION";
  const isAmbiguous = p.status === "AWAITING_CITY_DISAMBIGUATION";
  const isNoLocation = p.status === "NO_LOCATION";

  const Tag = ({ label, val, color = "#3b82f6" }) => (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:`${color}18`, border:`1px solid ${color}40`,
      borderRadius:6, padding:"3px 10px", fontSize:12, color, fontWeight:600,
      fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap",
    }}>
      {label && <span style={{opacity:0.6,fontSize:11}}>{label}:</span>}
      {val}
    </span>
  );

  const Section = ({ title, dot, children }) => (
    <div style={{
      background:"#0f1117", border:"1px solid #1e2433",
      borderRadius:10, overflow:"hidden", marginBottom:12,
    }}>
      <div style={{
        background:"#141824", borderBottom:"1px solid #1e2433",
        padding:"10px 18px", display:"flex", alignItems:"center", gap:8,
      }}>
        <div style={{width:7,height:7,borderRadius:"50%",background:dot}} />
        <span style={{fontSize:11,color:"#8892a4",letterSpacing:"0.8px",fontFamily:"'DM Mono',monospace"}}>{title}</span>
      </div>
      <div style={{padding:"14px 18px"}}>{children}</div>
    </div>
  );

  return (
    <div style={{
      minHeight:"100vh", background:"#070b12",
      fontFamily:"'DM Mono', 'Fira Code', monospace",
      color:"#c9d1e0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box}
        ::placeholder{color:#2e3a4e}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:#0a0e18}
        ::-webkit-scrollbar-thumb{background:#1e2a3a;border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .example-btn:hover{background:#1a2233!important;border-color:#3b82f6!important;color:#93c5fd!important}
        .parse-btn:hover{background:#2563eb!important}
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom:"1px solid #111827",
        padding:"18px 28px",
        display:"flex", alignItems:"center", gap:14,
        background:"linear-gradient(180deg,#0d1220 0%,#070b12 100%)",
      }}>
        <div style={{
          background:"linear-gradient(135deg,#3b82f6,#2563eb)",
          color:"#fff", fontSize:11, fontWeight:700,
          padding:"4px 10px", borderRadius:4, letterSpacing:"1.5px",
        }}>REAL ESTATE</div>
        <div style={{color:"#2e3a4e",fontSize:12,letterSpacing:"0.5px"}}>Free Text Search — NLP Query Parser</div>
        <div style={{
          marginLeft:"auto", background:"#0f1a2e",
          border:"1px solid #1a2a40", borderRadius:5,
          padding:"3px 12px", fontSize:10, color:"#3b82f6", letterSpacing:"1px",
        }}>FREE_TEXT</div>
      </div>

      <div style={{padding:"24px 28px", maxWidth:960, margin:"0 auto"}}>

        {/* Input */}
        <div style={{
          background:"#0f1117", border:"1px solid #1e2433",
          borderRadius:10, padding:4, display:"flex", gap:6, marginBottom:16,
          boxShadow:"0 0 0 1px rgba(59,130,246,0.08)",
        }}>
          <input
            ref={inputRef}
            value={query}
            onChange={e=>setQuery(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&parse()}
            placeholder="3bhk flat in bandra under 1 crore ready to move..."
            style={{
              flex:1, background:"transparent", border:"none", outline:"none",
              color:"#e2e8f0", fontSize:15, padding:"12px 16px",
              fontFamily:"'DM Mono',monospace",
            }}
          />
          <button
            className="parse-btn"
            onClick={()=>parse()}
            style={{
              background:"#1d4ed8", border:"none", borderRadius:7,
              color:"#fff", fontFamily:"'DM Mono',monospace",
              fontSize:11, fontWeight:700, padding:"10px 22px",
              cursor:"pointer", letterSpacing:"1px", transition:"background 0.15s",
            }}
          >PARSE →</button>
        </div>

        {/* Examples */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:10,color:"#2e3a4e",letterSpacing:"1.2px",marginBottom:8}}>EXAMPLES:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {EXAMPLES.map((ex,i)=>(
              <button key={i} className="example-btn" onClick={()=>{setQuery(ex);parse(ex);}}
                style={{
                  background:"#0f1117",border:"1px solid #1e2433",borderRadius:5,
                  color:"#4b5a6e",fontFamily:"'DM Mono',monospace",fontSize:10,
                  padding:"5px 10px",cursor:"pointer",transition:"all 0.12s",
                }}>{ex}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div key={key} style={{animation:"fadeUp 0.25s ease"}}>

            {/* Fuzzy corrections */}
            {e.fuzzyMatches?.length > 0 && (
              <div style={{
                background:"#0c1a0f", border:"1px solid #166534",
                borderRadius:8, padding:"10px 16px", marginBottom:12,
                display:"flex", flexWrap:"wrap", gap:8, alignItems:"center",
              }}>
                <span style={{fontSize:10,color:"#4ade80",letterSpacing:"1px"}}>✏ TYPO CORRECTIONS:</span>
                {e.fuzzyMatches.map((m,i)=>(
                  <span key={i} style={{fontSize:11,color:"#86efac"}}>
                    <span style={{color:"#f87171",textDecoration:"line-through"}}>"{m.original}"</span>
                    <span style={{color:"#4b5563",margin:"0 4px"}}>→</span>
                    <span style={{color:"#4ade80",fontWeight:600}}>"{m.corrected}"</span>
                    <span style={{color:"#374151",fontSize:10,marginLeft:4}}>({m.entity})</span>
                  </span>
                ))}
              </div>
            )}

            {/* Ambiguity */}
            {isAmbiguous && e.geoResult?.options && (
              <div style={{
                background:"#130e1f", border:"1px solid #7c3aed",
                borderRadius:10, overflow:"hidden", marginBottom:12,
              }}>
                <div style={{
                  background:"#1a1030", borderBottom:"1px solid #7c3aed",
                  padding:"12px 18px", display:"flex", alignItems:"center", gap:8,
                }}>
                  <span style={{fontSize:16}}>🔀</span>
                  <span style={{color:"#c084fc",fontSize:12,fontWeight:600,letterSpacing:"0.5px"}}>
                    Ambiguous locality — which city?
                  </span>
                </div>
                <div style={{padding:"16px 18px"}}>
                  <div style={{color:"#a78bfa",fontSize:12,marginBottom:14}}>
                    <span style={{color:"#e879f9",fontWeight:700}}>"{e.geoResult.winner?.entity?.name}"</span>
                    {" "}exists in multiple cities:
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                    {e.geoResult.options.map((opt,i)=>(
                      <button key={i} onClick={()=>pickCity(opt.parent_city_id || opt.id)}
                        style={{
                          background:"#1e1535", border:"1px solid #7c3aed",
                          borderRadius:8, padding:"10px 18px", cursor:"pointer",
                          fontFamily:"'DM Mono',monospace", transition:"all 0.12s",
                          display:"flex", flexDirection:"column", gap:3,
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#2d1f52";e.currentTarget.style.borderColor="#a855f7";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#1e1535";e.currentTarget.style.borderColor="#7c3aed";}}>
                        <span style={{color:"#c084fc",fontSize:13,fontWeight:700}}>
                          {opt.name}
                        </span>
                        <span style={{color:"#6b7280",fontSize:10}}>
                          {GEO_ENTITIES.find(e=>e.id===opt.parent_city_id)?.name || opt.name} · id:{opt.id}
                        </span>
                        {i===0&&<span style={{color:"#7c3aed",fontSize:9,letterSpacing:"1px"}}>TOP MATCH</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No location */}
            {isNoLocation && (
              <div style={{
                background:"#1a0e0a", border:"1px solid #b45309",
                borderRadius:8, padding:"12px 18px",
                display:"flex", alignItems:"center", gap:10, marginBottom:12,
              }}>
                <span style={{fontSize:18}}>⚠️</span>
                <div>
                  <div style={{color:"#fbbf24",fontSize:12,fontWeight:700}}>Please specify the locality</div>
                  <div style={{color:"#78350f",fontSize:11,marginTop:2}}>
                    No city or locality detected — search blocked (same as 99acres behaviour)
                  </div>
                </div>
              </div>
            )}

            {/* Resolved Entities */}
            {!isAmbiguous && (
              <Section title="resolvedEntities" dot="#22c55e">
                {Object.keys(e).filter(k=>!["geoResult","fuzzyMatches","isRK"].includes(k)).length === 0
                  ? <span style={{color:"#374151",fontSize:12}}>No entities extracted</span>
                  : <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {e.bedroom && <Tag label="bedroom_num" val={e.isRK?"1 RK":e.bedroom} color="#3b82f6"/>}
                    {e.propertyType && <Tag label="property_type" val={`${e.propertyType} (${e.propertyTypeLabel})`} color="#8b5cf6"/>}
                    {e.cityName && <Tag label="city" val={`${e.cityName} (${e.cityId})`} color="#ef4444"/>}
                    {e.localityName && <Tag label="locality" val={e.localityName} color="#f97316"/>}
                    {e.localityIds?.length > 1 && <Tag label="fan-out" val={`[${e.localityIds.join(",")}]`} color="#f97316"/>}
                    {e.maxPrice && <Tag label="max_price" val={`${formatPrice(e.maxPrice)} (tier ${e.maxPriceTier?.id})`} color="#10b981"/>}
                    {e.minPrice && <Tag label="min_price" val={`${formatPrice(e.minPrice)} (tier ${e.minPriceTier?.id})`} color="#10b981"/>}
                    {e.possession && <Tag label="availability" val={`${e.possession} (${e.possessionLabel})`} color="#06b6d4"/>}
                    {e.furnish && <Tag label="furnish" val={`${e.furnish} (${e.furnishLabel})`} color="#a855f7"/>}
                    {e.facing && <Tag label="facing" val={`${e.facing} (${e.facingLabel})`} color="#0ea5e9"/>}
                    {e.propertyFeature && <Tag label="prop_feature" val={e.propertyFeatureLabel} color="#84cc16"/>}
                    {e.minArea && <Tag label="area_min" val={`${e.minArea} sqft`} color="#f59e0b"/>}
                    {e.postedBy && <Tag label="class" val={e.postedBy==="O"?"Owner":"Builder"} color="#ec4899"/>}
                    {e.bathrooms && <Tag label="bathroom_num" val={e.bathrooms} color="#64748b"/>}
                    {e.saleType && <Tag label="sale_type" val={e.saleType} color="#64748b"/>}
                    {e.rera && <Tag label="rera" val="true" color="#22d3ee"/>}
                    {e.preference && <Tag label="preference" val={e.preference==="R"?"Rent":"Buy"} color="#6366f1"/>}
                    {e.amenities?.map(a=><Tag key={a.id} label="feature" val={`${a.label} (${a.id})`} color="#f97316"/>)}
                  </div>
                }
              </Section>
            )}

            {/* Geo Scoring */}
            {e.geoResult?.allCandidates?.length > 0 && (
              <Section title="geographic scoring — n-gram candidates" dot="#f97316">
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {e.geoResult.allCandidates.map((c,i)=>(
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:10,
                      padding:"6px 10px", borderRadius:6,
                      background:i===0?"#0c1a10":"#0a0e18",
                      border:`1px solid ${i===0?"#166534":"#1e2433"}`,
                    }}>
                      <span style={{
                        minWidth:28, fontSize:11, fontWeight:700,
                        color:i===0?"#4ade80":"#374151",
                      }}>#{i+1}</span>
                      <span style={{flex:1,fontSize:12,color:i===0?"#e2e8f0":"#4b5a6e"}}>
                        "{c.ngram}"
                        <span style={{color:"#374151",margin:"0 6px"}}>→</span>
                        <span style={{color:i===0?"#4ade80":"#6b7280",fontWeight:600}}>{c.entity.name}</span>
                        <span style={{color:"#374151",fontSize:10,marginLeft:6}}>({c.entity.type})</span>
                      </span>
                      <span style={{
                        fontSize:10, color:"#374151",
                        display:"flex", gap:10,
                      }}>
                        <span>tokens:{c.ngram.split(" ").length}</span>
                        <span>edit:{c.editDist}</span>
                        <span style={{color:i===0?"#4ade80":"#374151",fontWeight:700}}>
                          score:{c.score}
                        </span>
                      </span>
                    </div>
                  ))}
                  <div style={{
                    fontSize:10, color:"#374151", marginTop:4,
                    padding:"4px 10px",
                  }}>
                    Formula: score = (tokens × {L}) − (edit_distance × {E})
                  </div>
                </div>
              </Section>
            )}

            {/* Solr Params */}
            {!hasError && (
              <Section title="search_params → solr" dot="#a78bfa">
                <pre style={{
                  margin:0, fontSize:12, lineHeight:"1.7",
                  color:"#94a3b8", whiteSpace:"pre-wrap", wordBreak:"break-all",
                }}>
                  {JSON.stringify(p, null, 2).split("\n").map((line,i)=>{
                    const m = line.match(/^(\s*)"([^"]+)":/);
                    if (!m) return <span key={i} style={{display:"block"}}>{line}</span>;
                    return <span key={i} style={{display:"block"}}>
                      {m[1]}<span style={{color:"#60a5fa"}}>"{m[2]}"</span>{line.slice(m[0].length)}
                    </span>;
                  })}
                </pre>
              </Section>
            )}

            {/* Residual tokens */}
            {result.residualTokens?.length > 0 && (
              <Section title="geographic residual tokens" dot="#f59e0b">
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {result.residualTokens.map((t,i)=>(
                    <span key={i} style={{
                      background:"#1a1200", border:"1px solid #78350f",
                      borderRadius:5, padding:"3px 10px",
                      fontSize:11, color:"#d97706",
                    }}>{t}</span>
                  ))}
                </div>
              </Section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
