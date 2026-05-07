"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { usePathname } from "next/navigation"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NAV_ITEMS = [
  { href: "/account", label: "Overview", testId: "overview-link" },
  { href: "/account/profile", label: "Profile", testId: "profile-link" },
  { href: "/account/addresses", label: "Addresses", testId: "addresses-link" },
  { href: "/account/orders", label: "Orders", testId: "orders-link" },
]

const AccountNav = ({ customer }: { customer: HttpTypes.StoreCustomer | null }) => {
  const route = usePathname()

  const handleLogout = async () => {
    await signout()
  }

  return (
    <>
      {/* Mobile: back link when inside a sub-page */}
      <div className="lg:hidden mb-6" data-testid="mobile-account-nav">
        {route !== "/account" && (
          <LocalizedClientLink
            href="/account"
            className="font-body text-[13px] font-medium text-wj-green hover:underline flex items-center gap-1.5"
            data-testid="account-main-link"
          >
            ← Account
          </LocalizedClientLink>
        )}
      </div>

      {/* Desktop sidebar nav */}
      <nav className="hidden lg:flex flex-col gap-1" data-testid="account-nav">
        <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-3">
          My account
        </p>
        {NAV_ITEMS.map(({ href, label, testId }) => (
          <AccountNavLink key={href} href={href} route={route} data-testid={testId}>
            {label}
          </AccountNavLink>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 font-body text-[14px] text-wj-muted hover:text-red-600 transition-colors mt-2 py-1.5"
          data-testid="logout-button"
        >
          <ArrowRightOnRectangle className="w-4 h-4" />
          Log out
        </button>
      </nav>

      {/* Mobile: menu shown only on the account root */}
      <div className="lg:hidden" data-testid="mobile-account-menu">
        {route === "/account" && (
          <div className="flex flex-col divide-y divide-wj-border border-y border-wj-border">
            {NAV_ITEMS.slice(1).map(({ href, label, testId }) => (
              <LocalizedClientLink
                key={href}
                href={href}
                className="flex items-center justify-between py-4 font-body text-[15px] text-wj-text"
                data-testid={testId}
              >
                {label}
                <span className="text-wj-muted">→</span>
              </LocalizedClientLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-between py-4 font-body text-[15px] text-wj-muted w-full"
              data-testid="logout-button"
            >
              Log out
              <ArrowRightOnRectangle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({ href, route, children, "data-testid": testId }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <LocalizedClientLink
      href={href}
      className={`font-body text-[14px] py-1.5 transition-colors ${
        active ? "text-wj-green font-semibold" : "text-wj-text hover:text-wj-green"
      }`}
      data-testid={testId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
