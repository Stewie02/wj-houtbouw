# Conversion improvements — plan

Findings from a live-site + code audit (storefront: Next.js 15, `apps/storefront`).
No conversions in a week on paid social traffic. Ranked by impact.

**How to use this file:** work one item at a time. When a conversation gets long,
start a fresh one pointed at this file and the item's "Where" paths. Check off items
as they ship.

---

## P0 — highest ROI

### 1. Add-to-cart feedback + cart drawer  ✅ DONE
Built `modules/cart/components/cart-drawer` (headless-ui `Dialog`+`Transition`, house
style). `CartDrawerProvider` wraps `(main)/layout.tsx` with the server-fetched cart; the
nav cart icon opens it; `product-actions` opens it after a successful add. Hardened
`handleAddToCart` with try/finally (was leaving the button stuck on "Toevoegen…" on error).
Verified live: drawer opens from the cart icon, renders empty state + CTAs, product page
loads clean, typecheck/lint/knip green. NOT drivable in the local Playwright env — the
headless browser doesn't persist the cart cookie, so a real add stays empty (see memory
[[storefront-cart-not-persisting-in-playwright]]). Auto-open-on-add is wired per the Medusa
starter pattern; confirm with a real add in a normal browser.

<details><summary>original notes</summary>
The single biggest killer. Clicking "In winkelwagen" gives almost no feedback — the
button flickers "Toevoegen…" and only a tiny cart-icon badge increments. On a €600+
purchase the buyer isn't sure anything happened.
- **Where:** `lib/data/cart.ts:140` (`addConfiguredItem` only revalidates the cart tag),
  `modules/layout/components/nav-client/index.tsx` (`CartIcon` → `/winkelwagen` full page),
  `modules/products/components/product-actions/index.tsx` (`handleAddToCart`).
- **Do:** slide-out drawer that opens on add, showing the added item, subtotal,
  "Verder winkelen" + "Afrekenen". At minimum: a toast confirmation.
</details>

### 2. Fix broken description — end to end (admin input + storefront render)  ✅ DONE
Format chosen: **markdown, both ends**. Storefront `modules/products/components/product-description`
renders `description` via `react-markdown` (styled with a `components`→`wj-*` map, no typography
plugin), then renders `metadata.sections` (`[{title, body}]`) as collapsible accordions below it
(reuses the FAQ accordion pattern). Verified live: the `> Duurzaam douglas…` blockquote now renders
as a styled quote, no literal `>`. Admin: section-manager widget (`product.details.after`) with an
Add/Edit **Drawer** — title + markdown `Textarea` + **live preview + syntax cheatsheet**, saved to
`product.metadata.sections` via `sdk.admin.product.update`. Sections are added per-product in the UI;
the old blob content is not auto-parsed (one-time manual re-paste, tiny catalog). `react-markdown` is
ESM-only, so backend `tsc` now excludes `src/admin` and typechecks it via its bundler-mode config.
Not driven in the admin UI end-to-end (needs login); follows documented Medusa widget patterns, typecheck/lint green.

<details><summary>original notes</summary>
`product.description` contains markdown (`> Duurzaam douglas hout …`) rendered as raw
text — the `>` characters print literally. Looks broken on the best product. Trust killer.
Root cause: merchant types markdown into a plain textarea, storefront prints it raw.
**Fix both ends or it stays half-broken.** Pick one format and honour it end to end.

- **Admin:** replace the bare-string description field with a real editor.
  Prefer a **markdown editor** (lighter, stores plain text, no HTML sanitising, content is
  already markdown) over a full WYSIWYG. WYSIWYG only if the merchant wants zero markdown
  knowledge. **Where:** `apps/backend/src/admin/…` widget on the product form.
- **Storefront:** render that markdown properly, then split into collapsible accordion
  sections (Specificaties, Levering, Onderhoud).
  **Where:** `modules/products/templates/index.tsx` (currently one `whitespace-pre-wrap`
  block).
</details>

### 3. Trust signals + delivery time near the add-to-cart button
USPs (5 jaar garantie, weerbestendig, Nederlands vakmanschap) live on the homepage/store
footer, not where the decision is made. Delivery time ("1 tot 4 weken") is buried at the
bottom of the description.
- **Where:** `modules/products/components/product-actions/index.tsx`, `USPS` in `lib/constants`.
- **Do:** compact trust row + delivery estimate directly under the price/button.

---

## P1

