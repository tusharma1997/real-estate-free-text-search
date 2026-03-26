import fs from 'fs';

let code = fs.readFileSync('src/NLPParser.jsx', 'utf8');
code = code.replace(/import\s.*?from\s+['"].*?['"];?/g, '');
const exportIndex = code.indexOf('export default function');
if (exportIndex !== -1) {
    code = code.substring(0, exportIndex);
}

const testRunner = `
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

let csv = "Query,Property Type,Bedroom,Budget Min,Budget Max,City,Locality,Possession,Furnishing,Amenities,Facing,Property Feature,Area,Sale Type,Preference,Posted By,Rera,Bathrooms,Residual Tokens,Ambiguous,Fuzzy Matches\\n";

function escapeCSV(val) {
  if (val === undefined || val === null) return "";
  let str = String(val);
  if (str.includes(',') || str.includes('\\"') || str.includes('\\n')) {
    return '"' + str.replace(/\\"/g, '""') + '"';
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
    ].join(",") + "\\n";
  } catch (err) {
    console.error("Error on query:", query, err);
  }
}

import fs from 'fs';
fs.writeFileSync('C:/Users/tushar.sharma1/.gemini/antigravity/brain/38ccd211-b662-4bf2-837b-2836550f1a02/test_results.csv', csv);
console.log("CSV generated successfully!");
`;

fs.writeFileSync('runner.js', code + '\n' + testRunner);
