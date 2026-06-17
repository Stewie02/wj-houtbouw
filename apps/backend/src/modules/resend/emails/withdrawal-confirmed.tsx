import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

export type WithdrawalConfirmedEmailProps = {
  email: string
  display_id: string | number | null
  confirmed_at: string
}

export const WithdrawalConfirmedEmail = ({
  display_id,
  confirmed_at,
}: WithdrawalConfirmedEmailProps) => {
  const confirmedDate = new Date(confirmed_at).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Html>
      <Head />
      <Preview>{`Uw herroeping is bevestigd — bestelling #${display_id}`}</Preview>
      <Body style={styles.body}>
        <Section style={styles.header}>
          <Text style={styles.brandName}>W&J Houtbouw</Text>
        </Section>

        <Container style={styles.container}>
          <Section style={styles.section}>
            <Heading style={styles.h1}>Herroeping bevestigd</Heading>
            <Text style={styles.text}>
              Uw herroeping voor bestelling #{display_id} is bevestigd op{" "}
              {confirmedDate}. De retourperiode van 14 dagen is nu gestart.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Heading style={styles.h2}>Wat nu?</Heading>
            <Text style={styles.text}>
              Stuur uw bestelling terug in de originele verpakking, indien
              aanwezig. Neem contact met ons op zodat wij de retourzending
              kunnen afhandelen.
            </Text>
            <Text style={styles.text}>
              Na ontvangst en controle van de retourzending wordt het
              aankoopbedrag teruggestort.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Text style={styles.text}>
              Neem contact op via{" "}
              <a href="mailto:info@wjhoutbouw.nl" style={styles.link}>
                info@wjhoutbouw.nl
              </a>{" "}
              of 06-24994842 om de retourzending te regelen.
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
