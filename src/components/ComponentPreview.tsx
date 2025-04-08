
import React, { Suspense, useState, useEffect } from 'react';
import { ComponentItem } from "@/types/component";
import { Card, CardContent } from "@/components/ui/card";

interface ComponentPreviewProps {
  component: ComponentItem;
  inCard?: boolean;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component, inCard = true }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (component && component.id) {
      setHasError(false);
    }
  }, [component?.id]);
  
  if (hasError || !component) {
    return <FallbackComponent name={component?.name || 'Component'} />;
  }

  const PreviewContent = () => {
    if (component.component) {
      const Component = component.component;
      return (
        <ErrorBoundary 
          fallback={<FallbackComponent name={component.name} />}
          onError={() => setHasError(true)}
        >
          <Component />
        </ErrorBoundary>
      );
    }

    if (component.previewHtml) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: component.previewHtml }}
        />
      );
    }

    return (
      <p className="text-gray-500">Preview not available</p>
    );
  };

  if (inCard) {
    return (
      <Card className="w-full shadow-sm">
        <CardContent className="p-4">
          <div className="w-full h-full flex items-center justify-center">
            <PreviewContent />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <PreviewContent />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-blue-500">Loading component...</p>
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
