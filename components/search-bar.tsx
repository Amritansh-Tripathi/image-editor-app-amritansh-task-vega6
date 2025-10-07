"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useImageStore } from "@/lib/store"
import { searchImages } from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setImages, setSearchQuery } = useImageStore()
  const { toast } = useToast()

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setImages([])
      return
    }

    const timer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search term",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setSearchQuery(query)

    try {
      const data = await searchImages(query)

      if (data.results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
        })
      }

      setImages(data.results)
    } catch (error) {
      console.error("[v0] Search error:", error)
      toast({
        title: "Search failed",
        description: "Unable to fetch images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [query, setImages, setSearchQuery, toast])

  const handleClear = () => {
    setQuery("")
    setImages([])
    setSearchQuery("")
  }

  return (
    <div className="mx-auto mb-12 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for images... (e.g., nature, technology, people)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 pl-12 pr-12 text-base"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      {isLoading && <p className="mt-2 text-center text-sm text-muted-foreground">Searching...</p>}
    </div>
  )
}
