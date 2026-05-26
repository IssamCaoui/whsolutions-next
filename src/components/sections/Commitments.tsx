// src/components/sections/Commitments.tsx
import AnimatedSection from "@/components/ui/AnimatedSection";

const commitments = [
  { icon: "✅", title: "Qualité Garantie", text: "Tous nos produits sont sélectionnés selon des critères stricts de qualité et d'efficacité." },
  { icon: "🔄", title: "Stock Permanent", text: "Un stock toujours disponible pour répondre à vos besoins en urgence sans délai." },
  { icon: "💬", title: "Conseil Expert", text: "Nos conseillers vous guident vers les solutions adaptées à votre secteur et vos contraintes." },
  { icon: "🤝", title: "Partenariat Durable", text: "Nous construisons des relations durables avec nos clients basées sur la confiance et la performance." },
];

export default function Commitments() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1B3A5C] to-[#0D1B2A]">
      <div className="blob w-96 h-96 bg-[#4ECDC4] opacity-10 -top-20 -right-20 animate-[morphBlob_12s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="section-tag">Notre promesse</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4">
            Nos <span className="gradient-text">engagements</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Nous nous engageons à vous offrir le meilleur service en hygiène professionnelle.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="glass-dark rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
