"use client";

import BrandButton from "@modules/common/components/brand-button";
import { confirmWithdrawal } from "@lib/data/orders";
import { useState } from "react";

type Props = {
  orderId: string;
  token: string;
  displayId: number;
};

type State = "idle" | "loading" | "success" | "error";

const WithdrawalConfirmActions = ({ orderId, token, displayId }: Props) => {
  const [state, setState] = useState<State>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setState("loading");
    setErrorMessage(null);

    const result = await confirmWithdrawal(orderId, token);

    if (result.success) {
      setState("success");
    } else {
      setErrorMessage(result.error);
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-body text-[15px] text-wj-green font-medium">
          Uw herroeping is bevestigd. De retourperiode van 14 dagen is nu
          gestart.
        </p>
        <p className="font-body text-[14px] text-wj-muted">
          U ontvangt ook een bevestiging per e-mail met instructies voor het
          terugsturen van uw bestelling.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(state === "idle" || state === "loading") && (
        <>
          <p className="font-body text-[15px] text-wj-text">
            U staat op het punt uw herroeping van bestelling #{displayId} te
            bevestigen. Na bevestiging start de retourperiode van 14 dagen.
          </p>
          <div>
            <BrandButton
              variant="solid"
              size="md"
              onClick={handleConfirm}
              disabled={state === "loading"}
            >
              {state === "loading"
                ? "Bezig..."
                : "Bevestig herroeping"}
            </BrandButton>
          </div>
        </>
      )}

      {state === "error" && (
        <div className="flex flex-col gap-3">
          <p className="font-body text-[14px] text-red-600">
            {errorMessage === "Ongeldige bevestigingslink"
              ? "Deze bevestigingslink is ongeldig of al gebruikt."
              : errorMessage === "Geen openstaand herroepingsverzoek gevonden"
              ? "Er is geen openstaand herroepingsverzoek gevonden voor deze bestelling."
              : "Er is iets misgegaan. Neem contact op via info@wjhoutbouw.nl."}
          </p>
        </div>
      )}
    </div>
  );
};

export default WithdrawalConfirmActions;
