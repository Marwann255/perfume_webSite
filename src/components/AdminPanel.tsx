import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Package,
  DollarSign,
  AlertTriangle,
  Check
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import type { PerfumeProduct, OlfactoryFamily } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { products, addProduct, updateProduct, deleteProduct, resetCatalog } = useProducts();

  const [isEditing, setIsEditing] = useState<PerfumeProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subtitle: 'Extrait de Parfum • 30% Essence',
    tagline: '',
    story: '',
    perfumer: 'Laurent Delaunay, Grasse',
    olfactoryFamily: 'Woody & Amber' as OlfactoryFamily,
    concentration: 'Extrait de Parfum (30%)',
    price50ml: 210,
    stockCount: 25,
    topNotes: 'Calabrian Bergamot, Pink Pepper',
    heartNotes: 'Damascena Rose, Smoked Tonka',
    baseNotes: 'Assam Oud, Ambergris, Birch Tar',
    heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
  });

  if (!isOpen) return null;

  const totalStock = products.reduce((acc, p) => acc + p.stockCount, 0);
  const lowStockCount = products.filter((p) => p.stockCount <= 15).length;
  const totalValuation = products.reduce(
    (acc, p) => acc + p.variants[p.defaultVariantIndex].price * p.stockCount,
    0
  );

  const notify = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      subtitle: 'Extrait de Parfum • 30% Essence',
      tagline: 'An enigmatic blend of rare botanical essences.',
      story: 'Macerated for 24 months in French oak vats in Grasse.',
      perfumer: 'Laurent Delaunay',
      olfactoryFamily: 'Woody & Amber',
      concentration: 'Extrait de Parfum (30%)',
      price50ml: 220,
      stockCount: 20,
      topNotes: 'Bergamot, Saffron',
      heartNotes: 'Damask Rose, Incense',
      baseNotes: 'Aged Agarwood, Smoked Amber',
      heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    });
    setIsEditing(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (p: PerfumeProduct) => {
    setFormData({
      name: p.name,
      subtitle: p.subtitle,
      tagline: p.tagline,
      story: p.story,
      perfumer: p.perfumer,
      olfactoryFamily: p.olfactoryFamily,
      concentration: p.concentration,
      price50ml: p.variants[p.defaultVariantIndex].price,
      stockCount: p.stockCount,
      topNotes: p.pyramid.top.map((n) => n.name).join(', '),
      heartNotes: p.pyramid.heart.map((n) => n.name).join(', '),
      baseNotes: p.pyramid.base.map((n) => n.name).join(', '),
      heroImage: p.images.hero
    });
    setIsEditing(p);
    setIsCreating(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const topNoteItems = formData.topNotes
      .split(',')
      .map((s) => ({ name: s.trim(), category: 'citrus' as const }));
    const heartNoteItems = formData.heartNotes
      .split(',')
      .map((s) => ({ name: s.trim(), category: 'floral' as const }));
    const baseNoteItems = formData.baseNotes
      .split(',')
      .map((s) => ({ name: s.trim(), category: 'woody' as const }));

    if (isEditing) {
      const updated: PerfumeProduct = {
        ...isEditing,
        name: formData.name,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        story: formData.story,
        perfumer: formData.perfumer,
        olfactoryFamily: formData.olfactoryFamily,
        stockCount: formData.stockCount,
        images: {
          ...isEditing.images,
          hero: formData.heroImage
        },
        pyramid: {
          top: topNoteItems,
          heart: heartNoteItems,
          base: baseNoteItems
        },
        variants: isEditing.variants.map((v, i) =>
          i === isEditing.defaultVariantIndex ? { ...v, price: formData.price50ml } : v
        )
      };
      updateProduct(updated);
      notify(`Updated "${formData.name}" successfully`);
    } else {
      addProduct({
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        story: formData.story,
        inspiration: 'Grasse nocturnal botany',
        perfumer: formData.perfumer,
        olfactoryFamily: formData.olfactoryFamily,
        concentration: formData.concentration as any,
        pyramid: {
          top: topNoteItems,
          heart: heartNoteItems,
          base: baseNoteItems
        },
        longevityScore: 4.8,
        sillageScore: 4.5,
        season: ['Autumn', 'Winter'],
        gender: 'Unisex',
        mood: ['Opulent', 'Nocturnal'],
        accords: ['Woody', 'Amber', 'Warm Spicy'],
        variants: [
          { size: '2ml Sample', volumeMl: 2, price: 14, inStock: true },
          { size: '50ml Signature', volumeMl: 50, price: formData.price50ml, inStock: true },
          { size: '100ml Grand Flacon', volumeMl: 100, price: Math.round(formData.price50ml * 1.5), inStock: true }
        ],
        defaultVariantIndex: 1,
        images: {
          hero: formData.heroImage,
          ambient: formData.heroImage,
          detail: formData.heroImage
        },
        rating: 5.0,
        reviewCount: 1,
        reviews: [],
        stockCount: formData.stockCount
      });
      notify(`Added "${formData.name}" to Maison Catalog`);
    }

    setIsCreating(false);
    setIsEditing(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] border border-[#DDD5C5] text-[#1A1816] shadow-2xl rounded-sm overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E1D4] flex items-center justify-between bg-[#F8F5EE]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-serif tracking-[0.2em] uppercase text-[#1A1816]">
              Maison Inventory & Product Atelier
            </span>
            <span className="text-xs font-mono text-[#8C6920]">
              • Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset catalog to initial factory fragrances?')) {
                  resetCatalog();
                  notify('Catalog restored to default');
                }
              }}
              className="text-xs font-mono text-[#766F64] hover:text-[#8C6920] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 text-xs font-mono px-6 py-2 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Summary Metric Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-[#E7E1D4] bg-[#FBF9F4]">
          <div className="bg-[#FFFFFF] p-4 border border-[#E7E1D4] flex items-center gap-3">
            <Package className="w-5 h-5 text-[#8C6920]" />
            <div>
              <span className="text-[10px] font-mono text-[#766F64] uppercase block">
                Total Flacons in Stock
              </span>
              <span className="text-lg font-mono font-medium text-[#1A1816]">
                {totalStock} units ({products.length} Fragrances)
              </span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 border border-[#E7E1D4] flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-[#8C6920]" />
            <div>
              <span className="text-[10px] font-mono text-[#766F64] uppercase block">
                Inventory Valuation
              </span>
              <span className="text-lg font-mono font-medium text-[#8C6920]">
                ${totalValuation.toLocaleString()} USD
              </span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 border border-[#E7E1D4] flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-[10px] font-mono text-[#766F64] uppercase block">
                Low Inventory Alerts
              </span>
              <span className="text-lg font-mono font-medium text-amber-400">
                {lowStockCount} Fragrances ≤ 15 units
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isCreating ? (
            /* Product Table View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#1A1816]">
                  Active Fragrance Master Catalog
                </h4>
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Flacon</span>
                </button>
              </div>

              <div className="border border-[#E7E1D4] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FFFFFF] text-[#766F64] border-b border-[#E7E1D4] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Flacon</th>
                      <th className="p-3">Family</th>
                      <th className="p-3">Concentration</th>
                      <th className="p-3">50ml Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E1D4]/60 bg-[#FFFFFF]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8F5EE] transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.images.hero}
                            alt={p.name}
                            className="w-9 h-10 object-cover border border-[#E7E1D4]"
                          />
                          <div>
                            <span className="font-serif text-[#1A1816] text-sm block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#766F64]">
                              {p.perfumer}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-[#8C6920]">{p.olfactoryFamily}</td>
                        <td className="p-3 text-[#666158]">{p.concentration.split(' ')[0]}</td>
                        <td className="p-3 font-medium text-[#1A1816]">
                          ${p.variants[p.defaultVariantIndex].price}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] ${
                              p.stockCount <= 15
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                : 'text-[#666158]'
                            }`}
                          >
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="p-3 text-[#8C6920]">{p.rating.toFixed(2)} ★</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}" from catalog?`)) {
                                deleteProduct(p.id);
                                notify(`Deleted "${p.name}"`);
                              }
                            }}
                            className="p-1.5 text-[#766F64] hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Create / Edit Form */
            <form onSubmit={handleSubmitForm} className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#1A1816]">
                  {isEditing ? `Edit "${isEditing.name}"` : 'Formulate New Fragrance'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs font-mono text-[#666158] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#666158] mb-1">Fragrance Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#666158] mb-1">Olfactory Family</label>
                  <select
                    value={formData.olfactoryFamily}
                    onChange={(e) =>
                      setFormData({ ...formData, olfactoryFamily: e.target.value as any })
                    }
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Woody & Amber">Woody & Amber</option>
                    <option value="Oriental & Gourmand">Oriental & Gourmand</option>
                    <option value="Floral & Powdery">Floral & Powdery</option>
                    <option value="Fresh & Citrus">Fresh & Citrus</option>
                    <option value="Smoky & Incense">Smoky & Incense</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#666158] mb-1">50ml Flacon Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price50ml}
                    onChange={(e) =>
                      setFormData({ ...formData, price50ml: Number(e.target.value) })
                    }
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#666158] mb-1">Available Inventory</label>
                  <input
                    type="number"
                    required
                    value={formData.stockCount}
                    onChange={(e) =>
                      setFormData({ ...formData, stockCount: Number(e.target.value) })
                    }
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs font-mono">
                <label className="block text-[#666158] mb-1">Tagline & Sensory Hook</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-[#666158] mb-1">Top Notes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.topNotes}
                  onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-[#666158] mb-1">Heart Notes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.heartNotes}
                  onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-[#666158] mb-1">Base Notes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.baseNotes}
                  onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-[#666158] mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-3 border border-[#E7E1D4] text-[#666158] font-mono text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold"
                >
                  {isEditing ? 'Save Changes' : 'Publish Fragrance'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
