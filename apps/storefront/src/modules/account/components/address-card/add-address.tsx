"use client";

import { Plus } from "@medusajs/icons";
import { Heading } from "@modules/common/components/ui";
import BrandButton from "@modules/common/components/brand-button";
import { useActionState, useEffect, useState } from "react";

import { addCustomerAddress } from "@lib/data/customer";
import useToggleState from "@lib/hooks/use-toggle-state";
import { HttpTypes } from "@medusajs/types";
import CountrySelect from "@modules/checkout/components/country-select";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";

const AddAddress = ({
  region,
  addresses: _addresses,
}: {
  region: HttpTypes.StoreRegion;
  addresses: HttpTypes.StoreCustomerAddress[];
}) => {
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  return (
    <>
      <button
        className="border border-wj-border border-dashed p-5 min-h-[180px] h-full w-full flex flex-col items-center justify-center gap-3 hover:border-wj-green hover:bg-wj-green-light transition-colors"
        onClick={open}
        data-testid="add-address-button"
      >
        <Plus className="text-wj-muted w-5 h-5" />
        <span className="font-body text-[13px] font-medium text-wj-muted">
          Add new address
        </span>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Add address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Toevoeging"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="text-rose-500 text-small-regular py-2"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <BrandButton
                type="reset"
                variant="outline"
                onClick={close}
                data-testid="cancel-button"
              >
                Cancel
              </BrandButton>
              <SubmitButton data-testid="save-button">
                Save address
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddAddress;
