import { create } from "zustand"
import type { UnsplashImage, CanvasLayer } from "./types"

interface ImageStore {
  images: UnsplashImage[]
  searchQuery: string
  selectedImage: UnsplashImage | null
  canvasLayers: CanvasLayer[]
  setImages: (images: UnsplashImage[]) => void
  setSearchQuery: (query: string) => void
  setSelectedImage: (image: UnsplashImage | null) => void
  addCanvasLayer: (layer: CanvasLayer) => void
  updateCanvasLayer: (id: string, updates: Partial<CanvasLayer>) => void
  removeCanvasLayer: (id: string) => void
  setCanvasLayers: (layers: CanvasLayer[]) => void
  clearCanvas: () => void
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  searchQuery: "",
  selectedImage: null,
  canvasLayers: [],
  setImages: (images) => set({ images }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedImage: (image) => set({ selectedImage: image }),
  addCanvasLayer: (layer) => set((state) => ({ canvasLayers: [...state.canvasLayers, layer] })),
  updateCanvasLayer: (id, updates) =>
    set((state) => ({
      canvasLayers: state.canvasLayers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)),
    })),
  removeCanvasLayer: (id) =>
    set((state) => ({
      canvasLayers: state.canvasLayers.filter((layer) => layer.id !== id),
    })),
  setCanvasLayers: (layers) => set({ canvasLayers: layers }),
  clearCanvas: () => set({ canvasLayers: [] }),
}))
