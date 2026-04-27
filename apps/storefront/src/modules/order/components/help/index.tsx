import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em] mb-4">
        Need help?
      </h2>
      <div className="flex flex-col gap-2">
        <LocalizedClientLink
          href="/contact"
          className="font-body text-[14px] text-wj-green hover:underline"
        >
          Contact us
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/contact"
          className="font-body text-[14px] text-wj-green hover:underline"
        >
          Returns &amp; Exchanges
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
