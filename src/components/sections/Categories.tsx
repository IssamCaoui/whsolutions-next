"use client";
// src/components/sections/Categories.tsx
import { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CategoryCard from "@/components/ui/CategoryCard";
import { Category } from "@/types";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(({ categories }) => setCategories(categories || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="section-tag">Nos Gammes</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#EDF2FF] mt-4 mb-4">
            Explorez nos{" "}
            <span className="gradient-text">catégories</span>
          </h2>
          <p className="text-[#6B83A0] max-w-xl mx-auto">
            Une gamme complète de produits pour chaque secteur d'activité.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-[#0D1A30] animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-[#6B83A0]">Aucune catégorie disponible.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.08} direction="up">
                <CategoryCard category={cat} index={i} />
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-12" delay={0.2}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#00E5B0] text-[#00E5B0] font-bold hover:bg-[#00E5B0] hover:text-white hover:scale-105 transition-all duration-300"
          >
            Voir tous les produits →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
