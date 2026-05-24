import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, HttpTypes } from "@medusajs/framework/types"
import { Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useState } from "react"
import { sdk } from "../lib/client"

const OrderInvoiceWidget = ({
  data,
}: DetailWidgetProps<HttpTypes.AdminOrder>) => {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const result = (await sdk.client.fetch(
        `/admin/custom/orders/${data.id}/invoice`
      )) as { pdf_base64: string; filename: string }

      const bytes = Uint8Array.from(atob(result.pdf_base64), (c) =>
        c.charCodeAt(0)
      )
      const blob = new Blob([bytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = result.filename
      anchor.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Factuur kon niet worden geladen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Factuur</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Bestelling #{data.display_id}
          </Text>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={handleDownload}
          isLoading={loading}
        >
          Download factuur
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.before",
})

export default OrderInvoiceWidget
