import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import type { OlfactoryFamily } from '../types';

// const OLFACTORY_FAMILIES: { name: OlfactoryFamily | 'All'; label: string }[] = [
//   { name: 'All', label: 'All Creátions' },
//   { name: 'Woody & Amber', label: 'Woody & Amber' },
//   { name: 'Oriental & Gourmand', label: 'Oriental & Gourmand' },
//   { name: 'Floral & Powdery', label: 'Floral & Powdery' },
//   { name: 'Fresh & Citrus', label: 'Fresh & Citrus' },
//   { name: 'Smoky & Incense', label: 'Smoky & Incense' }
// ];

const POPULAR_NOTES = [
  'Assam Agarwood (Oud)',
  'Australian Sandalwood',
  'Madagascar Bourbon Vanilla Pods',
  'Damascena Rose Absolue',
  'Tunisian Neroli',
  'Florentine Orris Butter',
  'Haitian Vetiver Roots',
  'Cuban Tobacco Leaf'
];

export const ProductList: React.FC = () => {
  const {
    filteredProducts,
    filters,
    setFilters,
    resetFilters,
    setSelectedProductId,
    products
  } = useProducts();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleNote = (note: string) => {
    setFilters((prev) => {
      const exists = prev.selectedNotes.includes(note);
      const nextNotes = exists
        ? prev.selectedNotes.filter((n) => n !== note)
        : [...prev.selectedNotes, note];
      return { ...prev, selectedNotes: nextNotes };
    });
  };

  const hasActiveFilters =
    filters.family !== 'All' ||
    filters.selectedNotes.length > 0 ||
    filters.searchQuery !== '' ||
    filters.maxPrice < 350 ||
    filters.minRating > 0 ||
    filters.concentration !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C6920] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          The Autumn & Winter 2026 Harvest
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#1A1816]">
          Niche Extrait de Parfum Collection
        </h2>
        <p className="text-sm text-[#666158] leading-relaxed">
          Formulated with unprecedented 20% to 30% oil concentration in Grasse, France. Every flacon is accompanied by a complimentary matching 2ml vial so you can test on your own skin with zero risk.
        </p>
      </div>

      {/* Top Filter Bar: Family Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E7E1D4] pb-4 mb-8 overflow-x-auto">
        {/* <div className="flex items-center gap-2">
          {OLFACTORY_FAMILIES.map((fam) => {
            const isActive = filters.family === fam.name;
            return (
              <button
                key={fam.name}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, family: fam.name }))}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap rounded-none border ${
                  isActive
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                    : 'border-transparent text-[#766F64] hover:text-[#666158] hover:border-[#DDD5C5]'
                }`}
              >
                {fam.label}
              </button>
            );
          })}
        </div> */}

        {/* Filter Drawer Toggle & Sort Selector */}
        {/* <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider border border-[#DDD5C5] bg-[#FBF9F4] text-[#666158] hover:text-[#8C6920] hover:border-[#D4AF37]/50 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            )}
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
            }
            className="px-3 py-2 text-xs font-mono uppercase tracking-wider border border-[#DDD5C5] bg-[#FBF9F4] text-[#666158] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="featured">Featured Curations</option> */}
            {/* <option value="rating">Highest Rated</option> */}
            {/* <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option> */}
            {/* <option value="name">Alphabetical (A-Z)</option> */}
          {/* </select> */}
        {/* </div> */}
      </div>

      {/* Expanded Refinement Drawer / Panel */}
      {/* {mobileFilterOpen && ( *
        // <div className="bg-[#FBF9F4] border border-[#E7E1D4] p-6 mb-8 rounded-sm space-y-6 animate-in fade-in">
        //   <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-3">
        //     <h4 className="text-xs font-mono uppercase tracking-widest text-[#1A1816] flex items-center gap-2">
        //       <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6920]" />
        //       Olfactory Filter Matrix
        //     </h4>
        //     {hasActiveFilters && (
        //       <button
        //         type="button"
        //         onClick={resetFilters}
        //         className="text-xs font-mono text-[#8C6920] hover:text-[#8C6920] flex items-center gap-1.5"
        //       >
        //         <RotateCcw className="w-3 h-3" />
        //         Reset All Filters
        //       </button>
        //     )}
        //   </div>

        //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Note facet tags */}
            {/* <div>
              <span className="block font-mono uppercase tracking-wider text-[#666158] mb-2.5">
                Signature Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_NOTES.map((note) => {
                  const selected = filters.selectedNotes.includes(note);
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => toggleNote(note)}
                      className={`text-[10px] font-mono px-2.5 py-1 transition-all rounded-none border ${
                        selected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#8C6920]'
                          : 'border-[#E7E1D4] text-[#766F64] hover:text-[#666158] hover:border-[#DDD5C5]'
                      }`}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div> */}

            {/* Price Range Slider */}
            {/* <div>
              <div className="flex items-center justify-between font-mono uppercase tracking-wider text-[#666158] mb-2.5">
                <span>Maximum Flacon Price</span>
                <span className="text-[#8C6920]">${filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="45"
                max="350"
                step="5"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-[#D4AF37] bg-[#E7E1D4] h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#766F64] mt-1">
                <span>$45 (Discovery)</span>
                <span>$350 (Grand Extrait)</span>
              </div>
            </div> */}

            {/* Minimum Rating */}
            {/* <div>
              <span className="block font-mono uppercase tracking-wider text-[#666158] mb-2.5">
                Collector Rating
              </span>
              <div className="flex gap-2">
                {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, minRating: ratingVal }))
                    }
                    className={`flex-1 py-1.5 text-center font-mono text-xs border ${
                      filters.minRating === ratingVal
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                        : 'border-[#E7E1D4] text-[#766F64] hover:text-[#666158]'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : `${ratingVal}+ ★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 mb-6 text-xs">
          <span className="font-mono text-[#766F64] text-[11px] uppercase mr-1">
            Active Filters:
          </span>
          {filters.family !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#D4AF37]/30 text-[#8C6920] font-mono text-[11px]">
              Family: {filters.family}
              <button
                type="button"
                onClick={() => setFilters((p) => ({ ...p, family: 'All' }))}
              >
                <X className="w-3 h-3 text-[#666158] hover:text-white" />
              </button>
            </span>
          )}
          {filters.selectedNotes.map((note) => (
            <span
              key={note}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#D4AF37]/30 text-[#8C6920] font-mono text-[11px]"
            >
              Note: {note}
              <button type="button" onClick={() => toggleNote(note)}>
                <X className="w-3 h-3 text-[#666158] hover:text-white" />
              </button>
            </span>
          ))}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#D4AF37]/30 text-[#8C6920] font-mono text-[11px]">
              "{filters.searchQuery}"
              <button
                type="button"
                onClick={() => setFilters((p) => ({ ...p, searchQuery: '' }))}
              >
                <X className="w-3 h-3 text-[#666158] hover:text-white" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={resetFilters}
            className="text-[11px] font-mono text-[#8C6920] hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#766F64] mb-6">
        <span>
          Showing {filteredProducts.length} of {products.length} Fragrances
        </span>
        {/* <span className="text-[#8C6920] flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Handcrafted in Grasse
        </span> */}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((perfume) => (
            <ProductCard
              key={perfume.id}
              product={perfume}
              onSelect={(id) => setSelectedProductId(id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-[#FBF9F4] border border-[#E7E1D4] rounded-sm p-8 space-y-4">
          <p className="text-lg font-serif text-[#1A1816]">
            No fragrances matched your bespoke parameters.
          </p>
          <p className="text-xs text-[#666158] max-w-md mx-auto">
            Try adjusting your price ceiling or deselecting specific scent notes to discover other creations from our Grasse atelier.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#D4AF37] text-[#1A1816] font-mono text-xs uppercase tracking-wider font-medium hover:bg-[#8C6920] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
