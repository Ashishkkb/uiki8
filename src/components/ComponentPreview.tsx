import React, { Suspense, useState, useEffect } from 'react';
import { ProductViewer, RotatingCube, TerrainMap, ParticleSystem, TextGenerator, ModelViewer, Scene } from "@/lib/components/3d";
import { ComponentItem } from "@/types/component";

interface ComponentPreviewProps {
  component: ComponentItem;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component }) => {
  const [hasError, setHasError] = useState(false);
  const [is3DRendered, setIs3DRendered] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIs3DRendered(false);
  }, [component.id]);
  
  const render3DComponent = () => {
    if (is3DRendered) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-muted-foreground">3D preview available</p>
        </div>
      );
    }

    try {
      switch (component.id) {
        case 101: // Rotating Cube
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <RotatingCube onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
        
        case 102: // Product Viewer
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <ProductViewer color="#5f9ea0" onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
        
        case 103: // Terrain Map
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <TerrainMap onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
          
        case 104: // Particle System
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <ParticleSystem onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
          
        case 105: // Text Generator
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <TextGenerator text="Hello 3D" onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
          
        case 97: // Scene3D
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <Scene onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
          
        case 108: // Model Viewer
          return (
            <div className="w-full h-full flex items-center justify-center">
              <ErrorBoundary fallback={<FallbackComponent name={component.name} />} onError={() => setHasError(true)}>
                <Suspense fallback={<LoadingFallback />}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <ModelViewer color="#5f9ea0" onLoad={() => setIs3DRendered(true)} />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          );
          
        default:
          return (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">3D preview not available</p>
            </div>
          );
      }
    } catch (error) {
      console.error("Error rendering 3D component:", error);
      return <FallbackComponent name={component.name} />;
    }
  };

  if (hasError) {
    return <FallbackComponent name={component.name} />;
  }

  if (component.is3D) {
    return render3DComponent();
  }

  if (component.component) {
    const Component = component.component;
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <ErrorBoundary fallback={<FallbackComponent name={component.name} />}>
          <Component />
        </ErrorBoundary>
      </div>
    );
  }

  if (component.previewHtml) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: component.previewHtml }}
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-500">Preview not available</p>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-blue-500">Loading 3D component...</p>
  </div>
);

const FallbackComponent = ({ name }: { name: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
    <p className="text-amber-600 font-medium mb-2">Could not load {name}</p>
    <p className="text-gray-500 text-sm">Please check browser console for details</p>
  </div>
);

class ErrorBoundary extends React.Component<
  { 
    children: React.ReactNode; 
    fallback: React.ReactNode;
    onError?: () => void;
  },
  { hasError: boolean }
> {
  constructor(props: { 
    children: React.ReactNode; 
    fallback: React.ReactNode;
    onError?: () => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in component:", error);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ComponentPreview;
