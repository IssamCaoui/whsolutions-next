// src/components/layout/Footer.tsx
import Link from "next/link";

const links = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/products", label: "Produits" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/about", label: "À Propos" },
    { href: "/contact", label: "Contact" },
  ],
  categories: [
    { href: "/products?category=nettoyage", label: "Nettoyage" },
    { href: "/products?category=desinfection", label: "Désinfection" },
    { href: "/products?category=hygiene-sanitaire", label: "Hygiène Sanitaire" },
    { href: "/products?category=traitement-eau", label: "Traitement d'Eau" },
    { href: "/products?category=cuisine", label: "Cuisine Collective" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0D1B2A] text-gray-300">
      {/* Top wave */}
      <div className="h-1 w-full bg-gradient-to-r from-[#4ECDC4] via-[#1B3A5C] to-[#FF6B6B]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#1B3A5C] flex items-center justify-center">
                <span className="text-white font-black text-sm">WH</span>
              </div>
              <span className="font-black text-xl text-white">WH Solutions</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Votre expert en hygiène professionnelle au Maroc. Des produits conformes HACCP 
              pour les industries, hôtels et collectivités.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/212652020702"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a
                href="mailto:info.whsolution@gmail.com"
                className="w-9 h-9 rounded-lg bg-[#1B3A5C] flex items-center justify-center hover:scale-110 transition-transform hover:bg-[#4ECDC4]"
                aria-label="Email"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.navigation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-[#4ECDC4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Catégories</h3>
            <ul className="space-y-2">
              {links.categories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-[#4ECDC4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#4ECDC4] mt-0.5 flex-shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>Kenitra, Maroc</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#4ECDC4] flex-shrink-0 fill-current" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:+212652020702" className="hover:text-[#4ECDC4] transition-colors">+212 (0) 6 52 020 702</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#4ECDC4] flex-shrink-0 fill-current" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a href="mailto:info.whsolution@gmail.com" className="hover:text-[#4ECDC4] transition-colors text-xs">info.whsolution@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {year} WH Solutions. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600">
            Produits conformes HACCP — Disponible partout au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
