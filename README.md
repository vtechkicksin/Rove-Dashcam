# ROVE Dash Cam — storefront redesign

An unofficial, front-end-only redesign concept for [rovedashcam.com](https://www.rovedashcam.com).
Product names, prices, stock status, specs and images come from the store's public Shopify feed.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint     # oxlint
```

## Stack

React 19 · Vite · React Router 7 · Tailwind CSS 3 · Framer Motion · lucide-react

## Project structure

```
src/
├── components/
│   ├── cart/        Cart drawer and add-to-cart button
│   ├── home/        Home page sections (hero, finder, features, FAQ, blog…)
│   ├── layout/      App shell: navbar, footer, layout with route outlet
│   ├── product/     Product/accessory cards, gallery, comparison table
│   ├── search/      ⌘K search dialog
│   └── ui/          Reusable primitives (SectionHeader, Price, ProductImage…)
├── context/         CartProvider (useReducer + localStorage persistence)
├── data/            Catalog data: dash cams, accessories, editorial content
├── hooks/           useCart, useOverlay (focus trap/Escape/scroll lock), useDocumentTitle
├── lib/             Formatting helpers, catalog lookup, constants
└── pages/           Route components (lazy-loaded except Home and NotFound)
```

## Notes

- Checkout is intentionally not connected; the cart is a working front-end demo.
- Support, blog, bundle and open-box links point to the live rovedashcam.com pages.
- Motion respects `prefers-reduced-motion`.
