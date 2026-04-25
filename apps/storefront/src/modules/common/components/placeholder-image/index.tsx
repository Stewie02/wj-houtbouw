type PlaceholderImageProps = {
  label?: string
  dark?: boolean
  className?: string
}

const PlaceholderImage = ({ label, dark = false, className = "" }: PlaceholderImageProps) => {
  const bg = dark
    ? "repeating-linear-gradient(45deg, #2a2520, #2a2520 2px, #1e1b18 2px, #1e1b18 14px)"
    : "repeating-linear-gradient(45deg, #DDD8D0, #DDD8D0 2px, #E8E3DC 2px, #E8E3DC 14px)"
  const color = dark ? "#6B6058" : "#9A8F85"

  return (
    <div
      className={`w-full h-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ background: bg }}
    >
      {label && (
        <span
          className="text-[10px] font-mono uppercase tracking-widest px-2 text-center"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default PlaceholderImage
