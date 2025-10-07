'use client';

import { useEditor } from '@/lib/EditorContext';
import CanvasEditor from '@/components/canvas-editor';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function EditorPage() {
  const { selectedImage, clearSelectedImage } = useEditor();
  console.log('Selected Image URL:', selectedImage);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 p-4 overflow-auto">
        {selectedImage ? (
          <CanvasEditor src={selectedImage} />
        ) : (
          <div className="flex h-[80vh] flex-col items-center justify-center text-gray-600 gap-3">
            <p>No image selected. Go back and pick one!</p>
            <button
              onClick={clearSelectedImage}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear Last Image
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
