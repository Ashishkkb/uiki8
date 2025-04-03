
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5f9ea0" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Cube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Scene;
