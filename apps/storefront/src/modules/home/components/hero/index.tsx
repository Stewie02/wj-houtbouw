import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import BrandTag from "@modules/common/components/brand-tag";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] h-[92vh] overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Vakmanschap uit Nederland — W&J Houtbouw buitenmeubilair"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark base + gradient overlay */}
      <div className="absolute inset-0 bg-[rgba(12,10,8,0.40)]" />
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
          <BrandTag
            variant="wood"
            className="bg-[rgba(196,132,58,0.2)] text-wj-wood"
          >
            Vakmanschap uit Nederland
          </BrandTag>

          <h1
            className="mt-4 font-display font-bold text-wj-white leading-[1.05] tracking-[-0.02em]
              text-[44px] sm:text-[56px] lg:text-[68px]"
          >
            Buiten leven begint met de juiste{" "}
            <span className="font-display font-normal italic text-wj-wood">
              kwaliteit.
            </span>
          </h1>

          <p className="mt-6 font-body text-[16px] sm:text-[18px] text-[rgba(254,252,249,0.75)] leading-[1.65] max-w-[480px]">
            Robuust buitenmeubilair van Douglas hout, met de hand gemaakt in
            Nederland. Voor wie niet inlevert op kwaliteit.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <LocalizedClientLink href="/winkel">
              <BrandButton size="lg" className="w-full sm:w-auto">
                Bekijk producten
              </BrandButton>
            </LocalizedClientLink>
            <LocalizedClientLink href="/about">
              <BrandButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto !border-[rgba(254,252,249,0.5)] !text-wj-white hover:!bg-[rgba(254,252,249,0.1)]"
              >
                Ons verhaal
              </BrandButton>
            </LocalizedClientLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
