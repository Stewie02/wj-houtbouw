"use client";

import { useActionState } from "react";
import Input from "@modules/common/components/input";
import CustomerFields from "@modules/account/components/customer-fields";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { signup } from "@lib/data/customer";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(
    signup as (
      state: string | null,
      formData: FormData
    ) => Promise<string | null>,
    null as string | null
  );

  return (
    <div data-testid="register-page">
      <h2 className="font-display font-bold text-[26px] text-wj-text tracking-[-0.02em] mb-2">
        Account aanmaken
      </h2>
      <p className="font-body text-[14px] text-wj-muted mb-8">
        Bekijk je bestelgeschiedenis, sla adressen op en reken sneller af.
      </p>

      <form className="flex flex-col gap-4" action={formAction}>
        <CustomerFields />
        <Input
          label="Wachtwoord"
          name="password"
          required
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
        />
        <ErrorMessage error={message} data-testid="register-error" />
        <SubmitButton data-testid="register-button">
          Account aanmaken
        </SubmitButton>
      </form>

      <p className="font-body text-[13px] text-wj-muted text-center mt-6">
        Al een account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-wj-green font-medium hover:underline"
        >
          Inloggen
        </button>
      </p>
    </div>
  );
};

export default Register;
