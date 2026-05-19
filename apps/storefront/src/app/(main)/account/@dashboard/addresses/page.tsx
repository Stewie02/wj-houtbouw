import { Metadata } from "next";
import { notFound } from "next/navigation";

import AddressBook from "@modules/account/components/address-book";

import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Adressen",
  description: "Bekijk en beheer je bezorgadressen.",
};

export default async function Addresses() {
  const customer = await retrieveCustomer();
  const region = await getRegion();

  if (!customer || !region) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8">
        <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
          Mijn account
        </p>
        <h1 className="font-display font-bold text-[28px] text-wj-text tracking-[-0.02em] mb-2">
          Adressen
        </h1>
        <p className="font-body text-[14px] text-wj-muted">
          Beheer je bezorgadressen. Opgeslagen adressen zijn beschikbaar tijdens het afrekenen.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  );
}
