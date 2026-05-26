"use client";
// src/app/admin/categories/page.tsx
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Category {
  id: number; name: string; slug: string; description: string | null;
  icon: string; is_active: number; sort_order: number; product_count: number;
}

const EMPTY_FORM = { name: "", description: "", icon: "📦", sort_order: "0", is_active: true };

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0D1B2A] border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm(EMPTY_FORM); setEditId(null); setError(""); setModal("add"); }
  function openEdit(c: Category) {
    setForm({ name: c.name, description: c.description || "", icon: c.icon, sort_order: String(c.sort_order), is_active: !!c.is_active });
    setEditId(c.id); setError(""); setModal("edit");
  }

  async function handleSave() {
    if (!form.name.trim()) { setError("Le nom est requis"); return; }
    setSaving(true); setError("");
    const res = modal === "add"
      ? await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      : await fetch(`/api/admin/categories/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Erreur"); setSaving(false); return; }
    setModal(null); load(); setSaving(false);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Catégories</h1>
          <p className="text-gray-500 text-sm mt-0.5">{categories.length} catégorie{categories.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              {["Icône", "Nom", "Produits", "Ordre", "Statut", "Actions"].map(h => (
                <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i}>{[...Array(6)].map((_, j) => (
                  <td key={j} className="px-5 py-4"><div className="h-4 rounded bg-white/5 animate-pulse" /></td>
                ))}</tr>
              ))
            ) : categories.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">Aucune catégorie</td></tr>
            ) : categories.map(c => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-2xl">{c.icon}</td>
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{c.name}</p>
                  {c.description && <p className="text-xs text-gray-500 truncate max-w-[200px]">{c.description}</p>}
                </td>
                <td className="px-5 py-4 text-gray-400">{c.product_count}</td>
                <td className="px-5 py-4 text-gray-400">{c.sort_order}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.is_active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}>
                    {c.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#4ECDC4] hover:bg-[#4ECDC4]/10 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => setDeleteId(c.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Ajouter une catégorie" : "Modifier la catégorie"} onClose={() => setModal(null)}>
          {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="label-admin">Nom *</label>
                <input type="text" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="input-admin" placeholder="Nettoyage" />
              </div>
              <div>
                <label className="label-admin">Icône</label>
                <input type="text" value={form.icon} onChange={e => setForm((f: any) => ({ ...f, icon: e.target.value }))} className="input-admin text-center text-2xl" />
              </div>
            </div>
            <div>
              <label className="label-admin">Description</label>
              <input type="text" value={form.description} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} className="input-admin" placeholder="Brève description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-admin">Ordre d'affichage</label>
                <input type="number" value={form.sort_order} onChange={e => setForm((f: any) => ({ ...f, sort_order: e.target.value }))} className="input-admin" />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm((f: any) => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4 rounded accent-[#4ECDC4]" />
                  Active
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="Confirmer la suppression" onClose={() => setDeleteId(null)}>
          <p className="text-gray-400 text-sm mb-6">Cette catégorie sera supprimée. Les produits associés ne seront pas supprimés mais perdront leur catégorie.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Annuler</button>
            <button onClick={() => handleDelete(deleteId!)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
