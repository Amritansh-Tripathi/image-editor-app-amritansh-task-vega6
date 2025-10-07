import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"
import { EditorProvider } from "@/lib/EditorContext";

export const metadata: Metadata = {
  title: "Image Editor App - Add Captions & Edit Images",
  description: "Search images from Unsplash and add custom captions, shapes, and text with our powerful canvas editor.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <EditorProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
          <Analytics />
        </EditorProvider>
      </body>
    </html>
  )
}
