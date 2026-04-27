"use client"
import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import BrandButton from "@modules/common/components/brand-button"
import { clx } from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className={clx("font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] flex items-center gap-2", {
          "opacity-40 pointer-events-none select-none": !isOpen && !paymentReady,
        })}>
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid className="text-wj-green w-5 h-5" />}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
            data-testid="edit-payment-button"
          >
            Edit
          </button>
        )}
      </div>

      <div className={isOpen ? "flex flex-col gap-4" : "hidden"}>
        {!paidByGiftcard && availablePaymentMethods?.length && (
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={(value: string) => setPaymentMethod(value)}
          >
            {availablePaymentMethods.map((paymentMethod) => (
              <div key={paymentMethod.id}>
                {isStripeLike(paymentMethod.id) ? (
                  <StripeCardContainer
                    paymentProviderId={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                    paymentInfoMap={paymentInfoMap}
                    setCardBrand={setCardBrand}
                    setError={setError}
                    setCardComplete={setCardComplete}
                  />
                ) : (
                  <PaymentContainer
                    paymentInfoMap={paymentInfoMap}
                    paymentProviderId={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        )}

        {paidByGiftcard && (
          <div>
            <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
              Payment method
            </p>
            <p className="font-body text-[14px] text-wj-text" data-testid="payment-method-summary">
              Gift card
            </p>
          </div>
        )}

        <ErrorMessage error={error} data-testid="payment-method-error-message" />

        <BrandButton
          size="lg"
          full
          onClick={handleSubmit}
          disabled={(isStripeLike(selectedPaymentMethod) && !cardComplete) || (!selectedPaymentMethod && !paidByGiftcard) || isLoading}
          data-testid="submit-payment-button"
        >
          {isLoading ? "Processing…" : (!activeSession && isStripeLike(selectedPaymentMethod) ? "Enter card details" : "Continue to review")}
        </BrandButton>
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                Payment method
              </p>
              <p className="font-body text-[14px] text-wj-text" data-testid="payment-method-summary">
                {paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id}
              </p>
            </div>
            <div>
              <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                Payment details
              </p>
              <div className="flex items-center gap-2" data-testid="payment-details-summary">
                <span className="flex items-center p-1.5 border border-wj-border">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || <CreditCard />}
                </span>
                <p className="font-body text-[14px] text-wj-text">
                  {isStripeLike(selectedPaymentMethod) && cardBrand ? cardBrand : "Another step will appear"}
                </p>
              </div>
            </div>
          </div>
        ) : paidByGiftcard ? (
          <div>
            <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
              Payment method
            </p>
            <p className="font-body text-[14px] text-wj-text" data-testid="payment-method-summary">
              Gift card
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Payment
