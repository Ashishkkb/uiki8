
import React, { Suspense } from 'react';
import { ProductViewer, RotatingCube, TerrainMap } from "@/lib/components/3d";
import { ComponentItem } from "@/types/component";

interface ComponentPreviewProps {
  component: ComponentItem;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component }) => {
  // Render 3D components
  if (component.is3D) {
    switch (component.id) {
      case 101: // Rotating Cube
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div style={{ width: '100%', height: '100%' }}>
              <RotatingCube />
            </div>
          </div>
        );
      
      case 102: // Product Viewer
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div style={{ width: '100%', height: '100%' }}>
              <ProductViewer modelUrl="/path/to/model.glb" height="100%" />
            </div>
          </div>
        );
      
      case 103: // Terrain Map
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div style={{ width: '100%', height: '100%' }}>
              <TerrainMap />
            </div>
          </div>
        );
        
      default:
        break;
    }
  }

  // For any other components or fallback, use the HTML preview if available
  if (component.previewHtml) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: component.previewHtml }}
      />
    );
  }

  // Default fallback
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-500">Preview not available</p>
    </div>
  );
};

export default ComponentPreview;
