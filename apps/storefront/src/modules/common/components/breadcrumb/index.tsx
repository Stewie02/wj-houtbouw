import LocalizedClientLink from "@modules/common/components/localized-client-link"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  dark?: boolean
}

const Breadcrumb = ({ items, dark = false }: BreadcrumbProps) => {
  const textColor = dark ? "text-[#6B6058]" : "text-wj-muted"
  const linkHover = dark ? "hover:text-wj-white" : "hover:text-wj-text"

  return (
    <nav className={`font-body font-semibold text-[11px] tracking-[0.08em] uppercase ${textColor}`}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">›</span>}
          {item.href ? (
            <LocalizedClientLink href={item.href} className={`cursor-pointer ${linkHover} transition-colors`}>
              {item.label}
            </LocalizedClientLink>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
