"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const TABS = ["Description", "Technical specs"]

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [active, setActive] = useState("Description")

  const specs = [
    { label: "Material", value: product.material },
    { label: "Weight", value: product.weight ? `${product.weight} g` : null },
    {
      label: "Dimensions",
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height} cm`
          : null,
    },
    { label: "Country of origin", value: product.origin_country },
    { label: "Type", value: product.type?.value },
    ...(product.options ?? []).map((opt) => ({
      label: opt.title ?? "Option",
      value: (opt.values ?? []).map((v) => v.value).join(", "),
    })),
  ].filter((row) => row.value)

  return (
    <div className="border-t border-wj-border bg-wj-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Tab bar */}
        <div className="flex border-b border-wj-border overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 sm:px-7 py-[18px] font-body font-medium text-[13px] sm:text-[14px] whitespace-nowrap border-b-2 -mb-px transition-colors ${
                active === tab
                  ? "text-wj-green border-wj-green"
                  : "text-wj-muted border-transparent hover:text-wj-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-10 sm:py-12 max-w-[720px]">
          {active === "Description" && (
            <div className="font-body text-[15px] text-wj-muted leading-[1.8]">
              {product.description ?? "No description available."}
            </div>
          )}

          {active === "Technical specs" && (
            specs.length > 0 ? (
              <table className="w-full border-collapse">
                <tbody>
                  {specs.map(({ label, value }) => (
                    <tr key={label} className="border-b border-wj-border">
                      <td className="py-3 font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted w-48">
                        {label}
                      </td>
                      <td className="py-3 font-body text-[14px] text-wj-text">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="font-body text-[15px] text-wj-muted">No specifications available.</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
