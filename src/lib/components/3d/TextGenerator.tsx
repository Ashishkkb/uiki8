
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface TextGeneratorProps {
  text?: string;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
}

const TextGeneratorScene: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const textRef = useRef<THREE.Group>(null);
  
  // Create animating colors
  const [hue, setHue] = useState(0);
  
  useFrame((state) => {
    if (textRef.current) {
      // Add gentle floating animation
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      
      // Colorful animation effect
      setHue((hue) => (hue + 0.3) % 360);
    }
  });

  // Create rainbow color based on initial color
  const mainColor = new THREE.Color(color);
  const colorHSL = { h: 0, s: 0, l: 0 };
  mainColor.getHSL(colorHSL);
  
  const secondColor = new THREE.Color().setHSL(
    (colorHSL.h + 0.1) % 1,
    colorHSL.s,
    colorHSL.l
  );

  return (
    <group>
      {/* Colorful lights that enhance the scene */}
      <pointLight position={[10, 10, 10]} color="#ff2060" intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#0070ff" intensity={0.5} />
      <pointLight position={[0, 5, 0]} color="#00ffff" intensity={0.3} />
      
      {/* The 3D text with gradient material */}
      <group ref={textRef}>
        <Text
          fontSize={0.75}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.05}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
        >
          {text}
          <meshPhysicalMaterial 
            color={color}
            metalness={0.6}
            roughness={0.3}
            emissive={new THREE.Color().setHSL((hue % 360) / 360, 0.5, 0.3)}
            emissiveIntensity={0.5}
          />
        </Text>
      </group>

      {/* Add a glowing background plane */}
      <mesh position={[0, 0, -1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial 
          color="#000000"
          emissive={new THREE.Color().setHSL(((hue + 180) % 360) / 360, 0.7, 0.2)}
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

const TextGenerator: React.FC<TextGeneratorProps> = ({ 
  text = "3D Text", 
  color = "#1e88e5",
  height = '400px',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  return (
    <div style={{ width: '100%', height, position: 'relative', minHeight: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => {
          setIsLoaded(true);
        }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <TextGeneratorScene text={text} color={color} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default TextGenerator;
