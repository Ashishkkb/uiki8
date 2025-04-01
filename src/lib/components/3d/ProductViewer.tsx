
import React, { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import DummyModel from './DummyModel';

const Controls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  return <OrbitControls args={[camera, domElement]} enableZoom={true} enablePan={true} />;
};

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
    <div style={{ width: '100%', height, position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <DummyModel color={color} />
          <Environment preset="sunset" />
          <ContactShadows
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, -1.5, 0]}
            opacity={0.7}
            width={10}
            height={10}
            blur={2}
            far={1.5}
          />
        </Suspense>
        <Controls />
      </Canvas>
    </div>
  );
};

export default ProductViewer;
