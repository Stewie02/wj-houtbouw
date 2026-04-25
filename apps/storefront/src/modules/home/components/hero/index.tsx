import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"
import BrandTag from "@modules/common/components/brand-tag"
import PlaceholderImage from "@modules/common/components/placeholder-image"

const STATS = [
  { value: "15+", label: "Years of craft" },
  { value: "2,400+", label: "Happy customers" },
  { value: "100%", label: "Dutch made" },
]

const Hero = () => {
  return (
    <div className="relative min-h-[600px] h-[92vh] overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0">
        <PlaceholderImage label="hero — outdoor lifestyle, picnic table in garden setting" dark />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(12,10,8,0.72) 0%, rgba(12,10,8,0.28) 65%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center w-full">
        <div className="max-w-[620px]">
          <BrandTag variant="wood" className="bg-[rgba(196,132,58,0.2)] text-wj-wood">
            Handcrafted in the Netherlands
          </BrandTag>

          <h1
            className="mt-4 font-display font-bold text-wj-white leading-[1.05] tracking-[-0.02em]
              text-[44px] sm:text-[56px] lg:text-[68px]"
          >
            Built for the{" "}
            <span className="font-display font-normal italic text-wj-wood">
              long haul.
            </span>
          </h1>

          <p className="mt-6 font-body text-[16px] sm:text-[18px] text-[rgba(254,252,249,0.75)] leading-[1.65] max-w-[480px]">
            Premium picnic tables and outdoor furniture crafted from sustainably
            sourced European timber. Built to weather every season.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <LocalizedClientLink href="/store">
              <BrandButton size="lg" className="w-full sm:w-auto">
                Browse the collection
              </BrandButton>
            </LocalizedClientLink>
            <LocalizedClientLink href="/about">
              <BrandButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto !border-[rgba(254,252,249,0.5)] !text-wj-white hover:!bg-[rgba(254,252,249,0.1)]"
              >
                Our story
              </BrandButton>
            </LocalizedClientLink>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap gap-8 sm:gap-10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-[26px] sm:text-[28px] text-wj-white tracking-[-0.02em]">
                  {value}
                </div>
                <div className="font-body text-[13px] text-[rgba(254,252,249,0.55)] mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
