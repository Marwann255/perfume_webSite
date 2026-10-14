import React, { useState } from 'react';
import { Star, Heart, Sparkles, Check, Eye } from 'lucide-react';
import type { PerfumeProduct } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: PerfumeProduct;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(product.defaultVariantIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#FBF9F4] border border-[#E7E1D4] rounded-sm overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#D4AF37]/5"
    >
      {/* Top Badges & Wishlist Action */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        {/* <div className="flex flex-col gap-1 items-start">
          {product.isBestseller && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#D4AF37] text-[#1A1816] font-semibold rounded-none shadow">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#8C6920]/20 border border-[#D4AF37]/40 text-[#8C6920] backdrop-blur-md rounded-none">
              New Harvest
            </span>
          )}
          {product.isDiscoverySet && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md rounded-none">
              100% Credit Voucher
            </span>
          )}
        </div> */}

        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          className="pointer-events-auto p-2 rounded-full bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] border border-[#DDD5C5] text-[#1A1816] hover:text-[#8C6920] transition-all backdrop-blur-md"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-[#D4AF37] text-[#8C6920]' : 'text-[#666158]'
            }`}
          />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFFFFF]">
        <img
          src={isHovered ? product.images.ambient : product.images.hero}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-[#FFFFFF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.id);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#FBF9F4]/90 border border-[#D4AF37]/60 text-xs font-mono uppercase tracking-widest text-[#8C6920] hover:bg-[#D4AF37] hover:text-[#1A1816] transition-all shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Discover Notes</span>
          </button>
        </div>
      </div>

      {/* Information Container */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Olfactory Family & Concentration Tag */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#666158] mb-1.5">
            <span className="text-[#8C6920] uppercase">{product.olfactoryFamily}</span>
            <span>{product.concentration.split(' ')[0]}</span>
          </div>

          {/* Fragrance Name & Subtitle */}
          <h3 className="text-lg font-serif tracking-wide text-[#1A1816] group-hover:text-[#8C6920] transition-colors">
            {product.name}
          </h3>

          {/* <p className="text-xs text-[#766F64] line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p> */}

          {/* Key Olfactory Accords Preview */}
          {/* <div className="flex flex-wrap gap-1.5 mt-3">
            {product.accords.slice(0, 3).map((accord) => (
              <span
                key={accord}
                className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#F0EBE0] border border-[#DDD5C5] text-[#666158]"
              >
                {accord}
              </span>
            ))}
          </div> */}

          {/* Review Score & Star Rating */}
          {/* <div className="flex items-center gap-2 mt-3.5 text-xs">
            <div className="flex items-center text-[#8C6920]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="ml-1 font-mono font-medium text-[#1A1816] text-xs">
                {product.rating.toFixed(2)}
              </span>
            </div>
            <span className="text-[#766F64] text-[11px]">
              ({product.reviewCount} reviews)
            </span>
          </div> */}
        </div>

        {/* Bottom Buying Controls */}
        <div className="mt-5 pt-4 border-t border-[#E7E1D4]/80">
          {/* Size Variant Selector */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
            {product.variants.map((v, idx) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSelectedVariantIdx(idx)}
                className={`text-[10px] font-mono px-2 py-1 rounded-none border transition-all whitespace-nowrap ${
                  selectedVariantIdx === idx
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                    : 'border-[#E7E1D4] text-[#766F64] hover:border-[#666158]/40 hover:text-[#666158]'
                }`}
              >
                {v.volumeMl}ml
              </button>
            ))}
          </div>

          {/* Price & Add to Bag CTA */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                {/* <span className="text-base font-serif font-medium text-[#1A1816]">
                  ${selectedVariant.price}
                </span> */}
                {selectedVariant.originalPrice && (
                  <span className="text-base font-serif font-medium text-[#1A1816]">
                    ${selectedVariant.originalPrice}
                  </span>
                )}
              </div>
              {/* <span className="text-[10px] text-[#666158] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#8C6920]" />
                {selectedVariant.volumeMl >= 30 ? '+2ml sample included' : 'Discovery format'}
              </span> */}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white border border-emerald-500'
                  : 'bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-medium'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
