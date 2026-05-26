"use client";
// src/app/products/[slug]/page.tsx
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, Package, Tag } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Product } from "@/types";
import { getProductImageUrl, getWhatsAppLink, sanitizeHtml } from "@/lib/utils";

const WA_NUMBER = "212652020702";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products?slug=${encodeURIComponent(slug)}&limit=1`)
      .then((r) => r.json())
      .then(({ products }) => setProduct(products?.[0] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#4ECDC4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <Package className="w-16 h-16 text-gray-300" />
        <p className="text-gray-500">Produit introuvable.</p>
        <Link href="/products" className="text-[#4ECDC4] hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Retour aux produits
        </Link>
      </div>
    );
  }

  const waMsg = `Bonjour ! Je suis intéressé par le produit : ${product.name}${product.reference ? ` (Réf: ${product.reference})` : ""}. Pouvez-vous me donner plus d'informations et les conditions de commande ?`;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <AnimatedSection className="flex items-center gap-2 text-sm text-gray-400 mb-8" direction="none">
          <Link href="/" className="hover:text-[#4ECDC4] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#4ECDC4] transition-colors">Produits</Link>
          {product.category_name && (
            <>
              <span>/</span>
              <Link href={`/products?category=${product.category_slug}`} className="hover:text-[#4ECDC4] transition-colors">
                {product.category_name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">{product.name}</span>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <AnimatedSection direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-50 dark:bg-white/5 shadow-2xl">
              <Image
                src={getProductImageUrl(product.id)}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection direction="right">
            {product.category_name && (
              <span className="section-tag mb-4 inline-block">{product.category_name}</span>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {product.reference && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Tag size={14} />
                <span>Référence : <strong className="text-gray-700 dark:text-gray-300">{product.reference}</strong></span>
              </div>
            )}

            {product.short_description && (
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6 border-l-2 border-[#4ECDC4] pl-4">
                {product.short_description}
              </p>
            )}

            {product.description && (
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-8"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description!) }}
              />
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppLink(WA_NUMBER, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={20} />
                Commander via WhatsApp
              </a>
              <a
                href={`tel:+212652020702`}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold hover:bg-[#4ECDC4] hover:text-white hover:scale-105 transition-all duration-300"
              >
                <Phone size={18} />
                Appeler
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block" />
              Réponse rapide via WhatsApp · Livraison partout au Maroc
            </p>
          </AnimatedSection>
        </div>

        {/* Back link */}
        <AnimatedSection className="mt-12" delay={0.2}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#4ECDC4] transition-colors"
          >
            <ArrowLeft size={16} /> Retour à tous les produits
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
