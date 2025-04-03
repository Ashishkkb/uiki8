
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
}

// Simple particles implementation that won't cause WebGL context issues
const ParticleSystemScene = () => {
  const particleCount = 1000;
  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  // Simple rotation animation
  const meshRef = React.useRef<THREE.Points>(null);
  
  React.useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#5f9ea0"
        sizeAttenuation
        transparent
      />
    </points>
  );
};

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
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
          gl.setClearColor('#000000');
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystemScene />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ParticleSystem;
