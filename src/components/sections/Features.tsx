// src/components/sections/Features.tsx
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ShieldCheck, Truck, FlaskConical } from "lucide-react";

const features = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Produits Certifiés",
    description: "Conformes aux normes HACCP et réglementations sanitaires en vigueur au Maroc et à l'international. Chaque produit est testé et approuvé.",
    accent: "#00E5B0",
    bg: "rgba(0,229,176,0.05)",
    border: "rgba(0,229,176,0.12)",
  },
  {
    num: "02",
    icon: Truck,
    title: "Livraison Nationale",
    description: "Commandez via WhatsApp et recevez vos produits sous 24 à 72h partout au Maroc. Service logistique fiable et traçable.",
    accent: "#4D70FF",
    bg: "rgba(77,112,255,0.05)",
    border: "rgba(77,112,255,0.12)",
  },
  {
    num: "03",
    icon: FlaskConical,
    title: "Expertise Technique",
    description: "Notre équipe spécialisée vous accompagne dans le choix des solutions adaptées à votre secteur et vous forme à leur utilisation.",
    accent: "#9B6DFF",
    bg: "rgba(155,109,255,0.05)",
    border: "rgba(155,109,255,0.12)",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-[#050A18] relative overflow-hidden">
      {/* Background accent */}
      <div className="blob w-[400px] h-[400px] bg-[#4D70FF] opacity-[0.04] top-1/2 right-0 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="section-tag">Nos Engagements</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-5 mb-4 leading-tight">
            Pourquoi choisir{" "}
            <span className="gradient-teal">WH Solutions</span> ?
          </h2>
          <p className="text-[#6B83A0] text-lg max-w-xl mx-auto">
            Leader de l'hygiène professionnelle au Maroc depuis plus de 12 ans.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.12} direction="up">
              <div
                className="relative rounded-2xl p-7 h-full group transition-all duration-300 hover:-translate-y-2"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}
              >
                {/* Number */}
                <span
                  className="absolute top-5 right-6 text-6xl font-black leading-none select-none"
                  style={{ color: f.accent, opacity: 0.12 }}
                >
                  {f.num}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: f.bg, border: `1px solid ${f.border}` }}
                >
                  <f.icon size={22} color={f.accent} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[#6B83A0] text-sm leading-relaxed">{f.description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
