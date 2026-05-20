import { Metadata } from "next";

import ProfileForm from "@modules/account/components/profile-form";
import ProfileBillingAddress from "@modules/account/components/profile-billing-address";
import { notFound } from "next/navigation";
import { listRegions } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Profiel",
  description: "Bekijk en bewerk je accountgegevens.",
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8">
        <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
          Mijn account
        </p>
        <h1 className="font-display font-bold text-[28px] text-wj-text tracking-[-0.02em] mb-2">
          Profiel
        </h1>
        <p className="font-body text-[14px] text-wj-muted">
          Bekijk en bewerk je gegevens, zoals je naam, e-mailadres en telefoonnummer.
        </p>
      </div>
      <div className="w-full">
        <ProfileForm customer={customer} />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}
