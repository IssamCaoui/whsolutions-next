"use client";
// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",         label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/catalogue",label: "Catalogue" },
  { href: "/about",    label: "À Propos" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050A18]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-9 h-9 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Image src="/images/logo.png" alt="WH Solutions" fill className="object-contain" priority />
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-base text-white tracking-tight">
              WH <span className="gradient-teal">Solutions</span>
            </span>
            <p className="text-[9px] text-[#6B83A0] uppercase tracking-[0.2em] leading-none">
              Hygiène Professionnelle
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#00E5B0]"
                    : "text-[#6B83A0] hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-[#00E5B0]/10 border border-[#00E5B0]/20"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-primary !py-2.5 !px-5 !text-sm"
          >
            Demander un devis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-white/10 text-[#6B83A0] hover:text-white hover:border-white/20 transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.06] bg-[#050A18]/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#00E5B0] bg-[#00E5B0]/10"
                      : "text-[#6B83A0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact" className="btn-primary w-full justify-center !py-3 !text-sm">
                  Demander un devis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
