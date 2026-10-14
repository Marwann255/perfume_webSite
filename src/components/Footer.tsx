import React, { useState } from 'react';
// import { ShieldCheck, Sparkles, RefreshCw, Send, Check } from 'lucide-react';
import type { OlfactoryFamily } from '../types';
import { useProducts } from '../context/ProductContext';

interface FooterProps {
  onOpenStory: () => void;
  onOpenFAQ: () => void;
  onOpenQuiz: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({
  //  onOpenStory, onOpenFAQ, onOpenQuiz 
  }) => {
  const { setFilters, setSelectedProductId } = useProducts();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleFamilyFilter = (family: OlfactoryFamily) => {
    setSelectedProductId(null);
    setFilters((prev) => ({ ...prev, family }));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8F5EE] border-t border-[#E7E1D4] text-[#666158] text-sm mt-20">
      {/* Brand Value Pillars */}
      {/* <div className="border-b border-[#F0EBE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 rounded-full bg-[#F8F5EE] border border-[#D4AF37]/20 text-[#8C6920]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-[#1A1816] font-medium">
                The Risk-Free Ritual
              </h4>
              <p className="text-xs text-[#766F64] mt-1 leading-relaxed">
                Every 30ml+ flacon includes a complimentary 2ml sample. Test the sample first; return the unopened full flacon for 100% refund.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 rounded-full bg-[#F8F5EE] border border-[#D4AF37]/20 text-[#8C6920]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-[#1A1816] font-medium">
                Grasse Terroir & Bio-Alcohol
              </h4>
              <p className="text-xs text-[#766F64] mt-1 leading-relaxed">
                20–30% Extrait concentration crafted with organic wheat spirit and ethically harvested French botanicals. Zero phthalates.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 rounded-full bg-[#F8F5EE] border border-[#D4AF37]/20 text-[#8C6920]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider text-[#1A1816] font-medium">
                Refillable Flacons
              </h4>
              <p className="text-xs text-[#766F64] mt-1 leading-relaxed">
                Heirloom weighted glass flacons engineered for infinite refills. Return your empty flacon for a 20% replenishment credit.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Links & Newsletter */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-12"> */}
        {/* Brand & Newsletter Column */}
        {/* <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-serif tracking-[0.2em] text-[#1A1816] uppercase">
            A U R A I S
          </h3>
          <p className="text-xs text-[#766F64] leading-relaxed max-w-sm">
            Haute Parfumerie dedicated to slow artisanal maceration and unforgettable sillage. Formulated in Grasse, bottled in molten crystal.
          </p>

          <div className="pt-2">
            <h5 className="text-xs uppercase tracking-widest text-[#8C6920] mb-2">
              Private Gazette & Harvest Invitations
            </h5>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#8C6920] bg-[#F8F5EE] border border-[#D4AF37]/30 p-2.5 rounded-sm">
                <Check className="w-4 h-4 text-[#8C6920]" />
                <span>You are on the private allocation list. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#FBF9F4] border border-[#DDD5C5] text-xs px-3.5 py-2.5 text-[#1A1816] placeholder-[#766F64] focus:outline-none focus:border-[#D4AF37] w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-medium text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#766F64] mt-2">
              We respect your privacy. No promotional spam; only harvest allocations.
            </p>
          </div>
        </div> */}

        {/* Olfactory Library */}
        {/* <div>
          <h4 className="text-xs uppercase tracking-widest text-[#1A1816] font-semibold mb-4">
            Olfactory Families
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => handleFamilyFilter('Woody & Amber')}
                className="hover:text-[#8C6920] transition-colors"
              >
                Woody & Amber
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFamilyFilter('Oriental & Gourmand')}
                className="hover:text-[#8C6920] transition-colors"
              >
                Oriental & Gourmand
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFamilyFilter('Floral & Powdery')}
                className="hover:text-[#8C6920] transition-colors"
              >
                Floral & Powdery
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFamilyFilter('Fresh & Citrus')}
                className="hover:text-[#8C6920] transition-colors"
              >
                Fresh & Citrus
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFamilyFilter('Smoky & Incense')}
                className="hover:text-[#8C6920] transition-colors"
              >
                Smoky & Incense
              </button>
            </li>
          </ul>
        </div> */}

        {/* Concierge & Service */}
        {/* <div>
          <h4 className="text-xs uppercase tracking-widest text-[#1A1816] font-semibold mb-4">
            Concierge & Care
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenQuiz} className="hover:text-[#8C6920] transition-colors text-left">
                Signature Scent Finder
              </button>
            </li>
            <li>
              <button onClick={onOpenFAQ} className="hover:text-[#8C6920] transition-colors text-left">
                The 2ml Sample Guarantee
              </button>
            </li>
            <li>
              <button onClick={onOpenFAQ} className="hover:text-[#8C6920] transition-colors text-left">
                Worldwide Climate Courier
              </button>
            </li>
            <li>
              <button onClick={onOpenFAQ} className="hover:text-[#8C6920] transition-colors text-left">
                Returns & Unbroken Seals
              </button>
            </li>
            <li>
              <button onClick={onOpenFAQ} className="hover:text-[#8C6920] transition-colors text-left">
                Flacon Engraving & Gifting
              </button>
            </li>
          </ul>
        </div> */}

        {/* The Maison & Standards */}
        {/* <div>
          <h4 className="text-xs uppercase tracking-widest text-[#1A1816] font-semibold mb-4">
            The Atelier
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenStory} className="hover:text-[#8C6920] transition-colors text-left">
                Heritage of Grasse
              </button>
            </li>
            <li>
              <button onClick={onOpenStory} className="hover:text-[#8C6920] transition-colors text-left">
                24-Month Maceration
              </button>
            </li>
            <li>
              <button onClick={onOpenStory} className="hover:text-[#8C6920] transition-colors text-left">
                Clean Botanical Ethics
              </button>
            </li>
            <li>
              <span className="text-[#766F64] block pt-2 text-[11px]">
                Accessibility: WCAG 2.1 AA Compliant
              </span>
            </li>
          </ul>
        </div> */}
      {/* </div> */}

      {/* Bottom Legal & Payment Badges */}
      <div className="border-t border-[#F0EBE0] bg-[#F4F0E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#766F64]">
          <p>© {CURRENT_YEAR} AURAIS Haute Parfumerie. All rights reserved.</p>

          {/* <div className="flex items-center gap-6">
            <span className="text-[11px] uppercase tracking-wider text-[#666158]">
              Secure Checkout via Stripe
            </span>
            <div className="flex items-center gap-2 text-xs text-[#666158]">
              <span className="px-2 py-0.5 border border-[#DDD5C5] rounded text-[10px]">Apple Pay</span>
              <span className="px-2 py-0.5 border border-[#DDD5C5] rounded text-[10px]">Google Pay</span>
              <span className="px-2 py-0.5 border border-[#DDD5C5] rounded text-[10px]">Klarna</span>
              <span className="px-2 py-0.5 border border-[#DDD5C5] rounded text-[10px]">Visa / MC / Amex</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};
