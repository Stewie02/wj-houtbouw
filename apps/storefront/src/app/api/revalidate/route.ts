import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const tags = req.nextUrl.searchParams.get("tags")

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  await Promise.all(
    tags.split(",").map(async (tag) => {
      switch (tag.trim()) {
        case "products":
          revalidatePath("/", "page")
          revalidatePath("/store", "page")
          revalidatePath("/products/[handle]", "page")
          break
      }
    })
  )

  return NextResponse.json({ message: "Revalidated" }, { status: 200 })
}
