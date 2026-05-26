// src/app/api/admin/inquiries/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

const VALID_STATUSES = ["new", "contacted", "completed", "cancelled"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const iid = parseInt(id);
  if (isNaN(iid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const status = body.status;
  if (!VALID_STATUSES.includes(status))
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });

  try {
    await pool.query("UPDATE inquiries SET status = ? WHERE id = ?", [status, iid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const iid = parseInt(id);
  if (isNaN(iid)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  try {
    await pool.query("DELETE FROM inquiries WHERE id = ?", [iid]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
