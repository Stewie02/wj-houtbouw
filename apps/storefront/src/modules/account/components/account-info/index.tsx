import { Disclosure } from "@headlessui/react";
import { clx } from "@modules/common/components/ui";
import { useEffect } from "react";
import useToggleState from "@lib/hooks/use-toggle-state";
import { useFormStatus } from "react-dom";
import BrandButton from "@modules/common/components/brand-button";

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
  "data-testid"?: string;
};

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();
  const { pending } = useFormStatus();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess, close]);

  return (
    <div className="border-b border-wj-border py-5" data-testid={dataTestid}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
            {label}
          </p>
          <div
            className="font-body text-[14px] text-wj-text"
            data-testid="current-info"
          >
            {currentInfo}
          </div>
        </div>
        <button
          onClick={handleToggle}
          type={state ? "reset" : "button"}
          className="font-body text-[13px] font-medium text-wj-green hover:underline shrink-0"
          data-testid="edit-button"
          data-active={state}
        >
          {state ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Success */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 overflow-hidden",
            {
              "max-h-[100px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <p className="font-body text-[13px] text-wj-green bg-wj-green-light px-3 py-2 mt-3">
            {label} updated successfully
          </p>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 overflow-hidden",
            {
              "max-h-[100px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <p className="font-body text-[13px] text-red-700 bg-red-50 px-3 py-2 mt-3">
            {errorMessage}
          </p>
        </Disclosure.Panel>
      </Disclosure>

      {/* Edit form */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {children}
            <div className="flex justify-end">
              <BrandButton
                size="sm"
                type="submit"
                disabled={pending}
                data-testid="save-button"
              >
                {pending ? "Saving…" : "Save changes"}
              </BrandButton>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default AccountInfo;
