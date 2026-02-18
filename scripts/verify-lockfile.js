const fs = require("node:fs");
const path = require("node:path");

const lockfilePath = path.join(process.cwd(), "package-lock.json");

if (!fs.existsSync(lockfilePath)) {
  console.error("package-lock.json is required. Run npm install first.");
  process.exit(1);
}
