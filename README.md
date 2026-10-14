# AURAIS Haute Parfumerie — E-Commerce Platform

A creative, high-converting luxury e-commerce web application engineered for artisanal niche perfumery.

Built with **React 19, TypeScript, Vite 8, Tailwind CSS v4, and Lucide Icons**, with serverless Firebase and Stripe Checkout architecture.

---

## 🌟 Key Features & Conversion Innovations

1. **Risk-Free Scent Discovery Ritual**:
   - Every 30ml+ flacon order includes a complimentary matching 2ml trial vial.
   - Customers test on skin before breaking the gold wax seal on the main flacon box.
   - 30-day 100% money-back guarantee with prepaid returns for unbroken seals.

2. **Interactive Olfactory Note Pyramid**:
   - Visual 3-tier pyramid breakdown:
     - **Top Notes**: The Opening (0–15 min)
     - **Heart Notes**: The Bloom (15 min–3 hr)
     - **Base Notes**: The Drydown (3–24+ hr)
   - Interactive hover cards highlighting botanical origin and extraction method.

3. **Faceted Olfactory Catalog Filtering**:
   - Filter by Olfactory Family (*Woody & Amber*, *Floral & Powdery*, *Oriental & Gourmand*, *Fresh & Citrus*, *Smoky & Incense*).
   - Filter by raw material notes (*Oud, Vanilla, Bergamot, Orris, Rose, Vetiver, Sandalwood*).
   - Real-time price ceiling slider ($45 – $350) and rating filters.
   - Dynamic sorting (*Featured, Rating, Price: Low to High, Price: High to Low, Name*).

4. **Scent Finder Interactive Quiz**:
   - 3-step algorithmic fragrance quiz matching mood, olfactory notes, and preferred sillage to the ideal signature scent with 98% resonance score.

5. **Slide-Out Luxury Cart Drawer & Upsells**:
   - Free climate courier progress meter (threshold $120).
   - Dynamic cross-sell widget (*The Grand Quintet Discovery Set* 5×2ml with 100% voucher credit).
   - Concierge promo code engine (`AURAIS15`, `WELCOME10`, `FREESHIP`).
   - Bottle engraving preview and complimentary gift wrap selection.

6. **Two-Step Express Checkout (Stripe & Wallets)**:
   - Step 1: Destination address and calligraphy gift message.
   - Step 2: Payment instrument selector (Stripe Card with PCI-DSS compliance, Apple Pay, Google Pay, Klarna 4x).
   - Instant order confirmation receipt with unique Order ID and delivery tracking simulator.

7. **Maison Inventory Atelier (Admin Panel)**:
   - Live inventory dashboard with low-stock alerts and total valuation.
   - Add new fragrance formulations (pyramid notes, family, price, stock, imagery).
   - Edit and delete existing flacons with persistent localStorage sync.
   - One-click restore to factory catalog.

8. **Accessible & High-Performance Design**:
   - WCAG 2.1 AA compliant color contrast (Gold on Obsidian, high-contrast typography).
   - Sub-second hot module replacement and production builds (< 500ms).
   - JSON-LD structured data for Google Rich Results (`schema.org/Product` and `schema.org/Store`).

---

## 🚀 Getting Started

### Development Mode
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
src/
├── assets/             # Static brand assets and imagery
├── components/
│   ├── AdminPanel.tsx      # Inventory management & CRUD console
│   ├── CartDrawer.tsx      # Slide-out bag with progress bar & upsells
│   ├── CheckoutModal.tsx   # Two-step Stripe & express checkout flow
│   ├── ContentPages.tsx    # Maison Story, FAQ, Guarantee, Concierge Contact
│   ├── Footer.tsx          # Value pillars, newsletter, payment badges
│   ├── Header.tsx          # Navigation, search, announcement bar, bag trigger
│   ├── ProductCard.tsx     # High-converting product card with hover gallery
│   ├── ProductDetail.tsx   # Full PDP with interactive Olfactory Pyramid & reviews
│   ├── ProductList.tsx     # Faceted filtering catalog and responsive grid
│   └── ScentQuizModal.tsx  # 3-question fragrance matching quiz
├── context/
│   ├── CartContext.tsx     # Bag state, promo discounts, wishlist, storage sync
│   └── ProductContext.tsx  # Catalog state, faceted filters, admin CRUD
├── data/
│   └── perfumes.ts         # Curated luxury fragrances with pyramids & reviews
├── types/
│   └── index.ts            # Complete TypeScript domain data models
├── App.tsx                 # Root application composition & SEO schema
├── index.css               # Tailwind CSS theme tokens & luxury styling
└── main.tsx                # React DOM entry point
```
