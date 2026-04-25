import { clx } from "@modules/common/components/ui"

type BrandTagProps = {
  children: React.ReactNode
  variant?: "green" | "wood" | "neutral"
  className?: string
}

const variantClasses = {
  green: "bg-wj-green-light text-wj-green",
  wood: "bg-wj-wood-light text-wj-wood",
  neutral: "bg-wj-surface text-wj-muted",
}

const BrandTag = ({ children, variant = "green", className }: BrandTagProps) => {
  return (
    <span
      className={clx(
        "inline-block font-body font-semibold text-[11px] tracking-[0.08em] uppercase px-[10px] py-1",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default BrandTag
