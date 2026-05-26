// src/app/api/admin/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cid = parseInt(id);
  if (isNaN(cid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 150);
  if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

  const description = (body.description || "").slice(0, 500) || null;
  const icon = (body.icon || "📦").slice(0, 50);
  const sortOrder = parseInt(body.sort_order || "0");
  const isActive = body.is_active ? 1 : 0;

  try {
    await pool.query(
      "UPDATE categories SET name=?, description=?, icon=?, sort_order=?, is_active=? WHERE id=?",
      [name, description, icon, sortOrder, isActive, cid]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cid = parseInt(id);
  if (isNaN(cid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await pool.query("DELETE FROM categories WHERE id = ?", [cid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
