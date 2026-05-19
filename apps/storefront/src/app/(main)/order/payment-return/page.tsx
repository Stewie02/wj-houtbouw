"use client";

import { placeOrder } from "@lib/data/cart";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirect_status = searchParams.get("redirect_status");
    const cart_id = searchParams.get("cart_id");

    if (redirect_status !== "succeeded" || !cart_id) {
      router.replace("/checkout");
      return;
    }

    placeOrder(cart_id).catch((err) => {
      setError(err?.message ?? "Er is iets misgegaan bij het plaatsen van je bestelling.");
    });
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md text-center px-4">
          <p className="font-body text-[14px] text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.replace("/checkout")}
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
          >
            Terug naar afrekenen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="font-body text-[14px] text-wj-muted">
        Betaling wordt verwerkt…
      </p>
    </div>
  );
}
