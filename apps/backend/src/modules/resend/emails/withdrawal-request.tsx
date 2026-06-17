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

export type WithdrawalRequestEmailProps = {
  email: string
  display_id: string | number | null
  confirm_url: string
}

export const WithdrawalRequestEmail = ({
  display_id,
  confirm_url,
}: WithdrawalRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{`Bevestig uw herroeping van bestelling #${display_id}`}</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>W&J Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>Bevestig uw herroeping</Heading>
            <Text style={styles.text}>
              U heeft aangegeven dat u bestelling #{display_id} wilt herroepen.
              Klik op de knop hieronder om uw herroeping te bevestigen.
            </Text>
            <Text style={styles.text}>
              Na uw bevestiging start de retourperiode van 14 dagen. U ontvangt
              dan instructies over het terugsturen van uw bestelling.
            </Text>
          </Section>

          <Section style={styles.ctaSection}>
            <Button href={confirm_url} style={styles.button}>
              Bevestig herroeping
            </Button>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Text style={styles.text}>
              Heeft u dit verzoek niet ingediend? Dan hoeft u niets te doen. Uw
              bestelling wordt gewoon verwerkt.
            </Text>
            <Text style={styles.text}>
              Vragen? Neem contact op via{" "}
              <a href="mailto:info@wjhoutbouw.nl" style={styles.link}>
                info@wjhoutbouw.nl
              </a>{" "}
              of 06-24994842.
            </Text>
            <Text style={styles.signoff}>
              Met vriendelijke groet,
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
    padding: "14px 28px",
    textDecoration: "none",
    display: "inline-block",
  },
  hr: { borderColor: "#D5CFC7", margin: "0" },
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
