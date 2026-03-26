

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



const testCases = [
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
  "sea facing 4 bhk independent bungalow for sale in juhu with swimming pool and power backup 15cr",
  "under construction builder floor in sector 62 noida for rent budget 30k fully furnished",
  "studio in hsr layout below 50000 rent",
  "5 bhk farm house near golf course road gurgaon rtm vast compliant",
  "commercial shop in andheri west 1000 sqft corner property 5cr",
  "1 rk in powai immediate possession bachelor flat",
  "new launch residential plot 200 sq yard in dwarka expressway above 1 cr",
  "north facing 3bhk in whitefield un-furnished on rent 40k",
  "pg for boys in koramangala 15000",
  "resale flat 2 bhk in baner pune minimum 1.5cr",
  "garden facing 4 bedroom kothi in vasant vihar full furnished",
  "industrial land in navi mumbai 5 acres 10 cr",
  "24x7 security 3bhk flat for sale near electronic city bangalore 80lakhs",
  "builder floor in rohini rent 20k park facing",
  "1 rk bare shell in thane rtm above 50l"
];

let csv = "Query,Property Type,Bedroom,Budget Min,Budget Max,City,Locality,Possession,Furnishing,Amenities,Facing,Property Feature,Area,Sale Type,Preference,Posted By,Rera,Bathrooms,Residual Tokens,Ambiguous,Fuzzy Matches\n";

function escapeCSV(val) {
  if (val === undefined || val === null) return "";
  let str = String(val);
  if (str.includes(',') || str.includes('\"') || str.includes('\n')) {
    return '"' + str.replace(/\"/g, '""') + '"';
  }
  return str;
}

for (const query of testCases) {
  try {
    const res = parseQuery(query);
    const e = res.entities;
    
    csv += [
      escapeCSV(query),
      escapeCSV(e.propertyTypeLabel || ""),
      escapeCSV(e.bedroom || (e.isRK ? "1 RK" : "")),
      escapeCSV(e.minPrice ? e.minPrice : ""),
      escapeCSV(e.maxPrice ? e.maxPrice : ""),
      escapeCSV(e.cityName || e.city || ""),
      escapeCSV(e.localityName || e.locality || ""),
      escapeCSV(e.possessionLabel || ""),
      escapeCSV(e.furnishLabel || ""),
      escapeCSV(e.amenities ? e.amenities.map(a=>a.label).join('; ') : ""),
      escapeCSV(e.facingLabel || ""),
      escapeCSV(e.propertyFeatureLabel || ""),
      escapeCSV(e.minArea ? e.minArea : ""),
      escapeCSV(e.saleType || ""),
      escapeCSV(e.preference || ""),
      escapeCSV(e.postedBy || ""),
      escapeCSV(e.rera ? "Yes" : ""),
      escapeCSV(e.bathrooms || ""),
      escapeCSV(res.residualTokens ? res.residualTokens.join(' ') : ""),
      escapeCSV(e.geoResult?.ambiguous ? "Yes: " + e.geoResult.options.map(o=>o.name).join(';') : (e.ambiguous ? "Yes: " + e.ambiguous.options.map(o=>o.cityName).join(';') : "")),
      escapeCSV(e.fuzzyMatches ? e.fuzzyMatches.map(f => f.original + "->" + f.corrected).join('; ') : (e.fuzzyMatch ? e.fuzzyMatch.original + "->" + e.fuzzyMatch.corrected : ""))
    ].join(",") + "\n";
  } catch (err) {
    console.error("Error on query:", query, err);
  }
}

import fs from 'fs';
fs.writeFileSync('C:/Users/tushar.sharma1/.gemini/antigravity/brain/38ccd211-b662-4bf2-837b-2836550f1a02/test_results.csv', csv);
console.log("CSV generated successfully!");
