
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
            <ErrorBoundary fallback={<FallbackComponent name={component.name} />}>
              <RotatingCube />
            </ErrorBoundary>
          </div>
        );
      
      case 102: // Product Viewer
        return (
          <div className="w-full h-full flex items-center justify-center">
            <ErrorBoundary fallback={<FallbackComponent name={component.name} />}>
              <ProductViewer color="#5f9ea0" height="100%" />
            </ErrorBoundary>
          </div>
        );
      
      case 103: // Terrain Map
        return (
          <div className="w-full h-full flex items-center justify-center">
            <ErrorBoundary fallback={<FallbackComponent name={component.name} />}>
              <TerrainMap />
            </ErrorBoundary>
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

// Simple fallback component for error cases
const FallbackComponent = ({ name }: { name: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
    <p className="text-amber-600 font-medium mb-2">Could not load {name}</p>
    <p className="text-gray-500 text-sm">Please check browser console for details</p>
  </div>
);

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in 3D component:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ComponentPreview;
