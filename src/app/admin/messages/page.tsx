"use client";
// src/app/admin/messages/page.tsx
import { useEffect, useState, useCallback } from "react";
import { CheckCheck, Trash2, X, Mail, Phone } from "lucide-react";

interface Message {
  id: number; name: string; email: string | null; phone: string | null;
  subject: string | null; message: string; is_read: number; created_at: string;
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

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/messages?page=${page}`);
    const data = await res.json();
    setMessages(data.messages || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  async function markRead(id: number) {
    await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: 1 } : m));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, is_read: 1 } : null);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setDeleteId(null);
    setSelected(null);
    load();
  }

  function openMessage(m: Message) {
    setSelected(m);
    if (!m.is_read) markRead(m.id);
  }

  const totalPages = Math.ceil(total / 20);
  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Messages</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {total} message{total !== 1 ? "s" : ""}
          {unread > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-bold border border-[#4ECDC4]/20">{unread} non lu{unread > 1 ? "s" : ""}</span>}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                {["", "Expéditeur", "Sujet", "Date", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(5)].map((_, j) => (
                    <td key={j} className="px-5 py-4"><div className="h-4 rounded bg-white/5 animate-pulse" /></td>
                  ))}</tr>
                ))
              ) : messages.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500">Aucun message</td></tr>
              ) : messages.map(m => (
                <tr key={m.id} onClick={() => openMessage(m)} className={`cursor-pointer hover:bg-white/5 transition-colors ${!m.is_read ? "bg-[#4ECDC4]/3" : ""}`}>
                  <td className="pl-5 py-4 w-4">
                    {!m.is_read && <span className="w-2 h-2 rounded-full bg-[#4ECDC4] inline-block" />}
                  </td>
                  <td className="px-5 py-4">
                    <p className={`font-medium truncate max-w-[150px] ${!m.is_read ? "text-white" : "text-gray-400"}`}>{m.name}</p>
                    {m.email && <p className="text-xs text-gray-600 truncate">{m.email}</p>}
                  </td>
                  <td className="px-5 py-4 text-gray-400 max-w-[200px]">
                    <p className="truncate">{m.subject || m.message.slice(0, 50)}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{formatDate(m.created_at)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      {!m.is_read && (
                        <button onClick={() => markRead(m.id)} title="Marquer lu" className="p-1.5 rounded-lg text-gray-400 hover:text-[#4ECDC4] hover:bg-[#4ECDC4]/10 transition-colors">
                          <CheckCheck size={14} />
                        </button>
                      )}
                      <button onClick={() => setDeleteId(m.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
            <span className="text-xs text-gray-500">Page {page} / {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">←</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">→</button>
            </div>
          </div>
        )}
      </div>

      {/* Message detail modal */}
      {selected && (
        <Modal title={`Message de ${selected.name}`} onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-[#4ECDC4] hover:underline">
                  <Mail size={14} /> {selected.email}
                </a>
              )}
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-[#4ECDC4] hover:underline">
                  <Phone size={14} /> {selected.phone}
                </a>
              )}
            </div>
            {selected.subject && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sujet</p>
                <p className="text-white font-medium">{selected.subject}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Message</p>
              <div className="bg-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</div>
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
        <Modal title="Supprimer le message" onClose={() => setDeleteId(null)}>
          <p className="text-gray-400 text-sm mb-6">Ce message sera définitivement supprimé.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Annuler</button>
            <button onClick={() => handleDelete(deleteId!)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
