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
              Over W&amp;J Houtbouw
            </div>
            <h2 className="font-display font-bold text-[36px] sm:text-[44px] text-wj-text leading-[1.1] tracking-[-0.02em] mb-6">
              Twee handen, één standaard.{" "}
              <span className="font-display font-normal italic">Gemaakt met overtuiging.</span>
            </h2>
            <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75] max-w-[420px]">
              Vanuit onze werkplaats in Drachten bouwen wij robuust
              buitenmeubilair van Douglas hout, stuk voor stuk met de hand
              gemaakt. Als tweekoppig team werken we nauw samen met onze
              klanten, van eerste idee tot laatste schroef. Geen concessies op
              kwaliteit, altijd persoonlijk contact.
            </p>
            <div className="mt-8">
              <LocalizedClientLink href="/about">
                <BrandButton variant="outline">Ons verhaal</BrandButton>
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
