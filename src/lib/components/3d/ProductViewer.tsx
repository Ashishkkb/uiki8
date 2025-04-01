
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, position = [0, 0, 0], ...props }: any) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);
  const [materialColor, setMaterialColor] = useState('#ffffff');

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t / 4) / 6;
    }
  });

  // Apply the material color to all meshes in the model
  scene.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      ((node as THREE.Mesh).material as THREE.Material).color?.set(materialColor);
    }
  });

  return (
    <group ref={groupRef} position={position as any} {...props}>
      <primitive object={scene} />
    </group>
  );
}

function Controls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  return <OrbitControls args={[camera, domElement]} enableZoom={true} enablePan={true} />;
}

export interface ProductViewerProps {
  modelUrl?: string;
}

export default function ProductViewer({ modelUrl = "/path/to/model.glb" }: ProductViewerProps) {
  const [color, setColor] = useState('#ffffff');
  
  const colors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model url={modelUrl} scale={1.5} />
          <Environment preset="sunset" />
          <ContactShadows
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, -1.5, 0]}
            opacity={0.7}
            width={10}
            height={10}
            blur={2}
            far={1.5}
          />
        </Suspense>
        <Controls />
      </Canvas>
      
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {colors.map((c) => (
          <div
            key={c}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: c,
              cursor: 'pointer',
              border: color === c ? '2px solid white' : 'none',
              boxShadow: '0 0 5px rgba(0,0,0,0.3)'
            }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </div>
  );
}
