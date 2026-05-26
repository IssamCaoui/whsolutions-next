// src/app/api/admin/inquiries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM inquiries") as any;
    const [inquiries] = await pool.query(
      `SELECT i.id, i.customer_name, i.customer_phone, i.customer_email, i.quantity, i.message, i.status, i.created_at,
              p.name as product_name
       FROM inquiries i LEFT JOIN products p ON i.product_id = p.id
       ORDER BY i.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any;
    return NextResponse.json({ inquiries, total, page, limit });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
