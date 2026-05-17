"use client";

import BrandButton from "@modules/common/components/brand-button";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | null;
  size?: "small" | "medium" | "large";
  className?: string;
  "data-testid"?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <BrandButton
      type="submit"
      size="lg"
      full
      disabled={pending}
      className={className}
      data-testid={dataTestId}
    >
      {pending ? "Processing…" : children}
    </BrandButton>
  );
}
