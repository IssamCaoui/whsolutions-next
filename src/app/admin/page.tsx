"use client";
// src/app/admin/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Tag, MessageSquare, ShoppingBag, Eye, Clock } from "lucide-react";

interface Stats {
  total_products: number;
  total_categories: number;
  total_messages: number;
  unread_messages: number;
  total_inquiries: number;
  pending_inquiries: number;
}

function StatCard({ icon: Icon, label, value, sub, color, href }: {
  icon: any; label: string; value: number; sub?: string; color: string; href: string;
}) {
  return (
    <Link href={href} className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/8 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        {sub && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20">
            {sub}
          </span>
        )}
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</div>
    </Link>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new:       { label: "Nouveau",   color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  contacted: { label: "Contacté",  color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  completed: { label: "Terminé",   color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelled: { label: "Annulé",    color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setMessages(d.recentMessages || []);
        setInquiries(d.recentInquiries || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Package} label="Produits" value={stats.total_products} color="bg-gradient-to-br from-[#4ECDC4] to-[#1B3A5C]" href="/admin/products" />
          <StatCard icon={Tag} label="Catégories" value={stats.total_categories} color="bg-gradient-to-br from-[#6C63FF] to-[#3f3d56]" href="/admin/categories" />
          <StatCard icon={MessageSquare} label="Messages" value={stats.total_messages} sub={stats.unread_messages > 0 ? `${stats.unread_messages} non lus` : undefined} color="bg-gradient-to-br from-[#FF6B6B] to-[#ee0979]" href="/admin/messages" />
          <StatCard icon={ShoppingBag} label="Demandes" value={stats.total_inquiries} sub={stats.pending_inquiries > 0 ? `${stats.pending_inquiries} en attente` : undefined} color="bg-gradient-to-br from-[#F7B731] to-[#f0932b]" href="/admin/inquiries" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <MessageSquare size={16} className="text-[#4ECDC4]" /> Messages récents
            </h2>
            <Link href="/admin/messages" className="text-xs text-[#4ECDC4] hover:underline">Voir tout →</Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Aucun message</p>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((m) => (
                <div key={m.id} className="px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${m.is_read ? "text-gray-400" : "text-white"}`}>
                        {m.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{m.subject || m.message?.slice(0, 50)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!m.is_read && <span className="w-2 h-2 rounded-full bg-[#4ECDC4]" />}
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock size={11} /> {formatDate(m.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#F7B731]" /> Demandes récentes
            </h2>
            <Link href="/admin/inquiries" className="text-xs text-[#4ECDC4] hover:underline">Voir tout →</Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Aucune demande</p>
          ) : (
            <div className="divide-y divide-white/5">
              {inquiries.map((inq) => {
                const s = STATUS_LABELS[inq.status] || STATUS_LABELS.new;
                return (
                  <div key={inq.id} className="px-6 py-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{inq.customer_name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{inq.product_name || "Produit inconnu"}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.color}`}>{s.label}</span>
                        <span className="text-xs text-gray-600">{formatDate(inq.created_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
