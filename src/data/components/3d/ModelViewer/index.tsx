
import React from 'react';
import { ComponentItem } from "@/types/component";
import { ModelViewer } from "@/lib/components/3d";

const ModelViewerComponent: ComponentItem = {
  id: 108,
  name: "Model Viewer",
  category: "3D",
  framework: "React Three Fiber",
  description: "A 3D model viewer with orbit controls and environmental lighting",
  code: `import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

function Model({ modelPath }) {
  // Safely handle model loading with fallbacks
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="tomato" />
      </mesh>
    );
  }
  
  try {
    // Using a placeholder model when no specific model is provided
    const { scene } = useGLTF(modelPath || "/placeholder.svg");
    return <primitive object={scene} />;
  } catch (error) {
    console.error("Error loading model:", error);
    setHasError(true);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="tomato" />
      </mesh>
    );
  }
}

export default function ModelViewer({ 
  modelPath = "/placeholder.svg", 
  showControls = true,
  showEnvironment = true
}) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment={showEnvironment ? "sunset" : null}>
            <Model modelPath={modelPath} />
          </Stage>
          {showControls && <OrbitControls />}
        </Suspense>
      </Canvas>
    </div>
  );
}`,
  component: ModelViewer,
  tags: ["3D", "model", "viewer", "three.js", "GLB"],
  is3D: true,
  fileSize: "2.0 KB",
  price: "34.99"
};

export default ModelViewerComponent;
