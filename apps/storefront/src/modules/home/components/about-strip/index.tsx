import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"
import PlaceholderImage from "@modules/common/components/placeholder-image"

const AboutStrip = () => {
  return (
    <div className="bg-wj-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Text */}
          <div className="flex flex-col justify-center py-16 lg:py-20 lg:pr-18">
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3.5">
              About WJ Houtbouw
            </div>
            <h2 className="font-display font-bold text-[36px] sm:text-[44px] text-wj-text leading-[1.1] tracking-[-0.02em] mb-6">
              Every joint,{" "}
              <span className="font-display font-normal italic">hand-fitted.</span>
            </h2>
            <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75] max-w-[420px]">
              Since 2009, we've been building outdoor furniture the old way —
              slow, careful, and without compromise. Our workshop in Gelderland
              processes timber the day it arrives, and every table leaves with
              our name on it.
            </p>
            <div className="mt-8">
              <LocalizedClientLink href="/about">
                <BrandButton variant="outline">Meet the team</BrandButton>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[300px] lg:min-h-0">
            <PlaceholderImage label="workshop — craftsman at work, timber joinery" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutStrip
