// src/components/sections/Commitments.tsx
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const sectors = [
  "Hôtellerie & Restauration", "Industrie Agroalimentaire",
  "Hôpitaux & Cliniques",      "Collectivités & Écoles",
  "Grande Distribution",        "Agriculture & Élevage",
];

const stats = [
  { value: "12+",   label: "Années d'expérience" },
  { value: "500+",  label: "Produits certifiés" },
  { value: "1000+", label: "Clients satisfaits" },
  { value: "12",    label: "Régions couvertes" },
];

export default function Commitments() {
  return (
    <section className="py-28 bg-[#080F22] relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-[#00E5B0] opacity-[0.04] top-0 left-0 -translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Stats */}
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-white/[0.06] bg-[#0D1A30] hover:border-[#00E5B0]/20 transition-colors duration-300"
              >
                <p className="text-4xl font-black gradient-teal mb-1">{s.value}</p>
                <p className="text-[11px] text-[#6B83A0] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* About strip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/about-washing.jpg"
                alt="WH Solutions expertise"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-black text-xl">L'hygiène, notre passion</p>
                <p className="text-[#00E5B0] text-sm mt-0.5">Depuis 2012 au Maroc</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <span className="section-tag">À Propos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 mb-4 leading-tight">
              L'expert marocain en{" "}
              <span className="gradient-teal">hygiène pro</span>
            </h2>
            <p className="text-[#6B83A0] leading-relaxed mb-6">
              WH Solutions accompagne les professionnels marocains depuis plus de 12 ans avec
              des produits d'hygiène certifiés HACCP. Nous couvrons tous les secteurs, de
              l'hôtellerie à l'industrie agroalimentaire.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {sectors.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-[#6B83A0] border border-white/[0.06] bg-white/[0.02] hover:border-[#00E5B0]/25 hover:text-[#00E5B0] transition-all duration-200 cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-outline !inline-flex">
              En savoir plus →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
