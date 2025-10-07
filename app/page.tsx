import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { ImageGrid } from "@/components/image-grid"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Create Beautiful Image Captions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Search millions of high-quality images from Unsplash and add custom text, shapes, and captions with our
              intuitive canvas editor.
            </p>
          </div>

          <SearchBar />
          <ImageGrid />
        </div>
      </main>

      <Footer />
    </div>
  )
}
