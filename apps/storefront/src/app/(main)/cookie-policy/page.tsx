import { Metadata } from "next";
import SectionContainer from "@modules/common/components/section-container";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Lees welke cookies W&J Houtbouw gebruikt, waarvoor ze dienen en hoe lang ze worden bewaard.",
};

const NECESSARY_COOKIES = [
  {
    name: "_medusa_jwt",
    purpose: "Bewaart het inlogtoken van de gebruiker voor authenticatie.",
    retention: "7 dagen",
  },
  {
    name: "_medusa_cart_id",
    purpose: "Koppelt de winkelwagen aan de browsersessie van de gebruiker.",
    retention: "7 dagen",
  },
  {
    name: "_medusa_cache_id",
    purpose:
      "Unieke identifier voor de caching van paginadata per gebruiker, zodat wijzigingen direct zichtbaar zijn.",
    retention: "24 uur",
  },
];

const STRIPE_COOKIES = [
  {
    name: "__stripe_mid",
    purpose:
      "Ingesteld door Stripe voor fraudepreventie. Helpt het risico van een transactiepoging te beoordelen.",
    retention: "1 jaar",
  },
  {
    name: "__stripe_sid",
    purpose:
      "Ingesteld door Stripe voor fraudepreventie. Helpt het risico van een transactiepoging te beoordelen.",
    retention: "30 minuten",
  },
];

function CookieTable({
  rows,
}: {
  rows: { name: string; purpose: string; retention: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-body text-[14px] text-wj-text border-collapse">
        <thead>
          <tr className="border-b border-wj-border">
            <th className="text-left py-3 pr-6 font-semibold text-[12px] tracking-[0.06em] uppercase text-wj-muted w-[200px]">
              Naam
            </th>
            <th className="text-left py-3 pr-6 font-semibold text-[12px] tracking-[0.06em] uppercase text-wj-muted">
              Doel
            </th>
            <th className="text-left py-3 font-semibold text-[12px] tracking-[0.06em] uppercase text-wj-muted w-[120px]">
              Bewaartermijn
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-wj-border last:border-0"
            >
              <td className="py-3 pr-6 align-top">
                <code className="font-mono text-[13px] bg-wj-surface px-1.5 py-0.5 text-wj-text">
                  {row.name}
                </code>
              </td>
              <td className="py-3 pr-6 align-top leading-[1.6] text-wj-muted">
                {row.purpose}
              </td>
              <td className="py-3 align-top text-wj-muted">{row.retention}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-wj-bg">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Cookiebeleid
          </h1>
        </div>
      </div>

      <SectionContainer className="py-12 sm:py-16">
        <div className="max-w-[800px]">
          <p className="font-body text-[15px] text-wj-muted leading-[1.7] mb-10">
            W&J Houtbouw gebruikt cookies om de website goed te laten
            functioneren en jouw ervaring te verbeteren. Cookies zijn kleine
            tekstbestanden die door je browser worden opgeslagen. Op deze pagina
            leggen wij uit welke cookies wij gebruiken, waarom, en hoe lang ze
            worden bewaard. Wij gebruiken uitsluitend noodzakelijke cookies. Heb
            je vragen? Neem contact met ons op via{" "}
            <a
              href="mailto:info@wjhoutbouw.nl"
              className="text-wj-green underline hover:text-wj-text transition-colors"
            >
              info@wjhoutbouw.nl
            </a>
            .
          </p>

          <section className="mb-10">
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-1">
              Noodzakelijke cookies
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-5">
              Deze cookies zijn vereist voor de basisfunctionaliteit van de
              website. Zonder deze cookies werken het winkelmandje en het
              inloggen niet.
            </p>
            <CookieTable rows={NECESSARY_COOKIES} />
          </section>

          <section className="mb-10">
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-1">
              Stripe (betalingsverwerker)
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-5">
              Voor het verwerken van betalingen maken wij gebruik van Stripe.
              Stripe plaatst onderstaande cookies op onze website ter voorkoming
              van fraude. Daarnaast plaatst Stripe cookies op het eigen domein
              (stripe.com) voor operationele doeleinden. Zie het{" "}
              <a
                href="https://stripe.com/en-nl/legal/cookies-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                cookiebeleid van Stripe
              </a>{" "}
              voor meer informatie.
            </p>
            <CookieTable rows={STRIPE_COOKIES} />
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-1">
              Cookies beheren
            </h2>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              Je kunt cookies verwijderen of blokkeren via de instellingen van
              je browser. Houd er rekening mee dat het verwijderen van
              noodzakelijke cookies ertoe kan leiden dat je winkelwagen wordt
              gewist en je uitgelogd wordt.
            </p>
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
