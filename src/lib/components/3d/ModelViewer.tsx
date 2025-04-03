
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DummyModel from './DummyModel';

export interface ModelViewerProps {
  modelUrl?: string;
  color?: string;
  height?: string | number;
  onLoad?: () => void;
  environmentPreset?: string;
  autoRotate?: boolean;
  showInspector?: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  color = '#3498db', 
  height = '400px',
  onLoad,
  environmentPreset = 'sunset',
  autoRotate = true,
  showInspector = false
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
          gl.setClearColor('#f0f0f0');
        }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <DummyModel color={color} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
      
      {showInspector && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Model Inspector</h3>
          <div>
            <strong>Environment:</strong> {environmentPreset}
          </div>
          <div>
            <strong>Auto Rotate:</strong> {autoRotate ? 'On' : 'Off'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
