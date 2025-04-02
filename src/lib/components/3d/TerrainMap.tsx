
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TerrainMapGeometry from './TerrainMapGeometry';

const TerrainMap = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <Canvas camera={{ position: [0, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TerrainMapGeometry />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default TerrainMap;
