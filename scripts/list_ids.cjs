const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "../src/lib/data.ts"), "utf8");
const startIdx = content.indexOf("export const destinations: Destination[] = ");
const remaining = content.slice(startIdx + "export const destinations: Destination[] = ".length);
const endIdx = remaining.indexOf(";\n\nexport interface Village");
const jsonStr = remaining.slice(0, endIdx);

try {
  const destinations = JSON.parse(jsonStr);
  console.log("Parsed Destinations count:", destinations.length);
  console.log("IDs:", destinations.map(d => `${d.id} (${d.region})`));
} catch (err) {
  console.error("JSON Parse Error:", err);
}
