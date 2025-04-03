
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface TextGeneratorProps {
  text?: string;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
}

const TextGeneratorScene: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  return (
    <>
      <Text
        color={color}
        fontSize={0.75}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshStandardMaterial color={color} />
      </Text>
    </>
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
