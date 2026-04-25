import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 flex flex-col items-center text-center" data-testid="empty-cart-message">
      <div className="w-16 h-16 bg-wj-surface flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-wj-muted">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>
      <h2 className="font-display font-bold text-[26px] text-wj-text tracking-[-0.02em] mb-3">
        Your cart is empty
      </h2>
      <p className="font-body text-[15px] text-wj-muted max-w-[340px] mb-8 leading-[1.7]">
        Looks like you haven&apos;t added anything yet. Browse our collection of handcrafted wooden outdoor furniture.
      </p>
      <LocalizedClientLink href="/store">
        <BrandButton size="lg">Explore products</BrandButton>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
