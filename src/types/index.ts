export type OlfactoryFamily =
  | 'Woody & Amber'
  | 'Floral & Powdery'
  | 'Oriental & Gourmand'
  | 'Fresh & Citrus'
  | 'Smoky & Incense';

export type FragranceConcentration =
  | 'Extrait de Parfum (30%)'
  | 'Eau de Parfum (20%)'
  | 'Parfum Cologne (15%)';

export interface OlfactoryNote {
  name: string;
  category: 'citrus' | 'floral' | 'woody' | 'spicy' | 'amber' | 'musk' | 'gourmand' | 'earthy';
  description?: string;
}

export interface OlfactoryPyramid {
  top: OlfactoryNote[];
  heart: OlfactoryNote[];
  base: OlfactoryNote[];
}

export interface BottleVariant {
  size: '2ml Sample' | '30ml Travel Flacon' | '50ml Signature' | '100ml Grand Flacon';
  volumeMl: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface PerfumeReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  longevityVote: 'Moderate (4-6h)' | 'Long Lasting (8-12h)' | 'Eternal (14h+)';
  sillageVote: 'Intimate' | 'Moderate' | 'Enormous';
}

export interface PerfumeProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  story: string;
  inspiration: string;
  perfumer: string;
  olfactoryFamily: OlfactoryFamily;
  concentration: FragranceConcentration;
  pyramid: OlfactoryPyramid;
  longevityScore: number; // 1 - 5
  sillageScore: number;   // 1 - 5
  season: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[];
  gender: 'Unisex' | 'Feminine' | 'Masculine';
  mood: string[];
  accords: string[];
  variants: BottleVariant[];
  defaultVariantIndex: number;
  images: {
    hero: string;
    ambient: string;
    detail: string;
  };
  rating: number;
  reviewCount: number;
  reviews: PerfumeReview[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isDiscoverySet?: boolean;
  stockCount: number;
  layeringTip?: string;
  applicationRitual?: string;
}

export interface CartItem {
  product: PerfumeProduct;
  selectedVariant: BottleVariant;
  quantity: number;
  includeComplimentarySample: boolean;
  engravingText?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutDetails {
  customer: ShippingAddress;
  isGift: boolean;
  giftNote?: string;
  paymentMethod: 'stripe_card' | 'apple_pay' | 'google_pay' | 'klarna';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  promoCodeApplied?: string;
}

export interface CompletedOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'Processing' | 'Preparing Flacon' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
}

export interface FilterOptions {
  searchQuery: string;
  family: OlfactoryFamily | 'All';
  selectedNotes: string[];
  maxPrice: number;
  minRating: number;
  concentration: string | 'All';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';
}
