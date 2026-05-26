// src/components/ui/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { getWhatsAppLink, getProductImageUrl } from "@/lib/utils";

const WA_NUMBER = "212652020702";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const waMsg = `Bonjour ! Je suis intéressé par le produit : ${product.name} (Réf: ${product.reference || "N/A"}). Pouvez-vous me donner plus d'informations ?`;
  const imgSrc = getProductImageUrl(product.id);

  return (
    <div className="product-card-hover group bg-white dark:bg-[#0D1B2A] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden" style={{ paddingBottom: "70%" }}>
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#FF6B6B] to-[#ee0979] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Populaire
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {product.category_name && (
          <span className="text-[11px] font-semibold text-[#4ECDC4] uppercase tracking-widest mb-1">
            {product.category_name}
          </span>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 hover:text-[#4ECDC4] transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">
            {product.short_description}
          </p>
        )}
        {product.reference && (
          <p className="text-[10px] text-gray-400 mb-3">Réf : {product.reference}</p>
        )}

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center py-2 rounded-lg border border-[#4ECDC4] text-[#4ECDC4] text-xs font-semibold hover:bg-[#4ECDC4] hover:text-white transition-all duration-200"
          >
            Voir détails
          </Link>
          <a
            href={getWhatsAppLink(WA_NUMBER, waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#128C7E] transition-all duration-200"
          >
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}
