// src/components/sections/MarqueeSection.tsx
const items = [
  { label: "HACCP Conforme" },
  { label: "ISO 22000" },
  { label: "Livraison 24-72h" },
  { label: "500+ Produits" },
  { label: "12+ Ans d'expérience" },
  { label: "Tout le Maroc" },
  { label: "Support Expert" },
  { label: "Prix Compétitifs" },
];

export default function MarqueeSection() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative py-5 bg-[#080F22] border-y border-white/[0.05] overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080F22] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080F22] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track gap-0">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <span className="text-[#6B83A0] text-sm font-medium px-6 whitespace-nowrap tracking-wide">
              {item.label}
            </span>
            <span className="text-[#00E5B0] text-lg" aria-hidden>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
