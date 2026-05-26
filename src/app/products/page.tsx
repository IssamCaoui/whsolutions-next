"use client";
// src/app/products/page.tsx
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/ui/ProductCard";
import { Product, Category } from "@/types";
import { Search, Filter, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load categories once
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(({ categories }) => setCategories(categories || []));
  }, []);

  // Load products when category changes
  useEffect(() => {
    setLoading(true);
    const url = activeCategory
      ? `/api/products?category=${encodeURIComponent(activeCategory)}&limit=100`
      : `/api/products?limit=100`;
    fetch(url)
      .then((r) => r.json())
      .then(({ products }) => setProducts(products || []))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.reference || "").toLowerCase().includes(search.toLowerCase()) ||
          (p.short_description || "").toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="section-tag">Catalogue</span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mt-4 mb-4">
            Nos <span className="gradient-text">Produits</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Découvrez notre gamme complète de produits d'hygiène professionnelle certifiés HACCP.
          </p>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, référence..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Category filters */}
        <AnimatedSection delay={0.15} className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === ""
                  ? "bg-[#4ECDC4] text-white shadow-md"
                  : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-[#4ECDC4]/20 hover:text-[#4ECDC4]"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-[#4ECDC4] text-white shadow-md"
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-[#4ECDC4]/20 hover:text-[#4ECDC4]"
                }`}
              >
                {cat.name}
                {cat.product_count !== undefined && (
                  <span className="ml-1 opacity-60">({cat.product_count})</span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-6 text-center">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Aucun produit trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.id} delay={(i % 8) * 0.06}>
                <ProductCard product={p} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#4ECDC4] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
