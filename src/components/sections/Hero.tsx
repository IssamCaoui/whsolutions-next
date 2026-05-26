"use client";
// src/components/sections/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";

const floatingCards = [
  { icon: ShieldCheck, label: "Certifié HACCP",     value: "100%",   color: "#00E5B0", bg: "rgba(0,229,176,0.08)",  border: "rgba(0,229,176,0.15)" },
  { icon: Truck,       label: "Livraison nationale", value: "24-72h", color: "#4D70FF", bg: "rgba(77,112,255,0.08)", border: "rgba(77,112,255,0.15)" },
  { icon: Award,       label: "Ans d'expérience",   value: "12+",    color: "#F5C000", bg: "rgba(245,192,0,0.08)",  border: "rgba(245,192,0,0.15)"  },
  { icon: FlaskConical,label: "Produits référencés", value: "500+",  color: "#9B6DFF", bg: "rgba(155,109,255,0.08)",border: "rgba(155,109,255,0.15)" },
];

const positions = [
  { top: "8%",  right: "-5%" },
  { top: "32%", right: "10%" },
  { top: "58%", right: "-5%" },
  { top: "80%", right: "12%" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] } }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050A18]">

      {/* ── Blobs ── */}
      <div className="blob w-[500px] h-[500px] bg-[#00E5B0] opacity-[0.06] top-[-100px] left-[-150px]" />
      <div className="blob w-[400px] h-[400px] bg-[#4D70FF] opacity-[0.07] bottom-[-80px] right-[5%]" />

      {/* ── Dot grid ── */}
      <div className="dot-grid absolute inset-0 opacity-100 pointer-events-none" />

      {/* ── Gradient spotlight ── */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#00E5B0]/5 to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="space-y-7">

            {/* Badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="section-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5B0] animate-pulse inline-block" />
                Expert Hygiène Professionnelle · Maroc
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight">
                Solutions{" "}
                <span className="gradient-teal">d'hygiène</span>
                <br />
                <span className="text-white">qui</span>{" "}
                <span className="gradient-warm">protègent</span>
                <br />
                <span className="text-white/60 text-4xl sm:text-5xl lg:text-[52px]">les professionnels</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[#6B83A0] text-lg leading-relaxed max-w-lg"
            >
              Produits de nettoyage, désinfection et traitement des eaux conformes HACCP.
              Livrés partout au Maroc avec un service expert de proximité.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Explorer nos produits
                <ArrowRight size={16} />
              </Link>
              <Link href="/catalogue" className="btn-outline">
                <Download size={16} />
                Télécharger le catalogue
              </Link>
            </motion.div>

            {/* Mini stats row */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <div className="flex items-center gap-6 pt-2">
                {[
                  { n: "500+",  l: "Produits" },
                  { n: "12+",   l: "Ans d'expérience" },
                  { n: "100%",  l: "Certifié HACCP" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-black gradient-teal">{s.n}</p>
                    <p className="text-[11px] text-[#6B83A0] uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Visual ── */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">

            {/* Central ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[280px] flex-shrink-0"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#00E5B0]/10" />
              <div className="absolute inset-4 rounded-full border border-[#4D70FF]/10" />
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5B0]/5 to-[#4D70FF]/5" />
              {/* Logo */}
              <div className="absolute inset-8 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="WH Solutions"
                  width={140}
                  height={140}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Floating stat cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className={`absolute flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border`}
                style={{
                  top: positions[i].top,
                  right: positions[i].right,
                  background: card.bg,
                  borderColor: card.border,
                  animation: `float-${["a","b","c","a"][i]} ${5+i}s ease-in-out infinite ${i*0.7}s`,
                }}
              >
                <div className="p-2 rounded-xl" style={{ background: card.bg }}>
                  <card.icon size={18} color={card.color} />
                </div>
                <div>
                  <p className="text-xl font-black text-white leading-none">{card.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: card.color }}>{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050A18] to-transparent pointer-events-none" />
    </section>
  );
}
