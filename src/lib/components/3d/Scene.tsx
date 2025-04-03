
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  height?: string | number;
  onLoad?: () => void;
}

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hue, setHue] = useState(0);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Colorful animation effect
      setHue((hue) => (hue + 0.5) % 360);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial 
        color="#5f9ea0"
        metalness={0.7}
        roughness={0.3}
        emissive={new THREE.Color().setHSL(hue/360, 0.5, 0.2)}
        emissiveIntensity={0.5}
        clearcoat={0.8}
      />
    </mesh>
  );
};

// Background environment with colorful gradient
const ColorfulEnvironment = () => {
  const [hue, setHue] = useState(0);
  
  useFrame((state) => {
    // Slowly animate the color
    setHue((hue) => (hue + 0.2) % 360);
  });
  
  return (
    <>
      {/* Animated colored lights */}
      <pointLight 
        position={[5, 5, 5]} 
        color={new THREE.Color().setHSL(hue/360, 0.8, 0.5)} 
        intensity={0.5} 
      />
      <pointLight 
        position={[-5, -5, -5]} 
        color={new THREE.Color().setHSL(((hue + 180) % 360)/360, 0.8, 0.5)} 
        intensity={0.5} 
      />
      
      {/* Background plane with gradient */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#111122"
          emissive={new THREE.Color().setHSL(((hue + 90) % 360)/360, 0.5, 0.2)}
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  );
};

const Scene: React.FC<SceneProps> = ({ height = '400px', onLoad }) => {
  return (
    <div style={{ width: '100%', height: height, position: 'relative', minHeight: '200px' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={() => {
          if (onLoad) onLoad();
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <ColorfulEnvironment />
        <Cube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Scene;
