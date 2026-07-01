import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, HttpTypes } from "@medusajs/framework/types"
import { Button, Container, Heading, Prompt, Text, Textarea, toast } from "@medusajs/ui"
import { useState } from "react"
import { sdk } from "../lib/client"

const OrderResendConfirmationWidget = ({
  data,
}: DetailWidgetProps<HttpTypes.AdminOrder>) => {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!reason.trim()) return

    setLoading(true)
    try {
      await sdk.client.fetch(
        `/admin/custom/orders/${data.id}/resend-confirmation`,
        { method: "POST", body: { reason } }
      )
      toast.success("Bevestigingsmail opnieuw verzonden")
      setReason("")
      setOpen(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verzenden mislukt"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Bevestigingsmail</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Bestelling #{data.display_id}
          </Text>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => setOpen(true)}
        >
          Opnieuw verzenden
        </Button>
      </div>

      <Prompt open={open} onOpenChange={setOpen}>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Bevestigingsmail opnieuw verzenden</Prompt.Title>
            <Prompt.Description>
              Geef aan waarom je de bevestigingsmail voor bestelling #
              {data.display_id} opnieuw verstuurt.
            </Prompt.Description>
          </Prompt.Header>
          <div className="px-6 pb-2">
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Bijvoorbeeld: klant kreeg de eerste mail niet door een leveringsfout"
              disabled={loading}
            />
          </div>
          <Prompt.Footer>
            <Prompt.Cancel disabled={loading} onClick={() => setReason("")}>
              Annuleren
            </Prompt.Cancel>
            <Button
              size="small"
              onClick={handleConfirm}
              disabled={!reason.trim() || loading}
              isLoading={loading}
            >
              Verzenden
            </Button>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.before",
})

export default OrderResendConfirmationWidget
