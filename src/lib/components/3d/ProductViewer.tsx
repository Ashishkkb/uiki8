
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DummyModel from './DummyModel';

export interface ProductViewerProps {
  modelUrl?: string;
  color?: string;
  height?: string | number;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ 
  color = '#ffffff', 
  height = '100%'
}) => {
  return (
    <div style={{ width: '100%', height, position: 'relative', minHeight: '200px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <DummyModel color={color} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ProductViewer;
