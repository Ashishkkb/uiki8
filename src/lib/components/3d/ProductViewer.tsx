
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DummyModel from './DummyModel';

export interface ProductViewerProps {
  modelUrl?: string;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ 
  color = '#ffffff', 
  height = '400px',
  onLoad
}) => {
  useEffect(() => {
    // Call onLoad if provided
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <div style={{ width: '100%', height, position: 'relative', minHeight: '200px' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#f0f0f0');
        }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <DummyModel color={color} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ProductViewer;
