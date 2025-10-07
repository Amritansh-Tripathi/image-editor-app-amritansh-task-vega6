# Image Editor App

A full-featured Next.js web application for searching images from Unsplash and adding custom captions, text, and shapes using a powerful Fabric.js canvas editor.

## Features

### 1. Image Search
- Search millions of high-quality images from Unsplash
- Responsive grid layout with image thumbnails
- Debounced search with loading states
- Toast notifications for errors and empty results

### 2. Canvas Editor
- Fabric.js-powered canvas for image editing
- Add and edit text with custom fonts and colors
- Add shapes: rectangles, circles, triangles, and polygons
- Drag, resize, and rotate all objects
- Layer management: bring forward / send backward
- Delete individual objects or reset entire canvas

### 3. Download Feature
- Export canvas as high-quality PNG
- Confirmation dialog before download
- Automatic file naming with timestamps

### 4. Debug Panel
- Real-time canvas state visualization
- Shows all layers with type, position, size, and color
- Collapsible panel for better workspace
- Color-coded badges for different object types

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Origin UI
- **Canvas**: Fabric.js
- **State Management**: Zustand
- **API**: Unsplash API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Unsplash API access key (get one at https://unsplash.com/developers)

### Installation

1. Clone the repository or download the ZIP file

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Unsplash API key:
     \`\`\`
     UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
     \`\`\`
   - Or add it directly in your Vercel Project Settings under Environment Variables

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `UNSPLASH_ACCESS_KEY` | Your Unsplash API access key from https://unsplash.com/developers | Yes |

**Note**: The API key is kept secure on the server side and never exposed to the client.

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts      # Server-side Unsplash API handler
│   ├── page.tsx              # Home page with image search
│   ├── editor/
│   │   └── page.tsx          # Canvas editor page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and theme
├── components/
│   ├── search-bar.tsx        # Search input with debounce
│   ├── image-grid.tsx        # Image results grid
│   ├── canvas-editor.tsx     # Main canvas component
│   ├── toolbar.tsx           # Editing tools
│   ├── debug-panel.tsx       # Canvas state viewer
│   ├── navbar.tsx            # Navigation bar
│   └── footer.tsx            # Footer with attribution
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   └── store.ts              # Zustand state management
└── utils/
    └── api.ts                # API client for internal routes
\`\`\`

## Usage

1. **Search for Images**: Enter a search term in the search bar on the home page
2. **Select an Image**: Click "Add Captions" on any image to open the editor
3. **Edit on Canvas**:
   - Click the text icon to add editable text
   - Click shape icons to add rectangles, circles, triangles, or polygons
   - Drag objects to move them
   - Use corner handles to resize
   - Use arrow buttons to change layer order
   - Click delete to remove selected objects
4. **Download**: Click the "Download" button to export your creation as PNG
5. **Debug**: View the debug panel on the right to see all canvas layers and their properties

## API Setup

To get your Unsplash API key:

1. Go to https://unsplash.com/developers
2. Create a new application (it's free!)
3. Copy your Access Key
4. Add it to your `.env.local` file or Vercel environment variables as `UNSPLASH_ACCESS_KEY`

## Deployment

Deploy to Vercel with one click:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add `UNSPLASH_ACCESS_KEY` as an environment variable in Project Settings
4. Deploy!

## Credits

Developed by **Amritansh Tripathi** — Vega6 Task Submission 2025

Built with v0 by Vercel
