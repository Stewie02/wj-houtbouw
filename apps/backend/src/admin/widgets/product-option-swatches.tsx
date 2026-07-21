import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Button, Container, Heading, Input, Select, Text, toast } from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { sdk } from "../lib/client"

type DisplayType = "select" | "button" | "color-swatch"

type ProductOption = {
  id: string
  title: string
  metadata?: Record<string, unknown> | null
  values?: { value: string }[]
}

type Config = {
  display: DisplayType
  swatches: Record<string, string>
  protection: Record<string, string>
}

type WidgetProps = { data: { id: string } }

const DISPLAY_LABELS: Record<DisplayType, string> = {
  select: "Dropdown (lange of geordende lijsten)",
  button: "Keuzeknoppen (ja/nee, opties)",
  "color-swatch": "Kleurstalen",
}

// "none" is de UI-waarde voor "geen badge"; die slaan we op als afwezige sleutel.
const PROTECTION_LABELS: Record<string, string> = {
  none: "Geen badge",
  yes: "Beschermd",
  no: "Onbehandeld",
}

const readConfig = (metadata?: Record<string, unknown> | null): Config => {
  const display = metadata?.display
  const swatches =
    metadata?.swatches && typeof metadata.swatches === "object"
      ? (metadata.swatches as Record<string, string>)
      : {}
  const protection =
    metadata?.protection && typeof metadata.protection === "object"
      ? (metadata.protection as Record<string, string>)
      : {}
  const valid: DisplayType[] = ["select", "button", "color-swatch"]
  return {
    display: valid.includes(display as DisplayType)
      ? (display as DisplayType)
      : "select",
    swatches,
    protection,
  }
}

const ProductOptionSwatchesWidget = ({ data }: WidgetProps) => {
  const productId = data.id
  const queryClient = useQueryClient()
  const [config, setConfig] = useState<Record<string, Config>>({})
  const [dirty, setDirty] = useState<Record<string, boolean>>({})
  const initialized = useRef(false)

  const { data: productData, isLoading } = useQuery({
    queryKey: ["product-options", productId],
    queryFn: () =>
      sdk.client.fetch<{ product: { options: ProductOption[] } }>(
        `/admin/products/${productId}`,
        {
          query: {
            fields: "options.id,options.title,options.metadata,options.values.value",
          },
        }
      ),
  })

  const options = [...(productData?.product.options ?? [])].sort((a, b) => {
    const pa = (a.metadata?.position as number) ?? 999
    const pb = (b.metadata?.position as number) ?? 999
    return pa - pb
  })

  useEffect(() => {
    if (productData && !initialized.current) {
      const next: Record<string, Config> = {}
      for (const o of productData.product.options ?? []) {
        next[o.id] = readConfig(o.metadata)
      }
      setConfig(next)
      initialized.current = true
    }
  }, [productData])

  const save = useMutation({
    mutationFn: ({ optionId, cfg }: { optionId: string; cfg: Config }) =>
      sdk.client.fetch(`/admin/custom/products/${productId}/options/display`, {
        method: "POST",
        body: {
          option_id: optionId,
          display: cfg.display,
          swatches: cfg.display === "color-swatch" ? cfg.swatches : {},
          protection: cfg.display === "color-swatch" ? cfg.protection : {},
        },
      }),
    onSuccess: (_res, { optionId }) => {
      setDirty((d) => ({ ...d, [optionId]: false }))
      queryClient.invalidateQueries({ queryKey: ["product-options", productId] })
      toast.success("Weergave opgeslagen")
    },
    onError: () => toast.error("Er is iets misgegaan"),
  })

  const update = (optionId: string, patch: Partial<Config>) => {
    setConfig((c) => ({ ...c, [optionId]: { ...c[optionId], ...patch } }))
    setDirty((d) => ({ ...d, [optionId]: true }))
  }

  const setSwatch = (optionId: string, value: string, color: string) => {
    setConfig((c) => ({
      ...c,
      [optionId]: {
        ...c[optionId],
        swatches: { ...c[optionId].swatches, [value]: color },
      },
    }))
    setDirty((d) => ({ ...d, [optionId]: true }))
  }

  const setProtection = (optionId: string, value: string, level: string) => {
    setConfig((c) => {
      const next = { ...(c[optionId].protection ?? {}) }
      if (level === "none") {
        delete next[value]
      } else {
        next[value] = level
      }
      return { ...c, [optionId]: { ...c[optionId], protection: next } }
    })
    setDirty((d) => ({ ...d, [optionId]: true }))
  }

  if (!isLoading && options.length === 0) return null

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h2">Weergave opties</Heading>
        <Text size="small" className="text-ui-fg-subtle mt-1">
          Kies per optie hoe klanten kiezen op de productpagina.
        </Text>
      </div>

      {isLoading && (
        <div className="px-6 py-4">
          <Text size="small" className="text-ui-fg-muted">Laden…</Text>
        </div>
      )}

      {options.map((option) => {
        const cfg = config[option.id]
        if (!cfg) return null
        const isSwatch = cfg.display === "color-swatch"

        return (
          <div key={option.id} className="flex flex-col gap-3 px-6 py-4">
            <Text size="small" weight="plus" leading="compact">
              {option.title}
            </Text>

            <Select
              size="small"
              value={cfg.display}
              onValueChange={(v) => update(option.id, { display: v as DisplayType })}
            >
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {(Object.keys(DISPLAY_LABELS) as DisplayType[]).map((d) => (
                  <Select.Item key={d} value={d}>
                    {DISPLAY_LABELS[d]}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>

            {isSwatch && (
              <div className="flex flex-col gap-3">
                {(option.values ?? []).map(({ value }) => (
                  <div key={value} className="flex flex-col gap-1.5">
                    <Text
                      size="small"
                      className="text-ui-fg-subtle truncate"
                      title={value}
                    >
                      {value}
                    </Text>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={cfg.swatches[value] || "#cccccc"}
                        onChange={(e) => setSwatch(option.id, value, e.target.value)}
                        className="h-8 w-8 shrink-0 cursor-pointer border border-ui-border-base bg-ui-bg-base p-0"
                        aria-label={`Kleur voor ${value}`}
                      />
                      <Input
                        size="small"
                        className="flex-1 min-w-0"
                        value={cfg.swatches[value] ?? ""}
                        onChange={(e) => setSwatch(option.id, value, e.target.value)}
                        placeholder="Hex"
                      />
                    </div>
                    <Select
                      size="small"
                      value={cfg.protection?.[value] ?? "none"}
                      onValueChange={(v) => setProtection(option.id, value, v)}
                    >
                      <Select.Trigger aria-label={`Bescherming voor ${value}`}>
                        <Select.Value />
                      </Select.Trigger>
                      <Select.Content>
                        {Object.keys(PROTECTION_LABELS).map((p) => (
                          <Select.Item key={p} value={p}>
                            {PROTECTION_LABELS[p]}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="small"
              variant="secondary"
              className="self-start"
              disabled={!dirty[option.id] || save.isPending}
              isLoading={save.isPending}
              onClick={() => save.mutate({ optionId: option.id, cfg })}
            >
              Opslaan
            </Button>
          </div>
        )
      })}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
})

export default ProductOptionSwatchesWidget
