import Input from "@modules/common/components/input";

type Props = {
  defaultValues?: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string;
    phone?: string | null;
    company_name?: string | null;
  };
  emailDisabled?: boolean;
};

const CustomerFields = ({ defaultValues, emailDisabled }: Props) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Voornaam"
        name="first_name"
        required
        autoComplete="given-name"
        defaultValue={defaultValues?.first_name ?? ""}
        data-testid="first-name-input"
      />
      <Input
        label="Achternaam"
        name="last_name"
        required
        autoComplete="family-name"
        defaultValue={defaultValues?.last_name ?? ""}
        data-testid="last-name-input"
      />
    </div>
    <Input
      label="E-mailadres"
      name="email"
      type="email"
      autoComplete="email"
      required={!emailDisabled}
      disabled={emailDisabled}
      defaultValue={defaultValues?.email ?? ""}
      data-testid="email-input"
    />
    <Input
      label="Telefoonnummer (optioneel)"
      name="phone"
      type="tel"
      autoComplete="tel"
      defaultValue={defaultValues?.phone ?? ""}
      data-testid="phone-input"
    />
    <Input
      label="Bedrijfsnaam (optioneel)"
      name="company_name"
      autoComplete="organization"
      defaultValue={defaultValues?.company_name ?? ""}
      data-testid="company-name-input"
    />
  </>
);

export default CustomerFields;
