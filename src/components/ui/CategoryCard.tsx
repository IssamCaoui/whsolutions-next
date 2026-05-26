// src/components/ui/CategoryCard.tsx
import Link from "next/link";
import { Category } from "@/types";

const COLOR_PALETTE = [
  "from-[#00E5B0] to-[#091220]",
  "from-[#FF6B6B] to-[#ee0979]",
  "from-[#6C63FF] to-[#3f3d56]",
  "from-[#F7B731] to-[#f0932b]",
  "from-[#26de81] to-[#20bf6b]",
  "from-[#fd9644] to-[#e67e22]",
];

interface Props {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: Props) {
  const gradient = COLOR_PALETTE[index % COLOR_PALETTE.length];

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group block bg-[#0D1A30] rounded-2xl overflow-hidden border border-white/[0.06] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Color bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Icon or initial */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
          {category.icon ? (
            <span className="text-xl">{category.icon}</span>
          ) : (
            <span className="text-white font-black text-lg">
              {category.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="font-bold text-[#EDF2FF] text-sm mb-1">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-[#6B83A0] line-clamp-2 mb-2">
            {category.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#00E5B0] font-semibold">
            {category.product_count ?? 0} produit{(category.product_count ?? 0) !== 1 ? "s" : ""}
          </span>
          <span className="text-xs text-[#6B83A0] group-hover:text-[#00E5B0] group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
