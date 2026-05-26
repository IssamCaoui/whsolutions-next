// src/app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.slug, c.description, c.icon, c.is_active, c.sort_order,
              COUNT(p.id) as product_count
       FROM categories c LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id ORDER BY c.sort_order ASC, c.name ASC`
    ) as any;
    return NextResponse.json({ categories: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json"))
    return NextResponse.json({ error: "Content-Type invalide" }, { status: 415 });

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 150);
  if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

  const slug = slugify(name) + "-" + Date.now().toString(36);
  const description = (body.description || "").slice(0, 500) || null;
  const icon = (body.icon || "📦").slice(0, 50);
  const sortOrder = parseInt(body.sort_order || "0");
  const isActive = body.is_active !== false ? 1 : 0;

  try {
    const [result] = await pool.query(
      "INSERT INTO categories (name, slug, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [name, slug, description, icon, sortOrder, isActive]
    ) as any;
    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
