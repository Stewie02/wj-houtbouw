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
  const firstName =
    order.customer?.first_name?.trim() ||
    order.shipping_address?.first_name?.trim() ||
    order.email

  return (
    <Html>
      <Head />
      <Preview>{`Super, je bestelling is binnen! Ordernummer #${order.display_id}`}</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>W&J Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>Hoi {firstName},</Heading>
            <Text style={styles.text}>
              Super, je bestelling is binnen! We gaan er meteen mee aan de
              slag.
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
            <Text style={styles.itemMeta}>Levertijd: circa 3 weken</Text>
            {order.shipping_address && (
              <Text style={styles.itemMeta}>
                Bezorgadres:{" "}
                {[
                  order.shipping_address.address_1,
                  `${order.shipping_address.postal_code} ${order.shipping_address.city}`,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            )}
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.totalLabel}>Ordernummer</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.totalValue}>#{order.display_id}</Text>
              </Column>
            </Row>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.totalLabel}>Orderdatum</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.totalValue}>
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </Text>
              </Column>
            </Row>
            <Row style={styles.totalRow}>
              <Column>
                <Text style={styles.grandTotalLabel}>Totaalbedrag</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.grandTotalValue}>
                  {formatPrice(order.total, order.currency_code)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Text style={styles.text}>
              We maken jouw bestelling met de hand. Dat kost even tijd, maar
              dan heb je ook wat moois voor de lange termijn :)
            </Text>
            <Text style={styles.text}>
              Zodra je bestelling klaar is en op weg gaat, ontvang je van ons
              een bericht.
            </Text>
            <Text style={styles.text}>
              De factuur van je bestelling vind je als bijlage bij deze mail.
            </Text>
            <Text style={styles.text}>
              Heb je in de tussentijd vragen? Geen probleem, we zijn gewoon te
              bereiken.
            </Text>
            <Text style={styles.text}>
              <a href="mailto:info@wjhoutbouw.nl" style={styles.link}>
                info@wjhoutbouw.nl
              </a>
              <br />
              06-24994842
            </Text>
            <Text style={styles.signoff}>
              Tot snel,
              <br />
              Het team van W&J Houtbouw
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>© W&J Houtbouw</Text>
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
  signoff: {
    color: "#1A1410",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "24px 0 0",
  },
  footer: { paddingTop: "24px" },
  footerText: { color: "#7B6F65", fontSize: "13px", margin: "0 0 8px" },
  link: { color: "#2B4D1A" },
}
