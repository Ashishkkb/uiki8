
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TerrainMapGeometry from './TerrainMapGeometry';

interface TerrainMapProps {
  onLoad?: () => void;
}

const TerrainMap: React.FC<TerrainMapProps> = ({ onLoad }) => {
  useEffect(() => {
    // Call onLoad callback if provided
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '200px' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <TerrainMapGeometry />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default TerrainMap;
