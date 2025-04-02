
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingCubeProps {
  isInCanvas?: boolean;
  onLoad?: () => void;
}

function Box({ isInCanvas }: { isInCanvas?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={isInCanvas ? "#6366f1" : "#3b82f6"} />
    </mesh>
  );
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ isInCanvas = false, onLoad }) => {
  useEffect(() => {
    // Call onLoad callback if provided
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  if (isInCanvas) {
    return <Box isInCanvas={true} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '200px' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Box isInCanvas={isInCanvas} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default RotatingCube;
