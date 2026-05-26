// src/app/api/settings/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query<{ setting_key: string; setting_value: string }>(
      "SELECT setting_key, setting_value FROM settings"
    );
    const settings: Record<string, string> = {};
    rows.forEach((r) => { settings[r.setting_key] = r.setting_value; });
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: {} });
  }
}
