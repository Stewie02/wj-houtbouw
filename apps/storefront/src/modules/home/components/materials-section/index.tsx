import Image from "next/image";

const MATERIALS = [
  {
    num: "01",
    name: "Poedergecoat staal",
    desc: "De frames van ons meubilair zijn voorzien van een tweelaagse poedercoating. Roestwerend en gebouwd voor alle weersomstandigheden. Strak in combinatie met het warme Douglas hout.",
    note: "Op elk product",
    dark: false,
    image: "/images/material-staal.webp",
  },
  {
    num: "02",
    name: "Douglas hout",
    desc: "Douglas spar groeit van nature in de bossen van Noord-Amerika en West-Europa. Harsrijk, sterk en van nature weerbestendig zonder verduurzamingsmiddelen. Bij goed onderhoud gaat Douglas meubilair gemiddeld 20 jaar mee.",
    note: "Onze basis",
    dark: true,
    image: "/images/material-douglas.webp",
  },
  {
    num: "03",
    name: "Gemaakt in Drachten",
    desc: "Elk stuk wordt met de hand gemaakt in onze werkplaats in Drachten. Van zaag tot schroef, wij maken het zelf. Geen tussenhandel, geen fabriekswerk.",
    note: "Altijd persoonlijk",
    dark: false,
    image: "/images/material-drachten.webp",
  },
];

const MaterialsSection = () => {
  return (
    <div className="py-20 sm:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2.5">
            Waar we mee bouwen
          </div>
          <h2 className="font-display font-bold text-[30px] sm:text-[38px] text-wj-text tracking-[-0.02em]">
            Vakmanschap begint bij het materiaal
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
          {MATERIALS.map((m) => (
            <div
              key={m.name}
              className={`p-10 sm:p-12 ${
                m.dark ? "bg-wj-green" : "bg-wj-surface"
              }`}
            >
              <div className="relative mb-6 h-[120px] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <div
                className={`font-body font-semibold text-[11px] tracking-[0.08em] uppercase mb-2.5 ${
                  m.dark ? "text-[rgba(255,255,255,0.5)]" : "text-wj-wood"
                }`}
              >
                {m.num}
              </div>
              <div
                className={`font-display font-semibold text-[24px] mb-3 ${
                  m.dark ? "text-wj-white" : "text-wj-text"
                }`}
              >
                {m.name}
              </div>
              <p
                className={`font-body text-[14px] leading-[1.7] mb-5 ${
                  m.dark ? "text-[rgba(255,255,255,0.65)]" : "text-wj-muted"
                }`}
              >
                {m.desc}
              </p>
              <div
                className={`font-body font-medium text-[13px] ${
                  m.dark ? "text-wj-wood" : "text-wj-green"
                }`}
              >
                {m.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialsSection;
