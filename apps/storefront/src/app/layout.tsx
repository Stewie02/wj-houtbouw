import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${playfair.variable} ${dmSans.variable} font-body bg-wj-bg`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
