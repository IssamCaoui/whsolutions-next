// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { Product } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured  = searchParams.get("featured");
    const slug      = searchParams.get("slug");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);

    let sql = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `;
    const params: unknown[] = [];

    if (slug) {
      sql += " AND p.slug = ?";
      params.push(slug);
    }
    if (category) {
      sql += " AND c.slug = ?";
      params.push(category);
    }
    if (featured === "1") {
      sql += " AND p.is_featured = 1";
    }

    sql += " ORDER BY p.sort_order ASC, p.id DESC LIMIT ?";
    params.push(limit);

    const products = await query<Product>(sql, params);
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
