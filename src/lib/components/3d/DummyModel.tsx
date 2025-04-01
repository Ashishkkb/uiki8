
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DummyModelProps {
  color?: string;
}

const DummyModel: React.FC<DummyModelProps> = ({ color = '#ffffff' }) => {
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

export default DummyModel;
