import Link from "next/link"
import { ImageIcon } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ImageIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Image Editor</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Search
            </Link>
            <Link
              href="/editor"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Editor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
