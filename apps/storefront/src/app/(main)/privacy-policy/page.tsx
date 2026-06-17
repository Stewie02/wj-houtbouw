import { Metadata } from "next";
import SectionContainer from "@modules/common/components/section-container";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Lees hoe W&J Houtbouw omgaat met jouw persoonsgegevens, welke gegevens wij verwerken en met wie wij ze delen.",
};

const LEGAL_BASES = [
  {
    processing: "Bestellingen, leveringen, betalingen, account",
    basis: "Uitvoering van een overeenkomst",
  },
  {
    processing: "Belastingadministratie en factuurplicht",
    basis: "Wettelijke verplichting",
  },
  {
    processing: "Nieuwsbrief en reclamefolder",
    basis: "Toestemming",
  },
  {
    processing: "Websiteanalyse, beveiliging en IP-adresverwerking",
    basis: "Gerechtvaardigd belang",
  },
];

const RETENTION = [
  { category: "Facturen en ordergegevens", period: "7 jaar (fiscale bewaarplicht)" },
  { category: "Accountgegevens", period: "Tot verwijdering account + 24 maanden" },
  { category: "Contactverzoeken en offertes", period: "24 maanden" },
  { category: "Nieuwsbriefinschrijving", period: "Tot uitschrijving" },
  { category: "Websitegedrag en analysedata", period: "24 maanden" },
];

