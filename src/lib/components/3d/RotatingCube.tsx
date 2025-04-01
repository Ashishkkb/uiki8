import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
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
    <Box
      ref={meshRef}
      args={[1, 1, 1]}
    >
      <meshStandardMaterial color="#5f9ea0" />
    </Box>
  );
};

const RotatingCube: React.FC<{ isInCanvas?: boolean }> = ({ isInCanvas = false }) => {
  if (isInCanvas) {
    return <RotatingCubeInner />;
  }
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <RotatingCubeInner />
    </Canvas>
  );
};

export default RotatingCube;
