import React from "react"
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer"

// Medusa returns monetary values as BigNumber objects {numeric_, raw_, bignumber_}
// when queried via query.graph(). This helper safely extracts the numeric value.
function toNum(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") return parseFloat(value)
  if (value !== null && typeof value === "object" && "numeric_" in value) {
    return Number((value as Record<string, unknown>).numeric_)
  }
  return Number(value)
}

export type InvoiceOrderItem = {
  id: string
  title: string
  metadata?: Record<string, unknown> | null
  quantity: unknown
  unit_price: unknown
  total: unknown
  // Regular price incl. BTW, before any promotion. Prices are tax inclusive, so
  // this is the amount the customer saw on the website. Lines stay at this price
  // and the promotion is subtracted once, as its own "Korting" row.
  original_total: unknown
  tax_lines?: Array<{ rate: unknown; total: unknown }> | null
}

export type InvoiceAddress = {
  first_name?: string | null
  last_name?: string | null
  company?: string | null
  address_1?: string | null
  postal_code?: string | null
  city?: string | null
  country_code?: string | null
}

export type InvoiceOrder = {
  id: string
  display_id: number | string
  email: string
  currency_code: string
  subtotal: unknown
  item_subtotal: unknown
  // Sum of the items' original_total: regular prices incl. BTW, pre-discount.
  original_item_total: unknown
  tax_total: unknown
  shipping_total: unknown
  discount_total: unknown
  total: unknown
  created_at?: string | Date | null
  items?: InvoiceOrderItem[] | null
  billing_address?: InvoiceAddress | null
  shipping_address?: InvoiceAddress | null
  customer?: { first_name?: string | null; last_name?: string | null } | null
}

const COLORS = {
  dark: "#12100D",
  text: "#1A1410",
  muted: "#7B6F65",
  border: "#D5CFC7",
  green: "#2B4D1A",
  bg: "#F7F3EE",
  white: "#FEFCF9",
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
  },
  header: {
    backgroundColor: COLORS.dark,
    paddingVertical: 24,
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  headerCompany: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  headerTagline: {
    fontSize: 9,
    color: "#9E9189",
    marginTop: 2,
  },
  body: {
    paddingHorizontal: 40,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 28,
    gap: 24,
  },
  infoBlock: {
    flex: 1,
  },
  infoBlockRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  sectionLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  infoLine: {
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  infoLineMuted: {
    fontSize: 9,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
  infoLineBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    lineHeight: 1.5,
  },
  factuurRow: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  factuurBlock: {
    flex: 1,
  },
  factuurLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  factuurValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
  },
  factuurValueSmall: {
    fontSize: 9,
    color: COLORS.text,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: COLORS.bg,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.muted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  colDescription: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colUnitPrice: { flex: 1.5, textAlign: "right" },
  colTotal: { flex: 1.5, textAlign: "right" },
  itemTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    marginBottom: 1,
  },
  itemVariant: {
    fontSize: 8,
    color: COLORS.muted,
  },
  cellText: {
    fontSize: 9,
    color: COLORS.text,
  },
  totalsSection: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalsBox: {
    width: 240,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRowBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark,
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 9,
    color: COLORS.muted,
  },
  totalLabelBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 9,
    color: COLORS.text,
  },
  totalValueBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.green,
  },
  footer: {
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
})

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount)
}

