"use client";

import { HttpTypes } from "@medusajs/types";
import BrandButton from "@modules/common/components/brand-button";
import { requestWithdrawal } from "@lib/data/orders";
import { useState } from "react";

type Props = {
  order: HttpTypes.StoreOrder;
};

type State = "idle" | "confirming" | "loading" | "success" | "error";

const WITHDRAWAL_DAYS = 14;

const isWithinWithdrawalWindow = (deliveredAt: string): boolean => {
  const delivered = new Date(deliveredAt).getTime();
  const now = Date.now();
  const daysSince = (now - delivered) / (1000 * 60 * 60 * 24);
  return daysSince <= WITHDRAWAL_DAYS;
};

const WithdrawalButton = ({ order }: Props) => {
  const withdrawalStatus = order.metadata?.withdrawal_status as
    | string
    | undefined;
  const deliveredAt = order.metadata?.delivered_at as string | undefined;

  const alreadyRequested = withdrawalStatus === "requested";
  const alreadyConfirmed = withdrawalStatus === "confirmed";

  const withinWindow =
    !!deliveredAt && isWithinWithdrawalWindow(deliveredAt);

  const hidden =
    order.status === "cancelled" ||
    (order.fulfillment_status as string) === "returned" ||
    alreadyConfirmed ||
    !withinWindow;

  const [state, setState] = useState<State>(
    alreadyRequested ? "success" : "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (hidden) return null;

  const handleRequest = async () => {
    setState("loading");
    setErrorMessage(null);

    const result = await requestWithdrawal(order.id);

    if (result.success) {
      setState("success");
    } else {
      setErrorMessage(result.error);
      setState("error");
    }
  };

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-4">
      <div>
        <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-1">
          Herroepingsrecht
        </p>
        <p className="font-body text-[14px] text-wj-muted">
          Binnen 14 dagen na ontvangst kunt u uw bestelling herroepen. Na het
          klikken op de knop ontvangt u een e-mail om de herroeping te
          bevestigen.
        </p>
      </div>

      {state === "idle" && (
        <div>
          <BrandButton
            variant="outline"
            size="sm"
            onClick={() => setState("confirming")}
          >
            Herroep deze bestelling
          </BrandButton>
        </div>
      )}

      {state === "confirming" && (
        <div className="flex flex-col gap-3">
          <p className="font-body text-[14px] text-wj-text font-medium">
            Weet u zeker dat u bestelling #{order.display_id} wilt herroepen?
          </p>
          <div className="flex gap-3">
            <BrandButton variant="outline" size="sm" onClick={handleRequest}>
              Ja, herroep bestelling
            </BrandButton>
            <BrandButton
              variant="ghost"
              size="sm"
              onClick={() => setState("idle")}
            >
              Annuleer
            </BrandButton>
          </div>
        </div>
      )}

      {state === "loading" && (
        <p className="font-body text-[14px] text-wj-muted">Bezig...</p>
      )}

      {state === "success" && (
        <p className="font-body text-[14px] text-wj-green font-medium">
          Herroepingsverzoek ontvangen. Check uw e-mail om de herroeping te
          bevestigen.
        </p>
      )}

      {state === "error" && (
        <div className="flex flex-col gap-2">
          <p className="font-body text-[14px] text-red-600">
            {errorMessage ?? "Er is iets misgegaan. Probeer het opnieuw."}
          </p>
          <div>
            <BrandButton
              variant="outline"
              size="sm"
              onClick={() => setState("idle")}
            >
              Opnieuw proberen
            </BrandButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalButton;
