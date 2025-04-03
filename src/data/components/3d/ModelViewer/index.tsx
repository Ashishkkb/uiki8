
import React from 'react';
import { ComponentItem } from "@/types/component";
import { ModelViewer } from "@/lib/components/3d";

const ModelViewerComponent: ComponentItem = {
  id: 108,
  name: "3D Model Viewer",
  category: "3D",
  framework: "React Three Fiber",
  description: "Professional GLTF/GLB model viewer with environment lighting, camera controls, and model inspector",
  code: `import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  PerspectiveCamera, 
  Environment, 
  useGLTF, 
  Html, 
  Box 
} from '@react-three/drei';
import * as THREE from 'three';

type EnvironmentPreset = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

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
          \`@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }\`
        }</style>
      </div>
    </Html>
  );
}

// Fallback Model when loading fails
function FallbackModel() {
  return (
    <group>
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3498db" />
      </Box>
      <Html position={[0, 1.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          Model could not be loaded
        </div>
      </Html>
    </group>
  );
}

// Model component that loads and displays a 3D model
function Model({ url, autoRotate = false }) {
  const group = useRef();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState(false);
  
  // Safely load the model
  let scene = null;
  try {
    if (url === '/placeholder.svg' || url === '/path/to/model.glb') {
      throw new Error('Placeholder URL');
    }
    const result = useGLTF(url);
    scene = result.scene;
  } catch (err) {
    useEffect(() => {
      setError(true);
      console.warn('Error loading model:', err);
    }, []);
  }

  // Make a copy to avoid modifying the original
  const model = useMemo(() => scene ? scene.clone() : null, [scene]);

  // Auto-rotate if enabled
  useFrame((state, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  if (error) {
    return <FallbackModel />;
  }

  return (
    <group 
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {model ? (
        <primitive 
          object={model} 
          scale={1}
          dispose={null}
        />
      ) : (
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#3498db" />
        </Box>
      )}
      
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

export default function ModelViewer({ 
  modelUrl = '/placeholder.svg', // Default to placeholder
  environmentPreset = 'sunset',
  autoRotate = true,
  showInspector = false,
  onLoad
}) {
  const [preset, setPreset] = useState(environmentPreset);
  const [rotation, setRotation] = useState(autoRotate);
  const [viewMode, setViewMode] = useState('normal'); // normal, wireframe, uv
  const [hasError, setHasError] = useState(false);
  
  const environments = ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'];
  
  // Call onLoad callback if provided
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);
  
  if (hasError) {
    return (
      <div style={{ 
        width: '100%', 
        height: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa',
        color: '#dc3545',
        borderRadius: '8px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Unable to render 3D content</p>
          <p style={{ fontSize: '14px' }}>Please check browser compatibility</p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <ErrorBoundary onError={() => setHasError(true)}>
        <Canvas shadows gl={{ antialias: true }}>
          <color attach="background" args={['#f0f0f0']} />
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
      </ErrorBoundary>
      
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
            onChange={(e) => setPreset(e.target.value)}
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

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D rendering error:", error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}`,
  component: ModelViewer,
  tags: ["3D", "Model Viewer", "GLTF", "Professional", "AR/VR"],
  isNew: true,
  fileSize: "17.8 KB",
  price: "69.99",
  is3D: true
};

export default ModelViewerComponent;
