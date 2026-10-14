import React, { useState, useEffect } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { AdminPanel } from './components/AdminPanel';
import { ContentPages } from './components/ContentPages';
import { Sparkles, ArrowRight } from 'lucide-react';

const MainStoreContent: React.FC = () => {
  const { selectedProduct, setSelectedProductId } = useProducts();

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [contentView, setContentView] = useState<'story' | 'faq' | 'contact' | null>(null);

  // Scroll to top on product select
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-[#0C0B0E] text-[#F4F1EA] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0C0B0E]">
      {/* JSON-LD Schema for E-Commerce SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'AURAIS Haute Parfumerie',
            description: 'Artisanal Extrait de Parfum handcrafted in Grasse, France with risk-free sample guarantee.',
            url: 'https://aurais-parfums.com',
            priceRange: '$$$$',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Grasse',
              addressCountry: 'FR'
            }
          })
        }}
      />

      {/* Main Header */}
      <Header
        onOpenScentQuiz={() => setIsQuizOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateHome={() => setSelectedProductId(null)}
        onOpenStory={() => setContentView('story')}
        onOpenFAQ={() => setContentView('faq')}
      />

      <main className="flex-1">
        {selectedProduct ? (
          /* Single Product Detail View */
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProductId(null)}
          />
        ) : (
          /* Catalog Home View */
          <>
            {/* Editorial Cinematic Hero Banner */}
            <section className="relative overflow-hidden border-b border-[#24212D] bg-[#0E0C12]">
              <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-transparent to-transparent pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-mono text-[#EEDB92]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Haute Parfumerie • 24–30% Extrait Concentration</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F4F1EA] leading-[1.1]">
                    Vessels of Memory. <br />
                    <span className="italic font-light text-[#D4AF37]">
                      Formulated in Grasse.
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-[#A39E93] max-w-xl leading-relaxed">
                    We reject synthetic shortcuts and industrial dilutions. Aurais extracts rare nocturnal botanicals, macerated for 24 months and bottled at full Extrait potency. Each flacon arrives with a complimentary 2ml trial vial—experience it on your skin before breaking the wax seal.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('catalog-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-7 py-4 bg-[#D4AF37] hover:bg-[#EEDB92] text-[#0C0B0E] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(true)}
                      className="px-6 py-4 border border-[#2A2733] hover:border-[#D4AF37] bg-[#141219] text-[#F4F1EA] font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Take Scent Finder Quiz</span>
                    </button>
                  </div>

                  {/* Trust Factors */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1C1A22] text-[11px] font-mono text-[#6E6961]">
                    <div>
                      <span className="text-[#EEDB92] font-semibold block">100% Risk-Free</span>
                      <span>2ml sample test first</span>
                    </div>
                    <div>
                      <span className="text-[#EEDB92] font-semibold block">Complimentary</span>
                      <span>Courier over $120</span>
                    </div>
                    <div>
                      <span className="text-[#EEDB92] font-semibold block">Bespoke Refills</span>
                      <span>20% flacon credit</span>
                    </div>
                  </div>
                </div>

                {/* Hero Showcase Bottle Visual */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[4/5] max-w-md mx-auto rounded-sm overflow-hidden border border-[#24212D] shadow-2xl bg-[#0C0B0E]">
                    <img
                      src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
                      alt="Oud Nocturne Extrait flacon"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0E] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#141219]/90 border border-[#2A2733] backdrop-blur-md">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Featured Vintage • Grasse 2026
                      </span>
                      <h3 className="text-lg font-serif text-[#F4F1EA]">
                        Oud Nocturne Extrait de Parfum
                      </h3>
                      <p className="text-xs text-[#A39E93] mt-1">
                        Smoked agarwood, May rose absolue & black amber.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog-section">
              <ProductList />
            </section>
          </>
        )}
      </main>

      {/* Cart Drawer Modal */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Scent Finder Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Content Pages Modal (Story, FAQ, Contact) */}
      <ContentPages
        view={contentView}
        onClose={() => setContentView(null)}
      />

      {/* Footer */}
      <Footer
        onOpenStory={() => setContentView('story')}
        onOpenFAQ={() => setContentView('faq')}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <MainStoreContent />
      </CartProvider>
    </ProductProvider>
  );
}
