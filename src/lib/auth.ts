import crypto from "crypto";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");

// In-memory active session token store (token -> expiration timestamp)
const activeSessions = new Map<string, number>();

// Session duration: 12 hours
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

// Brute Force Rate Limiter: max 5 failed attempts within 5 minutes -> 15 min lock
interface FailedAttemptRecord {
  count: number;
  lockUntil: number;
  lastAttempt: number;
}
const failedLoginAttempts = new Map<string, FailedAttemptRecord>();

export function extractClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export function checkLoginRateLimit(clientIp: string): { allowed: boolean; waitMinutes?: number } {
  const record = failedLoginAttempts.get(clientIp);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockUntil > now) {
    const waitMinutes = Math.ceil((record.lockUntil - now) / (60 * 1000));
    return { allowed: false, waitMinutes };
  }

  // Reset count if last attempt was more than 10 minutes ago
  if (now - record.lastAttempt > 10 * 60 * 1000) {
    failedLoginAttempts.delete(clientIp);
  }

  return { allowed: true };
}

export function recordFailedLogin(clientIp: string): void {
  const now = Date.now();
  const record = failedLoginAttempts.get(clientIp) || { count: 0, lockUntil: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= 5) {
    record.lockUntil = now + 15 * 60 * 1000; // lock for 15 minutes
    record.count = 0;
  }

  failedLoginAttempts.set(clientIp, record);
}

export function resetFailedLogin(clientIp: string): void {
  failedLoginAttempts.delete(clientIp);
}

export function hashPin(pin: string, salt: string): string {
  return crypto.createHmac("sha256", salt).update(pin).digest("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function createSession(): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  activeSessions.set(token, expiresAt);

  // Clean up expired sessions periodically
  for (const [t, exp] of activeSessions.entries()) {
    if (exp < Date.now()) {
      activeSessions.delete(t);
    }
  }

  return token;
}

export function isValidSession(token?: string | null): boolean {
  if (!token) return false;
  const expiresAt = activeSessions.get(token);
  if (!expiresAt) return false;
  if (expiresAt < Date.now()) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

export function invalidateSession(token?: string | null): void {
  if (token) {
    activeSessions.delete(token);
  }
}

export function getStoredSecurityConfig(): {
  pinHash?: string;
  salt?: string;
  plaintextPin?: string;
} {
  try {
    if (!fs.existsSync(dataFilePath)) return {};
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(raw);
    const sec = data?.security;
    if (!sec) return {};

    // Support both new hashed format and legacy format
    return {
      pinHash: sec.pinHash,
      salt: sec.salt,
      plaintextPin: sec.pin || sec.adminPin,
    };
  } catch {
    return {};
  }
}

export function verifyAdminPin(candidatePin: string): boolean {
  if (!candidatePin || typeof candidatePin !== "string") return false;

  // 1. HIGHEST PRIORITY: Environment variable ADMIN_PIN (ideal for public repos & production cloud)
  const envPin = process.env.ADMIN_PIN?.trim();
  if (envPin && candidatePin === envPin) {
    return true;
  }

  // 2. Custom Salted Hash from data store (if user changed PIN via admin portal)
  const sec = getStoredSecurityConfig();
  if (sec.pinHash && sec.salt) {
    const candidateHash = hashPin(candidatePin, sec.salt);
    if (crypto.timingSafeEqual(Buffer.from(candidateHash), Buffer.from(sec.pinHash))) {
      return true;
    }
  }

  // 3. Fallback when neither env var nor custom hash is set (e.g. initial clone)
  if (!envPin && !sec.pinHash) {
    if (candidatePin === "123456" || candidatePin === "admin123") {
      return true;
    }
  }

  return false;
}

export function updateAdminPin(newPin: string): boolean {
  try {
    if (!fs.existsSync(dataFilePath)) return false;
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(raw);

    const salt = generateSalt();
    const pinHash = hashPin(newPin, salt);

    data.security = {
      pinHash,
      salt,
      lastChanged: new Date().toISOString(),
    };

    // Remove legacy plaintext fields if present
    delete data.security.pin;
    delete data.security.adminPin;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to update admin PIN:", err);
    return false;
  }
}

export function extractSessionToken(req: Request): string | null {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 2. Check X-Admin-Token custom header
  const customHeader = req.headers.get("x-admin-token");
  if (customHeader) {
    return customHeader.trim();
  }

  // 3. Check Cookie header (mpm_admin_token)
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("mpm_admin_token=")) {
        return cookie.substring("mpm_admin_token=".length).trim();
      }
    }
  }

  return null;
}
