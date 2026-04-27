import React from "react"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, children }) => {
  return (
    <div className="bg-wj-bg min-h-screen" data-testid="account-page">
      {/* Page header */}
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            {customer ? `Hello, ${customer.first_name}` : "My account"}
          </h1>
          {customer && (
            <p className="font-body text-[14px] text-wj-muted mt-2">{customer.email}</p>
          )}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start">
          {customer && (
            <div className="lg:sticky lg:top-24">
              <AccountNav customer={customer} />
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
