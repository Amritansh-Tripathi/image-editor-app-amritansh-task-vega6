# Image Editor App

A Next.js application that lets users search free images (Unsplash), load a selected image into a Fabric.js canvas, add editable captions and shapes, manage layers, and export the final composition as a PNG.

Live links

- CodeSandbox workspace (editable): https://codesandbox.io/p/github/Amritansh-Tripathi/image-editor-app-amritansh-task-vega6/draft/fervent-wave
- Public preview (deployed from sandbox): https://pdxxk4-3000.csb.app/

Overview / Key features

- Image search via Unsplash with responsive results grid.
- "Add Captions" opens the selected image in the canvas editor (query-parameter or persisted state).
- Fabric.js canvas:
  - Add and edit text (fabric.Textbox).
  - Add shapes: rectangle, circle, triangle, polygon.
  - Drag, resize, rotate, delete, and reorder layers.
  - Background image is fixed behind other objects.
- Download edited canvas as high-quality PNG (with confirmation dialog).
- Debug panel showing current canvas layers and attributes.

Technical stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Fabric.js
- Zustand (client state)
- Unsplash API

Project structure (high level)

```
├── app/
│   ├── api/search/route.ts      # Server-side Unsplash proxy
│   ├── page.tsx                 # Home / search page
│   └── editor/page.tsx          # Canvas editor page
├── components/
│   ├── search-bar.tsx
│   ├── image-grid.tsx
│   ├── canvas-editor.tsx
│   ├── toolbar.tsx
│   ├── debug-panel.tsx
│   ├── navbar.tsx
│   └── footer.tsx
├── lib/
│   ├── types.ts
│   └── store.ts                 # Zustand store (persist)
└── utils/
    └── api.ts                   # Client API helpers
```

Getting started (local)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with:
   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

Usage summary

1. Search images on the home page.
2. Click "Add Captions" on a result — navigates to `/editor?image=<encoded-url>` and opens the editor.
3. Use the toolbar to add/edit text and shapes, reorder layers, delete objects.
4. Download the final PNG via the Download button.

Environment variables

- UNSPLASH_ACCESS_KEY — Unsplash Access Key (required for API requests).

Deployment notes

- The editor prefers an encoded `image` query parameter (e.g. `/editor?image=<encoded-url>`) for reliable loading in sandboxed environments and for shareable editor links.
- Zustand is used for client state and is most effective when deployed on a dedicated server or persistent hosting (it also uses localStorage persistence as a convenience fallback).

Credits

- Developed by Amritansh Tripathi for vega6 interview task.
