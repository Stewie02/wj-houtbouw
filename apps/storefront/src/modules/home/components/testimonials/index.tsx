// Not used on the homepage for now
import StarRating from "@modules/common/components/star-rating";

const TESTIMONIALS = [
  {
    quote:
      "Ordered two tables for our terrace. The quality is exceptional — solid, heavy, and beautifully finished. Three summers in and they look as good as new.",
    name: "Marieke V.",
    location: "Utrecht",
  },
  {
    quote:
      "Fast delivery, perfect packaging, and the craftsmanship speaks for itself. Our kids absolutely love the children's table.",
    name: "Thomas B.",
    location: "Amsterdam",
  },
  {
    quote:
      "Bought the round oak table for our garden. Every guest asks where it's from. Highly recommend.",
    name: "Sandra K.",
    location: "Antwerp",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-wj-dark py-20 sm:py-[88px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-[#6B6058] text-center mb-3">
          Customer reviews
        </div>
        <h2 className="font-display font-bold text-[30px] sm:text-[38px] text-wj-white tracking-[-0.02em] text-center mb-12 sm:mb-14">
          What our customers say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#1E1B18] p-8 sm:p-9 border border-[#2A2520]"
            >
              <StarRating className="mb-5" />
              <p className="font-display font-normal italic text-[16px] sm:text-[17px] text-[#D5CFC7] leading-[1.65] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="font-body font-medium text-[13px] text-wj-white">
                {t.name}
              </div>
              <div className="font-body text-[12px] text-[#6B6058] mt-0.5">
                {t.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
