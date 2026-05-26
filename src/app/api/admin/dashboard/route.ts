// src/app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [[{ total_products }]] = await pool.query("SELECT COUNT(*) as total_products FROM products") as any;
    const [[{ total_categories }]] = await pool.query("SELECT COUNT(*) as total_categories FROM categories") as any;
    const [[{ total_messages }]] = await pool.query("SELECT COUNT(*) as total_messages FROM messages") as any;
    const [[{ unread_messages }]] = await pool.query("SELECT COUNT(*) as unread_messages FROM messages WHERE is_read = 0") as any;
    const [[{ total_inquiries }]] = await pool.query("SELECT COUNT(*) as total_inquiries FROM inquiries") as any;
    const [[{ pending_inquiries }]] = await pool.query("SELECT COUNT(*) as pending_inquiries FROM inquiries WHERE status = 'new'") as any;

    const [recentMessages] = await pool.query(
      "SELECT id, name, email, phone, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT 5"
    ) as any;

    const [recentInquiries] = await pool.query(
      `SELECT i.id, i.customer_name, i.customer_phone, i.customer_email, i.quantity, i.status, i.created_at, p.name as product_name
       FROM inquiries i LEFT JOIN products p ON i.product_id = p.id
       ORDER BY i.created_at DESC LIMIT 5`
    ) as any;

    return NextResponse.json({
      stats: {
        total_products,
        total_categories,
        total_messages,
        unread_messages,
        total_inquiries,
        pending_inquiries,
      },
      recentMessages,
      recentInquiries,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
