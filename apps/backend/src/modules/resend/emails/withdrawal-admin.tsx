import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components"

export type WithdrawalAdminEmailProps = {
  customer_email: string
  display_id: string | number | null
  confirmed_at: string
}

export const WithdrawalAdminEmail = ({
  customer_email,
  display_id,
  confirmed_at,
}: WithdrawalAdminEmailProps) => {
  const confirmedDate = new Date(confirmed_at).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Html>
      <Head />
      <Preview>{`Herroeping bevestigd — bestelling #${display_id}`}</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>W&J Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>
              Klant heeft herroeping bevestigd
            </Heading>
            <Text style={styles.text}>
              Een klant heeft de herroeping van een bestelling bevestigd. Neem
              contact op om de retourzending af te handelen.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Row style={styles.row}>
              <Column>
                <Text style={styles.label}>Bestelling</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.value}>#{display_id}</Text>
              </Column>
            </Row>
            <Row style={styles.row}>
              <Column>
                <Text style={styles.label}>E-mailadres klant</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.value}>{customer_email}</Text>
              </Column>
            </Row>
            <Row style={styles.row}>
              <Column>
                <Text style={styles.label}>Bevestigd op</Text>
              </Column>
              <Column style={styles.colRight}>
                <Text style={styles.value}>{confirmedDate}</Text>
              </Column>
            </Row>
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
  text: {
    color: "#1A1410",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 12px",
  },
  row: { marginBottom: "8px" },
  label: { color: "#7B6F65", fontSize: "14px", margin: "0" },
  value: { color: "#1A1410", fontSize: "14px", fontWeight: "500", margin: "0" },
  colRight: { textAlign: "right" as const },
  hr: { borderColor: "#D5CFC7", margin: "0" },
  footer: { paddingTop: "24px" },
  footerText: { color: "#7B6F65", fontSize: "13px", margin: "0 0 8px" },
}
