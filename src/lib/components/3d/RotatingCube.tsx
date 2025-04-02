
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const RotatingCubeInner: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5f9ea0" />
    </mesh>
  );
};

const RotatingCube: React.FC<{ isInCanvas?: boolean }> = ({ isInCanvas = false }) => {
  if (isInCanvas) {
    return <RotatingCubeInner />;
  }
  
  return (
    <div style={{ width: '100%', height: '400px', minHeight: '200px' }}>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor('#f0f0f0');
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCubeInner />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default RotatingCube;
