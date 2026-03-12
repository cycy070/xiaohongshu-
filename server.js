const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const codesFile = path.join(dataDir, "codes.json");
const submissionsFile = path.join(dataDir, "submissions.json");
const port = process.env.PORT || 4173;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(codesFile)) {
    const initialCodes = [
      {
        code: "YJ-2026-8888",
        plan: "完整版",
        maxUses: 5,
        usedCount: 0,
        active: true,
      },
      {
        code: "YJ-2026-9999",
        plan: "进阶版",
        maxUses: 3,
        usedCount: 0,
        active: true,
      },
    ];
    fs.writeFileSync(codesFile, JSON.stringify(initialCodes, null, 2), "utf8");
  }

  if (!fs.existsSync(submissionsFile)) {
    fs.writeFileSync(submissionsFile, "[]", "utf8");
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    request.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function getCodeRecord(code) {
  const codes = readJson(codesFile);
  const normalizedCode = String(code || "").trim().toUpperCase();
  const record = codes.find((item) => item.code.toUpperCase() === normalizedCode);
  return { codes, record, normalizedCode };
}

function handleRedeemCheck(response, code) {
  const { record, normalizedCode } = getCodeRecord(code);

  if (!normalizedCode) {
    sendJson(response, 400, { ok: false, message: "请输入兑换码。" });
    return;
  }

  if (!record || !record.active) {
    sendJson(response, 404, { ok: false, message: "兑换码无效或已停用。" });
    return;
  }

  if (record.usedCount >= record.maxUses) {
    sendJson(response, 409, { ok: false, message: "兑换次数已用完，请联系客服补发。" });
    return;
  }

  sendJson(response, 200, {
    ok: true,
    message: "兑换码验证成功。",
    payload: {
      code: record.code,
      plan: record.plan,
      remainingUses: record.maxUses - record.usedCount,
      maxUses: record.maxUses,
    },
  });
}

function handleRedeemConsume(response, code) {
  const { codes, record, normalizedCode } = getCodeRecord(code);

  if (!normalizedCode) {
    sendJson(response, 400, { ok: false, message: "请输入兑换码。" });
    return;
  }

  if (!record || !record.active) {
    sendJson(response, 404, { ok: false, message: "兑换码无效或已停用。" });
    return;
  }

  if (record.usedCount >= record.maxUses) {
    sendJson(response, 409, { ok: false, message: "兑换次数已用完，请联系客服补发。" });
    return;
  }

  record.usedCount += 1;
  writeJson(codesFile, codes);

  sendJson(response, 200, {
    ok: true,
    message: "兑换成功，已为你解锁测试。",
    payload: {
      code: record.code,
      plan: record.plan,
      remainingUses: record.maxUses - record.usedCount,
      maxUses: record.maxUses,
    },
  });
}

function handleSubmission(response, body) {
  const submissions = readJson(submissionsFile);
  const entry = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    code: String(body.code || "").trim().toUpperCase(),
    totalScore: body.totalScore ?? null,
    stage: body.stage ?? "",
    scores: body.scores ?? {},
  };

  submissions.unshift(entry);
  writeJson(submissionsFile, submissions.slice(0, 200));

  sendJson(response, 200, { ok: true, message: "结果已记录。" });
}

function serveStatic(requestPath, response) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    response.end(content);
  });
}

ensureDataFiles();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, message: "healthy" });
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/redeem/check") {
    handleRedeemCheck(response, requestUrl.searchParams.get("code"));
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/redeem/consume") {
    try {
      const body = await parseBody(request);
      handleRedeemConsume(response, body.code);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: "请求格式有误。" });
    }
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/submissions") {
    try {
      const body = await parseBody(request);
      handleSubmission(response, body);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: "结果保存失败。" });
    }
    return;
  }

  if (request.method === "GET") {
    serveStatic(requestUrl.pathname, response);
    return;
  }

  response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Method Not Allowed");
});

server.listen(port, () => {
  console.log(`Yujian MVP is running at http://127.0.0.1:${port}`);
});
