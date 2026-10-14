# Architecture & Technical Guide — AURAIS Haute Parfumerie

Comprehensive technical documentation, architectural patterns, state management flows, and component hierarchies for the **AURAIS Haute Parfumerie** web application.

---

## 1. System Overview

**AURAIS Haute Parfumerie** is a luxury artisanal fragrance e-commerce web application engineered with **React 19**, **TypeScript**, **Vite 8**, and **Tailwind CSS v4**. It features an immersive dark-luxury aesthetic (Obsidian and Polished Gold), sensory discovery rituals (olfactory pyramid visualization, scent finder quiz), and full-lifecycle client-side state persistence.

### Key Objectives
- **Zero-Latency Client Experience**: Instant client-side filtering, faceted search, and cart manipulation without network roundtrips.
- **Persistent State**: Full catalogue modifications, cart reservations, and wishlist items survive browser restarts via structured `localStorage` persistence.
- **Conversion-Oriented Luxury UX**: Free shipping progress bar, discovery trial vial incentives, custom flacon engraving, and multi-tier checkout simulation.

---

## 2. Technology Stack & Tooling

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Framework** | [React 19](https://react.dev/) | Core UI rendering engine utilizing latest React concurrency and hooks |
| **Type Safety** | [TypeScript 5/6](https://www.typescriptlang.org/) | Strict schema definitions across products, cart, checkout, and filters |
| **Bundler & Dev Server** | [Vite 8](https://vitejs.dev/) | High-speed ESM-based development server and production bundler |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS engine with bespoke luxury palette |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, scalable feather-style iconography |
| **Linter** | [Oxlint](https://oxc.rs/) | Rust-based high-performance JavaScript/TypeScript linter |

---

## 3. Directory Structure

```text
perfume-shop2/
├── .github/                  # CI/CD and deployment workflows
├── public/                   # Static assets, favicons, robots.txt
├── src/
│   ├── assets/               # Local images and SVG resources
│   ├── components/           # Reusable UI views and functional modals
│   │   ├── AdminPanel.tsx    # Atelier inventory management (CRUD)
│   │   ├── CartDrawer.tsx    # Slide-over cart drawer with upsells
│   │   ├── CheckoutModal.tsx # Multi-step checkout & order tracking
│   │   ├── ContentPages.tsx  # Brand heritage, FAQ, and concierge views
│   │   ├── Footer.tsx        # Storefooter, policies, and newsletter
│   │   ├── Header.tsx        # Navigation bar, mobile menu, search trigger
│   │   ├── ProductCard.tsx   # Interactive catalog card with variant select
│   │   ├── ProductDetail.tsx # Flacon deep dive, pyramid notes & reviews
│   │   ├── ProductList.tsx   # Filter sidebar, search bar & product grid
│   │   └── ScentQuizModal.tsx# 3-step olfactory recommendation quiz
│   ├── context/              # Global state providers and hooks
│   │   ├── CartContext.tsx   # Cart items, promo codes, shipping & wishlist
│   │   └── ProductContext.tsx# Catalog state, CRUD, faceted filtering & sorting
│   ├── data/                 # Master dataset
│   │   └── perfumes.ts       # Initial artisanal fragrance inventory
│   ├── types/                # Domain models & TypeScript interfaces
│   │   └── index.ts          # Core type definitions
│   ├── App.tsx               # Root application view coordinator
│   ├── App.css               # Component-level styles and animations
│   ├── index.css             # Tailwind imports & custom scrollbar/utilities
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point with typography fonts
├── package.json              # Dependencies and npm script definitions
├── tsconfig.json             # Root TypeScript project references
└── vite.config.ts            # Vite & Tailwind CSS compilation configuration
```

---

## 4. Architectural Data Flow & Component Hierarchy

The application adopts a unidirectional data-flow model where contextual providers wrap the application tree, keeping state centralized while views remain decoupled and declarative.

```mermaid
flowchart TD
    subgraph State Providers
        PP[ProductProvider]
        CP[CartProvider]
    end

    subgraph App Coordinator [App.tsx]
        HDR[Header]
        FTR[Footer]
        ROUTER{selectedProduct?}
    end

    subgraph Views
        PL[ProductList]
        PD[ProductDetail]
    end

    subgraph Overlays & Modals
        CD[CartDrawer]
        CM[CheckoutModal]
        SQ[ScentQuizModal]
        AP[AdminPanel]
        CPG[ContentPages]
    end

    PP --> App Coordinator
    CP --> App Coordinator
    App Coordinator --> HDR
    App Coordinator --> ROUTER
    App Coordinator --> FTR

    ROUTER -- null --> PL
    ROUTER -- selected --> PD

    App Coordinator -.-> CD
    App Coordinator -.-> CM
    App Coordinator -.-> SQ
    App Coordinator -.-> AP
    App Coordinator -.-> CPG
```

---

## 5. State Management System

State is separated into two primary domain contexts located under `src/context/`:

### 5.1. `ProductContext` (`ProductContext.tsx`)
Responsible for catalogue inventory management, faceted filtering, searching, and admin mutations.

- **Persistent Store**: Synced with `localStorage.getItem('aurais_products')`. Defaults to `INITIAL_PERFUMES`.
- **Faceted Query Engine**:
  - `searchQuery`: Evaluates matches against name, subtitle, olfactory family, accords, and pyramid notes.
  - `family`: Filters by `OlfactoryFamily` (`Woody & Amber`, `Floral & Powdery`, `Oriental & Gourmand`, `Fresh & Citrus`, `Smoky & Incense`).
  - `selectedNotes`: Multi-tag filtering matching against top, heart, or base notes.
  - `maxPrice`: Evaluates product variant price ceilings ($45 to $350).
  - `minRating`: Minimum customer star rating threshold.
  - `sortBy`: Options for `featured`, `price-asc`, `price-desc`, `rating`, and `name`.
- **Catalog Mutations**:
  - `addProduct(product)`: Prepends a newly formulated flacon.
  - `updateProduct(product)`: Updates existing fragrance data.
  - `deleteProduct(id)`: Removes a fragrance and cleans up active selection.
  - `resetCatalog()`: Flushes local modifications back to factory default inventory.

### 5.2. `CartContext` (`CartContext.tsx`)
Governs active cart items, promotional discounting, checkout totals, and customer wishlists.

- **Storage Sync**: Persisted in `localStorage` under `aurais_cart` and `aurais_wishlist`.
- **Financial Calculation Engine**:
  $$\text{Subtotal} = \sum (\text{variant.price} \times \text{quantity})$$
  $$\text{Discount} = \begin{cases} \text{Subtotal} \times 0.15 & \text{if promo} = \text{'AURAIS15'} \\ \text{Subtotal} \times 0.10 & \text{if promo} = \text{'WELCOME10'} \\ 0 & \text{otherwise} \end{cases}$$
  $$\text{Shipping} = \begin{cases} 0 & \text{if subtotal} \ge \$120 \lor \text{promo} = \text{'FREESHIP'} \\ \$15 & \text{otherwise} \end{cases}$$
  $$\text{Tax} = (\text{Subtotal} - \text{Discount}) \times 0.08$$
  $$\text{Total} = (\text{Subtotal} - \text{Discount}) + \text{Shipping} + \text{Tax}$$
- **Complimentary Sample Rule**: Every flacon order of $30\text{ml}+$ automatically flags `includeComplimentarySample: true`, enabling risk-free home testing before breaking the wax seal.

---

## 6. Core Subsystems

### 6.1. Olfactory Pyramid Engine
Fragrance profiles are decomposed into a 3-tier timeline structure rendered in [`ProductDetail.tsx`](file:///c:/Users/marwa/Desktop/perfume-shop2/src/components/ProductDetail.tsx):
- **Top Notes (The Opening, 0–15 min)**: Volatile citrus and herb notes that create the initial impression.
- **Heart Notes (The Bloom, 15 min–3 hr)**: Florals, spices, and resins defining the core personality.
- **Base Notes (The Drydown, 3–24+ hr)**: Dense woods, ambers, and musks providing sillage and longevity.

### 6.2. Algorithmic Scent Quiz (`ScentQuizModal.tsx`)
A 3-step interactive questionnaire guiding the customer to their signature scent:
1. **Mood Selection**: Evocative atmospheric preferences (e.g., *Nocturnal Mystique*, *Solar Opulence*).
2. **Olfactory Note Preference**: Affinity for specific raw botanicals.
3. **Sillage & Projection Preference**: Intimate skin scent vs. room-commanding presence.
Calculates a resonance score against catalog items and displays matching flacons with one-click selection.

### 6.3. Maison Inventory Atelier (`AdminPanel.tsx`)
A private administrative control dashboard providing:
- High-level inventory analytics: Total catalog valuation, SKU count, and low-stock warning indicators.
- Complete CRUD form to formulate new perfumes, including note assignments across pyramid tiers, concentration levels, and custom pricing.
- One-click restore to reset any modified or deleted factory presets.

### 6.4. Two-Step Checkout Simulation (`CheckoutModal.tsx`)
1. **Step 1: Client Concierge & Destination**: Collects shipping address, contact details, gift packaging options, and personalized calligraphy messages.
2. **Step 2: Payment Execution**: Supports mock Stripe Credit Card (with Luhn format validation), Apple Pay, Google Pay, and Klarna financing.
3. **Order Lifecycle Simulator**: Generates a permanent Order ID, receipts, and order progress tracking from *Processing* $\to$ *Preparing Flacon* $\to$ *Dispatched* $\to$ *Delivered*.

---

## 7. Design Tokens & Styling Architecture

The interface utilizes Tailwind CSS v4 configured with a custom color palette reflecting luxury French perfumery:

| Design Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `Obsidian Dark` | `#0C0B0E` | Main application background and dark modal canvas |
| `Dark Atelier Card`| `#14121A` | Surface backgrounds for cards, dropdowns, and drawers |
| `Border Muted` | `#24212D` | Subtle borders separating cards, header, and list items |
| `Polished Gold` | `#D4AF37` | Primary luxury accent, buttons, badges, and active rings |
| `Light Gold` | `#EEDB92` | Hover highlights and highlighted text |
| `Ivory Pearl` | `#F4F1EA` | Primary typography for titles and descriptions |
| `Muted Stone` | `#A39E93` | Secondary labels, metadata, and placeholder text |

Typography combines classical serif headers (`font-serif`, Playfair / Cormorant style) with clean monospaced utility indicators (`font-mono`) for batch codes, concentrations, and pricing.

---

## 8. Development & Build Commands

All commands are executed from the project root:

```bash
# Install dependencies
npm install

# Start local development server with Vite (HMR enabled)
npm run dev

# Run oxlint fast static code analysis
npm run lint

# TypeScript verification and production bundle compilation
npm run build

# Preview production build locally
npm run preview
```

---

## 9. Future Roadmap & Extensibility

- **Stripe Live Webhooks**: Replace checkout simulation with live Stripe Checkout Session redirect or Stripe Elements.
- **Firebase Authentication & Firestore**: Migrate `localStorage` persistence to Cloud Firestore with custom security rules for multi-tenant customer order history and admin role verification.
- **Internationalization (i18n)**: English and French bilingual localization for European and American luxury markets.
