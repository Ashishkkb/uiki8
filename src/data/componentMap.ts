
import { RotatingCube, ProductViewer, TerrainMap } from '@/lib/components/3d';

// Function to get 3D components for showcase
export const get3DComponents = () => [
  {
    id: '3d-rotating-cube',
    name: 'Rotating Cube',
    category: '3D',
    description: 'An interactive 3D cube that rotates and responds to user interaction',
    component: RotatingCube,
    tags: ['3D', 'interactive', 'three.js', 'animation'],
    demoHeight: 300
  },
  {
    id: '3d-product-viewer',
    name: 'Product Viewer',
    category: '3D',
    description: 'A 3D product viewer with orbit controls and environmental lighting',
    component: ProductViewer,
    tags: ['3D', 'product', 'viewer', 'three.js'],
    demoHeight: 350
  },
  {
    id: '3d-terrain-map',
    name: 'Terrain Map',
    category: '3D',
    description: 'A 3D terrain map with procedural generation and texture mapping',
    component: TerrainMap,
    tags: ['3D', 'terrain', 'map', 'three.js', 'procedural'],
    demoHeight: 400
  }
];

// Add more component collections as needed
