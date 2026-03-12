const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const codesFile = path.join(dataDir, "codes.json");

function ensureCodesFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(codesFile)) {
    fs.writeFileSync(codesFile, "[]", "utf8");
  }
}

function readCodes() {
  ensureCodesFile();
  return JSON.parse(fs.readFileSync(codesFile, "utf8"));
}

function writeCodes(codes) {
  fs.writeFileSync(codesFile, JSON.stringify(codes, null, 2), "utf8");
}

function parseArgs(argv) {
  const options = {
    count: 10,
    prefix: "YJ",
    year: new Date().getFullYear(),
    plan: "完整版",
    uses: 5,
  };

  argv.forEach((arg) => {
    const [key, value] = arg.split("=");
    if (!value) {
      return;
    }

    if (key === "--count") {
      options.count = Number(value);
    }

    if (key === "--prefix") {
      options.prefix = value.trim().toUpperCase();
    }

    if (key === "--year") {
      options.year = Number(value);
    }

    if (key === "--plan") {
      options.plan = value.trim();
    }

    if (key === "--uses") {
      options.uses = Number(value);
    }
  });

  if (!Number.isInteger(options.count) || options.count <= 0) {
    throw new Error("count 必须是大于 0 的整数。");
  }

  if (!Number.isInteger(options.year) || options.year < 2024) {
    throw new Error("year 必须是有效年份。");
  }

  if (!Number.isInteger(options.uses) || options.uses <= 0) {
    throw new Error("uses 必须是大于 0 的整数。");
  }

  return options;
}

function randomChunk(length) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += chars[Math.floor(Math.random() * chars.length)];
  }
  return value;
}

function generateUniqueCode(existingCodes, prefix, year) {
  let code = "";

  do {
    code = `${prefix}-${year}-${randomChunk(6)}`;
  } while (existingCodes.has(code));

  existingCodes.add(code);
  return code;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const codes = readCodes();
  const existingCodes = new Set(codes.map((item) => String(item.code || "").toUpperCase()));
  const createdAt = new Date().toISOString();
  const generated = [];

  for (let index = 0; index < options.count; index += 1) {
    const code = generateUniqueCode(existingCodes, options.prefix, options.year);
    generated.push({
      code,
      plan: options.plan,
      maxUses: options.uses,
      usedCount: 0,
      active: true,
      createdAt,
    });
  }

  writeCodes([...generated, ...codes]);

  console.log(`已生成 ${generated.length} 个兑换码：`);
  generated.forEach((item) => {
    console.log(`${item.code} | ${item.plan} | ${item.maxUses} 次`);
  });
}

try {
  main();
} catch (error) {
  console.error(error.message || "生成兑换码失败。");
  process.exit(1);
}