const THIRD_PARTIES = [
  {
    category: "Verwerker",
    name: "Stripe, Inc.",
    jurisdiction: "VS (EU-VS DPF / SCCs)",
    purpose: "Betalingsverwerking",
    data: "Naam, e-mailadres, telefoonnummer, factuuradres, IP-adres, betaalgegevens",
  },
  {
    category: "Verwerker",
    name: "Resend, Inc.",
    jurisdiction: "VS (SCCs)",
    purpose: "Versturen van transactionele e-mails",
    data: "E-mailadres, naam",
  },
];

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-body text-[14px] text-wj-text border-collapse">
        <thead>
          <tr className="border-b border-wj-border">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 pr-5 font-semibold text-[12px] tracking-[0.06em] uppercase text-wj-muted last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-wj-border last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="py-3 pr-5 align-top text-wj-muted leading-[1.6] last:pr-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-wj-bg">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
            Juridisch
          </div>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Privacybeleid
          </h1>
          <p className="mt-4 font-body text-[15px] text-[#9A8F85] leading-[1.7]">
            W&amp;J Houtbouw V.O.F. · Laatste wijziging: 17 juni 2026
          </p>
        </div>
      </div>

      <SectionContainer className="py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto flex flex-col gap-10">

          <section>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              W&amp;J Houtbouw, gevestigd aan Gaffel 10, 9247 DD Drachten, is
              verantwoordelijk voor de verwerking van persoonsgegevens zoals
              weergegeven in dit privacybeleid. Vragen? Neem contact op via{" "}
              <a
                href="mailto:info@wjhoutbouw.nl"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                info@wjhoutbouw.nl
              </a>{" "}
              of 06 24994842.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Persoonsgegevens die wij verwerken
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-4">
              W&amp;J Houtbouw verwerkt persoonsgegevens doordat u gebruik maakt
              van onze diensten en/of omdat u deze zelf aan ons verstrekt. Wij
              verwerken de volgende gegevens:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Voor- en achternaam",
                "Adresgegevens",
                "Telefoonnummer",
                "E-mailadres",
                "IP-adres (voor beveiliging, fraudepreventie en analyse van websitegebruik)",
                "Gegevens over uw activiteiten op onze website",
                "Overige persoonsgegevens die u actief verstrekt, bijvoorbeeld via correspondentie of telefonisch contact",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2 font-body text-[15px] text-wj-muted leading-[1.6]"
                >
                  <span className="text-wj-wood mt-[2px] shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Bijzondere persoonsgegevens
            </h2>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              Onze website heeft niet de intentie gegevens te verzamelen over
              bezoekers jonger dan 16 jaar, tenzij zij toestemming hebben van
              ouders of voogd. Wij kunnen echter niet controleren of een
              bezoeker ouder dan 16 is. Wij raden ouders aan betrokken te zijn
              bij de online activiteiten van hun kinderen. Als u er zeker van
              bent dat wij zonder toestemming gegevens van een minderjarige
              hebben verzameld, neem dan contact op via{" "}
              <a
                href="mailto:info@wjhoutbouw.nl"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                info@wjhoutbouw.nl
              </a>
              , dan verwijderen wij deze gegevens.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Waarvoor wij uw gegevens gebruiken
            </h2>
            <ul className="flex flex-col gap-2">
              {[
                "Het aanmaken en beheren van uw account",
                "Het afhandelen van uw betaling",
                "Het versturen van onze nieuwsbrief en/of reclamefolder",
                "U bellen of e-mailen indien nodig voor onze dienstverlening",
                "U informeren over wijzigingen van onze diensten en producten",
                "Het bezorgen van goederen",
                "Het analyseren van websitegedrag om het aanbod te verbeteren",
                "Het voldoen aan wettelijke verplichtingen, zoals onze belastingaangifte",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2 font-body text-[15px] text-wj-muted leading-[1.6]"
                >
                  <span className="text-wj-wood mt-[2px] shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-2">
              Grondslagen voor verwerking
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-5">
              Wij verwerken persoonsgegevens uitsluitend op basis van een van de
              volgende wettelijke grondslagen:
            </p>
            <SimpleTable
              headers={["Verwerking", "Grondslag"]}
              rows={LEGAL_BASES.map((r) => [r.processing, r.basis])}
            />
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Geautomatiseerde besluitvorming
            </h2>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              W&amp;J Houtbouw maakt geen gebruik van geautomatiseerde
              besluitvorming.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-2">
              Bewaartermijnen
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-5">
              Wij bewaren persoonsgegevens niet langer dan noodzakelijk. Voor
              sommige gegevens gelden wettelijke bewaartermijnen, zoals de
              fiscale bewaarplicht van 7 jaar.
            </p>
            <SimpleTable
              headers={["Categorie", "Bewaartermijn"]}
              rows={RETENTION.map((r) => [r.category, r.period])}
            />
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-2">
              Delen met derden
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-3">
              W&amp;J Houtbouw deelt uw persoonsgegevens met derden wanneer dit
              noodzakelijk is voor de uitvoering van de overeenkomst of om te
              voldoen aan een wettelijke verplichting. Met verwerkers sluiten wij
              een verwerkersovereenkomst. W&amp;J Houtbouw verkoopt uw gegevens
              niet aan derden.
            </p>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-5">
              Sommige verwerkers bevinden zich buiten de Europese Economische
              Ruimte. In dergelijke gevallen zorgen wij voor passende waarborgen
              via Standard Contractual Clauses (SCCs) of deelname aan het EU-VS
              Data Privacy Framework (DPF).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-[14px] text-wj-text border-collapse">
                <thead>
                  <tr className="border-b border-wj-border">
                    {["Categorie", "Naam", "Jurisdictie", "Doel", "Gegevens"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left py-3 pr-5 font-semibold text-[12px] tracking-[0.06em] uppercase text-wj-muted last:pr-0"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {THIRD_PARTIES.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-wj-border last:border-0"
                    >
                      <td className="py-3 pr-5 align-top text-wj-muted">{row.category}</td>
                      <td className="py-3 pr-5 align-top font-semibold text-wj-text whitespace-nowrap">{row.name}</td>
                      <td className="py-3 pr-5 align-top text-wj-muted whitespace-nowrap">{row.jurisdiction}</td>
                      <td className="py-3 pr-5 align-top text-wj-muted">{row.purpose}</td>
                      <td className="py-3 align-top text-wj-muted leading-[1.6]">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Cookies
            </h2>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              Voor meer informatie over het gebruik van cookies verwijzen wij u
              naar ons{" "}
              <LocalizedClientLink
                href="/cookiebeleid"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                cookiebeleid
              </LocalizedClientLink>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Uw rechten
            </h2>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7] mb-4">
              U heeft het recht om uw persoonsgegevens in te zien, te
              corrigeren of te verwijderen. Daarnaast heeft u het recht uw
              toestemming in te trekken, bezwaar te maken tegen de verwerking,
              en het recht op gegevensoverdraagbaarheid.
            </p>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7] mb-4">
              Stuur uw verzoek naar{" "}
              <a
                href="mailto:info@wjhoutbouw.nl"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                info@wjhoutbouw.nl
              </a>
              . Stuur ter verificatie een kopie van uw identiteitsbewijs mee en
              maak uw pasfoto, MRZ, paspoortnummer en BSN onleesbaar. Wij
              reageren binnen één maand.
            </p>
            <p className="font-body text-[15px] text-wj-muted leading-[1.7]">
              U kunt ook een klacht indienen bij de{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-4">
              Beveiliging
            </h2>
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] mb-4">
              W&amp;J Houtbouw neemt passende maatregelen om uw persoonsgegevens
              te beschermen tegen misbruik, verlies en onbevoegde toegang. Wij
              hebben de volgende beveiligingsmaatregelen getroffen:
            </p>
            <ul className="flex flex-col gap-3">
              {[
                {
                  label: "TLS",
                  desc: "Alle gegevens worden verstuurd via een beveiligde verbinding (https).",
                },
                {
                  label: "DKIM, SPF en DMARC",
                  desc: "Wij gebruiken deze standaarden om e-mailmisbruik en phishing uit onze naam te voorkomen.",
                },
                {
                  label: "DNSSEC",
                  desc: "Onze domeinnaam is voorzien van een digitale handtekening om omleiding naar een vals IP-adres te voorkomen.",
                },
              ].map((item) => (
                <li key={item.label} className="flex gap-2 font-body text-[15px] leading-[1.6]">
                  <span className="text-wj-wood mt-[2px] shrink-0">—</span>
                  <span>
                    <strong className="text-wj-text font-semibold">{item.label}</strong>{" "}
                    <span className="text-wj-muted">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-wj-border pt-6">
            <p className="font-body text-[14px] text-wj-muted leading-[1.7]">
              W&amp;J Houtbouw behoudt zich het recht voor dit privacybeleid te
              wijzigen. De meest actuele versie is altijd beschikbaar op onze
              website. Deze versie is voor het laatst bijgewerkt op{" "}
              <strong className="text-wj-text font-semibold">17 juni 2026</strong>.
            </p>
          </section>

        </div>
      </SectionContainer>
    </div>
  );
}
