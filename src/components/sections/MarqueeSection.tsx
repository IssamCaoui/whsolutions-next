// src/components/sections/MarqueeSection.tsx
const partners = [
  "🏨 Hôtellerie", "🏥 Santé", "🍽 Restauration", "🏭 Industrie",
  "🏫 Établissements scolaires", "🏢 Bureaux", "✈ Aéroports", "🏪 Grande distribution",
  "💊 Pharmacies", "🚢 Marine marchande",
];

export default function MarqueeSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1B3A5C] to-[#0D1B2A] py-4 select-none">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...partners, ...partners].map((p, i) => (
          <span key={i} className="text-sm font-semibold text-gray-300 hover:text-[#4ECDC4] transition-colors cursor-default">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
