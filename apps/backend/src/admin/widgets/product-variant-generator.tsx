import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Button, Checkbox, Container, Heading, Input, Text } from "@medusajs/ui"
import { DetailWidgetProps, HttpTypes } from "@medusajs/framework/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { sdk } from "../lib/client"

const ProductVariantGeneratorWidget = ({
  data: product,
}: DetailWidgetProps<HttpTypes.AdminProduct>) => {
  const [basePrice, setBasePrice] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const queryClient = useQueryClient()

  const generate = useMutation({
    mutationFn: () =>
      sdk.client.fetch(
        `/admin/custom/products/${product.id}/generate-variants`,
        {
          method: "POST",
          body: { base_price: parseFloat(basePrice) },
        }
      ) as Promise<{ created: number; updated: number; archived: number }>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", product.id] })
      setConfirmed(false)
    },
  })

  const isValid =
    basePrice !== "" &&
    !isNaN(parseFloat(basePrice)) &&
    parseFloat(basePrice) >= 0 &&
    confirmed

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h2">Varianten genereren</Heading>
      </div>

      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Text size="small" weight="plus" leading="compact">
              Meerprijzen instellen
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle">
              Voeg het meerprijs toe aan het einde van elke optiewaarde, direct na de naam:
            </Text>
            <pre className="text-xs text-ui-fg-subtle bg-ui-bg-subtle rounded-md px-3 py-2 mt-1 font-mono leading-relaxed">
              {`200 cm €0\n220 cm +€20\n2 laags poedercoating zwart €165\nTenco zwart beits +€79,99`}
            </pre>
          </div>

          <div className="flex flex-col gap-1">
            <Text size="small" weight="plus" leading="compact">
              Naam wijzigen — let op
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle">
              Varianten worden herkend op de naam vóór het €-bedrag. Verander je de naam (bijv. <span className="font-mono">200 cm</span> → <span className="font-mono">200cm</span>), dan wordt de oude variant gearchiveerd en een nieuwe aangemaakt. Bestellingen blijven intact maar de database wordt rommelig. Wijzig namen alleen als het echt nodig is.
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text size="small" weight="plus" leading="compact">
              Prijs wijzigen — veilig
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle">
              Alleen het bedrag aanpassen (bijv. <span className="font-mono">+€20</span> → <span className="font-mono">+€25</span>) is veilig: de variant wordt herkend en de prijs bijgewerkt zonder archivering.
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Text size="small" leading="compact" weight="plus">
            Basisprijs (€)
          </Text>
          <Input
            type="number"
            min={0}
            step={0.01}
            placeholder="bijv. 499"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="confirm-generate"
            checked={confirmed}
            onCheckedChange={(val) => setConfirmed(!!val)}
          />
          <label htmlFor="confirm-generate" className="cursor-pointer">
            <Text size="small" className="text-ui-fg-subtle">
              Ik heb alle opties en meerprijzen gecontroleerd
            </Text>
          </label>
        </div>

        <div>
          <Button
            size="small"
            variant="danger"
            isLoading={generate.isPending}
            disabled={!isValid || generate.isPending}
            onClick={() => generate.mutate()}
          >
            Varianten genereren
          </Button>
        </div>

        {generate.isSuccess && generate.data && (
          <Text size="small" className="text-ui-fg-interactive">
            Klaar — {generate.data.created} aangemaakt, {generate.data.updated} bijgewerkt, {generate.data.archived} gearchiveerd.
          </Text>
        )}

        {generate.isError && (
          <Text size="small" className="text-ui-fg-error">
            Er is iets misgegaan. Controleer de logs of probeer opnieuw.
          </Text>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductVariantGeneratorWidget
