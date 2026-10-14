import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Sparkles,
  Heart,
  ShieldCheck,
  Clock,
  Wind,
  Layers,
  Check,
  Lock
} from 'lucide-react';
import type { PerfumeProduct, BottleVariant } from '../types';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

interface ProductDetailProps {
  product: PerfumeProduct;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const { setSelectedProductId, products } = useProducts();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(product.defaultVariantIndex);
  const [selectedImage, setSelectedImage] = useState<'hero' | 'ambient' | 'detail'>('hero');
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState('');
  const [isEngravingOpen, setIsEngravingOpen] = useState(false);
  const [activePyramidTier, setActivePyramidTier] = useState<'all' | 'top' | 'heart' | 'base'>('all');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedVariant: BottleVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, engraving || undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // Find complementary cross-sell perfumes
  const relatedPerfumes = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#24212D]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A39E93] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Olfactory Collection</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono text-[#6E6961]">
          <span>{product.olfactoryFamily}</span>
          <span>•</span>
          <span className="text-[#D4AF37]">{product.concentration}</span>
        </div>
      </div>

      {/* Main Two-Column Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Visual Media Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/5] bg-[#0C0B0E] border border-[#24212D] overflow-hidden rounded-sm shadow-2xl">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-700"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isBestseller && (
                <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest bg-[#D4AF37] text-[#0C0B0E] font-semibold">
                  Maison Bestseller
                </span>
              )}
              <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest bg-[#18161E]/90 border border-[#2A2733] text-[#EEDB92] backdrop-blur-md">
                Grasse Formula • {product.concentration.split(' ')[0]}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0C0B0E]/80 border border-[#2A2733] text-[#F4F1EA] hover:text-[#D4AF37] transition-all"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  inWishlist ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#A39E93]'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Gallery Switcher */}
          <div className="grid grid-cols-3 gap-3">
            {(['hero', 'ambient', 'detail'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedImage(view)}
                className={`aspect-square border overflow-hidden rounded-sm bg-[#0C0B0E] transition-all ${
                  selectedImage === view
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'border-[#24212D] opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={product.images[view]}
                  alt={`${product.name} view ${view}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Scent Performance Radar / Badges */}
          <div className="bg-[#141219] border border-[#24212D] p-5 rounded-sm space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F4F1EA] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Olfactory Performance Profile
            </h4>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3 bg-[#0C0B0E] p-3 border border-[#1E1C25]">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6E6961] block">
                    Longevity
                  </span>
                  <span className="font-medium text-[#F4F1EA]">
                    {product.longevityScore >= 4.8
                      ? 'Eternal (14h+)'
                      : product.longevityScore >= 4.2
                      ? 'Long Lasting (8-12h)'
                      : 'Moderate (6-8h)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#0C0B0E] p-3 border border-[#1E1C25]">
                <Wind className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6E6961] block">
                    Sillage & Trail
                  </span>
                  <span className="font-medium text-[#F4F1EA]">
                    {product.sillageScore >= 4.5
                      ? 'Enormous Magnetic'
                      : 'Moderate & Elegant'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1E1C25]">
              <span className="text-[#6E6961] font-mono">Recommended Seasons:</span>
              <span className="text-[#EEDB92] font-mono">
                {product.season.join(' • ')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Narrative, Olfactory Pyramid, Buying CTA */}
        <div className="lg:col-span-6 space-y-8">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
              <span>{product.subtitle}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#EEDB92]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                {product.rating.toFixed(2)} ({product.reviewCount} Reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-[#F4F1EA] tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm font-serif italic text-[#A39E93]">
              "{product.tagline}"
            </p>

            <p className="text-xs font-mono text-[#6E6961]">
              Composed by {product.perfumer}
            </p>
          </div>

          {/* Bottle Size Variant Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="uppercase text-[#A39E93] tracking-wider">
                Select Flacon Volume
              </span>
              <span className="text-[#D4AF37]">
                ${selectedVariant.price} USD
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`p-3 text-left border transition-all ${
                    selectedVariantIdx === idx
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                      : 'border-[#24212D] bg-[#141219] hover:border-[#A39E93]/40'
                  }`}
                >
                  <span className="block text-xs font-medium text-[#F4F1EA]">
                    {v.size.split(' ')[0]} {v.size.split(' ')[1]}
                  </span>
                  <span className="block text-[11px] font-mono text-[#D4AF37] mt-1">
                    ${v.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Complimentary Sample Reassurance Box */}
          <div className="bg-[#141219] border border-[#D4AF37]/30 p-4 rounded-sm flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-mono uppercase tracking-wider text-[#EEDB92] font-semibold block">
                The Aurais Risk-Free Guarantee
              </span>
              <p className="text-[#A39E93] leading-relaxed">
                Your order includes a complimentary matching 2ml sample vial. Test the fragrance on your skin first. If it does not resonate with you, simply return the unopened full-size flacon in its original gold seal for a 100% refund.
              </p>
            </div>
          </div>

          {/* Bespoke Monogram Engraving Toggle */}
          <div className="border border-[#24212D] bg-[#141219] p-4 rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F4F1EA] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Complimentary Flacon Engraving
              </span>
              <button
                type="button"
                onClick={() => setIsEngravingOpen(!isEngravingOpen)}
                className="text-xs font-mono text-[#D4AF37] hover:underline"
              >
                {isEngravingOpen ? 'Cancel' : '+ Add Monogram'}
              </button>
            </div>

            {isEngravingOpen && (
              <div className="space-y-2 pt-2 border-t border-[#1E1C25] animate-in fade-in">
                <input
                  type="text"
                  maxLength={15}
                  placeholder="e.g. M.S. or PARIS 2026 (Max 15 characters)"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full bg-[#0C0B0E] border border-[#2A2733] text-xs px-3 py-2 text-[#F4F1EA] placeholder-[#6E6961] focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-[#6E6961] block">
                  Laser diamond-etched onto the flacon shoulder in Grasse.
                </span>
              </div>
            )}
          </div>

          {/* Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#2A2733] bg-[#141219]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-sm text-[#A39E93] hover:text-[#D4AF37]"
                >
                  -
                </button>
                <span className="px-4 py-3 text-xs font-mono text-[#F4F1EA]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-3 text-sm text-[#A39E93] hover:text-[#D4AF37]"
                >
                  +
                </button>
              </div>

              {/* Main CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#EEDB92] text-[#0C0B0E] shadow-xl'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Your Flacon Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Acquire Flacon — ${selectedVariant.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-[#6E6961] pt-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                Stripe 256-bit Encrypted
              </span>
              <span>•</span>
              <span>Express Climate Courier</span>
              <span>•</span>
              <span>Seal Intact Returns</span>
            </div>
          </div>

          {/* Interactive Olfactory Note Pyramid */}
          <div className="border border-[#24212D] bg-[#141219] p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#24212D] pb-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#F4F1EA] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                The Olfactory Note Pyramid
              </h3>
              <div className="flex gap-1 text-[10px] font-mono">
                {(['all', 'top', 'heart', 'base'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setActivePyramidTier(tier)}
                    className={`px-2 py-0.5 uppercase border ${
                      activePyramidTier === tier
                        ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#EEDB92]'
                        : 'border-[#24212D] text-[#6E6961]'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Pyramid Stages */}
            <div className="space-y-4">
              {/* Top Notes */}
              {(activePyramidTier === 'all' || activePyramidTier === 'top') && (
                <div className="p-3.5 bg-[#0C0B0E] border-l-2 border-[#EEDB92] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#EEDB92] uppercase font-semibold">
                      Top Notes • The Opening (0 – 15 Minutes)
                    </span>
                    <span className="text-[#6E6961] text-[10px]">Instant radiance</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.pyramid.top.map((note) => (
                      <div
                        key={note.name}
                        className="px-2.5 py-1 bg-[#18161E] border border-[#2A2733] text-xs text-[#F4F1EA]"
                        title={note.description}
                      >
                        <span className="font-medium">{note.name}</span>
                        {note.description && (
                          <span className="text-[10px] text-[#A39E93] block">
                            {note.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Heart Notes */}
              {(activePyramidTier === 'all' || activePyramidTier === 'heart') && (
                <div className="p-3.5 bg-[#0C0B0E] border-l-2 border-[#D4AF37] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D4AF37] uppercase font-semibold">
                      Heart Notes • The Bloom (15 Min – 3 Hours)
                    </span>
                    <span className="text-[#6E6961] text-[10px]">The core soul</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.pyramid.heart.map((note) => (
                      <div
                        key={note.name}
                        className="px-2.5 py-1 bg-[#18161E] border border-[#2A2733] text-xs text-[#F4F1EA]"
                        title={note.description}
                      >
                        <span className="font-medium">{note.name}</span>
                        {note.description && (
                          <span className="text-[10px] text-[#A39E93] block">
                            {note.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Base Notes */}
              {(activePyramidTier === 'all' || activePyramidTier === 'base') && (
                <div className="p-3.5 bg-[#0C0B0E] border-l-2 border-[#9E8546] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9E8546] uppercase font-semibold">
                      Base Notes • The Drydown (3 Hours – 24+ Hours)
                    </span>
                    <span className="text-[#6E6961] text-[10px]">Enduring trail</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.pyramid.base.map((note) => (
                      <div
                        key={note.name}
                        className="px-2.5 py-1 bg-[#18161E] border border-[#2A2733] text-xs text-[#F4F1EA]"
                        title={note.description}
                      >
                        <span className="font-medium">{note.name}</span>
                        {note.description && (
                          <span className="text-[10px] text-[#A39E93] block">
                            {note.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scent Story & Inspiration */}
          <div className="space-y-4 text-xs text-[#A39E93] leading-relaxed">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F4F1EA]">
              The Story of Creation
            </h4>
            <p>{product.story}</p>
            <div className="p-3.5 bg-[#0C0B0E] border border-[#1E1C25] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] block">
                The Master Perfumer's Layering Advice
              </span>
              <p className="text-[#F4F1EA]">{product.layeringTip}</p>
            </div>
            {product.applicationRitual && (
              <div className="p-3.5 bg-[#0C0B0E] border border-[#1E1C25] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#A39E93] block">
                  Application Ritual
                </span>
                <p className="text-[#6E6961]">{product.applicationRitual}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-20 pt-12 border-t border-[#24212D] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-serif text-[#F4F1EA]">
              Fragrance Connoisseur Reviews
            </h3>
            <p className="text-xs font-mono text-[#A39E93] mt-1">
              Overall score {product.rating.toFixed(2)} / 5.00 based on {product.reviewCount} verified collector experiences
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <span className="text-xs font-mono text-[#EEDB92] font-semibold">
              100% Authentic Purchases
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#141219] border border-[#24212D] p-6 rounded-sm space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#F4F1EA]">{rev.author}</span>
                <span className="text-[#6E6961] font-mono text-[11px]">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                  ))}
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-800">
                    Verified Buyer
                  </span>
                )}
              </div>

              <h5 className="text-xs font-semibold text-[#F4F1EA]">{rev.title}</h5>
              <p className="text-xs text-[#A39E93] leading-relaxed">{rev.comment}</p>

              <div className="pt-2 border-t border-[#1E1C25] flex items-center justify-between text-[10px] font-mono text-[#6E6961]">
                <span>Longevity: {rev.longevityVote}</span>
                <span>Sillage: {rev.sillageVote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Sell Recommendations */}
      <div className="mt-20 pt-12 border-t border-[#24212D] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
            Harmonious Pairings
          </span>
          <h3 className="text-2xl font-serif text-[#F4F1EA]">
            Complete Your Scent Wardrobe
          </h3>
          <p className="text-xs text-[#6E6961]">
            Explore fragrances that contrast or amplify the accords of {product.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedPerfumes.map((rel) => (
            <div
              key={rel.id}
              onClick={() => setSelectedProductId(rel.id)}
              className="bg-[#141219] border border-[#24212D] p-4 cursor-pointer hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/5] overflow-hidden mb-3">
                <img
                  src={rel.images.hero}
                  alt={rel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">
                  {rel.olfactoryFamily}
                </span>
                <h4 className="text-sm font-serif text-[#F4F1EA]">{rel.name}</h4>
                <p className="text-[11px] font-mono text-[#A39E93]">
                  From ${rel.variants[0].price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
