// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Validate Content-Type
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type invalide" }, { status: 415 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const username = (body.username || "").trim().slice(0, 50);
  const password = (body.password || "").slice(0, 100);

  if (!username || !password) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id, username, password, name, role, is_active FROM admins WHERE username = ? LIMIT 1",
      [username]
    ) as any[];

    const admin = rows[0];
    if (!admin || !admin.is_active) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    // Update last_login
    await pool.query("UPDATE admins SET last_login = NOW() WHERE id = ?", [admin.id]);

    const token = signAdminToken({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    });

    const res = NextResponse.json({ ok: true, name: admin.name });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Admin auth error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
