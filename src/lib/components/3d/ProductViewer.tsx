
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

// Define the proper type for the GLTF result
type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh };
  materials: { [key: string]: THREE.Material };
};

function Model({ url, position = [0, 0, 0], color = '#ffffff', ...props }: any) {
  const { scene } = useGLTF(url) as GLTFResult;
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t / 4) / 6;
    }
  });

  // Apply the material color to all meshes in the model
  scene.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      const material = (node as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material.color) material.color.set(color);
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
  color?: string;
  height?: string | number;
}

export default function ProductViewer({ modelUrl = "/path/to/model.glb", color = '#ffffff', height = '400px' }: ProductViewerProps) {
  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model url={modelUrl} scale={1.5} color={color} />
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
    </div>
  );
}
