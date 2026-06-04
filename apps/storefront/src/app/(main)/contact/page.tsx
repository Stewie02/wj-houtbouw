import { Metadata } from "next";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";

export const metadata: Metadata = {
  title: "Contact — W&J Houtbouw",
  description:
    "Neem contact op met W&J Houtbouw. Bel, mail of bezoek ons in Drachten voor al uw vragen over handgemaakt buitenmeubilair.",
};

const CONTACT_ITEMS = [
  {
    label: "E-mail",
    value: "Info@wjhoutbouw.nl",
    href: "mailto:Info@wjhoutbouw.nl",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="2" y="5" width="16" height="11" rx="0" />
        <polyline points="2,5 10,12 18,5" />
      </svg>
    ),
  },
  {
    label: "Telefoon",
    value: "06-24994842",
    href: "tel:0624994842",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 3h3.5l1.5 4-2 1.2c.9 1.8 2.3 3.2 4.1 4.1L12.3 10l4 1.5V15c0 1.1-.9 2-2 2C6.5 17 3 10.8 3 5c0-1.1.9-2 2-2z" />
      </svg>
    ),
  },
  {
    label: "Adres",
    value: "Gaffel 10\n9247DD, Drachten",
    href: "https://maps.google.com/?q=Gaffel+10,+9247DD+Drachten",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M10 2C7.2 2 5 4.2 5 7c0 4 5 11 5 11s5-7 5-11c0-2.8-2.2-5-5-5z" />
        <circle cx="10" cy="7" r="1.8" />
      </svg>
    ),
  },
  {
    label: "KVK-nummer",
    value: "98439200",
    href: null,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="4" width="14" height="13" />
        <line x1="7" y1="4" x2="7" y2="2" />
        <line x1="13" y1="4" x2="13" y2="2" />
        <line x1="6" y1="9" x2="14" y2="9" />
        <line x1="6" y1="12.5" x2="11" y2="12.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="bg-wj-bg">
      {/* Dark header */}
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
            Neem contact op
          </div>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Wij horen{" "}
            <span className="font-display font-normal italic">
              graag van u.
            </span>
          </h1>
          <p className="mt-4 font-body text-[15px] text-[#9A8F85] leading-[1.7] max-w-[440px]">
            Heeft u een vraag over onze producten of een bestelling? Wij zijn
            bereikbaar via telefoon of e-mail.
          </p>
        </div>
      </div>

      {/* Contact details */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <div className="bg-wj-white border border-wj-border p-6 h-full flex flex-col gap-4">
                <div className="w-10 h-10 bg-wj-green text-wj-white flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-1.5">
                    {item.label}
                  </div>
                  <div className="font-body text-[15px] text-wj-text leading-[1.6] whitespace-pre-line">
                    {item.value}
                  </div>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group hover:opacity-80 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-wj-surface border-t border-wj-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
              Onze producten
            </div>
            <h2 className="font-display font-bold text-[26px] sm:text-[32px] text-wj-text tracking-[-0.02em] leading-[1.2]">
              Bekijk wat we maken.
            </h2>
          </div>
          <LocalizedClientLink href="/winkel">
            <BrandButton variant="solid" size="lg">
              Naar de winkel
            </BrandButton>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  );
}
