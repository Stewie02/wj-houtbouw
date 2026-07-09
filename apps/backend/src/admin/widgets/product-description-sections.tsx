import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, HttpTypes } from "@medusajs/framework/types"
import {
  Button,
  Container,
  Drawer,
  Heading,
  IconButton,
  Input,
  Label,
  Text,
  toast,
} from "@medusajs/ui"
import { DotsSix, PencilSquare, Plus, Trash } from "@medusajs/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"
import "./product-description-sections.css"
import { sdk } from "../lib/client"

type Section = { title: string; body: string }

const parseSections = (metadata?: Record<string, unknown> | null): Section[] => {
  const raw = metadata?.sections
  if (!Array.isArray(raw)) return []
  return raw.filter(
    (s): s is Section =>
      !!s &&
      typeof s === "object" &&
      typeof (s as Record<string, unknown>).title === "string" &&
      typeof (s as Record<string, unknown>).body === "string"
  )
}

const ProductDescriptionSectionsWidget = ({
  data: product,
}: DetailWidgetProps<HttpTypes.AdminProduct>) => {
  const queryClient = useQueryClient()
  const [sections, setSections] = useState<Section[]>(() =>
    parseSections(product.metadata)
  )
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null) // null = new
  const [form, setForm] = useState<Section>({ title: "", body: "" })
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({})
  // MDXEditor takes `markdown` as initial content only; bump this to remount it
  // with fresh content each time the drawer opens for a different section.
  const [editorKey, setEditorKey] = useState(0)

  const save = useMutation({
    mutationFn: (next: Section[]) =>
      sdk.admin.product.update(product.id, {
        metadata: { ...(product.metadata ?? {}), sections: next },
      }),
    onSuccess: (_res, next) => {
      setSections(next)
      queryClient.invalidateQueries({ queryKey: ["product", product.id] })
      setOpen(false)
      toast.success("Secties opgeslagen")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Opslaan mislukt")
    },
  })

  const openAdd = () => {
    setEditIndex(null)
    setForm({ title: "", body: "" })
    setErrors({})
    setEditorKey((k) => k + 1)
    setOpen(true)
  }

  const openEdit = (i: number) => {
    setEditIndex(i)
    setForm(sections[i])
    setErrors({})
    setEditorKey((k) => k + 1)
    setOpen(true)
  }

  const remove = (i: number) => {
    save.mutate(sections.filter((_, idx) => idx !== i))
  }

  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const handleDrop = () => {
    const from = dragIndex.current
    const to = dragOverIndex.current
    dragIndex.current = null
    dragOverIndex.current = null
    if (from === null || to === null || from === to || save.isPending) return
    const next = [...sections]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    save.mutate(next)
  }

  const submit = () => {
    const next: typeof errors = {}
    if (!form.title.trim()) next.title = "Titel is verplicht"
    if (!form.body.trim()) next.body = "Inhoud is verplicht"
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    const value: Section = { title: form.title.trim(), body: form.body }
    const updated =
      editIndex === null
        ? [...sections, value]
        : sections.map((s, idx) => (idx === editIndex ? value : s))
    save.mutate(updated)
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Beschrijving secties</Heading>
        <Button size="small" variant="secondary" onClick={openAdd}>
          <Plus />
          Sectie toevoegen
        </Button>
      </div>

      {sections.length === 0 ? (
        <div className="px-6 py-4">
          <Text size="small" className="text-ui-fg-subtle">
            Nog geen secties. Voeg uitklapbare secties toe (bijvoorbeeld
            Specificaties, Levering, Onderhoud) die onder de beschrijving op de
            productpagina verschijnen.
          </Text>
        </div>
      ) : (
        sections.map((s, i) => (
          <div
            key={i}
            draggable={!save.isPending}
            onDragStart={() => (dragIndex.current = i)}
            onDragOver={(e) => {
              e.preventDefault()
              dragOverIndex.current = i
            }}
            onDrop={handleDrop}
            className="flex items-center gap-3 px-6 py-4 hover:bg-ui-bg-subtle-hover"
          >
            <DotsSix className="text-ui-fg-muted cursor-grab shrink-0" />
            <div className="min-w-0 flex-1">
              <Text size="small" weight="plus" leading="compact">
                {s.title}
              </Text>
              <Text
                size="small"
                leading="compact"
                className="text-ui-fg-subtle truncate"
              >
                {s.body}
              </Text>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <IconButton
                size="small"
                variant="transparent"
                onClick={() => openEdit(i)}
                disabled={save.isPending}
              >
                <PencilSquare />
              </IconButton>
              <IconButton
                size="small"
                variant="transparent"
                onClick={() => remove(i)}
                disabled={save.isPending}
              >
                <Trash />
              </IconButton>
            </div>
          </div>
        ))
      )}

      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              {editIndex === null ? "Sectie toevoegen" : "Sectie bewerken"}
            </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body className="flex-1 overflow-auto">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Label>Titel</Label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value })
                    setErrors({ ...errors, title: undefined })
                  }}
                  placeholder="Specificaties"
                />
                {errors.title && (
                  <Text size="small" className="text-ui-fg-error">
                    {errors.title}
                  </Text>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Inhoud</Label>
                <div className="rounded-md border border-ui-border-base bg-ui-bg-base overflow-hidden">
                  <MDXEditor
                    key={editorKey}
                    markdown={form.body}
                    onChange={(md) => {
                      setForm((f) => ({ ...f, body: md }))
                      setErrors((e) => ({ ...e, body: undefined }))
                    }}
                    plugins={[
                      headingsPlugin(),
                      listsPlugin(),
                      quotePlugin(),
                      linkPlugin(),
                      linkDialogPlugin(),
                      thematicBreakPlugin(),
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            {/* ponytail: no underline — markdown has none, it emits
                                raw <u> that the storefront renderer would drop */}
                            <BoldItalicUnderlineToggles
                              options={["Bold", "Italic"]}
                            />
                            <BlockTypeSelect />
                            <ListsToggle />
                            <CreateLink />
                          </>
                        ),
                      }),
                    ]}
                  />
                </div>
                {errors.body && (
                  <Text size="small" className="text-ui-fg-error">
                    {errors.body}
                  </Text>
                )}
              </div>
            </div>
          </Drawer.Body>

          <Drawer.Footer>
            <div className="flex items-center justify-end gap-x-2">
              <Drawer.Close asChild>
                <Button size="small" variant="secondary" disabled={save.isPending}>
                  Annuleren
                </Button>
              </Drawer.Close>
              <Button size="small" onClick={submit} isLoading={save.isPending}>
                Opslaan
              </Button>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductDescriptionSectionsWidget
