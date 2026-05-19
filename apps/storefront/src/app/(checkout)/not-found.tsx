import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Pagina niet gevonden",
};

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="font-display font-bold text-[28px] text-wj-text tracking-[-0.02em]">
        Pagina niet gevonden
      </h1>
      <p className="font-body text-[14px] text-wj-muted">
        De pagina die je zocht bestaat niet.
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
