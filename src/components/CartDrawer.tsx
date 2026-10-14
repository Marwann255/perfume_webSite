import React, { useState } from 'react';
import {
  X,
  Trash2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    addToCart
  } = useCart();

  const { products } = useProducts();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  const discoverySet = products.find((p) => p.isDiscoverySet);
  const hasDiscoveryInCart = items.some((i) => i.product.isDiscoverySet);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#FFFFFF]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F4] border-l border-[#E7E1D4] text-[#1A1816] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E1D4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C6920]" />
              <h2 className="text-base font-serif tracking-widest uppercase">
                Your Flacon Bag
              </h2>
              <span className="text-xs font-mono text-[#766F64]">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F8F5EE] px-6 py-3 border-b border-[#E7E1D4]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#666158] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8C6920]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-400 font-semibold">
                    Complimentary Courier Unlocked
                  </span>
                ) : (
                  <span>
                    Add ${(freeShippingThreshold - subtotal).toFixed(0)} more for Complimentary Courier
                  </span>
                )}
              </span>
              <span className="text-[#8C6920] font-semibold">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full bg-[#FFFFFF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#9E8546] to-[#D4AF37] h-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F5EE] border border-[#DDD5C5] flex items-center justify-center text-[#766F64]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif text-[#666158]">
                  Your flacon bag is currently empty.
                </p>
                <p className="text-xs text-[#766F64] max-w-xs mx-auto">
                  Explore our Grasse creations and sample before unsealing.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#D4AF37] text-[#1A1816] font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.size}`}
                  className="flex gap-4 pb-6 border-b border-[#E7E1D4]/80"
                >
                  <img
                    src={item.product.images.hero}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-sm border border-[#E7E1D4] bg-[#FFFFFF] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-serif text-[#1A1816]">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#8C6920] block">
                            {item.selectedVariant.size}
                          </span>
                        </div>
                        <span className="text-sm font-mono text-[#1A1816]">
                          ${item.selectedVariant.price * item.quantity}
                        </span>
                      </div>

                      {item.engravingText && (
                        <span className="text-[10px] font-mono text-[#666158] bg-[#F8F5EE] px-2 py-0.5 mt-1 inline-block border border-[#DDD5C5]">
                          Engraved: "{item.engravingText}"
                        </span>
                      )}

                      {item.includeComplimentarySample && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-1">
                          <Check className="w-3 h-3" />
                          <span>Includes matching 2ml trial vial ($0)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#DDD5C5] bg-[#FFFFFF]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant.size,
                              -1
                            )
                          }
                          className="px-2.5 py-1 text-xs text-[#666158] hover:text-[#8C6920]"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-mono text-[#1A1816]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant.size,
                              1
                            )
                          }
                          className="px-2.5 py-1 text-xs text-[#666158] hover:text-[#8C6920]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedVariant.size)
                        }
                        className="text-[#766F64] hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Cross-Sell Upsell Box (Discovery Set) */}
            {items.length > 0 && !hasDiscoveryInCart && discoverySet && (
              <div className="bg-[#F8F5EE] border border-[#D4AF37]/30 p-4 rounded-sm flex items-center gap-4">
                <img
                  src={discoverySet.images.hero}
                  alt={discoverySet.name}
                  className="w-14 h-16 object-cover border border-[#DDD5C5]"
                />
                <div className="flex-1 text-xs">
                  <span className="font-mono text-[#8C6920] text-[10px] uppercase block">
                    Concierge Recommendation
                  </span>
                  <h5 className="font-serif text-[#1A1816] text-xs">
                    The Grand Quintet Discovery Flight
                  </h5>
                  <p className="text-[10px] text-[#666158]">
                    5 × 2ml with 100% voucher credit ($45)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToCart(discoverySet, discoverySet.variants[0])
                  }
                  className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-[10px] uppercase font-bold shrink-0"
                >
                  + Add $45
                </button>
              </div>
            )}
          </div>

          {/* Footer Financial Totals & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E1D4] bg-[#FFFFFF] space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#F8F5EE] border border-emerald-500/40 px-3 py-2 text-xs">
                    <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      {appliedPromo} active
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-[#666158] hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Concierge Code (e.g. AURAIS15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FBF9F4] border border-[#DDD5C5] text-xs px-3 py-2 text-[#1A1816] placeholder-[#766F64] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#E7E1D4] hover:bg-[#D4AF37] hover:text-[#1A1816] text-xs font-mono uppercase tracking-wider text-[#1A1816] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <span
                    className={`text-[10px] font-mono mt-1 block ${
                      promoMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {promoMessage.text}
                  </span>
                )}
              </div>

              {/* Subtotal, Shipping, Tax Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-[#666158] border-t border-[#F0EBE0] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1A1816]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Privilege Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate Courier Express</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">Complimentary</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif text-[#1A1816] border-t border-[#E7E1D4] pt-2 mt-2">
                  <span>Estimated Total</span>
                  <span className="text-[#8C6920] font-mono font-medium">
                    ${total.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#766F64]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C6920]" />
                <span>Risk-Free Sample Guarantee • 256-bit Stripe Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
