"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface EditorContextType {
  selectedImage: string | null;
  setSelectedImage: (url: string | null) => void;
  clearSelectedImage: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ✅ Optional persistence (saves last image in localStorage)
  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedImage");
    if (saved) setSelectedImage(saved);
  }, []);

  const clearSelectedImage = () => {
    setSelectedImage(null);
    localStorage.removeItem("selectedImage");
  };

  return (
    <EditorContext.Provider
      value={{ selectedImage, setSelectedImage, clearSelectedImage }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within <EditorProvider>");
  return ctx;
};
