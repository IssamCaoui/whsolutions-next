// src/app/api/admin/products/route.ts
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;
  const search = (searchParams.get("q") || "").slice(0, 100);

  try {
    let where = "1=1";
    const params: any[] = [];
    if (search) {
      where += " AND (p.name LIKE ? OR p.reference LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM products p WHERE ${where}`,
      params
    ) as any;

    const [products] = await pool.query(
      `SELECT p.id, p.name, p.slug, p.reference, p.price, p.is_featured, p.is_active, p.views,
              c.name as category_name, p.created_at
       FROM products p LEFT JOIN categories c ON p.category_id = c.id
       WHERE ${where}
       ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ) as any;

    return NextResponse.json({ products, total, page, limit });
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

  const name = (body.name || "").trim().slice(0, 255);
  if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

  const slug = slugify(name) + "-" + Date.now().toString(36);
  const categoryId = body.category_id ? parseInt(body.category_id) : null;
  const reference = (body.reference || "").slice(0, 100) || null;
  const description = (body.description || "").slice(0, 5000) || null;
  const shortDesc = (body.short_description || "").slice(0, 500) || null;
  const price = body.price ? parseFloat(body.price) : null;
  const isFeatured = body.is_featured ? 1 : 0;
  const isActive = body.is_active !== false ? 1 : 0;

  try {
    const [result] = await pool.query(
      `INSERT INTO products (category_id, name, slug, reference, description, short_description, price, is_featured, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [categoryId, name, slug, reference, description, shortDesc, price, isFeatured, isActive]
    ) as any;
    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
