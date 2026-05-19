import { Metadata } from "next";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const metadata: Metadata = {
  title: "404",
  description: "Winkelwagen niet gevonden",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="font-display font-bold text-[28px] text-wj-text tracking-[-0.02em]">
        Winkelwagen niet gevonden
      </h1>
      <p className="font-body text-[14px] text-wj-muted">
        De winkelwagen bestaat niet meer. Verwijder je cookies en probeer het opnieuw.
      </p>
      <LocalizedClientLink
        href="/"
        className="font-body text-[14px] font-medium text-wj-green hover:underline"
      >
        Terug naar de startpagina
      </LocalizedClientLink>
    </div>
  );
}
