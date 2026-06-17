import { retrieveOrder } from "@lib/data/orders";
import WithdrawalConfirmActions from "@modules/order/components/withdrawal-confirm-actions";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Herroeping bevestigen",
  description: "Bevestig uw herroepingsverzoek.",
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function WithdrawalConfirmationPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { id } = params;
  const token = searchParams.token;

  const order = await retrieveOrder(id).catch(() => null);

  if (!order) {
    return notFound();
  }

  const alreadyConfirmed = order.metadata?.withdrawal_status === "confirmed";

  return (
    <div className="bg-wj-bg min-h-screen">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="font-body text-[12px] tracking-[0.1em] uppercase text-wj-muted mb-3">
            <LocalizedClientLink
              href="/"
              className="hover:text-wj-white transition-colors"
            >
              Home
            </LocalizedClientLink>
            {" / "}
            <span className="text-wj-white">Herroeping bevestigen</span>
          </p>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Herroeping bevestigen
          </h1>
          <p className="font-body text-wj-muted mt-2 text-[15px]">
            Bestelling #{order.display_id}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="max-w-[600px]">
          <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-1">
                Herroepingsrecht
              </p>
              <h2 className="font-display font-bold text-[22px] text-wj-text tracking-[-0.02em]">
                Bestelling #{order.display_id} herroepen
              </h2>
            </div>

            {alreadyConfirmed ? (
              <div className="flex flex-col gap-2">
                <p className="font-body text-[15px] text-wj-green font-medium">
                  Uw herroeping is al bevestigd.
                </p>
                <p className="font-body text-[14px] text-wj-muted">
                  De retourperiode is al gestart. Neem contact op via{" "}
                  <a
                    href="mailto:info@wjhoutbouw.nl"
                    className="text-wj-green hover:underline"
                  >
                    info@wjhoutbouw.nl
                  </a>{" "}
                  voor instructies over het terugsturen.
                </p>
              </div>
            ) : !token ? (
              <p className="font-body text-[14px] text-red-600">
                Ongeldige bevestigingslink. Controleer de link in uw e-mail.
              </p>
            ) : (
              <WithdrawalConfirmActions
                orderId={id}
                token={token}
                displayId={order.display_id ?? 0}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
