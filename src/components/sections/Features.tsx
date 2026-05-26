// src/components/sections/Features.tsx
import AnimatedSection from "@/components/ui/AnimatedSection";

const features = [
  {
    icon: "🌿",
    title: "Produits Certifiés",
    description: "Tous nos produits sont conformes aux normes HACCP et aux réglementations sanitaires en vigueur au Maroc et à l'international.",
    gradient: "from-[#4ECDC4] to-[#1B3A5C]",
  },
  {
    icon: "🚚",
    title: "Livraison Nationale",
    description: "Livraison rapide partout au Maroc. Commandez via WhatsApp et recevez vos produits sous 24 à 72 heures selon votre région.",
    gradient: "from-[#FF6B6B] to-[#ee0979]",
  },
  {
    icon: "🔬",
    title: "Expertise Technique",
    description: "Notre équipe d'experts vous accompagne dans le choix des produits adaptés à votre secteur d'activité et vos besoins spécifiques.",
    gradient: "from-[#6C63FF] to-[#3f3d56]",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0D1B2A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="section-tag">Nos Engagements</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 mb-4">
            Pourquoi choisir{" "}
            <span className="gradient-text">WH Solutions</span> ?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Leader en hygiène professionnelle au Maroc depuis plus de 12 ans.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction="up">
              <div className="glass dark:glass-dark rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-5 shadow-md`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
