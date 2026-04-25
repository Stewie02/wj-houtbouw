import PlaceholderImage from "@modules/common/components/placeholder-image"

const MATERIALS = [
  {
    num: "01",
    name: "Douglas Fir",
    desc: "Warm, strong, and naturally resinous. Used in our Classic Picnic Table and Garden Bench — our most popular timber for its durability and classic look.",
    note: "From €349",
    dark: false,
  },
  {
    num: "02",
    name: "European Oak",
    desc: "Dense grain and outstanding weather resistance. The timber we chose for our Round Garden Table — our premium option for those who want it all.",
    note: "From €849",
    dark: true,
  },
  {
    num: "03",
    name: "FSC Certified",
    desc: "Both timbers are sourced exclusively from FSC-certified European forests managed for long-term sustainability. Same supplier since 2009.",
    note: "Both products",
    dark: false,
  },
]

const MaterialsSection = () => {
  return (
    <div className="py-20 sm:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2.5">
            What we build with
          </div>
          <h2 className="font-display font-bold text-[30px] sm:text-[38px] text-wj-text tracking-[-0.02em]">
            Three exceptional timbers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
          {MATERIALS.map((m) => (
            <div
              key={m.name}
              className={`p-10 sm:p-12 ${m.dark ? "bg-wj-green" : "bg-wj-surface"}`}
            >
              <div className="mb-6 h-[120px] opacity-70">
                <PlaceholderImage label={`${m.name} timber texture`} dark={m.dark} />
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
  )
}

export default MaterialsSection
