import { getBaseURL } from "@lib/util/env";
import { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { JsonLd } from "@modules/common/components/json-ld";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "W&J Houtbouw — Handgemaakt buitenmeubilair",
    template: "%s | W&J Houtbouw",
  },
  description:
    "Robuust buitenmeubilair, handgemaakt in Drachten. Picknicktafels, loungesets en pergola's voor buiten.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const base = getBaseURL();
  return (
    <html lang="nl" data-mode="light">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body bg-wj-bg`}
      >
        <JsonLd
          schema={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${base}/#website`,
                url: base,
                name: "W&J Houtbouw",
                inLanguage: "nl-NL",
              },
              {
                "@type": "Organization",
                "@id": `${base}/#organization`,
                name: "W&J Houtbouw",
                url: base,
                telephone: "+31624994842",
                email: "info@wjhoutbouw.nl",
                logo: {
                  "@type": "ImageObject",
                  url: `${base}/wj_houtbouw_horizontal.svg`,
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Gaffel 10",
                  postalCode: "9247 DD",
                  addressLocality: "Drachten",
                  addressCountry: "NL",
                },
                identifier: {
                  "@type": "PropertyValue",
                  name: "KVK",
                  value: "98439200",
                },
              },
            ],
          }}
        />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  );
}
