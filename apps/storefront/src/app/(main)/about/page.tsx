import Image from "next/image";
import { Metadata } from "next";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";

export const metadata: Metadata = {
  title: { absolute: "Over W&J Houtbouw — Ons verhaal" },
  description:
    "Leer Peter Wiersma en Benne Jongsma kennen, de twee timmermannen achter W&J Houtbouw. Robuust buitenmeubilair van Douglas hout, gemaakt in Drachten.",
};

const VALUES = [
  {
    label: "Beter materiaal",
    description: "Douglas hout, geselecteerd op duurzaamheid en uitstraling.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="9" width="14" height="2.5" fill="currentColor" />
        <rect
          x="5"
          y="5"
          width="10"
          height="2"
          fill="currentColor"
          opacity="0.6"
        />
        <rect x="7" y="13.5" width="2.5" height="4" fill="currentColor" />
        <rect x="10.5" y="13.5" width="2.5" height="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Eerlijk vakwerk",
    description: "Elk stuk met de hand gemaakt, met aandacht voor elk detail.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <polyline points="4,10 8,14 16,6" />
      </svg>
    ),
  },
  {
    label: "Persoonlijk contact",
    description: "Van eerste idee tot laatste schroef, altijd direct contact.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="10" cy="7" r="3" />
        <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
  {
    label: "Snelle levering",
    description: "Geen concessies op kwaliteit, wél op levertijd.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="10" cy="10" r="7" />
        <polyline points="10,5 10,10 13,13" />
      </svg>
    ),
  },
];

export default function OverOnsPage() {
  return (
    <div className="bg-wj-bg">
      {/* Dark header */}
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
            Over W&J Houtbouw
          </div>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Gebouwd op vakmanschap{" "}
            <span className="font-display font-normal italic">
              en vriendschap.
            </span>
          </h1>
          <p className="mt-4 font-body text-[15px] text-[#9A8F85] leading-[1.7] max-w-[480px]">
            Gemaakt met overtuiging.
          </p>
        </div>
      </div>

      {/* Wie wij zijn */}
      <div className="bg-wj-bg">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[480px]">
            <div className="flex flex-col justify-center py-16 lg:py-20 lg:pr-16">
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3.5">
                Wie wij zijn
              </div>
              <h2 className="font-display font-bold text-[30px] sm:text-[36px] text-wj-text leading-[1.15] tracking-[-0.02em] mb-6">
                Twee timmermannen,{" "}
                <span className="font-display font-normal italic">
                  één visie.
                </span>
              </h2>
              <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75]">
                W&J Houtbouw is opgericht door Peter Wiersma en Benne Jongsma,
                twee timmermannen met een gedeelde achtergrond in de bouw en een
                even gedeelde visie op wat buitenmeubilair zou moeten zijn. Niet
                zomaar collega&apos;s, maar goede vrienden die besloten hun
                vakmanschap samen om te zetten in iets groters.
              </p>
              <p className="mt-4 font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75]">
                Vanuit onze werkplaats in Drachten bouwen wij robuust
                buitenmeubilair van Douglas hout — stuk voor stuk met de hand
                gemaakt, met aandacht voor elk detail.
              </p>
            </div>
            <div className="relative min-h-[320px] lg:min-h-0">
              <Image
                src="/images/about-team.webp"
                alt="Peter en Benne aan het werk in de werkplaats"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values pillars */}
      <div className="bg-wj-surface">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3.5">
            Waarom W&J Houtbouw
          </div>
          <h2 className="font-display font-bold text-[28px] sm:text-[34px] text-wj-text leading-[1.15] tracking-[-0.02em] mb-12">
            We zijn gestart omdat het{" "}
            <span className="font-display font-normal italic">anders kon.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => (
              <div key={value.label}>
                <div className="w-10 h-10 bg-wj-green text-wj-white flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <div className="font-body font-semibold text-[15px] text-wj-text mb-2">
                  {value.label}
                </div>
                <p className="font-body text-[14px] text-wj-muted leading-[1.65]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement callout */}
      <div className="bg-wj-bg">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-6">
              Trots
            </div>
            <p className="font-display font-normal italic text-[22px] sm:text-[26px] text-wj-text leading-[1.5] tracking-[-0.01em]">
              &ldquo;Wat ons het meest trots maakt? Dat we in een veel kortere
              tijd dan velen om ons heen voor mogelijk hielden al doelen hebben
              bereikt die we onszelf hadden gesteld.&rdquo;
            </p>
            <div className="mt-6 font-body text-[13px] text-wj-muted">
              Peter &amp; Benne, oprichters W&J Houtbouw
            </div>
          </div>
        </div>
      </div>

      {/* Waar we naartoe gaan */}
      <div className="bg-wj-surface">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[480px]">
            <div className="relative min-h-[320px] lg:min-h-0 order-2 lg:order-1">
              <Image
                src="/images/about-collection.webp"
                alt="Nieuwe collectie in de werkplaats van W&J Houtbouw"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center py-16 lg:py-20 lg:pl-16 order-1 lg:order-2">
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3.5">
                Waar we naartoe gaan
              </div>
              <h2 className="font-display font-bold text-[30px] sm:text-[36px] text-wj-text leading-[1.15] tracking-[-0.02em] mb-6">
                Nog maar het begin.{" "}
                <span className="font-display font-normal italic">
                  De kern blijft.
                </span>
              </h2>
              <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75]">
                W&J Houtbouw staat nog aan het begin. Over een paar jaar willen
                we een bredere collectie aanbieden en met een groter team
                werken.
              </p>
              <p className="mt-4 font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.75]">
                Maar de kern blijft hetzelfde: vakwerk, kwaliteit en een klant
                die met een glimlach zijn meubilair in ontvangst neemt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-wj-wood py-16 sm:py-20 px-4 sm:px-8 text-center">
        <h2 className="font-display font-bold text-[36px] sm:text-[46px] text-wj-white tracking-[-0.02em] mb-4">
          Benieuwd naar ons werk?
        </h2>
        <p className="font-body text-[15px] sm:text-[17px] text-[rgba(254,252,249,0.78)] mb-8 sm:mb-9">
          Bekijk onze collectie robuust buitenmeubilair, handgemaakt in
          Drachten.
        </p>
        <LocalizedClientLink href="/winkel">
          <BrandButton variant="dark" size="lg">
            Bekijk de collectie
          </BrandButton>
        </LocalizedClientLink>
      </div>
    </div>
  );
}
