"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";

const NAV_LINKS = [
  { href: "/winkel", label: "Winkel" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Logo = () => (
  <LocalizedClientLink href="/" className="flex items-center gap-2.5 shrink-0">
    <div className="w-8 h-8 bg-wj-green flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="8" width="14" height="2.5" fill="#FEFCF9" />
        <rect x="4" y="4" width="10" height="2" fill="#FEFCF9" opacity="0.7" />
        <rect x="6" y="12.5" width="2.5" height="4" fill="#FEFCF9" />
        <rect x="9.5" y="12.5" width="2.5" height="4" fill="#FEFCF9" />
      </svg>
    </div>
    <div>
      <div className="font-display font-semibold text-[17px] text-wj-text leading-tight">
        WJ Houtbouw
      </div>
      <div className="font-body font-semibold text-[9px] tracking-[0.08em] uppercase text-wj-muted">
        Buitenmeubilair
      </div>
    </div>
  </LocalizedClientLink>
);

type NavClientProps = {
  cartCount: number;
};

const NavClient = ({ cartCount }: NavClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href.replace("/", ""));

  return (
    <>
      {/* Desktop + mobile header bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        <Logo />

        {/* Desktop center links */}
        <div className="hidden small:flex gap-9">
          {NAV_LINKS.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className={`font-body font-medium text-[14px] pb-0.5 border-b-2 transition-colors ${
                isActive(link.href)
                  ? "text-wj-green border-wj-green"
                  : "text-wj-text border-transparent hover:text-wj-green"
              }`}
            >
              {link.label}
            </LocalizedClientLink>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden small:flex items-center gap-5">
          <LocalizedClientLink
            href="/account"
            className="font-body font-medium text-[13px] text-wj-muted hover:text-wj-text transition-colors"
          >
            Account
          </LocalizedClientLink>
          <CartIcon count={cartCount} />
          <LocalizedClientLink href="/winkel">
            <BrandButton size="sm">Naar de winkel</BrandButton>
          </LocalizedClientLink>
        </div>

        {/* Mobile right */}
        <div className="flex small:hidden items-center gap-4">
          <CartIcon count={cartCount} />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-1 text-wj-text"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <line x1="2" y1="6" x2="20" y2="6" />
                <line x1="2" y1="11" x2="20" y2="11" />
                <line x1="2" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="small:hidden border-t border-wj-border bg-wj-white">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-body font-medium text-[15px] py-3 px-2 border-b border-wj-border last:border-0 ${
                  isActive(link.href) ? "text-wj-green" : "text-wj-text"
                }`}
              >
                {link.label}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="font-body font-medium text-[15px] py-3 px-2 text-wj-muted"
            >
              Account
            </LocalizedClientLink>
          </div>
        </div>
      )}
    </>
  );
};

const CartIcon = ({ count }: { count: number }) => (
  <LocalizedClientLink
    href="/winkelwagen"
    className="relative text-wj-text hover:text-wj-green transition-colors"
    data-testid="nav-cart-link"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 3h2.5l2.5 11h9l2-7H7" />
      <circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
    {count > 0 && (
      <div className="absolute -top-1 -right-1.5 w-4 h-4 bg-wj-wood rounded-full font-body font-semibold text-[9px] tracking-[0.08em] text-wj-white flex items-center justify-center">
        {count}
      </div>
    )}
  </LocalizedClientLink>
);

export default NavClient;
