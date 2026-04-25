import { retrieveCart } from "@lib/data/cart"
import NavClient from "@modules/layout/components/nav-client"

export default async function Nav() {
  const cart = await retrieveCart().catch(() => null)

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  return (
    <nav className="sticky top-0 inset-x-0 z-50 bg-wj-white border-b border-wj-border">
      <NavClient cartCount={cartCount} />
    </nav>
  )
}
