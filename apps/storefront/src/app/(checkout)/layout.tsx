import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-wj-bg min-h-screen flex flex-col">
      {/* Minimal checkout nav */}
      <div className="h-14 bg-wj-white border-b border-wj-border">
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 h-full flex items-center justify-between">
          <LocalizedClientLink
            href="/winkelwagen"
            className="font-body text-[13px] font-medium text-wj-muted hover:text-wj-text transition-colors flex items-center gap-1.5"
            data-testid="back-to-cart-link"
          >
            ← Terug naar winkelwagen
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            data-testid="store-link"
          >
            <img
              src="/wj_houtbouw_horizontal.svg"
              alt="W&J Houtbouw"
              width={152}
              height={32}
            />
          </LocalizedClientLink>

          <div className="w-24" />
        </nav>
      </div>

      <div className="flex-1" data-testid="checkout-container">
        {children}
      </div>
    </div>
  );
}
