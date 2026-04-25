import { clx } from "@modules/common/components/ui"

type StarRatingProps = {
  rating?: number
  max?: number
  size?: "sm" | "md"
  className?: string
}

const StarRating = ({ rating = 5, max = 5, size = "md", className }: StarRatingProps) => {
  const starSize = size === "sm" ? "w-3 h-3" : "w-[14px] h-[14px]"

  return (
    <div className={clx("flex gap-[3px]", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={clx(starSize, i < rating ? "bg-wj-wood" : "bg-wj-border")}
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      ))}
    </div>
  )
}

export default StarRating
