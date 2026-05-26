"use client";
// src/components/sections/FeaturedProducts.tsx
import { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=1&limit=8")
      .then((r) => r.json())
      .then(({ products }) => setProducts(products || []))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-28 bg-[#080F22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="section-tag">Best-sellers</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#EDF2FF] mt-4 mb-4">
            Produits{" "}
            <span className="gradient-text">populaires</span>
          </h2>
          <p className="text-[#6B83A0] max-w-xl mx-auto">
            Les produits les plus demandés par nos clients professionnels.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-[#0D1A30] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.07} direction="up">
                <ProductCard product={p} />
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-12" delay={0.2}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r btn-primary hover:shadow-lg hover:shadow-[#00E5B0]/30 transition-all duration-300"
          >
            Voir tous nos produits →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
