"use client";

import { useActionState } from "react";
import CustomerFields from "@modules/account/components/customer-fields";
import BrandButton from "@modules/common/components/brand-button";
import { updateCustomer } from "@lib/data/customer";
import { HttpTypes } from "@medusajs/types";

type Props = {
  customer: HttpTypes.StoreCustomer;
};

const ProfileForm = ({ customer }: Props) => {
  const updateProfile = async (
    _currentState: { success: boolean; error: string | null },
    formData: FormData
  ) => {
    try {
      await updateCustomer({
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
        company_name: formData.get("company_name") as string,
      });
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  };

  const [state, formAction, pending] = useActionState(updateProfile, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction} className="flex flex-col gap-4" data-testid="profile-form">
      <CustomerFields defaultValues={customer} emailDisabled />

      {state.success && (
        <p className="font-body text-[13px] text-wj-green bg-wj-green-light px-3 py-2" data-testid="success-message">
          Profiel bijgewerkt
        </p>
      )}
      {state.error && (
        <p className="font-body text-[13px] text-red-700 bg-red-50 px-3 py-2" data-testid="error-message">
          {state.error}
        </p>
      )}

      <div className="flex justify-end">
        <BrandButton type="submit" disabled={pending} data-testid="save-button">
          {pending ? "Opslaan..." : "Wijzigingen opslaan"}
        </BrandButton>
      </div>
    </form>
  );
};

export default ProfileForm;
