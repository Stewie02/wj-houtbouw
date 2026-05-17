import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden — WJ Houtbouw",
  description:
    "De algemene voorwaarden van W&J Houtbouw V.O.F. — van bestelling en betaling tot garantie, retour en aansprakelijkheid.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-wj-bg">
      {/* Dark header */}
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
            Juridisch
          </div>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Algemene Voorwaarden
          </h1>
          <p className="mt-4 font-body text-[15px] text-[#9A8F85] leading-[1.7]">
            W&amp;J Houtbouw V.O.F. · Versie 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        {/* Company info table */}
        <div className="bg-wj-white border border-wj-border mb-12 overflow-x-auto">
          <table className="w-full font-body text-[14px]">
            <tbody>
              {[
                ["Bedrijf", "W&J Houtbouw V.O.F."],
                ["KvK-nummer", "98439200"],
                ["BTW-nummer", "868495608B01"],
                ["Vestigingsadres", "Gaffel 10, 9206 AW Drachten"],
                ["E-mailadres", "info@wjhoutbouw.nl"],
                ["Telefoonnummer", "0623910707"],
                ["Website", "wjhoutbouw.nl"],
              ].map(([label, value]) => (
                <tr
                  key={label}
                  className="border-b border-wj-border last:border-0"
                >
                  <td className="px-5 py-3 font-semibold text-wj-muted w-[180px] shrink-0">
                    {label}
                  </td>
                  <td className="px-5 py-3 text-wj-text">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="font-body text-[15px] text-wj-muted leading-[1.75] mb-10">
          W&amp;J Houtbouw V.O.F. levert premium houten buitenproducten,
          standaardproducten en maatwerkproducten. Deze algemene voorwaarden
          zijn bedoeld om duidelijkheid te geven over bestelling, betaling,
          levering, montage, garantie, aansprakelijkheid, privacy en cookies.
        </div>

        <div className="flex flex-col gap-10">
          <Section title="Artikel 1 — Definities">
            <Ol>
              <li>
                W&amp;J Houtbouw: W&amp;J Houtbouw V.O.F., aanbieder van houten
                buitenproducten, tuinmeubelen, maatwerkproducten en aanverwante
                diensten.
              </li>
              <li>
                Klant: iedere natuurlijke persoon of rechtspersoon die een
                overeenkomst aangaat met W&amp;J Houtbouw.
              </li>
              <li>
                Consument: een klant die handelt voor doeleinden buiten zijn
                bedrijfs- of beroepsactiviteit.
              </li>
              <li>
                Zakelijke klant of B2B-klant: een klant die handelt vanuit
                beroep, bedrijf, organisatie, instelling of zakelijke
                activiteit.
              </li>
              <li>
                Producten: alle door W&amp;J Houtbouw aangeboden
                standaardproducten en maatwerkproducten, waaronder
                picknicktafels, tuintafels, buitenmeubelen en andere houten
                constructies.
              </li>
              <li>
                Maatwerk: producten die specifiek op verzoek, maatvoering,
                kleur, afwerking, samenstelling of specificatie van de klant
                worden gemaakt of aangepast.
              </li>
              <li>
                Overeenkomst: iedere afspraak tussen W&amp;J Houtbouw en de
                klant over verkoop, levering, montage, maatwerk of
                dienstverlening.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 2 — Toepasselijkheid">
            <Ol>
              <li>
                Deze algemene voorwaarden zijn van toepassing op alle
                aanbiedingen, offertes, bestellingen, overeenkomsten,
                leveringen, montagewerkzaamheden en overige diensten van W&amp;J
                Houtbouw.
              </li>
              <li>
                Deze voorwaarden gelden voor zowel consumenten als zakelijke
                klanten, tenzij uitdrukkelijk anders is aangegeven.
              </li>
              <li>
                Afwijkingen van deze voorwaarden zijn alleen geldig wanneer deze
                schriftelijk zijn overeengekomen.
              </li>
              <li>
                Indien een of meerdere bepalingen ongeldig of vernietigbaar
                blijken te zijn, blijven de overige bepalingen volledig van
                kracht.
              </li>
              <li>
                W&amp;J Houtbouw behoudt zich het recht voor deze algemene
                voorwaarden te wijzigen. De versie die geldt op het moment van
                de bestelling of overeenkomst is van toepassing.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 3 — Aanbod, offertes en overeenkomst">
            <Ol>
              <li>
                Alle aanbiedingen, prijzen en offertes van W&amp;J Houtbouw zijn
                vrijblijvend, tenzij schriftelijk anders is vermeld.
              </li>
              <li>
                Afbeeldingen, productfoto&apos;s, omschrijvingen, afmetingen,
                kleuren en specificaties op de website of in offertes zijn zo
                nauwkeurig mogelijk weergegeven, maar kunnen afwijken van de
                werkelijkheid.
              </li>
              <li>
                Kennelijke fouten, typefouten of vergissingen in prijzen,
                aanbiedingen of productinformatie binden W&amp;J Houtbouw niet.
              </li>
              <li>
                Een overeenkomst komt tot stand op het moment dat de klant een
                bestelling plaatst en betaling via iDEAL verricht, W&amp;J
                Houtbouw een maatwerkopdracht schriftelijk bevestigt en de
                aanbetaling is voldaan, of partijen schriftelijk akkoord geven
                op een offerte.
              </li>
              <li>
                Bij maatwerk is de klant verantwoordelijk voor het correct
                aanleveren en controleren van maten, specificaties, kleurkeuzes,
                afwerking en overige wensen.
              </li>
              <li>
                W&amp;J Houtbouw mag een opdracht weigeren indien uitvoering
                naar redelijkheid niet mogelijk, onveilig, ongeschikt of
                bedrijfsmatig niet verantwoord is.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 4 — Producten en materiaaleigenschappen">
            <Ol>
              <li>
                W&amp;J Houtbouw levert premium houten buitenproducten,
                waaronder standaardproducten en maatwerkproducten.
              </li>
              <li>
                Voor houten onderdelen wordt gebruikgemaakt van Douglas hout,
                tenzij anders overeengekomen.
              </li>
              <li>
                Hout is een natuurproduct. Daardoor kunnen kleurverschillen,
                structuurverschillen, noesten, scheurvorming, krimp, uitzetting,
                kromtrekking en vergrijzing ontstaan.
              </li>
              <li>
                Deze natuurlijke eigenschappen horen bij hout en worden niet
                gezien als gebrek, tenzij het product daardoor aantoonbaar niet
                meer normaal functioneert.
              </li>
              <li>
                W&amp;J Houtbouw werkt met robuuste constructies en stalen
                frames, maar buitengebruik blijft afhankelijk van onderhoud,
                belasting, weersinvloeden en ondergrond.
              </li>
              <li>
                De verwachte levensduur van het hout bedraagt circa 15 jaar,
                afhankelijk van gebruik, onderhoud, weersinvloeden, plaatsing en
                omgevingsfactoren.
              </li>
              <li>
                De verwachte levensduur is geen harde garantieperiode, maar een
                realistische indicatie bij normaal gebruik en goed onderhoud.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 5 — Prijzen">
            <Ol>
              <li>
                De prijzen op de website worden standaard inclusief btw
                weergegeven, tenzij duidelijk anders is vermeld.
              </li>
              <li>
                Indien niet anders vermeld, zijn prijzen exclusief eventuele
                bezorgkosten, montagekosten of aanvullende werkzaamheden.
              </li>
              <li>
                W&amp;J Houtbouw mag prijzen wijzigen zolang er nog geen
                overeenkomst tot stand is gekomen.
              </li>
              <li>
                Bij zakelijke opdrachten mag W&amp;J Houtbouw aantoonbare
                prijsstijgingen van grondstoffen, hout, staal, coating,
                transport of andere noodzakelijke materialen doorberekenen
                indien deze na het sluiten van de overeenkomst optreden.
              </li>
              <li>
                Bij consumenten zal W&amp;J Houtbouw prijswijzigingen na
                totstandkoming van de overeenkomst alleen doorvoeren indien dit
                wettelijk is toegestaan of indien de consument daarmee akkoord
                gaat.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 6 — Betaling consumenten en standaardbestellingen">
            <Ol>
              <li>
                Betaling van standaardproducten via de website vindt plaats via
                iDEAL, tenzij schriftelijk anders is overeengekomen.
              </li>
              <li>
                De bestelling wordt pas in behandeling genomen nadat de betaling
                succesvol is ontvangen.
              </li>
              <li>
                Indien betaling niet of niet volledig wordt voldaan, mag W&amp;J
                Houtbouw levering of uitvoering opschorten.
              </li>
              <li>
                Eventuele betaal- of transactiekosten kunnen aan de klant worden
                doorberekend indien dit vooraf duidelijk is vermeld.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 7 — Betaling maatwerk">
            <Ol>
              <li>
                Voor maatwerk geldt standaard een aanbetaling van 60% van het
                totale orderbedrag.
              </li>
              <li>
                De resterende 40% dient te zijn voldaan vóór levering, tenzij
                schriftelijk anders is overeengekomen.
              </li>
              <li>
                W&amp;J Houtbouw start pas met productie of inkoop voor maatwerk
                nadat de aanbetaling is ontvangen.
              </li>
              <li>
                Indien de klant na akkoord en aanbetaling de maatwerkopdracht
                wil annuleren, wijzigen of uitstellen, is W&amp;J Houtbouw
                gerechtigd gemaakte kosten, ingekochte materialen,
                voorbereidingsuren en overige schade in rekening te brengen.
              </li>
              <li>
                Maatwerkproducten zijn uitgesloten van retour en herroeping,
                voor zover wettelijk toegestaan.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 8 — Levering">
            <Ol>
              <li>
                W&amp;J Houtbouw levert in heel Nederland, tenzij schriftelijk
                anders is overeengekomen.
              </li>
              <li>
                Levering gebeurt met eigen vervoer of door een door W&amp;J
                Houtbouw ingeschakelde partij.
              </li>
              <li>
                Voor standaardproducten geldt een indicatieve levertijd van
                circa 3 weken.
              </li>
              <li>
                Voor maatwerkproducten geldt een indicatieve levertijd van circa
                4,5 weken.
              </li>
              <li>
                Levertijden zijn altijd indicatief en gelden niet als fatale
                termijn, tenzij schriftelijk uitdrukkelijk anders is
                overeengekomen.
              </li>
              <li>
                Overschrijding van de levertijd geeft niet automatisch recht op
                schadevergoeding of ontbinding van de overeenkomst.
              </li>
              <li>
                W&amp;J Houtbouw spant zich in om klanten zo goed mogelijk te
                informeren bij vertraging.
              </li>
              <li>
                De klant is verantwoordelijk voor het correct aanleveren van het
                bezorgadres en bereikbaarheid op het moment van levering.
              </li>
              <li>
                Indien levering niet mogelijk is door onjuiste gegevens,
                afwezigheid van de klant, slechte bereikbaarheid of andere
                omstandigheden aan klantzijde, mogen extra kosten voor
                herlevering in rekening worden gebracht.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 9 — Risico-overgang bij levering">
            <Ol>
              <li>
                Bij consumenten gaat het risico van verlies of beschadiging over
                op het moment dat het product aan de consument of een door de
                consument aangewezen derde is geleverd.
              </li>
              <li>
                Bij zakelijke klanten gaat het risico van verlies, beschadiging
                of diefstal over op het moment dat de producten op locatie zijn
                geleverd of gelost.
              </li>
              <li>
                Indien producten na levering op locatie blijven staan in
                afwachting van montage, opslag of verdere verwerking, is de
                klant verantwoordelijk voor bescherming tegen schade, diefstal,
                weersinvloeden of onoordeelkundig gebruik.
              </li>
              <li>
                De klant dient de levering bij ontvangst zo snel mogelijk te
                controleren op zichtbare schade of gebreken.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 10 — Montage en plaatsing">
            <Ol>
              <li>
                Indien montage is overeengekomen, voert W&amp;J Houtbouw de
                montage naar beste inzicht en vakmanschap uit.
              </li>
              <li>
                De klant is verantwoordelijk voor een vlakke, stabiele,
                draagkrachtige en geschikte ondergrond.
              </li>
              <li>
                De klant is verantwoordelijk voor vrije toegang tot de plaats
                waar het product moet worden geleverd of gemonteerd.
              </li>
              <li>
                W&amp;J Houtbouw is niet aansprakelijk voor schade, scheefstand,
                verzakking, instabiliteit of andere problemen die voortvloeien
                uit een ondeugdelijke ondergrond, scheve plaatsing door
                omstandigheden op locatie, verzakking van bestrating, terras,
                grond of fundering, onvoldoende ruimte of bereikbaarheid, of
                door de klant aangeleverde onjuiste informatie.
              </li>
              <li>
                Indien tijdens montage blijkt dat de ondergrond of situatie
                ongeschikt is, mag W&amp;J Houtbouw de werkzaamheden opschorten
                of aanvullende kosten in rekening brengen voor extra
                werkzaamheden.
              </li>
              <li>
                Eventuele aanpassingen aan terrein, bestrating, ondergrond,
                fundering of omgeving vallen niet onder de standaardmontage,
                tenzij schriftelijk overeengekomen.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 11 — Herroepingsrecht consumenten">
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
                Tijdens de bedenktijd dient de consument zorgvuldig om te gaan
                met het product en de verpakking.
              </li>
              <li>
                Retourneren is alleen mogelijk indien het product ongebruikt,
                onbeschadigd, compleet, in originele staat en geschikt voor
                wederverkoop is.
              </li>
              <li>
                De consument dient W&amp;J Houtbouw binnen de herroepingstermijn
                schriftelijk te informeren over de herroeping.
              </li>
              <li>
                Na melding van herroeping dient het product binnen 14 dagen te
                worden geretourneerd, tenzij anders overeengekomen.
              </li>
              <li>
                De directe kosten van retourzending of retourtransport zijn voor
                rekening van de consument, tenzij schriftelijk anders is
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

          <Section title="Artikel 12 — Uitsluiting herroepingsrecht bij maatwerk">
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

          <Section title="Artikel 13 — Retourrecht zakelijke klanten">
            <Ol>
              <li>Zakelijke klanten hebben geen wettelijk herroepingsrecht.</li>
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

          <Section title="Artikel 14 — Garantie algemeen">
            <Ol>
              <li>
                W&amp;J Houtbouw staat in voor de kwaliteit van haar producten
                binnen de grenzen van normaal gebruik, correcte plaatsing, goed
                onderhoud en normale materiaaleigenschappen.
              </li>
              <li>
                Voor consumenten geldt altijd de wettelijke garantie. Dit
                betekent dat een product moet voldoen aan wat de consument daar
                redelijkerwijs van mag verwachten.
              </li>
              <li>
                Daarnaast biedt W&amp;J Houtbouw commerciële garantie: 2 jaar
                garantie op materiaal- en fabricagefouten en 5 jaar garantie op
                constructieve gebreken met betrekking tot dragende werking.
              </li>
              <li>
                De commerciële garantie doet geen afbreuk aan wettelijke rechten
                van consumenten.
              </li>
              <li>
                Garantie geldt uitsluitend voor aantoonbare gebreken die het
                normaal functioneren van het product belemmeren.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 15 — Wat valt onder garantie">
            <Ol>
              <li>Constructief falen van het product.</li>
              <li>
                Breuk van hout die niet verklaarbaar is door normaal gebruik,
                weersinvloeden, houtwerking, overbelasting of onvoldoende
                onderhoud.
              </li>
              <li>
                Problemen met het stalen frame of bevestiging, voor zover deze
                voortkomen uit materiaal- of fabricagefouten.
              </li>
              <li>
                Doorbuiging van het blad of zitgedeelte van meer dan 3 cm, mits
                het product correct is geplaatst, de ondergrond vlak en stabiel
                is, het product normaal is gebruikt, en geen sprake is van
                overbelasting of verkeerd gebruik.
              </li>
              <li>Doorbuiging van 3 cm of minder valt niet onder garantie.</li>
            </Ol>
          </Section>

          <Section title="Artikel 16 — Wat valt niet onder garantie">
            <p className="font-body text-[15px] text-wj-text font-semibold mb-2">
              Hout als natuurproduct
            </p>
            <ul className="list-disc pl-5 mb-5 flex flex-col gap-1">
              {[
                "Scheurvorming, met name aan kopse kanten.",
                "Krimp en uitzetting van het hout.",
                "Kromtrekken binnen normale marges.",
                "Vergrijzing en verkleuring.",
                "Natuurlijke structuurverschillen.",
                "Noesten, kleurverschillen en andere natuurlijke houtkenmerken.",
              ].map((item) => (
                <li key={item} className="font-body text-[15px] text-wj-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-[15px] text-wj-text font-semibold mb-2">
              Gebruik en omgeving
            </p>
            <ul className="list-disc pl-5 mb-5 flex flex-col gap-1">
              {[
                "Slijtage door normaal of intensief gebruik.",
                "Schade door weersinvloeden, waaronder regen, zon, vorst, hitte, vocht en temperatuurschommelingen.",
                "Vocht-, schimmel-, groene aanslag- of vuilvorming.",
                "Schade door verplaatsen, slepen, stoten of verkeerd tillen.",
                "Schade door dieren, vandalisme, brand, storm, extreme weersomstandigheden of andere externe oorzaken.",
              ].map((item) => (
                <li key={item} className="font-body text-[15px] text-wj-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-[15px] text-wj-text font-semibold mb-2">
              Afwerking
            </p>
            <ul className="list-disc pl-5 mb-5 flex flex-col gap-1">
              {[
                "Slijtage, verkleuring of verwering van beits, coating, lak of andere afwerking.",
                "Onderhoudsgevoelige afwerking.",
                "Beschadigingen aan coating of beits door intensief gebruik, reiniging, krassen of weersinvloeden.",
              ].map((item) => (
                <li key={item} className="font-body text-[15px] text-wj-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-[15px] text-wj-text font-semibold mb-2">
              Onderhoud en overig
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {[
                "Onvoldoende of onjuist onderhoud.",
                "Het niet jaarlijks behandelen van beits indien beits is toegepast.",
                "Gebruik van agressieve schoonmaakmiddelen of reinigingsmethoden die niet geschikt zijn voor hout of coating.",
                "Kleine doorbuiging van minder dan of gelijk aan 3 cm.",
                "Esthetische afwijkingen die geen invloed hebben op functionaliteit.",
                "Schade door verkeerde montage door klant of derden.",
                "Schade door een ongeschikte, scheve, verzakte of instabiele ondergrond.",
                "Schade ontstaan na levering door opslag, verplaatsing, weersinvloeden of gebruik door klant of derden.",
              ].map((item) => (
                <li key={item} className="font-body text-[15px] text-wj-muted">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Artikel 17 — Onderhoudsverplichting">
            <Ol>
              <li>
                De klant dient producten normaal en zorgvuldig te onderhouden.
              </li>
              <li>
                Bij behandelde producten, zoals producten met beits, wordt
                jaarlijks opnieuw behandelen nadrukkelijk geadviseerd.
              </li>
              <li>
                Indien de klant nalaat passend onderhoud uit te voeren, kan
                garantie geheel of gedeeltelijk vervallen.
              </li>
              <li>
                Houtproducten dienen periodiek gereinigd te worden en vrij te
                blijven van langdurig opgehoopt vuil, vocht en aanslag.
              </li>
              <li>
                W&amp;J Houtbouw kan onderhoudsadvies geven, maar de klant
                blijft verantwoordelijk voor het uitvoeren van onderhoud.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 18 — Gebruik">
            <Ol>
              <li>
                De producten van W&amp;J Houtbouw zijn ontworpen voor
                buitengebruik.
              </li>
              <li>
                De producten zijn geschikt voor normaal en, afhankelijk van het
                product, intensiever gebruik.
              </li>
              <li>
                Versnelde slijtage door intensief gebruik, bijvoorbeeld bij
                horeca, campings, bedrijven of openbare buitenruimtes, valt niet
                automatisch onder garantie.
              </li>
              <li>
                Gebruik dient binnen normale belasting en normale
                gebruiksomstandigheden te blijven.
              </li>
              <li>
                Het product mag niet worden gebruikt op een manier waarvoor het
                redelijkerwijs niet bedoeld is.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 19 — Garantieafhandeling">
            <Ol>
              <li>
                W&amp;J Houtbouw beoordeelt of een melding onder garantie valt.
              </li>
              <li>
                Bij garantie heeft W&amp;J Houtbouw het recht te kiezen voor
                reparatie, vervanging van onderdelen, herstel op locatie of een
                andere redelijke oplossing.
              </li>
              <li>
                Volledige vervanging van het product is geen standaard recht.
              </li>
              <li>
                Garantie geeft geen recht op aanvullende schadevergoeding,
                gevolgschadevergoeding of vergoeding voor gebruiksderving.
              </li>
              <li>
                W&amp;J Houtbouw streeft ernaar garantie- en servicemeldingen zo
                snel en vriendelijk mogelijk af te handelen.
              </li>
              <li>
                Ook buiten de standaard garantievoorwaarden kan W&amp;J Houtbouw
                in overleg met de klant kijken naar een redelijke passende
                oplossing, zonder dat W&amp;J Houtbouw daartoe verplicht is.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 20 — Procedure bij garantie en klachten">
            <Ol>
              <li>
                De klant dient een gebrek binnen redelijke termijn na ontdekking
                schriftelijk te melden.
              </li>
              <li>
                Zakelijke klanten dienen klachten over zichtbare gebreken binnen
                48 uur na levering schriftelijk te melden.
              </li>
              <li>
                Bij een garantiemelding dient de klant duidelijke foto&apos;s,
                omschrijving van het probleem, ordernummer of factuurgegevens,
                datum van levering en informatie over gebruik, plaatsing en
                onderhoud aan te leveren.
              </li>
              <li>
                W&amp;J Houtbouw mag aanvullende informatie of inspectie
                verlangen voordat een garantieclaim wordt beoordeeld.
              </li>
              <li>
                Indien blijkt dat een melding niet onder garantie valt, mogen
                onderzoekskosten, voorrijkosten, transportkosten of
                herstelkosten in rekening worden gebracht, mits dit vooraf is
                aangegeven of redelijkerwijs voortvloeit uit de situatie.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 21 — Aansprakelijkheid algemeen">
            <Ol>
              <li>
                De aansprakelijkheid van W&amp;J Houtbouw is beperkt tot het
                aankoopbedrag of factuurbedrag van de betreffende levering, voor
                zover wettelijk toegestaan.
              </li>
              <li>
                W&amp;J Houtbouw is niet aansprakelijk voor indirecte schade,
                gevolgschade, bedrijfsschade, omzetverlies, winstderving,
                stagnatieschade of schade door vertraging.
              </li>
              <li>
                W&amp;J Houtbouw is niet aansprakelijk voor schade veroorzaakt
                door verkeerd gebruik, onjuiste montage door klant of derden,
                ongeschikte ondergrond, onvoldoende onderhoud, wijzigingen door
                klant of derden, normale houtwerking, normale slijtage of
                weersinvloeden.
              </li>
              <li>
                De beperkingen in dit artikel gelden niet voor zover
                aansprakelijkheid volgens de wet niet mag worden uitgesloten of
                beperkt.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 22 — Aanvullende B2B-voorwaarden">
            <SubSection title="22.1 Betaling B2B">
              <Ol>
                <li>
                  Voor zakelijke klanten geldt standaard: 60% aanbetaling, 30%
                  vóór levering en 10% binnen 7 dagen na levering.
                </li>
                <li>
                  Afwijkende betalingsafspraken zijn alleen geldig indien
                  schriftelijk overeengekomen.
                </li>
                <li>
                  W&amp;J Houtbouw mag levering opschorten of werkzaamheden
                  stilleggen indien betalingen niet tijdig zijn voldaan.
                </li>
                <li>
                  Bij te late betaling is de zakelijke klant wettelijke
                  handelsrente en redelijke incassokosten verschuldigd.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.2 Levering en risico B2B">
              <Ol>
                <li>
                  Het risico van schade, verlies of diefstal gaat bij zakelijke
                  klanten over op het moment van levering of lossing op locatie.
                </li>
                <li>
                  De zakelijke klant is verantwoordelijk voor bescherming van
                  geleverde producten na levering.
                </li>
                <li>
                  Indien montage later plaatsvindt dan levering, blijven opslag
                  en bescherming in de tussenliggende periode voor rekening en
                  risico van de zakelijke klant.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.3 Ondergrond en plaatsing B2B">
              <Ol>
                <li>
                  De zakelijke klant is verantwoordelijk voor een vlakke,
                  stabiele, geschikte en veilige ondergrond.
                </li>
                <li>
                  Schade of gebreken door ondeugdelijke ondergrond, verzakking,
                  scheefstand of locatieomstandigheden vallen buiten
                  verantwoordelijkheid van W&amp;J Houtbouw.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.4 Maatwerk B2B">
              <Ol>
                <li>
                  Maatwerkproducten worden specifiek geproduceerd voor de
                  zakelijke klant.
                </li>
                <li>
                  Maatwerkopdrachten kunnen na bevestiging niet worden
                  geannuleerd, gewijzigd of geretourneerd, tenzij W&amp;J
                  Houtbouw schriftelijk akkoord gaat.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.5 Aansprakelijkheid B2B">
              <Ol>
                <li>
                  De totale aansprakelijkheid van W&amp;J Houtbouw tegenover
                  zakelijke klanten is beperkt tot het factuurbedrag van de
                  betreffende levering.
                </li>
                <li>
                  W&amp;J Houtbouw is tegenover zakelijke klanten niet
                  aansprakelijk voor indirecte schade, gevolgschade,
                  bedrijfsschade, omzetverlies, winstderving, stagnatieschade of
                  schadeclaims van derden.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.6 Levertijd, vertraging en prijswijzigingen B2B">
              <Ol>
                <li>
                  Levertijden zijn indicatief. Overschrijding geeft zakelijke
                  klanten geen recht op schadevergoeding of ontbinding, tenzij
                  schriftelijk anders is overeengekomen.
                </li>
                <li>
                  Vertraging door leveranciers, transport, materiaaltekorten,
                  weersomstandigheden of andere externe factoren valt buiten
                  verantwoordelijkheid van W&amp;J Houtbouw.
                </li>
                <li>
                  W&amp;J Houtbouw mag prijsstijgingen van grondstoffen,
                  materialen, transport, staal, hout, coating of andere
                  noodzakelijke kosten doorberekenen indien deze na de
                  overeenkomst optreden.
                </li>
              </Ol>
            </SubSection>
            <SubSection title="22.7 Garantie, klachten en eigendomsvoorbehoud B2B">
              <Ol>
                <li>
                  Garantie geeft zakelijke klanten uitsluitend recht op herstel
                  of vervanging van het betreffende onderdeel.
                </li>
                <li>
                  Garantie geeft geen recht op stilstandvergoeding,
                  gevolgschadevergoeding, omzetderving of aanvullende
                  schadevergoeding.
                </li>
                <li>
                  In overleg met de zakelijke klant kan, waar redelijk en
                  haalbaar, gezocht worden naar een passende oplossing buiten de
                  standaard garantievoorwaarden.
                </li>
                <li>
                  Klachten over zichtbare gebreken dienen binnen 48 uur na
                  levering schriftelijk te worden gemeld.
                </li>
                <li>
                  Alle geleverde producten blijven eigendom van W&amp;J Houtbouw
                  totdat volledige betaling is voldaan. Bij uitblijven van
                  betaling is W&amp;J Houtbouw gerechtigd geleverde goederen
                  terug te nemen, voor zover wettelijk toegestaan.
                </li>
              </Ol>
            </SubSection>
          </Section>

          <Section title="Artikel 23 — Eigendomsvoorbehoud algemeen">
            <Ol>
              <li>
                Alle geleverde producten blijven eigendom van W&amp;J Houtbouw
                totdat de klant volledig aan alle betalingsverplichtingen heeft
                voldaan.
              </li>
              <li>
                Zolang het eigendom niet is overgegaan, mag de klant de
                producten niet verkopen, verpanden, verhuren, bewerken of aan
                derden overdragen zonder schriftelijke toestemming van W&amp;J
                Houtbouw.
              </li>
              <li>
                Indien de klant zijn betalingsverplichtingen niet nakomt, mag
                W&amp;J Houtbouw de producten terugnemen voor zover wettelijk
                toegestaan.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 24 — Overmacht">
            <Ol>
              <li>
                W&amp;J Houtbouw is niet gehouden tot nakoming van
                verplichtingen indien sprake is van overmacht.
              </li>
              <li>
                Onder overmacht wordt onder andere verstaan: materiaaltekorten,
                transportproblemen, ziekte, weersomstandigheden, brand,
                overheidsmaatregelen, storingen bij leveranciers, prijs- of
                leveringsproblemen bij derden en omstandigheden buiten de macht
                van W&amp;J Houtbouw.
              </li>
              <li>
                Bij overmacht mag W&amp;J Houtbouw de uitvoering opschorten of
                de overeenkomst geheel of gedeeltelijk ontbinden zonder
                schadeplichtig te zijn.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 25 — Intellectueel eigendom">
            <Ol>
              <li>
                Alle teksten, foto&apos;s, ontwerpen, productbeelden, modellen,
                tekeningen en andere uitingen van W&amp;J Houtbouw blijven
                eigendom van W&amp;J Houtbouw, tenzij schriftelijk anders is
                overeengekomen.
              </li>
              <li>
                Het is niet toegestaan materiaal van W&amp;J Houtbouw te
                kopiëren, gebruiken, verspreiden of commercieel te benutten
                zonder schriftelijke toestemming.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 26 — Klachtenregeling">
            <Ol>
              <li>
                Klachten kunnen schriftelijk worden ingediend via
                info@wjhoutbouw.nl.
              </li>
              <li>
                W&amp;J Houtbouw streeft ernaar klachten zo snel mogelijk en op
                klantvriendelijke wijze af te handelen.
              </li>
              <li>
                Een klacht schort betalingsverplichtingen niet op, tenzij
                schriftelijk anders is overeengekomen.
              </li>
              <li>
                Indien partijen er samen niet uitkomen, kan een consument zich
                wenden tot de bevoegde geschilleninstantie of rechter.
              </li>
            </Ol>
          </Section>

          <Section title="Artikel 27 — Toepasselijk recht">
            <Ol>
              <li>
                Op alle overeenkomsten met W&amp;J Houtbouw is Nederlands recht
                van toepassing.
              </li>
              <li>
                Geschillen worden voorgelegd aan de bevoegde rechter in
                Nederland, tenzij dwingend recht anders bepaalt.
              </li>
            </Ol>
          </Section>
        </div>
      </div>
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
      <h2 className="font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] mb-5">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="font-body font-semibold text-[14px] tracking-[0.04em] uppercase text-wj-muted mb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return <ol className="flex flex-col gap-2 list-decimal pl-5">{children}</ol>;
}
