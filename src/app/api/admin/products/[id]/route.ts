// src/app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pid = parseInt(id);
  if (isNaN(pid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      [pid]
    ) as any;
    if (!rows[0]) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
    return NextResponse.json({ product: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pid = parseInt(id);
  if (isNaN(pid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 255);
  if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

  const categoryId = body.category_id ? parseInt(body.category_id) : null;
  const reference = (body.reference || "").slice(0, 100) || null;
  const description = (body.description || "").slice(0, 5000) || null;
  const shortDesc = (body.short_description || "").slice(0, 500) || null;
  const price = body.price ? parseFloat(body.price) : null;
  const isFeatured = body.is_featured ? 1 : 0;
  const isActive = body.is_active ? 1 : 0;

  try {
    await pool.query(
      `UPDATE products SET category_id=?, name=?, reference=?, description=?, short_description=?, price=?, is_featured=?, is_active=? WHERE id=?`,
      [categoryId, name, reference, description, shortDesc, price, isFeatured, isActive, pid]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pid = parseInt(id);
  if (isNaN(pid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await pool.query("DELETE FROM products WHERE id = ?", [pid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
