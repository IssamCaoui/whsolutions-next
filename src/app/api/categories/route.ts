// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { Category } from "@/types";

export async function GET() {
  try {
    const categories = await query<Category>(`
      SELECT c.*, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.name ASC
    `);
    return NextResponse.json({ categories });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
