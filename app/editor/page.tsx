"use client";

import CanvasEditor from "@/components/canvas-editor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 p-4 overflow-auto">
        <CanvasEditor />
      </main>
      <Footer />
    </div>
  );
}
