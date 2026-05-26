// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  short_description?: string;
  description?: string;
  reference?: string;
  image?: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  views: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  product_count?: number;
}

export interface SiteSettings {
  site_name?: string;
  site_tagline?: string;
  site_phone?: string;
  site_email?: string;
  site_address?: string;
  whatsapp_number?: string;
  whatsapp_welcome_message?: string;
  whatsapp_order_message?: string;
  catalogue_pdf_updated?: string;
  catalogue_pdf_ext_url?: string;
  hero_bg_image?: string;
  about_image?: string;
  contact_image?: string;
}
