// src/app/api/admin/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM messages") as any;
    const [messages] = await pool.query(
      "SELECT id, name, email, phone, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    ) as any;
    return NextResponse.json({ messages, total, page, limit });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