function formatDate(date?: string | Date | null): string {
  if (!date) return new Date().toLocaleDateString("nl-NL")
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function addressLines(addr?: InvoiceAddress | null): string[] {
  if (!addr) return []
  const lines: string[] = []
  const name = [addr.first_name, addr.last_name].filter(Boolean).join(" ")
  if (addr.company) lines.push(addr.company)
  if (name) lines.push(name)
  if (addr.address_1) lines.push(addr.address_1)
  if (addr.postal_code || addr.city)
    lines.push([addr.postal_code, addr.city].filter(Boolean).join(" "))
  if (addr.country_code) lines.push(addr.country_code.toUpperCase())
  return lines
}

function groupTaxLines(
  items: InvoiceOrderItem[]
): Array<{ rate: number; total: number }> {
  const map = new Map<number, number>()
  for (const item of items) {
    for (const tl of item.tax_lines ?? []) {
      const rate = toNum(tl.rate)
      const total = toNum(tl.total)
      map.set(rate, (map.get(rate) ?? 0) + total)
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([rate, total]) => ({ rate, total }))
}

export const InvoicePDF = ({ order }: { order: InvoiceOrder }) => {
  const address = order.billing_address ?? order.shipping_address
  const items = order.items ?? []
  const taxGroups = groupTaxLines(items)
  const currency = order.currency_code

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerCompany}>W&J Houtbouw</Text>
        </View>

        <View style={styles.body}>
          {/* Verkoper + Klant */}
          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Verkoper</Text>
              <Text style={styles.infoLineBold}>W&J Houtbouw V.O.F.</Text>
              <Text style={styles.infoLine}>Gaffel 10, 9206 AW Drachten</Text>
              <Text style={styles.infoLineMuted}>KvK: 98439200</Text>
              <Text style={styles.infoLineMuted}>BTW: NL868495608B01</Text>
              <Text style={styles.infoLineMuted}>info@wjhoutbouw.nl</Text>
              <Text style={styles.infoLineMuted}>wjhoutbouw.nl</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Klant</Text>
              {addressLines(address).map((line, i) => (
                <Text
                  key={i}
                  style={i === 0 ? styles.infoLineBold : styles.infoLine}
                >
                  {line}
                </Text>
              ))}
              <Text style={styles.infoLineMuted}>{order.email}</Text>
            </View>
          </View>

          {/* Factuurgegevens */}
          <View style={styles.factuurRow}>
            <View style={styles.factuurBlock}>
              <Text style={styles.factuurLabel}>Factuurnummer</Text>
              <Text style={styles.factuurValue}>#{order.display_id}</Text>
            </View>
            <View style={styles.factuurBlock}>
              <Text style={styles.factuurLabel}>Factuurdatum</Text>
              <Text style={styles.factuurValueSmall}>
                {formatDate(order.created_at)}
              </Text>
            </View>
            <View style={styles.factuurBlock}>
              <Text style={styles.factuurLabel}>Leverdatum</Text>
              <Text style={styles.factuurValueSmall}>
                {formatDate(order.created_at)}
              </Text>
            </View>
          </View>

          {/* Regeloverzicht */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>
              Omschrijving
            </Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Aantal</Text>
            <Text style={[styles.tableHeaderText, styles.colUnitPrice]}>
              Stuksprijs
            </Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Totaal</Text>
          </View>

          {items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.colDescription}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {typeof item.metadata?.options_label === "string" && (
                  item.metadata.options_label.split(", ").map((part, i) => (
                    <Text key={i} style={styles.itemVariant}>{part}</Text>
                  ))
                )}
              </View>
              <Text style={[styles.cellText, styles.colQty]}>
                {String(toNum(item.quantity))}
              </Text>
              <Text style={[styles.cellText, styles.colUnitPrice]}>
                {formatCurrency(
                  toNum(item.original_total) / toNum(item.quantity),
                  currency
                )}
              </Text>
              <Text style={[styles.cellText, styles.colTotal]}>
                {formatCurrency(toNum(item.original_total), currency)}
              </Text>
            </View>
          ))}

          {/* Totalen */}
          <View style={styles.totalsSection}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotaal incl. BTW</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(toNum(order.original_item_total), currency)}
                </Text>
              </View>
              {toNum(order.discount_total) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Korting</Text>
                  <Text style={styles.totalValue}>
                    {`- ${formatCurrency(toNum(order.discount_total), currency)}`}
                  </Text>
                </View>
              )}
              {toNum(order.shipping_total) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Verzendkosten</Text>
                  <Text style={styles.totalValue}>
                    {formatCurrency(toNum(order.shipping_total), currency)}
                  </Text>
                </View>
              )}
              <View style={styles.totalRowBorder}>
                <Text style={styles.totalLabelBold}>Totaal incl. BTW</Text>
                <Text style={styles.totalValueBold}>
                  {formatCurrency(toNum(order.total), currency)}
                </Text>
              </View>
              {/* Prices are tax inclusive, so BTW is shown as part of the total
                  rather than added to it. */}
              {taxGroups.length > 0
                ? taxGroups.map(({ rate, total }) => (
                    <View key={rate} style={styles.totalRow}>
                      <Text style={styles.totalLabel}>
                        waarvan BTW {String(rate)}%
                      </Text>
                      <Text style={styles.totalValue}>
                        {formatCurrency(total, currency)}
                      </Text>
                    </View>
                  ))
                : toNum(order.tax_total) > 0 && (
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>waarvan BTW</Text>
                      <Text style={styles.totalValue}>
                        {formatCurrency(toNum(order.tax_total), currency)}
                      </Text>
                    </View>
                  )}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              W&J Houtbouw V.O.F. — KvK 98439200 — BTW NL868495608B01
            </Text>
            <Text style={styles.footerText}>
              Factuur #{order.display_id} — {formatDate(order.created_at)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function renderInvoice(order: InvoiceOrder): Promise<Buffer> {
  return renderToBuffer(<InvoicePDF order={order} />)
}
