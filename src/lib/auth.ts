// src/lib/auth.ts
import crypto from "crypto";

const SECRET =
  process.env.ADMIN_JWT_SECRET || "wh-solutions-admin-secret-change-in-prod";

export interface AdminPayload {
  id: number;
  username: string;
  name: string;
  role: string;
  exp: number;
}

export function signAdminToken(
  payload: Omit<AdminPayload, "exp">
): string {
  const data: AdminPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
  };
  const b64 = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(b64).digest("hex");
  return `${b64}.${sig}`;
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const dotIdx = token.lastIndexOf(".");
    if (dotIdx === -1) return null;
    const b64 = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    const expected = crypto
      .createHmac("sha256", SECRET)
      .update(b64)
      .digest("hex");
    // constant-time compare
    if (
      sig.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
    )
      return null;
    const payload: AdminPayload = JSON.parse(
      Buffer.from(b64, "base64url").toString()
    );
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
