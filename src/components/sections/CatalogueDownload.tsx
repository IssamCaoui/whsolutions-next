// src/components/sections/CatalogueDownload.tsx
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Download, FileText } from "lucide-react";

export default function CatalogueDownload() {
  return (
    <section className="py-24 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <div className="relative bg-gradient-to-br from-[#1B3A5C] to-[#0D1B2A] rounded-3xl p-12 overflow-hidden">
            {/* Decorative blobs */}
            <div className="blob w-64 h-64 bg-[#4ECDC4] opacity-20 -top-10 -right-10 animate-[morphBlob_10s_ease-in-out_infinite]" />
            <div className="blob w-48 h-48 bg-[#FF6B6B] opacity-15 -bottom-5 -left-5 animate-[morphBlob_14s_ease-in-out_infinite_3s]" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4ECDC4] to-[#1B3A5C] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>

              <span className="inline-block bg-[#4ECDC4]/20 text-[#4ECDC4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                Catalogue Produits 2024
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Téléchargez notre{" "}
                <span className="gradient-text">catalogue complet</span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                Découvrez l'ensemble de notre gamme de produits d'hygiène professionnelle. 
                Fiches techniques, références et tarifs inclus.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/catalogue"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold hover:shadow-2xl hover:shadow-[#4ECDC4]/30 hover:scale-105 transition-all duration-300"
                >
                  <Download size={20} />
                  Télécharger le PDF
                </Link>
                <Link
                  href="https://wa.me/212652020702?text=Bonjour%2C%20je%20souhaite%20recevoir%20votre%20catalogue%20de%20produits."
                  target="_blank"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300"
                >
                  Demander par WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
