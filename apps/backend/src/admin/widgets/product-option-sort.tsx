import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { ArrowDownMini, ArrowUpMini, DotsSix } from "@medusajs/icons"
import { Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { sdk } from "../lib/client"

type ProductOption = {
  id: string
  title: string
  metadata?: Record<string, unknown> | null
}

type WidgetProps = {
  data: { id: string }
}

const ProductOptionSortWidget = ({ data }: WidgetProps) => {
  const productId = data.id
  const [items, setItems] = useState<ProductOption[]>([])
  const [dirty, setDirty] = useState(false)
  const initialized = useRef(false)
  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)
  const queryClient = useQueryClient()

  const { data: productData, isLoading } = useQuery({
    queryKey: ["product-options", productId],
    queryFn: () =>
      sdk.client.fetch<{ product: { options: ProductOption[] } }>(
        `/admin/products/${productId}`,
        { query: { fields: "options.id,options.title,options.metadata" } }
      ),
  })

  useEffect(() => {
    if (productData && !initialized.current) {
      const sorted = [...(productData.product.options ?? [])].sort((a, b) => {
        const pa = (a.metadata?.position as number) ?? 999
        const pb = (b.metadata?.position as number) ?? 999
        return pa - pb
      })
      setItems(sorted)
      initialized.current = true
    }
  }, [productData])

  const save = useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/admin/custom/products/${productId}/options/reorder`, {
        method: "POST",
        body: { option_ids: items.map((o) => o.id) },
      }),
    onSuccess: () => {
      setDirty(false)
      queryClient.invalidateQueries({ queryKey: ["product-options", productId] })
      toast.success("Volgorde opgeslagen")
    },
    onError: () => {
      toast.error("Er is iets misgegaan")
    },
  })

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    const next = [...items]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    setItems(next)
    setDirty(true)
  }

  const handleDragStart = (index: number) => {
    dragIndex.current = index
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverIndex.current = index
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragIndex.current === null || dragOverIndex.current === null) return
    if (dragIndex.current !== dragOverIndex.current) {
      move(dragIndex.current, dragOverIndex.current)
    }
    dragIndex.current = null
    dragOverIndex.current = null
  }

  if (items.length <= 1) return null

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Volgorde opties</Heading>
        <Button
          size="small"
          disabled={!dirty || save.isPending}
          isLoading={save.isPending}
          onClick={() => save.mutate()}
        >
          Opslaan
        </Button>
      </div>

      {isLoading && (
        <div className="px-6 py-4">
          <Text size="small" className="text-ui-fg-muted">Laden…</Text>
        </div>
      )}

      {!isLoading && items.length > 0 && (
        <div className="divide-y">
          {items.map((option, i) => (
            <div
              key={option.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={handleDrop}
              className="flex items-center gap-3 px-4 py-3 hover:bg-ui-bg-subtle-hover"
            >
              <DotsSix className="text-ui-fg-muted cursor-grab shrink-0" />

              <Text
                size="small"
                weight="plus"
                className="flex-1 min-w-0 truncate"
              >
                {option.title}
              </Text>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  className="p-1 text-ui-fg-muted hover:text-ui-fg-base disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUpMini />
                </button>
                <button
                  onClick={() => move(i, i + 1)}
                  disabled={i === items.length - 1}
                  className="p-1 text-ui-fg-muted hover:text-ui-fg-base disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDownMini />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
})

export default ProductOptionSortWidget
