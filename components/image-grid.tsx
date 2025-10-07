"use client";

import { useImageStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

export function ImageGrid() {
  const { images, searchQuery, setSelectedImage } = useImageStore();
  const router = useRouter();

  const handleAddCaptions = (image: any) => {
    // ✅ Store the entire image object for the editor
    setSelectedImage(image);
    router.push("/editor");
  };

  if (!searchQuery) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">
          Start by searching for images above
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <Card
          key={image.id}
          className="group overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={image.urls.small || "/placeholder.svg"}
              alt={image.alt_description || "Unsplash image"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          <CardContent className="p-4">
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              Photo by{" "}
              <span className="font-medium text-foreground">
                {image.user?.name || "Unknown"}
              </span>
            </p>
            <Button
              onClick={() => handleAddCaptions(image)}
              className="w-full"
              size="sm"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Captions
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
