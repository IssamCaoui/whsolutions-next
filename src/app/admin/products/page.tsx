"use client";
// src/app/admin/products/page.tsx
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, Star, Eye, EyeOff, X } from "lucide-react";

interface Product {
  id: number; name: string; slug: string; reference: string | null;
  price: number | null; is_featured: number; is_active: number;
  views: number; category_name: string | null; created_at: string;
}
interface Category { id: number; name: string; }

const EMPTY_FORM = {
  name: "", reference: "", category_id: "", description: "",
  short_description: "", price: "", is_featured: false, is_active: true,
};

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0D1B2A] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("q", search);
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then(r => r.json())
      .then(d => setCategories(d.categories || []));
  }, []);

  function openAdd() { setForm(EMPTY_FORM); setEditId(null); setError(""); setModal("add"); }
  function openEdit(p: Product) {
    setForm({
      name: p.name, reference: p.reference || "", category_id: "",
      description: "", short_description: "", price: p.price ?? "",
      is_featured: !!p.is_featured, is_active: !!p.is_active,
    });
    setEditId(p.id); setError(""); setModal("edit");
    fetch(`/api/admin/products/${p.id}`).then(r => r.json()).then(d => {
      if (d.product) setForm((prev: any) => ({
        ...prev,
        description: d.product.description || "",
        short_description: d.product.short_description || "",
        category_id: d.product.category_id ?? "",
      }));
    });
  }

  async function handleSave() {
    if (!form.name.trim()) { setError("Le nom est requis"); return; }
    setSaving(true); setError("");
    const body = {
      ...form,
      price: form.price ? parseFloat(form.price) : null,
      category_id: form.category_id ? parseInt(form.category_id) : null,
    };
    const res = modal === "add"
      ? await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      : await fetch(`/api/admin/products/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Erreur"); setSaving(false); return; }
    setModal(null); load();
    setSaving(false);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Produits</h1>
          <p className="text-gray-500 text-sm mt-0.5">{total} produit{total !== 1 ? "s" : ""} au total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Rechercher un produit…"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4ECDC4]/50 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                {["Produit", "Référence", "Catégorie", "Prix", "Vues", "Statut", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 rounded bg-white/5 animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-500">Aucun produit trouvé</td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {!!p.is_featured && <Star size={14} className="text-yellow-400 flex-shrink-0" />}
                      <span className="font-medium text-white truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{p.reference || "—"}</td>
                  <td className="px-5 py-4 text-gray-400">{p.category_name || "—"}</td>
                  <td className="px-5 py-4 text-gray-300">{p.price ? `${p.price} MAD` : "—"}</td>
                  <td className="px-5 py-4 text-gray-400">{p.views}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.is_active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}>
                      {p.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#4ECDC4] hover:bg-[#4ECDC4]/10 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
            <span className="text-xs text-gray-500">Page {page} / {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">←</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">→</button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <Modal title={modal === "add" ? "Ajouter un produit" : "Modifier le produit"} onClose={() => setModal(null)}>
          {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="label-admin">Nom *</label>
              <input type="text" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="input-admin" placeholder="Nom du produit" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-admin">Référence</label>
                <input type="text" value={form.reference} onChange={e => setForm((f: any) => ({ ...f, reference: e.target.value }))}
                  className="input-admin" placeholder="REF-001" />
              </div>
              <div>
                <label className="label-admin">Prix (MAD)</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm((f: any) => ({ ...f, price: e.target.value }))}
                  className="input-admin" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="label-admin">Catégorie</label>
              <select value={form.category_id} onChange={e => setForm((f: any) => ({ ...f, category_id: e.target.value }))}
                className="input-admin">
                <option value="">Sans catégorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label-admin">Description courte</label>
              <input type="text" value={form.short_description} onChange={e => setForm((f: any) => ({ ...f, short_description: e.target.value }))}
                className="input-admin" placeholder="Résumé en une ligne" />
            </div>
            <div>
              <label className="label-admin">Description complète</label>
              <textarea rows={4} value={form.description} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))}
                className="input-admin resize-none" placeholder="Description détaillée…" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm((f: any) => ({ ...f, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[#4ECDC4]" />
                Mis en avant
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm((f: any) => ({ ...f, is_active: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[#4ECDC4]" />
                Actif
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:border-white/20 hover:text-white transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <Modal title="Confirmer la suppression" onClose={() => setDeleteId(null)}>
          <p className="text-gray-400 text-sm mb-6">Cette action est irréversible. Le produit sera définitivement supprimé.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Annuler</button>
            <button onClick={() => handleDelete(deleteId!)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Supprimer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
