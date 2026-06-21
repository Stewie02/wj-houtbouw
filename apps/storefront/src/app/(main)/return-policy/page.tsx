import { Metadata } from "next";
import SectionContainer from "@modules/common/components/section-container";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const metadata: Metadata = {
  title: "Retourbeleid",
  description:
    "Het retourbeleid van W&J Houtbouw V.O.F.: herroepingsrecht, retourprocedure en uitzonderingen voor maatwerk.",
};

export default function RetourbeleidPage() {
  return (
    <div className="bg-wj-bg">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
            Klantenservice
          </div>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Retourbeleid
          </h1>
          <p className="mt-4 font-body text-[15px] text-[#9A8F85] leading-[1.7]">
            W&amp;J Houtbouw V.O.F. · Versie 2026
          </p>
        </div>
      </div>

      <SectionContainer className="py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto">
          <div className="font-body text-[15px] text-wj-muted leading-[1.75] mb-10">
            Hieronder staat beschreven wanneer u een product kunt retourneren,
            hoe de procedure werkt en welke uitzonderingen van toepassing zijn.
            Dit beleid maakt deel uit van onze{" "}
            <LocalizedClientLink
              href="/terms-and-conditions"
              className="text-wj-green underline underline-offset-2"
            >
              algemene voorwaarden
            </LocalizedClientLink>
            .
          </div>

          <div className="flex flex-col gap-10">
            <Section title="Herroepingsrecht consumenten">
              <Ol>
                <li>
                  Consumenten hebben bij online aankoop van standaardproducten
                  recht op een bedenktijd van 14 dagen na ontvangst van het
                  product.
                </li>
                <li>
                  Binnen deze termijn mag de consument de overeenkomst zonder
                  opgave van reden herroepen.
                </li>
                <li>
                  Tijdens de bedenktijd dient de consument zorgvuldig om te
                  gaan met het product en de verpakking.
                </li>
                <li>
                  Retourneren is alleen mogelijk indien het product ongebruikt,
                  onbeschadigd, compleet, in originele staat en geschikt voor
                  wederverkoop is.
                </li>
                <li>
                  De consument dient W&amp;J Houtbouw binnen de
                  herroepingstermijn schriftelijk te informeren over de
                  herroeping.
                </li>
                <li>
                  Na melding van herroeping dient het product binnen 14 dagen
                  te worden geretourneerd, tenzij anders overeengekomen.
                </li>
                <li>
                  De directe kosten van retourzending of retourtransport zijn
                  voor rekening van de consument, tenzij schriftelijk anders is
                  afgesproken.
                </li>
                <li>
                  Indien een product door gebruik, beschadiging, montage,
                  weersinvloeden of onzorgvuldige behandeling in waarde is
                  verminderd, mag W&amp;J Houtbouw deze waardevermindering
                  verrekenen.
                </li>
                <li>
                  W&amp;J Houtbouw betaalt het aankoopbedrag terug nadat het
                  product retour is ontvangen en gecontroleerd, of nadat de
                  consument heeft aangetoond dat het product is teruggezonden.
                </li>
              </Ol>
            </Section>

            <Section title="Uitsluiting herroepingsrecht bij maatwerk">
              <Ol>
                <li>
                  Het herroepingsrecht geldt niet voor maatwerkproducten die
                  specifiek volgens wensen, maten, kleuren, afwerking, uitvoering
                  of specificaties van de klant zijn geproduceerd.
                </li>
                <li>
                  Onder maatwerk vallen onder andere producten die op specifieke
                  maat worden gemaakt, op verzoek worden aangepast, in een
                  specifieke kleur, coating of afwerking worden geproduceerd,
                  speciaal worden samengesteld, of niet standaard opnieuw
                  verkoopbaar zijn.
                </li>
                <li>
                  De klant wordt vóór of bij het sluiten van de overeenkomst
                  geïnformeerd wanneer sprake is van maatwerk.
                </li>
                <li>
                  Na akkoord op een maatwerkopdracht kan de klant deze niet
                  kosteloos annuleren, retourneren of wijzigen.
                </li>
              </Ol>
            </Section>

            <Section title="Retourrecht zakelijke klanten">
              <Ol>
                <li>
                  Zakelijke klanten hebben geen wettelijk herroepingsrecht.
                </li>
                <li>
                  Retournering door zakelijke klanten is alleen mogelijk indien
                  W&amp;J Houtbouw daar schriftelijk mee akkoord gaat.
                </li>
                <li>
                  Maatwerkproducten worden door zakelijke klanten nooit retour
                  genomen, tenzij schriftelijk anders overeengekomen.
                </li>
                <li>
                  Eventuele retourkosten, transportkosten, herstelkosten of
                  waardevermindering zijn voor rekening van de zakelijke klant.
                </li>
              </Ol>
            </Section>

            <Section title="Hoe een retour aanvragen">
              <Ol>
                <li>
                  Stuur een e-mail naar{" "}
                  <a
                    href="mailto:info@wjhoutbouw.nl"
                    className="text-wj-green underline underline-offset-2"
                  >
                    info@wjhoutbouw.nl
                  </a>{" "}
                  met uw ordernummer, naam en de reden van retour.
                </li>
                <li>
                  Na ontvangst van uw melding neemt W&amp;J Houtbouw contact
                  met u op om de verdere procedure af te stemmen.
                </li>
                <li>
                  Stuur het product pas terug nadat W&amp;J Houtbouw de retour
                  schriftelijk heeft bevestigd.
                </li>
                <li>
                  Verpak het product zorgvuldig ter voorkoming van schade
                  tijdens transport; transportschade door ondeugdelijke
                  verpakking is voor rekening van de afzender.
                </li>
                <li>
                  Bewaar het bewijs van verzending totdat de terugbetaling is
                  verwerkt.
                </li>
              </Ol>
            </Section>

            <Section title="Terugbetaling">
              <Ol>
                <li>
                  Na ontvangst en controle van het geretourneerde product
                  verwerkt W&amp;J Houtbouw de terugbetaling binnen 14 dagen.
                </li>
                <li>
                  Terugbetaling vindt plaats via dezelfde betaalmethode als
                  waarmee de oorspronkelijke aankoop is gedaan.
                </li>
                <li>
                  Eventuele waardevermindering door gebruik, beschadiging of
                  onvolledigheid wordt in mindering gebracht op het terug te
                  betalen bedrag.
                </li>
                <li>
                  Bezorgkosten worden niet terugbetaald, tenzij het product
                  aantoonbaar defect of onjuist geleverd is.
                </li>
              </Ol>
            </Section>

            <Section title="Vragen">
              <p className="font-body text-[15px] text-wj-muted leading-[1.75]">
                Heeft u vragen over ons retourbeleid? Neem contact op via{" "}
                <a
                  href="mailto:info@wjhoutbouw.nl"
                  className="text-wj-green underline underline-offset-2"
                >
                  info@wjhoutbouw.nl
                </a>{" "}
                of bel ons op{" "}
                <a
                  href="tel:0623910707"
                  className="text-wj-green underline underline-offset-2"
                >
                  06 23 91 07 07
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-wj-border pt-8">
      <h2 className="font-display font-semibold text-[22px] text-wj-text tracking-[-0.01em] mb-5">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return <ol className="flex flex-col gap-2 list-decimal pl-5">{children}</ol>;
}
