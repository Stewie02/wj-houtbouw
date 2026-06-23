import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const FOOTER_COLS = [
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Klantenservice",
    links: [
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
      { label: "Retourbeleid", href: "/retourbeleid" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { label: "Privacybeleid", href: "/privacybeleid" },
      { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
      { label: "Cookies", href: "/cookiebeleid" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/wj_houtbouw/" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/WJ-Houtbouw/61585357975256/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-wj-dark text-wj-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-[72px] lg:pb-12">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <LocalizedClientLink href="/" className="mb-5 inline-block">
              <Image
                src="/wj_houtbouw_horizontal_white.svg"
                alt="W&J Houtbouw"
                width={190}
                height={40}
              />
            </LocalizedClientLink>
            <p className="font-body text-[14px] text-[#9A8F85] leading-[1.7] max-w-[240px]">
              Handgemaakt buitenmeubilair om generaties mee te gaan. Gemaakt in
              Nederland van duurzaam hout.
            </p>
            <div className="mt-7">
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-[#6B6058] mb-2.5">
                Volg ons
              </div>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-semibold text-[10px] tracking-[0.08em] uppercase text-[#9A8F85] border border-[#3A3530] px-[10px] py-1.5 hover:text-wj-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-[#6B6058] mb-[18px]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <LocalizedClientLink
                      href={link.href}
                      className="font-body text-[14px] text-[#9A8F85] hover:text-wj-white transition-colors"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2520] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-body text-[13px] text-[#6B6058]">
            © {new Date().getFullYear()} W&J Houtbouw B.V. Alle rechten
            voorbehouden.
          </span>
          <span className="font-body text-[13px] text-[#6B6058]">
            KVK 98439200 · Handgemaakt in Nederland 🇳🇱
          </span>
        </div>
      </div>
    </footer>
  );
}
