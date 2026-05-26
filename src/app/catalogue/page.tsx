"use client";
// src/app/catalogue/page.tsx
import { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Download, FileText, ExternalLink, Loader2 } from "lucide-react";

const FALLBACK_URL =
  "https://drive.google.com/file/d/1OPj3mZEJiajEaHLB_jfYFbDDO6MVgRxR/view?usp=sharing";

export default function CataloguePage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(({ settings }) => {
        const extUrl = settings?.catalogue_pdf_ext_url;
        if (extUrl && extUrl.startsWith("http")) {
          setPdfUrl(extUrl);
        } else {
          setPdfUrl(FALLBACK_URL);
        }
      })
      .catch(() => setPdfUrl(FALLBACK_URL))
      .finally(() => setLoading(false));
  }, []);

  const isGoogleDrive = pdfUrl?.includes("drive.google.com");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="section-tag">Catalogue Produits</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#EDF2FF] mt-4 mb-4">
            Notre <span className="gradient-text">catalogue 2024</span>
          </h1>
          <p className="text-[#6B83A0] max-w-xl mx-auto text-lg">
            Téléchargez notre catalogue complet avec fiches techniques, références et gamme complète de produits d'hygiène professionnelle.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#00E5B0] animate-spin" />
          </div>
        ) : (
          <>
            {/* CTA card */}
            <AnimatedSection delay={0.1}>
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0D1A30] to-[#091220] rounded-3xl p-12 text-center mb-12">
                <div className="blob w-64 h-64 bg-[#00E5B0] opacity-20 -top-10 -left-10 animate-[morphBlob_10s_ease-in-out_infinite]" />
                <div className="blob w-48 h-48 bg-[#FF6B6B] opacity-10 -bottom-5 -right-5 animate-[morphBlob_14s_ease-in-out_infinite_3s]" />

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00E5B0] to-[#091220] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <FileText className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-2xl font-black text-white mb-4">
                    Catalogue WH Solutions
                  </h2>
                  <p className="text-[#6B83A0] mb-8 max-w-md mx-auto">
                    Toute notre gamme de produits : nettoyage, désinfection, traitement des eaux, hygiène sanitaire et cuisine collective.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r btn-primary transition-all duration-300"
                      >
                        {isGoogleDrive ? <ExternalLink size={20} /> : <Download size={20} />}
                        {isGoogleDrive ? "Voir sur Google Drive" : "Télécharger le PDF"}
                      </a>
                    )}
                    <a
                      href="https://wa.me/212652020702?text=Bonjour%2C%20je%20souhaite%20recevoir%20votre%20catalogue%20de%20produits%20en%20PDF."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300"
                    >
                      Recevoir par WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Info cards */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: "📦", title: "500+ Produits", desc: "Une gamme complète pour tous vos besoins" },
                  { icon: "✅", title: "Normes HACCP", desc: "Tous les produits certifiés et conformes" },
                  { icon: "📞", title: "Devis gratuit", desc: "Contactez-nous pour un devis personnalisé" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0D1A30] rounded-2xl p-6 text-center border border-white/[0.06]">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-[#EDF2FF] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#6B83A0]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}
      </div>
    </div>
  );
}
