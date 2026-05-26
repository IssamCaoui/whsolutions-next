"use client";
// src/app/contact/page.tsx
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `CONTACT: ${form.message}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contacts = [
    { icon: Phone, label: "Téléphone", value: "+212 (0) 6 52 020 702", href: "tel:+212652020702" },
    { icon: Mail, label: "Email", value: "info.whsolution@gmail.com", href: "mailto:info.whsolution@gmail.com" },
    { icon: MapPin, label: "Adresse", value: "Kenitra, Maroc", href: null },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="section-tag">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mt-4 mb-4">
            Parlons de votre{" "}
            <span className="gradient-text">projet</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <AnimatedSection direction="left">
            <div className="space-y-6 mb-8">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#1B3A5C] flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-gray-900 dark:text-white font-semibold hover:text-[#4ECDC4] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/212652020702?text=Bonjour%20WH%20Solutions%2C%20je%20souhaite%20vous%20contacter."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} />
              Contacter via WhatsApp (Réponse rapide)
            </a>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-[#4ECDC4] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé !</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Nous vous répondrons dans les meilleurs délais.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[#4ECDC4] hover:underline text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Nom complet *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Téléphone *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      placeholder="06 XX XX XX XX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Décrivez votre besoin, votre secteur d'activité..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Une erreur est survenue. Veuillez réessayer ou nous contacter via WhatsApp.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold hover:shadow-lg hover:shadow-[#4ECDC4]/30 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
