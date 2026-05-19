import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Help = () => {
  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em] mb-4">
        Hulp nodig?
      </h2>
      <div className="flex flex-col gap-2">
        <LocalizedClientLink
          href="/contact"
          className="font-body text-[14px] text-wj-green hover:underline"
        >
          Neem contact op
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/contact"
          className="font-body text-[14px] text-wj-green hover:underline"
        >
          Retour &amp; ruilen
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default Help;
