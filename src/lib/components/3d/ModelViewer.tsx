
import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
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

// Fallback when model cannot be loaded
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
function Model({ url, autoRotate = false }: { url: string; autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Try to load the model but handle errors gracefully
  let scene: THREE.Group | null = null;
  try {
    // Check if the URL is the placeholder or invalid path
    if (url === '/path/to/model.glb' || url === '/placeholder.svg') {
      throw new Error('Invalid model path');
    }
    
    // Only attempt to load if we have a valid URL
    const result = useGLTF(url, true);
    scene = result.scene;
    
    useEffect(() => {
      if (scene) {
        setModelLoaded(true);
      }
    }, [scene]);
  } catch (err) {
    // Handle the loading error
    useEffect(() => {
      setError(true);
      console.warn("Model loading failed:", err);
    }, []);
  }

  // Make a copy to avoid modifying the original
  const model = useMemo(() => {
    return scene ? scene.clone() : null;
  }, [scene]);

  // Auto-rotate if enabled
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // If model failed to load, show fallback
  if (error) {
    return <FallbackModel />;
  }

  return (
    <group 
      ref={groupRef}
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

// Define environment preset type
type EnvironmentPreset = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

interface ModelViewerProps {
  modelUrl?: string;
  environmentPreset?: EnvironmentPreset;
  autoRotate?: boolean;
  showInspector?: boolean;
  onLoad?: () => void;
}

export default function ModelViewer({ 
  modelUrl = '/placeholder.svg',  // Changed from '/path/to/model.glb' to '/placeholder.svg'
  environmentPreset = 'sunset',
  autoRotate = true,
  showInspector = false,
  onLoad 
}: ModelViewerProps) {
  const [preset, setPreset] = useState<EnvironmentPreset>(environmentPreset);
  const [rotation, setRotation] = useState(autoRotate);
  const [viewMode, setViewMode] = useState<'normal' | 'wireframe' | 'uv'>('normal');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const environments: EnvironmentPreset[] = ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'];
  
  // Call onLoad callback if provided
  useEffect(() => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);
  
  // Use error boundary for the Canvas to prevent crashes
  const [hasError, setHasError] = useState(false);

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

// Error boundary component for handling React Three Fiber errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in 3D component:", error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
