
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const RotatingCube: React.FC = () => {
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

export default RotatingCube;
