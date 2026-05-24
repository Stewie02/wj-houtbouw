import {
  BigNumberValue,
  OrderAddressDTO,
  OrderDTO,
  OrderLineItemDTO,
} from "@medusajs/types"
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

export type OrderEmailProps = Pick<
  OrderDTO,
  | "id"
  | "display_id"
  | "email"
  | "currency_code"
  | "total"
  | "subtotal"
  | "shipping_total"
  | "tax_total"
  | "items"
  | "shipping_address"
> & {
  customer?: { first_name?: string | null; last_name?: string | null } | null
  billing_address?: OrderAddressDTO | null
  created_at?: string | null
}

const formatPrice = (amount: BigNumberValue, currency: string) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(Number(amount))

export const OrderPlacedEmail = (order: OrderEmailProps) => {
  const customerName = order.customer
    ? `${order.customer.first_name ?? ""} ${order.customer.last_name ?? ""}`.trim()
    : order.email

  return (
    <Html>
      <Head />
      <Preview>{`Bedankt voor je bestelling #${order.display_id}`}</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>WJ Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>Bedankt voor je bestelling!</Heading>
            <Text style={styles.text}>
              Beste {customerName}, je bestelling #{order.display_id} is
              ontvangen en wordt zo snel mogelijk verwerkt.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Heading style={styles.h2}>Jouw bestelling</Heading>
            {(order.items ?? []).map((item: OrderLineItemDTO) => (
              <Row key={item.id} style={styles.itemRow}>
                <Column>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.variant_title && (
                    <Text style={styles.itemMeta}>{item.variant_title}</Text>
                  )}
                  <Text style={styles.itemMeta}>Aantal: {item.quantity}</Text>
                </Column>
                <Column style={styles.colRight}>
                  <Text style={styles.priceText}>
                    {formatPrice(item.total, order.currency_code)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.totalLabel}>Subtotaal</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.totalValue}>
                  {formatPrice(order.subtotal, order.currency_code)}
                </Text>
              </Column>
            </Row>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.totalLabel}>Verzendkosten</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.totalValue}>
                  {formatPrice(order.shipping_total, order.currency_code)}
                </Text>
              </Column>
            </Row>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.totalLabel}>BTW</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.totalValue}>
                  {formatPrice(order.tax_total, order.currency_code)}
                </Text>
              </Column>
            </Row>
            <Hr style={styles.hr} />
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.grandTotalLabel}>Totaal</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.grandTotalValue}>
                  {formatPrice(order.total, order.currency_code)}
                </Text>
              </Column>
            </Row>
          </Section>

          {order.shipping_address && (
            <>
              <Hr style={styles.hr} />
              <Section style={styles.section}>
                <Heading style={styles.h2}>Bezorgadres</Heading>
                <Text style={styles.text}>
                  <AddressLines address={order.shipping_address} />
                </Text>
              </Section>
            </>
          )}

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Vragen over je bestelling? Mail ons op{" "}
              <a href="mailto:info@wjhoutbouw.nl" style={styles.link}>
                info@wjhoutbouw.nl
              </a>
            </Text>
            <Text style={styles.footerText}>
              © WJ Houtbouw — Buitenmeubilair van massief hout
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function AddressLines({ address }: { address: OrderAddressDTO }) {
  return (
    <>
      {address.first_name} {address.last_name}
      <br />
      {address.address_1}
      <br />
      {address.postal_code} {address.city}
      <br />
      {address.country_code?.toUpperCase()}
    </>
  )
}

const styles = {
  body: {
    backgroundColor: "#F7F3EE",
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    margin: "0",
    padding: "0",
  },
  header: {
    backgroundColor: "#12100D",
    padding: "24px 32px",
  },
  brandName: {
    color: "#FEFCF9",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FEFCF9",
    padding: "0 32px 32px",
  },
  section: { padding: "24px 0" },
  h1: {
    color: "#1A1410",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "26px",
    fontWeight: "700",
    margin: "0 0 12px",
    letterSpacing: "-0.02em",
  },
  h2: {
    color: "#1A1410",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#1A1410",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 12px",
  },
  hr: { borderColor: "#D5CFC7", margin: "0" },
  itemRow: { marginBottom: "16px" },
  itemTitle: {
    color: "#1A1410",
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 4px",
  },
  itemMeta: { color: "#7B6F65", fontSize: "13px", margin: "0 0 2px" },
  colRight: { textAlign: "right" as const, verticalAlign: "top" as const },
  priceText: {
    color: "#1A1410",
    fontSize: "15px",
    fontWeight: "500",
    margin: "0",
  },
  totalRow: { marginBottom: "8px" },
  totalLabel: { color: "#7B6F65", fontSize: "14px", margin: "0" },
  totalValue: { color: "#1A1410", fontSize: "14px", margin: "0" },
  grandTotalLabel: {
    color: "#1A1410",
    fontSize: "16px",
    fontWeight: "700",
    margin: "4px 0 0",
  },
  grandTotalValue: {
    color: "#2B4D1A",
    fontSize: "16px",
    fontWeight: "700",
    margin: "4px 0 0",
  },
  footer: { paddingTop: "24px" },
  footerText: { color: "#7B6F65", fontSize: "13px", margin: "0 0 8px" },
  link: { color: "#2B4D1A" },
}
