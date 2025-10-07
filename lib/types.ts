export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string | null
  description: string | null
  user: {
    name: string
    username: string
  }
  width: number
  height: number
}

export interface UnsplashSearchResponse {
  results: UnsplashImage[]
  total: number
  total_pages: number
}

export interface CanvasLayer {
  id: string
  type: "text" | "rectangle" | "circle" | "triangle" | "polygon" | "image"
  position: { x: number; y: number }
  color?: string
  text?: string
  zIndex: number
  width?: number
  height?: number
}
