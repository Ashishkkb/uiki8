import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  PerspectiveCamera, 
  Environment, 
  useGLTF, 
  Html 
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

// Define proper type for the model loader result
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

// Simple loading indicator
function Loader() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '10px', color: '#3498db', fontWeight: 'bold' }}>
          Loading Model...
        </p>
        <style>{
          `@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`
        }</style>
      </div>
    </Html>
  );
}

// Model component that loads and displays a 3D model
function Model({ url, autoRotate = false }: { url: string; autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(url) as GLTFResult;
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);

  // Make a copy to avoid modifying the original
  const model = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  // Set up animation
  useEffect(() => {
    if (gltf.animations && gltf.animations.length > 0) {
      // Set up animation mixer if there are animations
      // Implementation omitted for brevity
    }
    
    // Reset camera to fit the model
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Check if camera is PerspectiveCamera before accessing fov
    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
      
      camera.position.set(0, center.y, center.z + cameraZ * 1.5);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }
    
    return () => {
      // Cleanup
    };
  }, [model, gltf.animations, camera]);

  // Auto-rotate if enabled
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive 
        object={model} 
        scale={1}
        dispose={null}
      />
      {hovered && (
        <Html position={[0, 2, 0]} center distanceFactor={10}>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none'
          }}>
            Click and drag to rotate
          </div>
        </Html>
      )}
    </group>
  );
}

// Define environment preset type
type EnvironmentPreset = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

interface ModelViewerProps {
  modelUrl?: string;
  environmentPreset?: EnvironmentPreset;
  autoRotate?: boolean;
  showInspector?: boolean;
}

export default function ModelViewer({ 
  modelUrl = '/path/to/model.glb',
  environmentPreset = 'sunset',
  autoRotate = true,
  showInspector = false 
}: ModelViewerProps) {
  const [preset, setPreset] = useState<EnvironmentPreset>(environmentPreset);
  const [rotation, setRotation] = useState(autoRotate);
  const [viewMode, setViewMode] = useState<'normal' | 'wireframe' | 'uv'>('normal');
  
  const environments: EnvironmentPreset[] = ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'];
  
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <Suspense fallback={<Loader />}>
          <Stage 
            environment={preset}
            intensity={0.5}
            shadows
            preset="rembrandt"
            adjustCamera={false}
          >
            <Model url={modelUrl} autoRotate={rotation} />
          </Stage>
          <Environment preset={preset} />
        </Suspense>
        
        <OrbitControls 
          makeDefault 
          enablePan={true}
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: 'rgba(0,0,0,0.7)',
        padding: '12px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '400px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button 
            style={{
              padding: '8px 16px',
              background: rotation ? '#3498db' : '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1
            }}
            onClick={() => setRotation(!rotation)}
          >
            {rotation ? 'Stop Rotation' : 'Auto Rotate'}
          </button>
          
          <button
            style={{
              padding: '8px 16px',
              background: viewMode !== 'normal' ? '#3498db' : '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1
            }}
            onClick={() => setViewMode(viewMode === 'normal' ? 'wireframe' : viewMode === 'wireframe' ? 'uv' : 'normal')}
          >
            {viewMode === 'normal' ? 'Wireframe' : viewMode === 'wireframe' ? 'UV Map' : 'Normal'}
          </button>
        </div>
        
        <div>
          <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
            Environment
          </label>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value as EnvironmentPreset)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              background: '#2c3e50',
              color: 'white',
              border: 'none'
            }}
          >
            {environments.map(env => (
              <option key={env} value={env}>
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {showInspector && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          maxWidth: '200px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Model Inspector</h3>
          <div>
            <strong>Model:</strong> {modelUrl.split('/').pop()}
          </div>
          <div>
            <strong>Environment:</strong> {preset}
          </div>
          <div>
            <strong>View Mode:</strong> {viewMode}
          </div>
          <div>
            <strong>Auto Rotate:</strong> {rotation ? 'On' : 'Off'}
          </div>
          <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
          <p style={{ margin: '4px 0' }}>
            Use mouse to rotate. Scroll to zoom. Hold shift + drag to pan.
          </p>
        </div>
      )}
    </div>
  );
}
