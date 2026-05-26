// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos",
  description: "WH Solutions, expert en hygiène professionnelle au Maroc depuis plus de 12 ans.",
};

const values = [
  { icon: "🎯", title: "Notre Mission", text: "Fournir des solutions d'hygiène professionnelle de haute qualité, conformes aux normes HACCP, pour protéger la santé et garantir la sécurité alimentaire au Maroc." },
  { icon: "👁️", title: "Notre Vision", text: "Devenir le partenaire hygiène de référence pour l'industrie, l'hôtellerie et la restauration au Maroc et en Afrique du Nord." },
  { icon: "💡", title: "Nos Valeurs", text: "Qualité, intégrité, innovation et proximité client sont au cœur de tout ce que nous faisons." },
];

const sectors = [
  "Hôtellerie & Restauration", "Industrie Agroalimentaire", "Hôpitaux & Cliniques",
  "Collectivités & Écoles", "Grande Distribution", "Agriculture & Élevage",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <AnimatedSection className="text-center mb-20">
          <span className="section-tag">À Propos</span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mt-4 mb-6">
            L'expert marocain en{" "}
            <span className="gradient-text">hygiène professionnelle</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Depuis plus de 12 ans, WH Solutions accompagne les professionnels marocains 
            avec des produits d'hygiène certifiés et un service d'expertise de proximité.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {[
            { value: "12+", label: "Ans d'expérience" },
            { value: "500+", label: "Produits référencés" },
            { value: "1000+", label: "Clients satisfaits" },
            { value: "12", label: "Régions couvertes" },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl glass dark:glass-dark">
              <div className="text-4xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </AnimatedSection>

        {/* Image section */}
        <AnimatedSection delay={0.15} className="mb-20">
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-washing.jpg"
              alt="WH Solutions - Hygiène professionnelle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white text-2xl font-black">L'hygiène, notre passion</p>
              <p className="text-[#4ECDC4] text-sm font-semibold mt-1">Plus de 12 ans d'expertise au Maroc</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 h-full border border-gray-100 dark:border-white/5">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Sectors */}
        <AnimatedSection className="bg-gradient-to-br from-[#1B3A5C] to-[#0D1B2A] rounded-3xl p-12 mb-20 text-center">
          <h2 className="text-2xl font-black text-white mb-8">
            Secteurs que nous <span className="gradient-text">servons</span>
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {sectors.map((s, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-[#4ECDC4]/20 hover:border-[#4ECDC4]/50 transition-all duration-300 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact CTA */}
        <AnimatedSection className="text-center" delay={0.1}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Vous avez un projet ?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Contactez notre équipe d'experts pour une consultation gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Nous contacter
            </Link>
            <Link
              href="https://wa.me/212652020702"
              target="_blank"
              className="px-8 py-4 rounded-2xl border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold hover:bg-[#4ECDC4] hover:text-white hover:scale-105 transition-all duration-300"
            >
              WhatsApp Direct
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
