import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UnsplashImage, CanvasLayer } from "./types";

interface ImageStore {
  images: UnsplashImage[];
  searchQuery: string;
  selectedImage: UnsplashImage | null;
  canvasLayers: CanvasLayer[];
  setImages: (images: UnsplashImage[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedImage: (image: UnsplashImage | null) => void;
  addCanvasLayer: (layer: CanvasLayer) => void;
  updateCanvasLayer: (id: string, updates: Partial<CanvasLayer>) => void;
  removeCanvasLayer: (id: string) => void;
  setCanvasLayers: (layers: CanvasLayer[]) => void;
  clearCanvas: () => void;
}

export const useImageStore = create<ImageStore>()(
  persist(
    (set) => ({
      images: [],
      searchQuery: "",
      selectedImage: null,
      canvasLayers: [],
      setImages: (images) => set({ images }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedImage: (image) => set({ selectedImage: image }),
      addCanvasLayer: (layer) =>
        set((state) => ({ canvasLayers: [...state.canvasLayers, layer] })),
      updateCanvasLayer: (id, updates) =>
        set((state) => ({
          canvasLayers: state.canvasLayers.map((layer) =>
            layer.id === id ? { ...layer, ...updates } : layer
          ),
        })),
      removeCanvasLayer: (id) =>
        set((state) => ({
          canvasLayers: state.canvasLayers.filter((layer) => layer.id !== id),
        })),
      setCanvasLayers: (layers) => set({ canvasLayers: layers }),
      clearCanvas: () => set({ canvasLayers: [] }),
    }),
    {
      name: "image-store", // key in localStorage
      // createJSONStorage ensures safe use with SSR checks
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (null as any)
      ),
      // persist only the pieces we need (selected image and layers)
      partialize: (state) => ({
        selectedImage: state.selectedImage,
        canvasLayers: state.canvasLayers,
      }),
    }
  )
);
