import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const tags = req.nextUrl.searchParams.get("tags");

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 });
  }

  tags.split(",").map((tag) => revalidateTag(tag.trim()));

  return NextResponse.json({ message: "Revalidated" }, { status: 200 });
}
