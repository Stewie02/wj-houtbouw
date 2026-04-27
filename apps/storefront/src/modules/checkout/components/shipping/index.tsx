"use client"
import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import BrandButton from "@modules/common/components/brand-button"
import { clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id) {
                pricesMap[p.value.id] = p.value.amount ?? 0
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className={clx("font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] flex items-center gap-2", {
          "opacity-40 pointer-events-none select-none": !isOpen && (cart.shipping_methods?.length ?? 0) === 0,
        })}>
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-wj-green w-5 h-5" />
          )}
        </h2>
        {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
          <button
            onClick={handleEdit}
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
            data-testid="edit-delivery-button"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-3">
              Shipping method
            </p>
            <div className="flex flex-col gap-2" data-testid="delivery-options-container">
              {hasPickupOptions && (
                <RadioGroup
                  value={showPickupOptions}
                  onChange={(_value) => {
                    const id = _pickupMethods.find((o) => !o.insufficient_inventory)?.id
                    if (id) handleSetShippingMethod(id, "pickup")
                  }}
                >
                  <Radio
                    value={PICKUP_OPTION_ON}
                    data-testid="delivery-option-radio"
                    className={clx(
                      "flex items-center justify-between cursor-pointer p-4 border transition-colors",
                      showPickupOptions === PICKUP_OPTION_ON
                        ? "border-wj-green bg-wj-green-light"
                        : "border-wj-border hover:border-wj-text"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <MedusaRadio checked={showPickupOptions === PICKUP_OPTION_ON} />
                      <span className="font-body text-[14px] text-wj-text">Pick up your order</span>
                    </div>
                    <span className="font-body text-[14px] text-wj-muted">–</span>
                  </Radio>
                </RadioGroup>
              )}

              <RadioGroup
                value={shippingMethodId}
                onChange={(v) => { if (v) handleSetShippingMethod(v, "shipping") }}
              >
                {_shippingMethods?.map((option) => {
                  const isDisabled =
                    option.price_type === "calculated" &&
                    !isLoadingPrices &&
                    typeof calculatedPricesMap[option.id] !== "number"

                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      data-testid="delivery-option-radio"
                      disabled={isDisabled}
                      className={clx(
                        "flex items-center justify-between cursor-pointer p-4 border transition-colors mb-2",
                        option.id === shippingMethodId
                          ? "border-wj-green bg-wj-green-light"
                          : "border-wj-border hover:border-wj-text",
                        isDisabled && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <MedusaRadio checked={option.id === shippingMethodId} />
                        <span className="font-body text-[14px] text-wj-text">{option.name}</span>
                      </div>
                      <span className="font-body text-[14px] text-wj-text">
                        {option.price_type === "flat"
                          ? convertToLocale({ amount: option.amount!, currency_code: cart?.currency_code })
                          : calculatedPricesMap[option.id]
                          ? convertToLocale({ amount: calculatedPricesMap[option.id], currency_code: cart?.currency_code })
                          : isLoadingPrices
                          ? <Loader />
                          : "–"}
                      </span>
                    </Radio>
                  )
                })}
              </RadioGroup>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div>
              <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-3">
                Store location
              </p>
              <div className="flex flex-col gap-2" data-testid="delivery-options-container">
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => { if (v) handleSetShippingMethod(v, "pickup") }}
                >
                  {_pickupMethods?.map((option) => (
                    <Radio
                      key={option.id}
                      value={option.id}
                      disabled={option.insufficient_inventory}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between cursor-pointer p-4 border transition-colors mb-2",
                        option.id === shippingMethodId
                          ? "border-wj-green bg-wj-green-light"
                          : "border-wj-border hover:border-wj-text",
                        option.insufficient_inventory && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <MedusaRadio checked={option.id === shippingMethodId} />
                        <div>
                          <p className="font-body text-[14px] text-wj-text">{option.name}</p>
                          <p className="font-body text-[13px] text-wj-muted">
                            {formatAddress(
                              (option as unknown as { service_zone?: { fulfillment_set?: { location?: { address: HttpTypes.StoreCartAddress } } } })
                                .service_zone?.fulfillment_set?.location?.address as HttpTypes.StoreCartAddress
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="font-body text-[14px] text-wj-text">
                        {convertToLocale({ amount: option.amount!, currency_code: cart?.currency_code })}
                      </span>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          <ErrorMessage error={error} data-testid="delivery-option-error-message" />
          <BrandButton
            size="lg"
            full
            onClick={handleSubmit}
            disabled={!cart.shipping_methods?.[0] || isLoading}
            data-testid="submit-delivery-option-button"
          >
            {isLoading ? "Saving…" : "Continue to payment"}
          </BrandButton>
        </div>
      ) : (
        <div>
          {(cart.shipping_methods?.length ?? 0) > 0 && (
            <div>
              <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                Method
              </p>
              <p className="font-body text-[14px] text-wj-text">
                {cart.shipping_methods!.at(-1)!.name}{" "}
                · {convertToLocale({ amount: cart.shipping_methods!.at(-1)!.amount!, currency_code: cart?.currency_code })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Shipping
