import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";

const CtaBanner = () => {
  return (
    <div className="bg-wj-wood py-16 sm:py-20 px-4 sm:px-8 text-center">
      <h2 className="font-display font-bold text-[36px] sm:text-[46px] text-wj-white tracking-[-0.02em] mb-4">
        Klaar om te bestellen?
      </h2>
      <p className="font-body text-[15px] sm:text-[17px] text-[rgba(254,252,249,0.78)] mb-8 sm:mb-9">
        Stel je tafel online samen of neem contact op voor een offerte op maat.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <LocalizedClientLink href="/winkel">
          <BrandButton size="lg" variant="dark" className="w-full sm:w-auto">
            Bekijk de winkel
          </BrandButton>
        </LocalizedClientLink>
        <LocalizedClientLink href="/contact">
          <BrandButton
            size="lg"
            className="w-full sm:w-auto !bg-transparent !border-2 !border-[rgba(254,252,249,0.6)] !text-wj-white hover:!bg-[rgba(254,252,249,0.1)]"
          >
            Neem contact op
          </BrandButton>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default CtaBanner;
