
import React from 'react';
import { ComponentItem } from "@/types/component";
import ModelViewer3D from './3DModelViewerComponent';

const ModelViewer3DComponentItem: ComponentItem = {
  id: 106,
  name: "3D Model Viewer",
  description: "Interactive 3D model viewer with controls for rotation, zoom, and model switching",
  category: "Media",
  framework: "React",
  language: "TypeScript",
  tags: ["3D", "Model", "Viewer", "Interactive", "Three.js"],
  isNew: true,
  is3D: true,
  component: () => <ModelViewer3D />,
  code: `import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Stage } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Box, Disc, Cylinder, Globe, RotateCw, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ModelProps {
  modelUrl?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const defaultModels = {
  cube: { scale: a1, position: [0, 0, 0] as [number, number, number] },
  sphere: { scale: 1, position: [0, 0, 0] as [number, number, number] },
  cylinder: { scale: 1, position: [0, 0, 0] as [number, number, number] },
};

const Model3D: React.FC<ModelProps> = ({ 
  modelUrl = "https://threejs.org/examples/models/gltf/LittlestTokyo.glb", 
  scale = 0.01, 
  position = [0, -1, 0],
  rotation = [0, 0, 0]
}) => {
  const { scene } = useGLTF(modelUrl);
  const model = useRef();
  
  return (
    <primitive 
      ref={model}
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
};

interface ModelViewerProps {
  modelUrl?: string;
  backgroundColor?: string;
  showControls?: boolean;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  autoRotate?: boolean;
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
}

const ModelViewer3D: React.FC<ModelViewerProps> = ({
  modelUrl,
  backgroundColor = '#000000',
  showControls = true,
  environmentPreset = 'city',
  autoRotate = true,
  ambientLightIntensity = 0.5,
  directionalLightIntensity = 1
}) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  
  return (
    <div className="w-full h-[500px] relative rounded-xl overflow-hidden">
      <Canvas
        shadows
        style={{ background: backgroundColor }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} />
        
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight 
          position={[10, 10, 5]} 
          castShadow 
          intensity={directionalLightIntensity} 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        <Stage environment={environmentPreset} shadows>
          {modelUrl && !selectedModel && <Model3D modelUrl={modelUrl} />}
          {selectedModel === 'cube' && <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#6d28d9" />
          </mesh>}
          {selectedModel === 'sphere' && <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#d946ef" />
          </mesh>}
          {selectedModel === 'cylinder' && <mesh>
            <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
            <meshStandardMaterial color="#0ea5e9" />
          </mesh>}
        </Stage>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
        
        <Environment preset={environmentPreset} />
      </Canvas>
      
      {showControls && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setSelectedModel('cube')}
            >
              <Box className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setSelectedModel('sphere')}
            >
              <Disc className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setSelectedModel('cylinder')}
            >
              <Cylinder className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1])}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] + 1])}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer3D;`
};

export default ModelViewer3DComponentItem;
