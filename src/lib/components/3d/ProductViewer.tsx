
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const DummyModel = ({ color = '#ffffff' }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t / 4) / 6;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
};

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
