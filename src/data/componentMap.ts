
import { ComponentItem } from "@/types/component";

// This file serves as a registry of all available components
// It maps component IDs to their metadata for display in the showcase

export const componentRegistry: Record<string, ComponentItem> = {
  // 3D Components
  "rotating-cube": {
    id: 101,
    name: "3D Rotating Cube",
    category: "3D",
    framework: "React Three Fiber",
    description: "A customizable 3D cube that rotates smoothly on mouse interaction with realistic lighting and shadows.",
    code: `import { RotatingCube } from "enchant-ui";

export default function MyComponent() {
  return <RotatingCube />;
}`,
    price: 19.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#1E293B] to-[#334155]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/d0O0MHa.gif" alt="3D Rotating Cube" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Animation", "Interactive", "ThreeJS", "React"],
    isNew: true,
    fileSize: "5.7 KB",
    is3D: true
  },
  "product-viewer": {
    id: 102,
    name: "3D Product Viewer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Interactive 3D product viewer with zoom, rotate, and material customization capabilities.",
    code: `import { ProductViewer } from "enchant-ui";

export default function MyComponent() {
  return <ProductViewer modelUrl="/path/to/model.glb" />;
}`,
    price: 39.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#111827] to-[#1F2937]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/JQjV3zr.gif" alt="3D Product Viewer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "E-commerce", "Product", "Interactive", "GLTF"],
    isNew: true,
    fileSize: "8.3 KB",
    is3D: true
  },
  "terrain-map": {
    id: 103,
    name: "3D Terrain Map",
    category: "3D",
    framework: "React Three Fiber",
    description: "Dynamic 3D terrain visualization with height map, texturing, and interactive camera controls.",
    code: `import { TerrainMap } from "enchant-ui";

export default function MyComponent() {
  return <TerrainMap />;
}`,
    price: 29.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#065F46] to-[#064E3B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/JXzjy0v.gif" alt="3D Terrain Map" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Maps", "GIS", "Terrain", "Data Visualization"],
    isNew: true,
    fileSize: "12.5 KB",
    is3D: true
  },
  // Additional components would be registered here
};

// Helper function to get components as an array
export const getComponentsArray = (): ComponentItem[] => {
  return Object.values(componentRegistry);
};

// Export specific component groups
export const get3DComponents = (): ComponentItem[] => {
  return getComponentsArray().filter(component => component.is3D);
};
