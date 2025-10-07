"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CanvasLayer } from "@/lib/types"

interface DebugPanelProps {
  layers: CanvasLayer[]
}

export function DebugPanel({ layers }: DebugPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
      case "i-text":
        return "bg-blue-100 text-blue-800"
      case "rect":
      case "rectangle":
        return "bg-purple-100 text-purple-800"
      case "circle":
        return "bg-red-100 text-red-800"
      case "triangle":
        return "bg-green-100 text-green-800"
      case "polygon":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Canvas State</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Debug panel showing all canvas layers
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          {layers.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">No layers yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add text or shapes to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {layers.map((layer, index) => (
                <div
                  key={layer.id || index}
                  className="rounded-lg border border-border bg-muted/30 p-3 text-xs"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={getTypeColor(layer.type)}
                    >
                      {layer.type}
                    </Badge>
                    <span className="text-muted-foreground">
                      z-index: {layer.zIndex ?? index}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="text-foreground">{layer.id}</span>
                    </div>

                    {layer.position && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position:</span>
                        <span className="text-foreground">
                          x: {Math.round(layer.position.x)}, y:{" "}
                          {Math.round(layer.position.y)}
                        </span>
                      </div>
                    )}

                    {layer.width && layer.height && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="text-foreground">
                          {Math.round(layer.width)} ×{" "}
                          {Math.round(layer.height)}
                        </span>
                      </div>
                    )}

                    {layer.color && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color:</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="h-3 w-3 rounded border border-border"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="text-foreground">{layer.color}</span>
                        </div>
                      </div>
                    )}

                    {layer.text && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Text:</span>
                        <span className="max-w-[150px] truncate text-foreground">
                          "{layer.text}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-foreground">
              Total Layers: {layers.length}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
