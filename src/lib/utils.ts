// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function truncate(str: string, maxLen: number): string {
  if (!str) return "";
  return str.length <= maxLen ? str : str.slice(0, maxLen) + "…";
}

export function getWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Simple HTML sanitizer — strips dangerous tags/attributes to prevent XSS.
// Keeps safe formatting: p, br, strong, em, ul, ol, li, h2-h6, span, a (no href with js:)
const FORBIDDEN_TAGS = /<(script|iframe|object|embed|form|input|button|svg|math|style|link|meta|base)[^>]*>[\s\S]*?<\/\1>|<(script|iframe|object|embed|form|input|button|svg|math|style|link|meta|base)[^>]*\/?>/gi;
const FORBIDDEN_ATTRS = /\s*(on\w+|href\s*=\s*["']?\s*javascript|src\s*=\s*["']?\s*javascript)[^>]*/gi;

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(FORBIDDEN_TAGS, "")
    .replace(FORBIDDEN_ATTRS, "");
}

export function getProductImageUrl(productId: number): string {
  const phpBase = process.env.NEXT_PUBLIC_PHP_API_URL || "https://whsolutions-production.up.railway.app";
  return `${phpBase}/img.php?t=p&id=${productId}`;
}

export function getSiteImageUrl(key: string): string {
  const phpBase = process.env.NEXT_PUBLIC_PHP_API_URL || "https://whsolutions-production.up.railway.app";
  return `${phpBase}/img.php?t=s&key=${key}`;
}
