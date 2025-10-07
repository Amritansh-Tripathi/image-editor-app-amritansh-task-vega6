import type { UnsplashSearchResponse } from "@/lib/types"

export async function searchImages(query: string, page = 1, perPage = 20): Promise<UnsplashSearchResponse> {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to fetch images" }))
      throw new Error(errorData.error || "Failed to fetch images from Unsplash")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error fetching images:", error)
    throw error
  }
}
