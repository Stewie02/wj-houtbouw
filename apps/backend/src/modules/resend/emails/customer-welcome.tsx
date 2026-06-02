import { CustomerDTO } from "@medusajs/types"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

export type CustomerEmailProps = Pick<
  CustomerDTO,
  "first_name" | "last_name" | "email"
> & {
  account_url: string
}

export const CustomerWelcomeEmail = (customer: CustomerEmailProps) => {
  const firstName = customer.first_name || "klant"

  return (
    <Html>
      <Head />
      <Preview>Welkom bij W&J Houtbouw, {firstName}!</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>W&J Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>Hoi {firstName},</Heading>
            <Text style={styles.text}>
              Welkom bij W&amp;J Houtbouw! Fijn dat je een account hebt
              aangemaakt.
            </Text>
            <Text style={styles.text}>
              Wij maken met de hand ambachtelijke tuinmeubelen van Douglas
              hout: duurzaam, eerlijk en gemaakt om jaren mee te gaan. Of je
              nu op zoek bent naar een picknicktafel, een tuintafel of een
              pergola, we helpen je graag aan iets moois voor buiten.
            </Text>
            <Text style={styles.text}>Met jouw account kun je:</Text>
            <Text style={styles.listItem}>
              &bull;&nbsp; Eenvoudig een offerte aanvragen
            </Text>
            <Text style={styles.listItem}>
              &bull;&nbsp; Je bestellingen en status bijhouden
            </Text>
            <Text style={styles.listItem}>
              &bull;&nbsp; Je favorieten opslaan
            </Text>
            <Text style={{ ...styles.text, marginTop: "16px" }}>
              Heb je een vraag of wil je advies? We staan altijd voor je
              klaar. Gewoon even mailen of bellen.
            </Text>
            <Text style={styles.text}>
              📩{" "}
              <a href="mailto:info@wjhoutbouw.nl" style={styles.link}>
                info@wjhoutbouw.nl
              </a>
              <br />
              📞 +31 6 24994842
            </Text>
          </Section>

          <Section style={styles.ctaSection}>
            <Button href={customer.account_url} style={styles.button}>
              Naar mijn account
            </Button>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.signoff}>
              Met vriendelijke groet,
              <br />
              Het team van W&J Houtbouw
            </Text>
            <Text style={{ ...styles.footerText, marginTop: "24px" }}>
              © W&J Houtbouw
            </Text>
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
  ctaSection: { padding: "0 0 24px" },
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
  button: {
    backgroundColor: "#2B4D1A",
    color: "#FEFCF9",
    fontSize: "15px",
    fontWeight: "600",
    padding: "12px 24px",
    textDecoration: "none",
    display: "inline-block",
  },
  hr: { borderColor: "#D5CFC7", margin: "0" },
  listItem: {
    color: "#1A1410",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 4px",
    paddingLeft: "8px",
  },
  signoff: {
    color: "#1A1410",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 8px",
  },
  footer: { paddingTop: "24px" },
  footerText: { color: "#7B6F65", fontSize: "13px", margin: "0 0 8px" },
  link: { color: "#2B4D1A" },
}
