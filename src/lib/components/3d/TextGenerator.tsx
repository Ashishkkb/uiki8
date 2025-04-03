
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useMatcapTexture } from '@react-three/drei';
import { Text3D } from '@react-three/drei';

interface TextGeneratorProps {
  text?: string;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
}

// Simple 3D Text component
const Text3DObject: React.FC<{
  text: string;
  matcapId: string;
}> = ({ text, matcapId }) => {
  const [matcapTexture] = useMatcapTexture(matcapId, 256);
  
  return (
    <Center>
      <Text3D
        font="/fonts/inter_regular.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
    </Center>
  );
};

// Fallback component that doesn't use drei features
const SimpleFallback: React.FC<{ text: string }> = ({ text }) => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3498db" />
    </mesh>
  );
};

const TextGenerator: React.FC<TextGeneratorProps> = ({
  text = "Hello 3D",
  color = "#3498db",
  height = "400px",
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMatcap, setSelectedMatcap] = useState('3');

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // Handle font loading errors
  const handleError = () => {
    setHasError(true);
    console.error("Error loading 3D text components");
  };

  return (
    <div style={{ width: '100%', height, position: 'relative', minHeight: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#f0f0f0');
          setIsLoaded(true);
        }}
        onError={handleError}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        {hasError ? (
          <SimpleFallback text={text} />
        ) : (
          <Text3DObject text={text} matcapId={selectedMatcap} />
        )}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      
      {isLoaded && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
