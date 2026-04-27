"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import BrandButton from "@modules/common/components/brand-button"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) =>
  variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})

export default function ProductActions({ product, disabled }: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const countryCode = useParams().countryCode as string

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(
    () =>
      product.variants?.find((v) =>
        isEqual(optionsAsKeymap(v.options), options)
      ),
    [product.variants, options]
  )

  const isValidVariant = useMemo(
    () => product.variants?.some((v) => isEqual(optionsAsKeymap(v.options), options)),
    [product.variants, options]
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null
    if (params.get("v_id") === value) return
    value ? params.set("v_id", value) : params.delete("v_id")
    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) > 0) return true
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    await addToCart({ variantId: selectedVariant.id, quantity: 1, countryCode })
    setIsAdding(false)
  }

  const buttonLabel = !selectedVariant
    ? "Select variant"
    : !inStock || !isValidVariant
    ? "Out of stock"
    : "Add to cart"

  return (
    <>
      <div ref={actionsRef} className="flex flex-col gap-6 mt-6">
        {/* Option selectors */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-5">
            {(product.options || []).map((option) => (
              <OptionSelect
                key={option.id}
                option={option}
                current={options[option.id]}
                updateOption={(id, val) =>
                  setOptions((prev) => ({ ...prev, [id]: val }))
                }
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* Add to cart */}
        <BrandButton
          size="lg"
          full
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant}
          data-testid="add-product-button"
        >
          {isAdding ? "Adding…" : buttonLabel}
        </BrandButton>

        <BrandButton variant="outline" full>
          Add to wishlist
        </BrandButton>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={(id, val) =>
            setOptions((prev) => ({ ...prev, [id]: val }))
          }
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
