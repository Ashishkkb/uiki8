
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TerrainMapGeometry from './TerrainMapGeometry';

interface TerrainMapProps {
  height?: string | number;
  onLoad?: () => void;
}

const TerrainMap: React.FC<TerrainMapProps> = ({ 
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
        shadows
        camera={{ position: [0, 2, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87ceeb');
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <TerrainMapGeometry />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default TerrainMap;
