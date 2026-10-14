import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { PerfumeProduct, FilterOptions } from '../types';
import { INITIAL_PERFUMES } from '../data/perfumes';

interface ProductContextType {
  products: PerfumeProduct[];
  filteredProducts: PerfumeProduct[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: PerfumeProduct | null;
  allAvailableNotes: string[];
  addProduct: (product: Omit<PerfumeProduct, 'id'>) => void;
  updateProduct: (product: PerfumeProduct) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  searchQuery: '',
  family: 'All',
  selectedNotes: [],
  maxPrice: 350,
  minRating: 0,
  concentration: 'All',
  sortBy: 'featured'
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<PerfumeProduct[]>(() => {
    try {
      const saved = localStorage.getItem('aurais_products');
      return saved ? JSON.parse(saved) : INITIAL_PERFUMES;
    } catch {
      return INITIAL_PERFUMES;
    }
  });

  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aurais_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Collect unique notes across entire catalog for faceted filter tags
  const allAvailableNotes = useMemo(() => {
    const noteSet = new Set<string>();
    products.forEach((p) => {
      p.pyramid.top.forEach((n) => noteSet.add(n.name));
      p.pyramid.heart.forEach((n) => noteSet.add(n.name));
      p.pyramid.base.forEach((n) => noteSet.add(n.name));
    });
    return Array.from(noteSet).sort();
  }, [products]);

  // Compute filtered & sorted product list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesTagline = p.tagline.toLowerCase().includes(q);
          const matchesFamily = p.olfactoryFamily.toLowerCase().includes(q);
          const matchesAccords = p.accords.some((a) => a.toLowerCase().includes(q));
          const matchesNotes = [
            ...p.pyramid.top,
            ...p.pyramid.heart,
            ...p.pyramid.base
          ].some((n) => n.name.toLowerCase().includes(q));

          if (!matchesName && !matchesTagline && !matchesFamily && !matchesAccords && !matchesNotes) {
            return false;
          }
        }

        // Olfactory family
        if (filters.family !== 'All' && p.olfactoryFamily !== filters.family) {
          return false;
        }

        // Concentration
        if (filters.concentration !== 'All' && !p.concentration.includes(filters.concentration)) {
          return false;
        }

        // Rating
        if (p.rating < filters.minRating) {
          return false;
        }

        // Price (check default variant or minimum price)
        const minVariantPrice = Math.min(...p.variants.map((v) => v.price));
        if (minVariantPrice > filters.maxPrice) {
          return false;
        }

        // Selected notes filter
        if (filters.selectedNotes.length > 0) {
          const productNotes = [
            ...p.pyramid.top.map((n) => n.name),
            ...p.pyramid.heart.map((n) => n.name),
            ...p.pyramid.base.map((n) => n.name)
          ];
          const hasMatchingNote = filters.selectedNotes.some((n) => productNotes.includes(n));
          if (!hasMatchingNote) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.variants[a.defaultVariantIndex].price - b.variants[b.defaultVariantIndex].price;
        }
        if (filters.sortBy === 'price-desc') {
          return b.variants[b.defaultVariantIndex].price - a.variants[a.defaultVariantIndex].price;
        }
        if (filters.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (filters.sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // 'featured': bestsellers first, then rating
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.rating - a.rating;
      });
  }, [products, filters]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return products.find((p) => p.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  const addProduct = (newProd: Omit<PerfumeProduct, 'id'>) => {
    const created: PerfumeProduct = {
      ...newProd,
      id: `aurais-${Date.now()}`
    };
    setProducts((prev) => [created, ...prev]);
  };

  const updateProduct = (updated: PerfumeProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(null);
    }
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PERFUMES);
    localStorage.removeItem('aurais_products');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        filters,
        setFilters,
        resetFilters,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        allAvailableNotes,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
