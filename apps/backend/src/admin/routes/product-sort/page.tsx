import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ArrowDownMini, ArrowUpMini, DotsSix } from "@medusajs/icons"
import { Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { sdk } from "../../lib/client"

type ProductPosition = {
  id: string
  title: string
  thumbnail: string | null
  position: number | null
}

const ProductSortPage = () => {
  const [items, setItems] = useState<ProductPosition[]>([])
  const [dirty, setDirty] = useState(false)
  const initialized = useRef(false)
  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["product-positions"],
    queryFn: () =>
      sdk.client.fetch<{ products: ProductPosition[] }>(
        "/admin/custom/products/positions"
      ),
  })

  // Populate items from server once on initial load only.
  // After that, local state is the source of truth to avoid
  // resetting the user's unsaved order on background refetches.
  useEffect(() => {
    if (data && !initialized.current) {
      setItems(data.products)
      initialized.current = true
    }
  }, [data])

  const save = useMutation({
    mutationFn: () =>
      sdk.client.fetch("/admin/custom/products/positions", {
        method: "POST",
        body: {
          positions: items.map((item, i) => ({ id: item.id, position: i + 1 })),
        },
      }),
    onSuccess: () => {
      setDirty(false)
      // Update cache so next mount initialises with the saved order.
      queryClient.setQueryData(["product-positions"], {
        products: items.map((item, i) => ({ ...item, position: i + 1 })),
      })
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

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Productvolgorde</Heading>
          <Text size="small" className="text-ui-fg-subtle mt-1">
            Sleep of gebruik pijlen om de volgorde aan te passen. Kies
            &ldquo;Aanbevolen&rdquo; als sortering op de winkelpage om deze
            volgorde te tonen.
          </Text>
        </div>
        <Button
          size="small"
          disabled={!dirty || save.isPending}
          isLoading={save.isPending}
          onClick={() => save.mutate()}
        >
          Volgorde opslaan
        </Button>
      </div>

      {isLoading && (
        <Text size="small" className="text-ui-fg-muted">
          Laden…
        </Text>
      )}

      {!isLoading && items.length > 0 && (
        <Container className="divide-y p-0">
          {items.map((item, i) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={handleDrop}
              className="flex items-center gap-3 px-4 py-3 hover:bg-ui-bg-subtle-hover"
            >
              <DotsSix className="text-ui-fg-muted cursor-grab shrink-0" />

              <div className="w-10 h-10 shrink-0 overflow-hidden bg-ui-bg-subtle rounded-sm">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>

              <Text
                size="small"
                weight="plus"
                className="flex-1 min-w-0 truncate"
              >
                {item.title}
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
        </Container>
      )}
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Productvolgorde",
})

export default ProductSortPage
