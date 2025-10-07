"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as fabric from "fabric";
import { useImageStore } from "@/lib/store"; // ✅ using image store

interface CanvasLayer {
  id: string;
  type: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  radius?: number;
  color?: string;
  text?: string;
  zIndex: number;
}

export default function CanvasEditor() {
  const { selectedImage } = useImageStore(); // getting the selected image from the useImageStore
  const searchParams = useSearchParams();
  const router = useRouter();
  // prefer query param 'image' (encoded URL). fallback to selectedImage from store.
  const imageParam = searchParams?.get("image") || null;
  const imageUrlFromParam = imageParam ? decodeURIComponent(imageParam) : null;
  const imageUrl = imageUrlFromParam || selectedImage?.urls?.regular;

  const canvasRef = useRef<fabric.Canvas | null>(null);
  const elRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [layers, setLayers] = useState<CanvasLayer[]>([]);

  useEffect(() => {
    if (!elRef.current) return;

    const c = new fabric.Canvas(elRef.current, {
      selection: true,
      preserveObjectStacking: true,
      renderOnAddRemove: true,
    });
    canvasRef.current = c;

    const toolbarHeight = 60;
    const resizeCanvas = () => {
      const width = window.innerWidth * 0.95;
      const height = window.innerHeight - toolbarHeight - 100;
      c.setDimensions({ width, height });
      c.renderAll();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ✅ Background
    c.backgroundColor = "#fafafa";
    c.renderAll();

    // ✅ Load the image from query param first, otherwise use store
    console.log("Selected Image URL:", imageUrl);
    if (imageUrl) {
      setIsLoading(true);
      setError(null);

      // remove any previous non-evented background image (optional)
      try {
        c.getObjects().forEach((o) => {
          if (o.type === "image" && o.evented === false) {
            c.remove(o);
          }
        });
      } catch (e) {
        // ignore
      }

      const url = imageUrl;
      const imgEl = new Image();
      imgEl.crossOrigin = "anonymous";
      imgEl.onload = () => {
        try {
          const fabricImg = new fabric.Image(imgEl, {
            left: c.getWidth() / 2,
            top: c.getHeight() / 2,
            originX: "center",
            originY: "center",
            selectable: false,
            evented: false,
            zIndex: 0,
          });

          // mark as background so z-order code keeps it at the very back
          (fabricImg as any).isBackground = true;

          const scale = Math.min(
            c.getWidth() / (fabricImg.width || 1),
            c.getHeight() / (fabricImg.height || 1)
          );
          fabricImg.scale(scale * 0.9);

          c.add(fabricImg);
          if ((c as any).sendToBack) (c as any).sendToBack(fabricImg);
          else c.moveTo(fabricImg, 0);

          c.renderAll();
        } catch (err) {
          // setError("Failed to create fabric image.");
        } finally {
          setIsLoading(false);
        }
      };
      imgEl.onerror = () => {
        setError("Failed to load image.");
        setIsLoading(false);
      };
      imgEl.src = url;
    } else {
      setError("No image provided. Redirecting home.");
      setIsLoading(false);
      // only redirect when no image param and no store image
      router.replace("/");
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      c.dispose();
    };
  }, [imageParam, selectedImage]);

  // 🔧 Z-Order Management
  const refreshZOrder = (canvas: fabric.Canvas) => {
    const objs = canvas.getObjects();
    const backgrounds = objs.filter((o: any) => o.isBackground);
    const others = objs.filter((o: any) => !o.isBackground);
    others.sort((a: any, b: any) => (a.zIndex ?? 0) - (b.zIndex ?? 0));
    canvas.clear();
    // add backgrounds first so they always stay behind
    backgrounds.forEach((o) => canvas.add(o));
    others.forEach((o) => canvas.add(o));
    canvas.renderAll();
  };

  const assignZIndex = (canvas: fabric.Canvas, obj: any) => {
    const nonBg = canvas.getObjects().filter((o: any) => !o.isBackground);
    const maxZ = Math.max(...nonBg.map((o: any) => o.zIndex ?? 0), 0) + 1;
    obj.zIndex = maxZ;
  };

  const updateLayers = (canvas: fabric.Canvas) => {
    const data: CanvasLayer[] = canvas.getObjects().map((obj: any, index) => ({
      id: obj.id || `layer-${index}`,
      type: obj.type,
      position: { x: obj.left || 0, y: obj.top || 0 },
      width: obj.width ? Math.round(obj.width * (obj.scaleX || 1)) : undefined,
      height: obj.height
        ? Math.round(obj.height * (obj.scaleY || 1))
        : undefined,
      radius: obj.radius
        ? Math.round(obj.radius * (obj.scaleX || 1))
        : undefined,
      color: obj.fill,
      text: obj.text || undefined,
      zIndex: obj.zIndex ?? index,
    }));
    setLayers(data);
  };

  // ✏️ Toolbar Actions
  const addText = () => {
    const c = canvasRef.current!;
    const text = new fabric.Textbox("Double click to edit", {
      left: 100,
      top: 100,
      fontSize: 28,
      fill: "#111827",
      editable: true,
    });
    assignZIndex(c, text);
    c.add(text);
    refreshZOrder(c);
    c.setActiveObject(text);
    updateLayers(c);
  };

  const addRect = () => {
    const c = canvasRef.current!;
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 160,
      height: 100,
      fill: "rgba(59,130,246,0.35)",
      stroke: "#1d4ed8",
      strokeWidth: 2,
    });
    assignZIndex(c, rect);
    c.add(rect);
    refreshZOrder(c);
    c.setActiveObject(rect);
    updateLayers(c);
  };

  const addCircle = () => {
    const c = canvasRef.current!;
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 60,
      fill: "rgba(239,68,68,0.35)",
      stroke: "#b91c1c",
      strokeWidth: 2,
    });
    assignZIndex(c, circle);
    c.add(circle);
    refreshZOrder(c);
    c.setActiveObject(circle);
    updateLayers(c);
  };

  const addTriangle = () => {
    const c = canvasRef.current!;
    const triangle = new fabric.Triangle({
      left: 250,
      top: 250,
      width: 150,
      height: 130,
      fill: "rgba(16,185,129,0.35)",
      stroke: "#047857",
      strokeWidth: 2,
    });
    assignZIndex(c, triangle);
    c.add(triangle);
    refreshZOrder(c);
    c.setActiveObject(triangle);
    updateLayers(c);
  };

  const addPolygon = () => {
    const c = canvasRef.current!;
    const points = [
      { x: 75, y: 0 },
      { x: 150, y: 50 },
      { x: 125, y: 130 },
      { x: 25, y: 130 },
      { x: 0, y: 50 },
    ];
    const polygon = new fabric.Polygon(points, {
      left: 300,
      top: 300,
      fill: "rgba(250,204,21,0.55)",
      stroke: "#a16207",
      strokeWidth: 2,
    });
    assignZIndex(c, polygon);
    c.add(polygon);
    refreshZOrder(c);
    c.setActiveObject(polygon);
    updateLayers(c);
  };

  // 🧩 Layer Controls
  const bringToFront = () => {
    const c = canvasRef.current!;
    const obj = c.getActiveObject() as any;
    if (!obj) return;
    const nonBg = c.getObjects().filter((o: any) => !o.isBackground);
    obj.zIndex = Math.max(...nonBg.map((o: any) => o.zIndex ?? 0), 0) + 1;
    refreshZOrder(c);
    updateLayers(c);
  };

  const sendBackward = () => {
    const c = canvasRef.current!;
    const obj = c.getActiveObject() as any;
    if (!obj) return;
    // compute min among non-background objects so nothing moves behind background
    const nonBg = c.getObjects().filter((o: any) => !o.isBackground);
    const minNonBg = Math.min(...nonBg.map((o: any) => o.zIndex ?? 0), 0);
    obj.zIndex = minNonBg - 1;
    refreshZOrder(c);
    updateLayers(c);
  };

  const removeSelected = () => {
    const c = canvasRef.current!;
    const obj = c.getActiveObject();
    if (obj) {
      c.remove(obj);
      c.discardActiveObject();
      refreshZOrder(c);
      updateLayers(c);
    }
  };

  const download = () => {
    const c = canvasRef.current!;
    try {
      const a = document.createElement("a");
      a.href = c.toDataURL({ format: "png" });
      a.download = "edited-image.png";
      a.click();
    } catch {
      setError("Unable to generate image download.");
    }
  };

  // 🖼️ UI
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center text-sm">
        <button onClick={addText}>Add Text</button>
        <button onClick={addRect}>Rectangle</button>
        <button onClick={addCircle}>Circle</button>
        <button onClick={addTriangle}>Triangle</button>
        <button onClick={addPolygon}>Polygon</button>
        <button onClick={bringToFront}>Bring Front</button>
        <button onClick={sendBackward}>Send Back</button>
        <button onClick={removeSelected}>Delete</button>
        <button onClick={download}>Download</button>
      </div>

      {/* ✅ Canvas */}
      <div className="relative w-full flex flex-col items-center">
        <canvas
          ref={elRef}
          className="border rounded shadow-md bg-gray-50"
          style={{
            maxWidth: "95vw",
            cursor: "move",
            opacity: isLoading ? 0.3 : 1,
          }}
        />
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 animate-pulse bg-white/70 px-3 py-1 rounded">
            Loading image...
          </div>
        )}
        {error && (
          <div className="absolute bottom-2 text-sm text-red-600 bg-white/90 px-2 py-1 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Debug Layers */}
      <div className="mt-4 w-full max-w-5xl">
        <h3 className="text-lg font-semibold mb-2">
          Canvas Layers (Debug Log)
        </h3>
        <pre className="bg-gray-100 text-gray-800 text-xs p-3 rounded overflow-auto max-h-60">
          {JSON.stringify(layers, null, 2)}
        </pre>
      </div>
    </div>
  );
}
