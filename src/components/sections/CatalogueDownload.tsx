// src/components/sections/CatalogueDownload.tsx
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Download, ArrowRight } from "lucide-react";

export default function CatalogueDownload() {
  return (
    <section className="py-28 bg-[#050A18] relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-[#00E5B0] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0D1A30] to-[#091220] p-10 sm:p-14">

            {/* Decorative line */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#00E5B0]/40 to-transparent" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <span className="section-tag">Catalogue Produits</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 mb-4 leading-tight">
                  Découvrez tous nos{" "}
                  <span className="gradient-teal">500+ produits</span>
                </h2>
                <p className="text-[#6B83A0] leading-relaxed">
                  Téléchargez notre catalogue complet avec toutes les fiches techniques,
                  certifications et références disponibles pour vos besoins professionnels.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0">
                <a
                  href="/WH_Catalogue.pdf"
                  download
                  className="btn-primary !px-7 !py-4 whitespace-nowrap"
                >
                  <Download size={18} />
                  Télécharger le PDF
                </a>
                <Link href="/contact" className="btn-outline !px-7 !py-4 whitespace-nowrap">
                  Demander un devis
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#4D70FF]/40 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
