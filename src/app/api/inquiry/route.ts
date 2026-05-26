// src/app/api/inquiry/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Validation helpers
const PHONE_RE = /^[\d\s\+\-\(\)]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function strip(val: unknown, maxLen: number): string {
  return String(val ?? "").slice(0, maxLen).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type invalide" }, { status: 400 });
    }

    const body = await req.json();

    const name    = strip(body.name, 100);
    const phone   = strip(body.phone, 20);
    const email   = strip(body.email, 150);
    const message = strip(body.message, 2000);
    const product_id = body.product_id ? parseInt(String(body.product_id)) : null;
    const quantity   = Math.max(1, Math.min(9999, parseInt(String(body.quantity || 1))));

    // Required fields
    if (!name || !phone) {
      return NextResponse.json({ error: "Nom et téléphone obligatoires" }, { status: 400 });
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Numéro de téléphone invalide" }, { status: 400 });
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }
    if (product_id !== null && (isNaN(product_id) || product_id < 1)) {
      return NextResponse.json({ error: "product_id invalide" }, { status: 400 });
    }

    await pool.execute(
      `INSERT INTO inquiries (product_id, name, phone, email, quantity, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [product_id ?? null, name, phone, email || null, quantity, message || null]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
