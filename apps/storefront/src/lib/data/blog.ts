export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO 8601, e.g. "2026-05-01"
  excerpt: string;
  image?: string;
  sections: { heading?: string; body: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "douglas-buitenmeubilair-topconditie",
    title: "Zo houd je jouw Douglas buitenmeubilair in topconditie",
    category: "Onderhoud",
    date: "2026-05-01",
    excerpt:
      "Douglas hout staat bekend om zijn natuurlijke sterkte en weerbestendigheid. Toch is een beetje aandacht per jaar het verschil tussen meubilair dat er na vijf jaar versleten uitziet, en meubilair dat na twintig jaar nog steeds staat als een huis.",
    sections: [
      {
        body: "Douglas hout staat bekend om zijn natuurlijke sterkte en weerbestendigheid. Toch is een beetje aandacht per jaar het verschil tussen meubilair dat er na vijf jaar versleten uitziet, en meubilair dat na twintig jaar nog steeds staat als een huis.",
      },
      {
        heading: "Eén keer per jaar beitsen, meer heb je niet nodig",
        body: "Het mooie aan Douglas is dat het weinig vraagt. Wie zijn meubilair één keer per jaar opnieuw beitst, geeft het hout een beschermende laag tegen vocht, UV-straling en temperatuurwisselingen. Het resultaat: een langere levensduur én een consistent mooie uitstraling, jaar na jaar. Het beste moment? Het voorjaar, als het droog is en het buitenseizoen weer begint.",
      },
      {
        heading: "Slim plaatsen is het halve werk",
        body: "Waar je jouw meubilair neerzet, maakt meer uit dan de meeste mensen denken. Onder of vlak naast bomen lijkt misschien een mooie plek, maar vallende bladeren, takken en vogeluitwerpselen zorgen voor ongelijkmatige verkleuringen en ophoping van vocht. Kies bij voorkeur een open ruimte waar lucht vrij kan circuleren en het hout gelijkmatig verweert. Zo behoudt het zijn natuurlijke, egale uitstraling.",
      },
      {
        heading: "Weinig moeite, tientallen jaren plezier",
        body: "Douglas meubilair is geen wegwerpartikel. Met een jaarlijkse beitsbeurt en een doordachte opstelling gaat het gemakkelijk twintig jaar mee, zonder grote ingrepen of hoge kosten. Dat is waar wij voor bouwen, en waar jij jarenlang van geniet.",
      },
    ],
  },
  {
    slug: "buitenmeubilair-zakelijke-opdrachtgevers",
    title: "Buitenmeubilair op maat voor zakelijke opdrachtgevers",
    category: "B2B",
    date: "2026-05-01",
    excerpt:
      "Standaard is niet altijd voldoende. Zeker niet als je als bedrijf wil dat elk detail klopt, van de uitstraling van je terras tot het logo op je meubilair.",
    sections: [
      {
        body: "Standaard is niet altijd voldoende. Zeker niet als je als bedrijf wil dat elk detail klopt, van de uitstraling van je terras tot het logo op je meubilair. Bij W&J Houtbouw maken we buitenmeubilair volledig naar wens, voor zakelijke opdrachtgevers die niet willen inleveren op kwaliteit of identiteit.",
      },
      {
        heading: "Maatwerk zonder grenzen",
        body: "Of je nu een specifieke maat nodig hebt, een bijzonder ontwerp voor ogen hebt, of je bedrijfslogo wil laten inlaseren in het hout: wij maken het. Geen catalogus waar je uit moet kiezen, maar een gesprek over wat jij nodig hebt. Van picknicktafel tot loungeset, van standaardmodel tot volledig uniek ontwerp. Als jij het kan bedenken, bouwen wij het.",
      },
      {
        heading: "Douglas hout voor zwaar gebruik",
        body: "Zakelijk meubilair krijgt het zwaarder te verduren dan meubilair bij particulieren thuis. Meer gebruikers, meer wisselende weersomstandigheden, meer slijtage. Douglas hout is daar uitermate geschikt voor: van nature sterk, harsrijk en weerbestendig. Met een jaarlijkse beitsbeurt gaat het tientallen jaren mee, ook bij intensief gebruik.",
      },
      {
        heading: "Persoonlijk contact, van begin tot eind",
        body: "Bij W&J Houtbouw werk je altijd rechtstreeks met de makers. Geen tussenhandel, geen accountmanagers. Jij vertelt wat je nodig hebt, wij denken mee en bouwen het. Zo weet je precies wat je krijgt, en waarom het zo gemaakt is.",
      },
    ],
  },
  {
    slug: "van-ruwe-plank-tot-afgewerkt-meubelstuk",
    title: "Van ruwe plank tot afgewerkt meubelstuk: zo werken wij",
    category: "Achter de schermen",
    date: "2026-05-01",
    excerpt:
      "Elk stuk meubilair dat W&J Houtbouw verlaat heeft een reis gemaakt. Van ruwe plank tot afgewerkt product, elke stap wordt met zorg gezet. Geen fabriekswerk, geen shortcuts.",
    sections: [
      {
        body: "Elk stuk meubilair dat W&J Houtbouw verlaat heeft een reis gemaakt. Van ruwe plank tot afgewerkt product, elke stap wordt met zorg gezet. Geen fabriekswerk, geen shortcuts. Dit is hoe het bij ons gaat.",
      },
      {
        heading: "Stap 1: Het hout",
        body: "Alles begint bij de juiste grondstof. Wij kopen ons Douglas hout in bij een vaste, betrouwbare leverancier die net zo hoog inzet op kwaliteit als wij. Geen compromissen aan het begin betekent geen teleurstellingen aan het einde.",
      },
      {
        heading: "Stap 2: Op maat maken",
        body: "Het hout wordt in onze werkplaats in Drachten op maat gezaagd en bewerkt met de juiste machines. Elke maat, elke hoek, elke verbinding wordt nauwkeurig uitgevoerd. Hier begint het vakmanschap.",
      },
      {
        heading: "Stap 3: De frames",
        body: "Terwijl het hout klaarligt, komen de stalen frames binnen van onze vaste staal leverancier. Elke frame wordt voorzien van een tweelaagse poedercoating, roestwerend en gebouwd voor buiten. Sterk van binnen, strak van buiten.",
      },
      {
        heading: "Stap 4: Jouw voorkeuren",
        body: "Voordat alles in elkaar gaat, lopen we alle opties door die de klant heeft aangevraagd. Wil je een rugleuning? Welke beitskleur? Stoelen erbij? Specifieke wensen? Dit is het moment waarop jouw meubilair écht van jou wordt.",
      },
      {
        heading: "Stap 5: Assemblage en afwerking",
        body: "Dan komt alles samen. Hout op frame, schroef voor schroef, met de hand afgewerkt. Elk product verlaat onze werkplaats pas als het aan onze eigen standaard voldoet.",
      },
      {
        heading: "Stap 6: Bezorging door onszelf",
        body: "Wij bezorgen onze producten zelf. Geen anonieme pakketdienst, maar de mensen die het gemaakt hebben. Zo zijn we zeker dat het goed aankomt, en kunnen we je meteen alles vertellen over onderhoud en gebruik.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
