"use client";
// src/app/admin/inquiries/page.tsx
import { useEffect, useState, useCallback } from "react";
import { Trash2, X, Phone, Mail, Package } from "lucide-react";

interface Inquiry {
  id: number; customer_name: string; customer_phone: string | null;
  customer_email: string | null; quantity: number; message: string | null;
  status: string; created_at: string; product_name: string | null;
}

const STATUS_OPTIONS = [
  { value: "new",       label: "Nouveau",   color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "contacted", label: "Contacté",  color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "completed", label: "Terminé",   color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { value: "cancelled", label: "Annulé",    color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

function statusInfo(status: string) {
  return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0D1B2A] border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/inquiries?page=${page}`);
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    setDeleteId(null); setSelected(null); load();
  }

  const totalPages = Math.ceil(total / 20);
  const pending = inquiries.filter(i => i.status === "new").length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Demandes</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {total} demande{total !== 1 ? "s" : ""}
          {pending > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">{pending} en attente</span>}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                {["Client", "Produit", "Qté", "Statut", "Date", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(6)].map((_, j) => (
                    <td key={j} className="px-5 py-4"><div className="h-4 rounded bg-white/5 animate-pulse" /></td>
                  ))}</tr>
                ))
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">Aucune demande</td></tr>
              ) : inquiries.map(inq => {
                const s = statusInfo(inq.status);
                return (
                  <tr key={inq.id} onClick={() => setSelected(inq)} className="cursor-pointer hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{inq.customer_name}</p>
                      {inq.customer_phone && <p className="text-xs text-gray-500">{inq.customer_phone}</p>}
                    </td>
                    <td className="px-5 py-4 text-gray-400 max-w-[150px]"><p className="truncate">{inq.product_name || "—"}</p></td>
                    <td className="px-5 py-4 text-gray-400">{inq.quantity}</td>
                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => updateStatus(inq.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer bg-transparent ${s.color}`}
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value} className="bg-[#0D1B2A] text-white">{opt.label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{formatDate(inq.created_at)}</td>
                    <td className="px-5 py-4">
                      <button onClick={e => { e.stopPropagation(); setDeleteId(inq.id); }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
            <span className="text-xs text-gray-500">Page {page} / {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">←</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">→</button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <Modal title={`Demande de ${selected.customer_name}`} onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {selected.customer_phone && (
                <a href={`tel:${selected.customer_phone}`} className="flex items-center gap-2 text-[#4ECDC4] hover:underline">
                  <Phone size={14} /> {selected.customer_phone}
                </a>
              )}
              {selected.customer_email && (
                <a href={`mailto:${selected.customer_email}`} className="flex items-center gap-2 text-[#4ECDC4] hover:underline">
                  <Mail size={14} /> {selected.customer_email}
                </a>
              )}
            </div>
            {selected.product_name && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
                <Package size={16} className="text-[#4ECDC4]" />
                <div>
                  <p className="text-xs text-gray-500">Produit</p>
                  <p className="text-white text-sm font-medium">{selected.product_name}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-gray-500">Quantité</p>
                  <p className="text-white font-bold">{selected.quantity}</p>
                </div>
              </div>
            )}
            {selected.message && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Message</p>
                <div className="bg-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed">{selected.message}</div>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Statut</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => updateStatus(selected.id, opt.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selected.status === opt.value ? opt.color : "bg-white/5 border-white/10 text-gray-500 hover:text-white"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600">{formatDate(selected.created_at)}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition-colors">Fermer</button>
              <button onClick={() => { setDeleteId(selected.id); setSelected(null); }} className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Supprimer</button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="Supprimer la demande" onClose={() => setDeleteId(null)}>
          <p className="text-gray-400 text-sm mb-6">Cette demande sera définitivement supprimée.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Annuler</button>
            <button onClick={() => handleDelete(deleteId!)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
