import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, Sliders, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import type { OlfactoryFamily } from '../types';

interface HeaderProps {
  onOpenScentQuiz: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onOpenStory: () => void;
  onOpenFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenScentQuiz,
  onOpenAdmin,
  onNavigateHome,
  onOpenStory,
  onOpenFAQ
}) => {
  const { items, setIsCartOpen, wishlist } = useCart();
  const { filters, setFilters, setSelectedProductId } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalCartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleFamilyFilter = (family: OlfactoryFamily | 'All') => {
    setSelectedProductId(null);
    setFilters((prev) => ({ ...prev, family }));
    setMobileMenuOpen(false);
    onNavigateHome();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#DDD5C5]/70">
      {/* Top Luxury Announcement Bar */}
      {/* <div className="bg-[#FBF9F4] border-b border-[#E7E1D4] text-xs text-[#8C6920] px-4 py-2 font-mono tracking-widest text-center flex items-center justify-center gap-4 overflow-x-auto whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6920]" />
          COMPLIMENTARY 2ML SAMPLE WITH EVERY FLACON — TEST BEFORE UNSEALING
        </span>
        <span className="hidden md:inline text-[#766F64]">•</span>
        <span className="hidden md:inline text-[#666158]">
          COMPLIMENTARY CLIMATE-NEUTRAL COURIER OVER $120
        </span>
      </div> */}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Button & Desktop Quick Links */}
        {/* <div></div> */}
        {/* <div className="flex items-center gap-6"> */}
          {/* <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#666158] hover:text-[#8C6920] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>  */}

          {/* <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#666158]">
            <button
              onClick={() => {
                setSelectedProductId(null);
                setFilters((prev) => ({ ...prev, family: 'All' }));
                onNavigateHome();
              }}
              className="hover:text-[#8C6920] transition-colors"
            >
              Collection
            </button>
            <button
              onClick={() => handleFamilyFilter('Woody & Amber')}
              className="hover:text-[#8C6920] transition-colors"
            >
              Woody & Amber
            </button>
            <button
              onClick={() => handleFamilyFilter('Floral & Powdery')}
              className="hover:text-[#8C6920] transition-colors"
            >
              Floral
            </button>
            <button
              onClick={() => handleFamilyFilter('Fresh & Citrus')}
              className="hover:text-[#8C6920] transition-colors"
            >
              Fresh
            </button> */}
            {/* <button
              onClick={onOpenStory}
              className="hover:text-[#8C6920] transition-colors"
            >
              Maison
            </button> */}
           {/* </nav> */}
        {/* </div>  */}

        {/* Center: Brand Identity */}
        <div className="text-center cursor-pointer" onClick={() => { setSelectedProductId(null); onNavigateHome(); }}>
          <h1 className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#1A1816] uppercase font-light">
            A U R A I S
          </h1>
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#8C6920]/90 -mt-0.5">
            Haute Parfumerie • Grasse
          </p>
        </div>

        {/* Right: Actions & Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Interactive Scent Quiz Button */}
          <button
            onClick={onOpenScentQuiz}
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border border-[#D4AF37]/40 text-[#8C6920] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all"
            title="Interactive fragrance finder"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C6920]" />
            <span>Scent Finder</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-[#666158] hover:text-[#8C6920] transition-colors"
            aria-label="Search fragrances"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Indicator */}
          <div className="relative">
            <button
              onClick={() => {
                // If clicked, we can notify or scroll to favorites
              }}
              className="p-2 text-[#666158] hover:text-[#8C6920] transition-colors relative"
              aria-label="Wishlist"
              title={`Wishlist (${wishlist.length} saved)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37] ring-2 ring-[#FFFFFF]" />
              )}
            </button>
          </div>

          {/* Admin Atelier Switcher */}
          {/* <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 p-2 text-[#766F64] hover:text-[#666158] transition-colors text-xs"
            title="Maison Inventory & Admin Atelier"
          >
            <Sliders className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-wider">Atelier</span>
          </button> */}

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#F8F5EE] border border-[#DDD5C5] hover:border-[#D4AF37]/50 transition-all text-[#1A1816]"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C6920]" />
            <span className="text-xs font-mono font-medium">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Inline Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#DDD5C5] bg-[#FBF9F4] px-4 py-3 animate-in fade-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#8C6920]" />
            <input
              type="text"
              placeholder="Search by olfactory note (e.g. Oud, Vanilla, Bergamot, Orris) or mood..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              autoFocus
              className="w-full bg-transparent border-none text-sm text-[#1A1816] placeholder-[#766F64] focus:outline-none focus:ring-0"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="text-xs text-[#666158] hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1 text-[#766F64] hover:text-[#666158]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DDD5C5] bg-[#FFFFFF] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
            <button
              onClick={() => {
                setSelectedProductId(null);
                setFilters((prev) => ({ ...prev, family: 'All' }));
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="text-left text-[#1A1816] py-1 border-b border-[#DDD5C5]/50"
            >
              All Fragrances
            </button>
            <button
              onClick={() => handleFamilyFilter('Woody & Amber')}
              className="text-left text-[#666158] hover:text-[#8C6920] py-1"
            >
              Woody & Amber
            </button>
            <button
              onClick={() => handleFamilyFilter('Oriental & Gourmand')}
              className="text-left text-[#666158] hover:text-[#8C6920] py-1"
            >
              Oriental & Gourmand
            </button>
            <button
              onClick={() => handleFamilyFilter('Floral & Powdery')}
              className="text-left text-[#666158] hover:text-[#8C6920] py-1"
            >
              Floral & Powdery
            </button>
            <button
              onClick={() => handleFamilyFilter('Fresh & Citrus')}
              className="text-left text-[#666158] hover:text-[#8C6920] py-1"
            >
              Fresh & Citrus
            </button>
            <button
              onClick={() => handleFamilyFilter('Smoky & Incense')}
              className="text-left text-[#666158] hover:text-[#8C6920] py-1"
            >
              Smoky & Incense
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScentQuiz();
              }}
              className="text-left text-[#8C6920] py-2 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#8C6920]" />
              Scent Finder Quiz
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStory();
              }}
              className="text-left text-[#666158] py-1"
            >
              Maison Story & Grasse Heritage
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFAQ();
              }}
              className="text-left text-[#666158] py-1"
            >
              Concierge, Shipping & Guarantee
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left text-[#8C6920] pt-2 border-t border-[#DDD5C5] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Atelier Inventory Manager
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
