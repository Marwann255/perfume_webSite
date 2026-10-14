import React, { useState } from 'react';
import {
  X,
  Lock,
  CreditCard,
  Gift,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { ShippingAddress, CompletedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, discount, shipping, tax, total, appliedPromo, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe_card' | 'apple_pay' | 'google_pay' | 'klarna'>('stripe_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Lady Vivienne Laurent',
    email: 'vivienne.laurent@example.com',
    phone: '+1 (555) 349-8201',
    street: '740 Park Avenue',
    apartment: 'Apt 14B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States'
  });

  const [cardDetails, setCardDetails] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '888'
  });

  if (!isOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.street || !address.city) return;
    setStep(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: CompletedOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        items: [...items],
        subtotal,
        discount,
        shipping,
        tax,
        total,
        shippingAddress: address,
        paymentMethod:
          paymentMethod === 'stripe_card'
            ? 'Stripe Visa •••• 4242'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'google_pay'
            ? 'Google Pay'
            : 'Klarna Pay-in-4',
        status: 'Preparing Flacon',
        estimatedDelivery: '3-4 Business Days (Express Courier)'
      };

      setCompletedOrder(order);
      setIsProcessing(false);
      clearCart();
      setStep(3);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#DDD5C5] text-[#1A1816] shadow-2xl overflow-hidden rounded-sm">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E7E1D4] flex items-center justify-between bg-[#F8F5EE]">
          <div className="flex items-center gap-3">
            <span className="text-base font-serif tracking-[0.2em] uppercase text-[#1A1816]">
              A U R A I S
            </span>
            <span className="text-xs font-mono text-[#8C6920]">
              • Haute Concierge Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Tabs */}
        {step !== 3 && (
          <div className="flex border-b border-[#E7E1D4] text-xs font-mono uppercase tracking-wider bg-[#FBF9F4]">
            <div
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                step === 1
                  ? 'border-[#D4AF37] text-[#8C6920] font-semibold'
                  : 'border-transparent text-[#766F64]'
              }`}
            >
              1. Delivery & Gifting
            </div>
            <div
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                step === 2
                  ? 'border-[#D4AF37] text-[#8C6920] font-semibold'
                  : 'border-transparent text-[#766F64]'
              }`}
            >
              2. Secure Payment (Stripe)
            </div>
          </div>
        )}

        {/* Step 1: Delivery Details */}
        {step === 1 && (
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <form onSubmit={handleNextToPayment} className="md:col-span-7 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#1A1816]">
                Delivery Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#666158] mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#666158] mb-1 font-mono">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[#666158] mb-1 font-mono">Street Address</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#666158] mb-1 font-mono">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#666158] mb-1 font-mono">State / Region</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#666158] mb-1 font-mono">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Complimentary Luxury Gifting */}
              <div className="pt-4 border-t border-[#E7E1D4] space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1A1816]">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="accent-[#D4AF37]"
                  />
                  <span className="flex items-center gap-1.5 text-xs font-mono">
                    <Gift className="w-3.5 h-3.5 text-[#8C6920]" />
                    This flacon is an artisan gift (Includes gold-wax seal & calligraphy card)
                  </span>
                </label>

                {isGift && (
                  <textarea
                    rows={2}
                    placeholder="Enter your personal gift message to be written with fountain pen on vellum paper..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] text-xs p-3 text-[#1A1816] placeholder-[#766F64] focus:outline-none focus:border-[#D4AF37]"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Sidebar Summary */}
            <div className="md:col-span-5 bg-[#FFFFFF] p-5 border border-[#E7E1D4] space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#1A1816]">
                Order Allocation ({items.length} Flacons)
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={`${i.product.id}-${i.selectedVariant.size}`} className="flex justify-between text-xs">
                    <div>
                      <span className="font-serif text-[#1A1816] block">{i.product.name}</span>
                      <span className="text-[10px] font-mono text-[#766F64]">
                        {i.selectedVariant.size} × {i.quantity}
                      </span>
                    </div>
                    <span className="font-mono text-[#8C6920]">
                      ${i.selectedVariant.price * i.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0EBE0] pt-3 space-y-1.5 text-xs font-mono text-[#666158]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Code ({appliedPromo})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate Courier</span>
                  <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-serif text-[#1A1816] border-t border-[#E7E1D4] pt-2">
                  <span>Total Amount</span>
                  <span className="text-[#8C6920] font-mono font-medium">${total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Gateway Selection */}
        {step === 2 && (
          <div className="p-6 sm:p-8 max-w-xl mx-auto space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#1A1816] text-center">
              Select Payment Instrument
            </h3>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe_card')}
                className={`p-3 text-center border transition-all ${
                  paymentMethod === 'stripe_card'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                    : 'border-[#E7E1D4] bg-[#FBF9F4] text-[#766F64]'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] font-mono block">Stripe Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 text-center border transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                    : 'border-[#E7E1D4] bg-[#FBF9F4] text-[#766F64]'
                }`}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] font-mono block">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('klarna')}
                className={`p-3 text-center border transition-all ${
                  paymentMethod === 'klarna'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8C6920]'
                    : 'border-[#E7E1D4] bg-[#FBF9F4] text-[#766F64]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] font-mono block">Klarna (4x)</span>
              </button>
            </div>

            {/* Stripe Card Fields */}
            {paymentMethod === 'stripe_card' && (
              <div className="bg-[#FFFFFF] border border-[#E7E1D4] p-5 space-y-4 rounded-sm">
                <div className="flex items-center justify-between text-xs font-mono text-[#766F64]">
                  <span>Stripe Secure Elements</span>
                  <span className="flex items-center gap-1 text-[#8C6920]">
                    <Lock className="w-3 h-3" /> PCI-DSS Level 1
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <label className="block text-[#666158] font-mono">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#666158] font-mono">Expiry</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#666158] font-mono">CVC</label>
                    <input
                      type="text"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="w-full bg-[#F8F5EE] border border-[#DDD5C5] px-3 py-2 text-[#1A1816] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div className="text-center p-6 bg-[#FFFFFF] border border-[#E7E1D4] space-y-2">
                <p className="text-xs text-[#666158]">
                  Double-click your Apple side button to authorize payment of ${total.toFixed(2)} USD via Touch/Face ID.
                </p>
              </div>
            )}

            {paymentMethod === 'klarna' && (
              <div className="p-4 bg-[#FFFFFF] border border-[#E7E1D4] text-xs space-y-2">
                <p className="text-[#8C6920]">
                  Pay in 4 interest-free installments of ${(total / 4).toFixed(2)} USD every two weeks.
                </p>
                <span className="text-[10px] text-[#766F64] block">
                  No fees when paid on time. Credit check via Klarna.
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3.5 border border-[#E7E1D4] text-[#666158] hover:text-[#1A1816] font-mono text-xs uppercase"
              >
                Back
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing Allocation...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize ${total.toFixed(2)} USD</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Completed Confirmation Receipt */}
        {step === 3 && completedOrder && (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C6920]">
                Allocation Confirmed
              </span>
              <h2 className="text-3xl font-serif text-[#1A1816]">
                Thank You, {completedOrder.shippingAddress.fullName.split(' ')[0]}
              </h2>
              <p className="text-xs text-[#666158]">
                Your bespoke creation has been entered into the Grasse laboratory log under reference:
              </p>
              <div className="inline-block px-4 py-1.5 bg-[#F8F5EE] border border-[#D4AF37]/40 font-mono text-sm text-[#8C6920]">
                {completedOrder.id}
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E1D4] p-5 text-left text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-[#F0EBE0] pb-2 text-[#766F64]">
                <span>Status:</span>
                <span className="text-emerald-400">{completedOrder.status}</span>
              </div>
              <div className="flex justify-between border-b border-[#F0EBE0] pb-2 text-[#766F64]">
                <span>Delivery:</span>
                <span className="text-[#1A1816]">{completedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between border-b border-[#F0EBE0] pb-2 text-[#766F64]">
                <span>Destination:</span>
                <span className="text-[#1A1816]">
                  {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}
                </span>
              </div>
              <div className="flex justify-between text-[#766F64] pt-1">
                <span>Total Settled:</span>
                <span className="text-[#8C6920] text-sm">${completedOrder.total.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="p-4 bg-[#FBF9F4] border border-[#D4AF37]/30 text-xs text-[#666158] text-left flex items-start gap-3">
              <PackageCheck className="w-5 h-5 text-[#8C6920] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#8C6920] block font-mono">
                  Reminder: The Risk-Free Ritual
                </span>
                <p className="mt-0.5">
                  Remember to first test the matching 2ml trial vial included in your package before opening the sealed luxury flacon.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold"
            >
              Return to Maison Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
