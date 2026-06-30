import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"

const ProductVariantInfoWidget = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-start gap-3 px-6 py-4">
        <InformationCircleSolid className="text-ui-fg-muted mt-0.5 shrink-0" />
        <div>
          <Heading level="h2" className="mb-1">
            Variant: Standaard
          </Heading>
          <div className="space-y-2">
            <Text size="small" className="text-ui-fg-subtle">
              Zorg dat dit product een variant genaamd <span className="font-semibold text-ui-fg-base">Standaard</span> heeft met een basisprijs. Dit is de prijs die als startpunt wordt gebruikt op de webshop.
            </Text>
            <Text size="small" className="text-ui-fg-subtle">
              Opties en toeslagen worden apart ingesteld via het tabblad <span className="font-semibold text-ui-fg-base">Opties</span> en hoeven niet aan de variant gekoppeld te zijn.
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

export default ProductVariantInfoWidget
