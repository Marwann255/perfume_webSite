import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Send, Check } from 'lucide-react';

interface ContentPagesProps {
  view: 'story' | 'faq' | 'contact' | null;
  onClose: () => void;
}

export const ContentPages: React.FC<ContentPagesProps> = ({ view, onClose }) => {
  const [contactSent, setContactSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  if (!view) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#DDD5C5] text-[#1A1816] shadow-2xl rounded-sm overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E1D4] flex items-center justify-between bg-[#F8F5EE]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C6920]">
            {view === 'story' && 'Maison Heritage • Grasse, France'}
            {view === 'faq' && 'Concierge Policies & Guarantees'}
            {view === 'contact' && 'Bespoke Olfactory Concierge'}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story / About View */}
        {view === 'story' && (
          <div className="p-8 space-y-6 text-xs text-[#666158] leading-relaxed">
            <div className="text-center space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8C6920]">
                Since 2026
              </span>
              <h2 className="text-3xl font-serif text-[#1A1816]">
                The Art of Slow Extraction
              </h2>
              <p className="text-xs italic text-[#666158]">
                "A fragrance must linger in memory long after the wearer has departed the salon."
              </p>
            </div>

            <div className="aspect-[16/7] overflow-hidden rounded-sm border border-[#E7E1D4]">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80"
                alt="Grasse perfumery atelier"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-serif text-[#1A1816]">
                1. Grasse Botanical Terroir
              </h4>
              <p>
                Our laboratory is nestled among the rolling hills of Grasse, the historic epicenter of world perfumery. Here, between the pre-Alps and the Mediterranean, the microclimate nurtures Centifolia roses, jasmine grandiflorum, and bitter orange blossom of unmatched aromatic purity. We partner exclusively with multi-generational family growers who harvest before the sun climbs above the horizon.
              </p>

              <h4 className="text-sm font-serif text-[#1A1816]">
                2. 24–30% Extrait Concentration & 24-Month Maceration
              </h4>
              <p>
                Commercial eau de toilettes dilute essence down to 8% to maximize volume. Aurais composes at Extrait de Parfum strength (24% to 30%), suspending precious raw absolutes in organic, bio-fermented wheat alcohol. Each vintage undergoes a minimum of 24 months of dark cellar maceration, allowing molecular accords to marry into a silk-smooth olfactory fabric.
              </p>

              <h4 className="text-sm font-serif text-[#1A1816]">
                3. The Flacon & Sustainability
              </h4>
              <p>
                Every flacon is blow-molded from heavy, optical-grade crystal with a magnetic brass cap. Engineered to last lifetimes, our flacons are fully refillable. Return your empty bottle to our atelier or order our eco-aluminum refill pouch for 20% off.
              </p>
            </div>
          </div>
        )}

        {/* FAQ & Shipping/Returns View */}
        {view === 'faq' && (
          <div className="p-8 space-y-6 text-xs text-[#666158] leading-relaxed">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-3xl font-serif text-[#1A1816]">
                Concierge, Shipping & Returns
              </h2>
              <p className="text-xs text-[#766F64]">
                Everything you need to know about our risk-free shopping experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8F5EE] border border-[#E7E1D4] p-5 space-y-2">
                <h4 className="text-sm font-mono text-[#8C6920] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C6920]" />
                  How does the "Risk-Free Trial" sample work?
                </h4>
                <p>
                  Every 30ml, 50ml, and 100ml flacon arrives with a complimentary matching 2ml spray vial. When your package arrives, open and spray the 2ml sample first on your wrists. If the fragrance does not exceed your expectations, simply leave the wax-sealed ribbon on the full-size flacon box intact and contact our concierge within 30 days for a prepaid return label and 100% refund.
                </p>
              </div>

              <div className="bg-[#F8F5EE] border border-[#E7E1D4] p-5 space-y-2">
                <h4 className="text-sm font-mono text-[#8C6920] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C6920]" />
                  What is your shipping method and timing?
                </h4>
                <p>
                  All shipments are handled by temperature-controlled FedEx Priority or DHL Express to prevent heat degradation of the natural botanical oils. Orders above $120 enjoy complimentary courier service. US and European orders arrive within 2–4 business days. International destinations arrive within 4–6 business days with all customs and duties prepaid.
                </p>
              </div>

              <div className="bg-[#F8F5EE] border border-[#E7E1D4] p-5 space-y-2">
                <h4 className="text-sm font-mono text-[#8C6920]">
                  How does the Grand Quintet Discovery Set voucher work?
                </h4>
                <p>
                  When you purchase the Grand Quintet Discovery Set ($45), a unique digital voucher code for the full $45 value is generated and emailed to you immediately. You can apply this $45 credit toward any full-size flacon purchase within 12 months.
                </p>
              </div>

              <div className="bg-[#F8F5EE] border border-[#E7E1D4] p-5 space-y-2">
                <h4 className="text-sm font-mono text-[#8C6920]">
                  Are your fragrances hypoallergenic and clean?
                </h4>
                <p>
                  Yes. Aurais formulations are 100% cruelty-free, vegan, and free from synthetic dyes, phthalates, parabens, and BHT. We comply with all rigorous IFRA (International Fragrance Association) standards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact View */}
        {view === 'contact' && (
          <div className="p-8 space-y-6 text-xs text-[#666158]">
            <div className="text-center space-y-2 mb-4">
              <h2 className="text-3xl font-serif text-[#1A1816]">
                Bespoke Concierge
              </h2>
              <p className="text-xs text-[#766F64]">
                Our certified perfumers are available to assist with scent pairings, custom gifting, or private allocations.
              </p>
            </div>

            {contactSent ? (
              <div className="p-8 text-center bg-[#F8F5EE] border border-[#D4AF37]/40 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif text-[#1A1816]">
                  Message Received by the Concierge
                </h4>
                <p className="text-xs text-[#666158]">
                  A dedicated scent curator will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto font-mono">
                <div>
                  <label className="block text-[#666158] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#666158] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#666158] mb-1">Message or Inquiries</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Inquire about custom batch allocations, fragrance notes, wedding gifts..."
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] p-3 text-[#1A1816] placeholder-[#766F64] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Maison Concierge</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
