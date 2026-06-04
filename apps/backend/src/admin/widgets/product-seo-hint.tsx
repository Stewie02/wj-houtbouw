import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"

const ProductSeoHintWidget = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-start gap-3 px-6 py-4">
        <InformationCircleSolid className="text-ui-fg-muted mt-0.5 shrink-0" />
        <div>
          <Heading level="h2" className="mb-1">
            SEO tips voor dit product
          </Heading>
          <div className="space-y-2">
            <Text size="small" className="text-ui-fg-subtle">
              <span className="font-semibold text-ui-fg-base">Subtitel</span> wordt gebruikt als meta-omschrijving in Google zoekresultaten. Houd het onder 160 tekens en beschrijf het product zonder de titel te herhalen.
            </Text>
            <Text size="small" className="text-ui-fg-subtle">
              <span className="font-semibold text-ui-fg-base">Handle</span> bepaalt de URL: <span className="font-mono">/producten/[handle]</span>. Gebruik beschrijvende, Nederlandstalige woorden zoals <span className="font-mono">picknicktafel-eiken</span>.
            </Text>
            <Text size="small" className="text-ui-fg-subtle">
              <span className="font-semibold text-ui-fg-base">Beschrijving</span> is zichtbaar op de productpagina en wordt door Google gebruikt als de subtitel ontbreekt. Schrijf unieke tekst, kopieer geen leverancierstekst.
            </Text>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductSeoHintWidget
