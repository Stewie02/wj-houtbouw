# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Yarn 4 monorepo with Turborepo containing two apps:
- `apps/backend` — Medusa v2 backend (`@dtc/backend`)
- `apps/storefront` — Next.js 15 storefront (`@dtc/storefront`)

## Commands

### From the monorepo root
```bash
yarn dev              # Start both backend and storefront
yarn backend:dev      # Start backend only
yarn storefront:dev   # Start storefront only (port 8000)
yarn build            # Build both apps
yarn lint             # Lint both apps
```

### Backend only (`apps/backend`)
```bash
yarn dev                          # medusa develop
yarn build                        # medusa build
yarn test:unit                    # Unit tests
yarn test:integration:http        # HTTP integration tests
yarn test:integration:modules     # Module integration tests
```

Backend admin runs at `http://localhost:9000/app`.

### Storefront only (`apps/storefront`)
```bash
yarn dev     # next dev --turbopack on port 8000
yarn build   # next build
yarn lint    # next lint
```

Storefront runs at `http://localhost:8000`.

## Architecture

### Routing & Localisation (Storefront)

All routes are nested under `[countryCode]` — the middleware (`src/middleware.ts`) detects the visitor's country from the URL, Cloudflare `cf.country`, or Vercel `x-vercel-ip-country` headers, and redirects to the correct country-prefixed URL (e.g. `/nl/products/chair`). `NEXT_PUBLIC_DEFAULT_REGION` is the fallback.

Two route groups inside `[countryCode]`:
- `(main)` — storefront pages (home, store, product, cart, account)
- `(checkout)` — checkout flow with its own minimal layout

### Data Layer (Storefront)

All API calls live in `src/lib/data/` as **Server Actions** (`"use server"`). They use the singleton SDK client from `src/lib/config.ts` (`@medusajs/js-sdk`). Never use raw `fetch()` for Medusa endpoints — the SDK automatically attaches the publishable API key and auth headers.

Key helpers used by every data function:
- `getAuthHeaders()` — reads `_medusa_jwt` cookie → `{ authorization: "Bearer ..." }`
- `getCacheOptions(tag)` — reads `_medusa_cache_id` cookie → `{ tags: ["<tag>-<cacheId>"] }` for per-user cache invalidation

Canonical product fetch: **`listProductsWithSort`** in `src/lib/data/products.ts`. Use this (with `countryCode`) everywhere products are listed — it handles pagination, sorting, and region resolution. Do not use `listProducts` directly in UI components.

### Module Structure (Storefront)

`src/modules/` groups features by domain: `account`, `cart`, `checkout`, `home`, `layout`, `products`, `store`, `common`. Each module follows: `templates/` (page-level shells) → `components/` (reusable pieces).

Server components handle data fetching; client components (`"use client"`) handle interaction/state. The split is intentional — keep data fetching in server components and pass data down as props.

### Design System (Storefront)

Brand: **WJ Houtbouw** — Dutch outdoor wood furniture. All brand colours are `wj.*` Tailwind tokens:

| Token | Value | Use |
|-------|-------|-----|
| `wj-bg` | `#F7F3EE` | Page background |
| `wj-surface` | `#EDE9E3` | Section backgrounds |
| `wj-text` | `#1A1410` | Body text |
| `wj-muted` | `#7B6F65` | Secondary text |
| `wj-green` | `#2B4D1A` | Primary action colour |
| `wj-green-light` | `#EBF0E6` | Active/selected state bg |
| `wj-wood` | `#C4843A` | Accent |
| `wj-border` | `#D5CFC7` | All borders |
| `wj-white` | `#FEFCF9` | Card / content surfaces |
| `wj-dark` | `#12100D` | Dark header sections |

Typography:
- `font-display` → Playfair Display (`--font-playfair`) — headings
- `font-body` → DM Sans (`--font-dm-sans`) — all other text

Reusable primitives in `src/modules/common/components/`:
- `BrandButton` — variants: `solid` (default), `outline`, `ghost`, `wood`, `dark`; sizes: `sm`, `md`, `lg`; prop `full` for full-width
- `BrandTag` — variants: `green`, `wood`, `neutral`
- `PlaceholderImage` — striped CSS gradient placeholder used everywhere real images will go
- `SectionContainer` — `max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12`
- `StarRating`, `Breadcrumb`

Square corners are intentional — do not add `rounded-*` to WJ brand elements.

Dark page headers follow this pattern across pages (cart, checkout, account):
```tsx
<div className="bg-wj-dark">
  <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
    <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">…</h1>
  </div>
</div>
```

### Backend

Standard Medusa v2 structure: `src/modules/` for custom modules, `src/api/` for custom route handlers, `src/workflows/` for custom workflows, `src/subscribers/` for event subscribers, `src/links/` for module links. Custom API routes are under `src/api/store/custom/` and `src/api/admin/custom/`.
