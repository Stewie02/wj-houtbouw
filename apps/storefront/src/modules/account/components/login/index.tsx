import { login } from "@lib/data/customer";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { useActionState } from "react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div data-testid="login-page">
      <h2 className="font-display font-bold text-[26px] text-wj-text tracking-[-0.02em] mb-2">
        Inloggen
      </h2>
      <p className="font-body text-[14px] text-wj-muted mb-8">
        Welkom terug. Log in om je bestellingen en account te beheren.
      </p>

      <form className="flex flex-col gap-4" action={formAction}>
        <Input
          label="E-mailadres"
          name="email"
          type="email"
          autoComplete="email"
          required
          data-testid="email-input"
        />
        <Input
          label="Wachtwoord"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          data-testid="password-input"
        />
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button">Inloggen</SubmitButton>
      </form>

      <p className="font-body text-[13px] text-wj-muted text-center mt-6">
        Nog geen account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-wj-green font-medium hover:underline"
          data-testid="register-button"
        >
          Maak er een aan
        </button>
      </p>
    </div>
  );
};

export default Login;
