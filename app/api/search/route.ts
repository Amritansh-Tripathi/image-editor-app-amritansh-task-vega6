import { type NextRequest, NextResponse } from "next/server"

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const UNSPLASH_API_URL = "https://api.unsplash.com"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const page = searchParams.get("page") || "1"
  const perPage = searchParams.get("per_page") || "20"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_ACCESS_KEY") {
    return NextResponse.json(
      {
        error: "Unsplash API key not configured",
        message: "Please add UNSPLASH_ACCESS_KEY to your environment variables",
      },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(
        query,
      )}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          "Accept-Version": "v1",
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] Unsplash API error:", response.status, errorData)
      return NextResponse.json(
        { error: "Failed to fetch images from Unsplash", details: errorData },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching images:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
