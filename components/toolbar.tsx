"use client"

import { type Canvas, IText, Rect, Circle, Triangle, Polygon } from "fabric"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Type,
  Square,
  CircleIcon,
  TriangleIcon,
  Hexagon,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Download,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ToolbarProps {
  canvas: Canvas | null
}

export function Toolbar({ canvas }: ToolbarProps) {
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)

  const ensureInteractive = (obj: any) => {
    obj.set({
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
      hoverCursor: "move",
    })
  }

  const addText = () => {
    if (!canvas) return
    const text = new IText("Double-click to edit", {
      left: (canvas.width ?? 800) / 2,
      top: 100,
      fontSize: 28,
      fill: "#111827",
      originX: "center",
    })
    ensureInteractive(text)
    ;(text as any).data = { id: `text-${Date.now()}` }
    canvas.add(text)
    canvas.setActiveObject(text)
    canvas.renderAll()
    text.enterEditing()
    text.selectAll()
    toast({ title: "Text added", description: "Double-click to edit" })
  }

  const addShape = (type: "rectangle" | "circle" | "triangle" | "polygon") => {
    if (!canvas) return
    let shape: any
    const cx = (canvas.width ?? 800) / 2
    const cy = (canvas.height ?? 600) / 2

    switch (type) {
      case "rectangle":
        shape = new Rect({
          left: cx,
          top: cy,
          width: 150,
          height: 100,
          fill: "#3b82f6",
          originX: "center",
          originY: "center",
        })
        break
      case "circle":
        shape = new Circle({
          left: cx,
          top: cy,
          radius: 60,
          fill: "#ef4444",
          originX: "center",
          originY: "center",
        })
        break
      case "triangle":
        shape = new Triangle({
          left: cx,
          top: cy,
          width: 130,
          height: 110,
          fill: "#10b981",
          originX: "center",
          originY: "center",
        })
        break
      case "polygon":
        shape = new Polygon(
          [
            { x: 75, y: 0 },
            { x: 150, y: 50 },
            { x: 125, y: 130 },
            { x: 25, y: 130 },
            { x: 0, y: 50 },
          ],
          {
            left: cx,
            top: cy,
            fill: "#facc15",
            originX: "center",
            originY: "center",
          }
        )
        break
    }

    ensureInteractive(shape)
    ;(shape as any).data = { id: `${type}-${Date.now()}` }
    canvas.add(shape)
    canvas.setActiveObject(shape)
    canvas.renderAll()
    toast({ title: `${type} added`, description: "Drag or resize freely" })
  }

  // ✅ Fabric v6 stacking fix
  const bringForward = () => {
    const obj = canvas?.getActiveObject()
    if (obj && (canvas as any).bringObjectForward) {
      (canvas as any).bringObjectForward(obj)
      canvas?.renderAll()
    }
  }

  const sendBackward = () => {
    const obj = canvas?.getActiveObject()
    if (obj && (canvas as any).sendObjectBackwards) {
      (canvas as any).sendObjectBackwards(obj)
      canvas?.renderAll()
    }
  }

  const deleteSelected = () => {
    const obj = canvas?.getActiveObject()
    if (obj) {
      canvas?.remove(obj)
      canvas?.renderAll()
    }
  }

  const resetCanvas = () => {
    if (!canvas) return
    canvas.getObjects().forEach((o) => {
      if ((o as any).data?.bg !== true) canvas.remove(o)
    })
    canvas.renderAll()
  }

  const downloadCanvas = () => {
    if (!canvas) return
    const url = canvas.toDataURL({ format: "png", multiplier: 2 })
    const a = document.createElement("a")
    a.href = url
    a.download = `canvas-${Date.now()}.png`
    a.click()
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-4 shadow-sm">
      <Button variant="outline" size="sm" onClick={addText}>
        <Type className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6" />

      <Button variant="outline" size="sm" onClick={() => addShape("rectangle")}>
        <Square className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => addShape("circle")}>
        <CircleIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => addShape("triangle")}>
        <TriangleIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => addShape("polygon")}>
        <Hexagon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button variant="outline" size="sm" onClick={bringForward}>
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={sendBackward}>
        <ArrowDown className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button variant="outline" size="sm" onClick={deleteSelected}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={resetCanvas}>
        <RotateCcw className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Image</DialogTitle>
            <DialogDescription>Export your edited canvas as PNG.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={downloadCanvas}>Download PNG</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
