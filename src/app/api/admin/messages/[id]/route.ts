// src/app/api/admin/messages/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PATCH(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mid = parseInt(id);
  if (isNaN(mid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    await pool.query("UPDATE messages SET is_read = 1 WHERE id = ?", [mid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mid = parseInt(id);
  if (isNaN(mid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    await pool.query("DELETE FROM messages WHERE id = ?", [mid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
