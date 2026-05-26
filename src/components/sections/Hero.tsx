"use client";
// src/components/sections/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const stats = [
  { value: "500+", label: "Produits" },
  { value: "12+", label: "Ans d'expérience" },
  { value: "HACCP", label: "Conformité" },
  { value: "100%", label: "Maroc" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B3A5C] to-[#0D1B2A]">
      {/* Hero background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      {/* Animated blobs */}
      <div className="blob w-96 h-96 bg-[#4ECDC4] opacity-20 top-10 -left-20 animate-[morphBlob_10s_ease-in-out_infinite]" />
      <div className="blob w-80 h-80 bg-[#FF6B6B] opacity-15 bottom-20 right-10 animate-[morphBlob_14s_ease-in-out_infinite_2s]" />
      <div className="blob w-64 h-64 bg-[#00F5D4] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[morphBlob_8s_ease-in-out_infinite_4s]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M0 0h1v40H0V0zm40 0h-1v40h1V0zM0 0v1h40V0H0zm0 40v-1h40v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 text-[#4ECDC4] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] animate-pulse" />
          Expert en Hygiène Professionnelle au Maroc
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
        >
          Des solutions{" "}
          <span className="gradient-text block sm:inline">
            d'hygiène
          </span>{" "}
          <br className="hidden sm:block" />
          <span className="text-white">professionnelle</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          Produits de nettoyage, désinfection et traitement des eaux conformes HACCP.
          Disponibles partout au Maroc avec livraison rapide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/products"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold text-base hover:shadow-2xl hover:shadow-[#4ECDC4]/30 hover:scale-105 transition-all duration-300"
          >
            Explorer nos produits
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/catalogue"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-base hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <Download size={18} />
            Télécharger le catalogue
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