### 4. Visual variant swatches  ✅ DONE
Per-option display type is now merchant-controlled via `product_option.metadata`
(`{ display, swatches }`), read end to end. Storefront `option-select` renders the matching
control: `select` (default, Dropdown) for lengtes/dimensions, `button` for ja/nee and add-ons,
`color-swatch` (square chips, `wj-*` tokens) for visual options. The store route
`/store/custom/products/[id]/options` now returns each option's metadata; the actions-wrapper
passes it onto the enriched option. Admin: `product-option-swatches` widget under "Volgorde opties"
(`product.details.side.after`) with a per-option display `Select` and, for swatches, a native
colour picker + hex (or image URL) per value, saved via a new raw-SQL route
`/admin/custom/products/[id]/options/display` (mirrors the reorder route — option metadata isn't
writable through `sdk.admin.product.update`). Options with no metadata stay dropdowns, so nothing
breaks until a merchant configures a type. Verified live end to end against picknicktafel-douglas:
seeded a Frame coating colour swatch, revalidated the `products` tag, confirmed the three chips
render with the right hex. typecheck/lint green, no new knip findings. NOTE: I seeded a demo colour
swatch on the "Frame coating" option (wit/zwart/geen) in the local DB so it renders immediately;
adjust or clear it in the new widget. Swatch keys must exactly match value strings (surcharge text
included) — the widget guarantees this by listing `option.values`.

**Rule of thumb:**
- ≤ ~8 values **and** the difference is visual (colour/finish) → colour/image **swatch**.
- ≤ ~8 values, non-visual or binary (ja/nee, add-ons) → plain **choice buttons**.
- Long or ordered lists (lengths, dimensions) → keep a **select**. A wall of 15+ buttons
  pushes the price/add-to-cart button below the fold and hurts conversion.

**Decision for the current Tuintafel options:**
| Option | Control |
|--------|---------|
| Lengtes | select (long + ordered) |
| Frame coating | colour swatch (zwart / wit gepoedercoat — purely visual) |
| Bescherming hout | buttons (colour/image swatch only if it visibly tints the wood) |
| Rugleuning | buttons |
| Kunststof bescherm doppen | buttons (checkbox if just ja/nee) |
| Montage | buttons (ja/nee) |

**Consequence — this is not just a storefront change.** Which control an option uses
(and swatch colours) can't be hardcoded; a merchant adding a product must set it per
option. Medusa v2 option values are plain strings, so this needs:
- **Admin UI:** a custom field/widget on the product-option editor to choose display type
  (`select` | `button` | `color-swatch` | `image-swatch`) and, for colour swatches, the
  hex/image per value. Store it in option/value `metadata`.
- **Where (storefront):** `modules/products/components/product-actions/option-select.tsx`
  (uses `Dropdown`) reads that metadata and renders the matching control.
- **Where (admin):** `apps/backend/src/admin/…` widget on the product options section.
  See the `building-admin-dashboard-customizations` skill.

### 5. Related / recommended products
Nothing below the product description.
- **Where:** bottom of `modules/products/templates/index.tsx`.
- **No admin UI needed (unlike #2 and #4).** Do it **automatic**: show other products from
  the same category/collection — that data already exists (merchant assigns categories
  today). With this small a catalog "related" ≈ "the other products".
- **Add manual curation later only if** the catalog grows and automatic picks look wrong.
  That would need a product-relations admin widget — YAGNI until then.

### 6. Swipeable product images on mobile
Gallery has a thumbnail grid + lightbox prev/next buttons but no swipe on the main image.
- **Where:** `modules/products/components/image-gallery/index.tsx`.

### 7. Announcement bar above the nav
Site-wide bar for shipping/USP/promo messaging.
- **Where:** `modules/layout/templates/nav`, above `nav-client`.

---

## P2 — polish

- **Dutch price formatting:** prices show `€800.00`; should be `€ 800,00` (comma, space).
- **Reviews / social proof:** none anywhere; a `StarRating` primitive already exists, unused.
- **Newsletter capture:** none — paid traffic bounces with no recapture.
- **Search** in the nav: absent.
- **Payment-method icons** (iDEAL) in footer/checkout entry: absent.
- **Store filters:** sort only, no filters (fine for a small catalog).
- **Nav inconsistency:** hero links `/about`, nav links `/over-ons` (both work).

---

## Already done ✅
- Fully clickable product cards (`ProductCard` wraps the whole card in a link).
