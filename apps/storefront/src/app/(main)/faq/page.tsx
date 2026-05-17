import { Metadata } from "next";
import FaqAccordion from "@modules/faq/components/faq-accordion";

export const metadata: Metadata = {
  title: "Veelgestelde vragen — WJ Houtbouw",
  description:
    "Antwoorden op veelgestelde vragen over ons hout, maatwerk, onderhoud en bezorging.",
};

const FAQ_CATEGORIES = [
  {
    title: "Product & Materiaal",
    items: [
      {
        question: "Wat voor hout gebruiken jullie?",
        answer:
          "Wij werken hoofdzakelijk met Douglas hout, een sterke harsrijke houtsoort die van nature weerbestendig is. Douglas is ideaal voor buitengebruik en heeft bij goed onderhoud een levensduur van gemiddeld 20 jaar.",
      },
      {
        question: "Hoe lang gaat het meubilair mee?",
        answer:
          "Bij goed onderhoud gaat ons meubilair gemiddeld 20 jaar mee. Eén keer per jaar beitsen is voldoende om de levensduur en uitstraling optimaal te houden.",
      },
      {
        question: "Roest het stalen frame niet?",
        answer:
          "Nee. Alle frames zijn voorzien van een tweelaagse poedercoating, volledig roestwerend. Dit maakt de frames geschikt voor alle weersomstandigheden.",
      },
    ],
  },
  {
    title: "Maatwerk & Bestellen",
    items: [
      {
        question: "Kunnen jullie op maat maken?",
        answer:
          "Absoluut. Wij voeren volledig maatwerk uit, van specifieke afmetingen en ontwerpen tot het inlaseren van een bedrijfslogo in het hout. Als jij het kunt bedenken, bouwen wij het.",
      },
      {
        question: "Wat zijn de levertijden?",
        answer:
          "Wij hanteren een gemiddelde levertijd van 3 weken. Bij maatwerk kan dit iets langer zijn. We houden je tijdens het proces altijd op de hoogte.",
      },
      {
        question: "Hoe verloopt een bestelling?",
        answer:
          "Na je bestelling of aanvraag nemen wij persoonlijk contact met je op. We lopen samen alle opties door: materiaal, afmetingen, afwerking en eventuele extra wensen, voordat we beginnen met bouwen.",
      },
    ],
  },
  {
    title: "Onderhoud",
    items: [
      {
        question: "Hoe onderhoud ik mijn meubilair?",
        answer:
          "Eenvoudig: beits het hout één keer per jaar opnieuw. Zo behoud je de beschermlaag, uitstraling en levensduur.",
      },
      {
        question: "Kan het meubilair buiten blijven in de winter?",
        answer:
          "Ja, ons meubilair is gebouwd om buiten te staan, ook in de winter. Wel adviseren wij om het op een open plek te plaatsen, weg van bomen en struiken. Vallende bladeren en vogeluitwerpsels kunnen zorgen voor ongelijkmatige verkleuringen.",
      },
    ],
  },
  {
    title: "Levering & Prijs",
    items: [
      {
        question: "Bezorgen jullie zelf?",
        answer:
          "Ja, wij bezorgen onze producten altijd zelf. Geen anonieme pakketdienst, maar de mensen die het gemaakt hebben. Zo weet je zeker dat alles goed aankomt en krijg je direct uitleg over je nieuwe meubilair.",
      },
      {
        question: "Wat kost bezorging?",
        answer:
          "Bezorging is gratis binnen een straal van 100 km. Buiten deze straal rekenen wij €75,- bezorgkosten.",
      },
      {
        question: "Is er een minimale afname voor zakelijke bestellingen?",
        answer:
          "Nee, er is geen minimale afname. Of je nu één stuk bestelt of een complete inrichting, wij helpen je met dezelfde aandacht.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="bg-wj-bg">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Veelgestelde vragen
          </h1>
        </div>
      </div>
      <FaqAccordion categories={FAQ_CATEGORIES} />
    </div>
  );
}
