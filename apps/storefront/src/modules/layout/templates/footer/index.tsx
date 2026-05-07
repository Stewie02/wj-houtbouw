import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { label: "Picnic Tables", href: "/winkel" },
      { label: "Garden Benches", href: "/winkel" },
      { label: "Children's Furniture", href: "/winkel" },
      { label: "Accessories", href: "/winkel" },
      { label: "New arrivals", href: "/winkel" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Sustainability", href: "/about" },
      { label: "Craftsmanship", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/contact" },
      { label: "Shipping & delivery", href: "/contact" },
      { label: "Returns", href: "/contact" },
      { label: "Care guide", href: "/contact" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal" },
      { label: "Terms & Conditions", href: "/legal" },
      { label: "Cookie Policy", href: "/legal" },
    ],
  },
]

const SOCIALS = ["Instagram", "Pinterest", "Facebook"]

export default function Footer() {
  return (
    <footer className="bg-wj-dark text-wj-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-[72px] lg:pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-12 mb-16">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <LocalizedClientLink href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-wj-green flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="8" width="14" height="2.5" fill="#FEFCF9" />
                  <rect x="4" y="4" width="10" height="2" fill="#FEFCF9" opacity="0.7" />
                  <rect x="6" y="12.5" width="2.5" height="4" fill="#FEFCF9" />
                  <rect x="9.5" y="12.5" width="2.5" height="4" fill="#FEFCF9" />
                </svg>
              </div>
              <div className="font-display font-semibold text-[18px] text-wj-white">
                WJ Houtbouw
              </div>
            </LocalizedClientLink>
            <p className="font-body text-[14px] text-[#9A8F85] leading-[1.7] max-w-[240px]">
              Handcrafted outdoor furniture built to last generations. Made in the Netherlands from sustainably sourced timber.
            </p>
            <div className="mt-7">
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-[#6B6058] mb-2.5">
                Follow us
              </div>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <div
                    key={s}
                    className="font-body font-semibold text-[10px] tracking-[0.08em] uppercase text-[#9A8F85] border border-[#3A3530] px-[10px] py-1.5 cursor-pointer hover:text-wj-white transition-colors"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-[#6B6058] mb-[18px]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <LocalizedClientLink
                      href={link.href}
                      className="font-body text-[14px] text-[#9A8F85] hover:text-wj-white transition-colors"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2520] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-body text-[13px] text-[#6B6058]">
            © {new Date().getFullYear()} WJ Houtbouw B.V. All rights reserved.
          </span>
          <span className="font-body text-[13px] text-[#6B6058]">
            KVK 12345678 · Handmade in the Netherlands 🇳🇱
          </span>
        </div>
      </div>
    </footer>
  )
}
