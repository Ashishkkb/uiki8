
import { RotatingCube, ProductViewer, TerrainMap } from '@/lib/components/3d';
import { ComponentItem } from "@/types/component";

// Function to get 3D components for showcase
export const get3DComponents = (): ComponentItem[] => [
  {
    id: 101,
    name: 'Rotating Cube',
    category: '3D',
    framework: 'React Three Fiber',
    description: 'An interactive 3D cube that rotates and responds to user interaction',
    code: `import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Cube(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#ff9f00' : '#5f9ea0'} />
    </mesh>
  );
}

export default function RotatingCube() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Cube position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}`,
    tags: ['3D', 'interactive', 'three.js', 'animation'],
    is3D: true,
    fileSize: '1.2 KB',
    price: '19.99'
  },
  {
    id: 102,
    name: 'Product Viewer',
    category: '3D',
    framework: 'React Three Fiber',
    description: 'A 3D product viewer with orbit controls and environmental lighting',
    code: `import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Model(props) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 4) / 6;
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        <meshStandardMaterial color={props.color} roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

export default function ProductViewer(props) {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Model color={props.color || "#ffffff"} />
      <Environment preset="sunset" />
      <OrbitControls />
    </Canvas>
  );
}`,
    tags: ['3D', 'product', 'viewer', 'three.js'],
    is3D: true,
    fileSize: '1.5 KB',
    price: '29.99'
  },
  {
    id: 103,
    name: 'Terrain Map',
    category: '3D',
    framework: 'React Three Fiber',
    description: 'A 3D terrain map with procedural generation and texture mapping',
    code: `import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

function Terrain() {
  const meshRef = useRef();
  
  useFrame(() => {
    // Animation if desired
  });
  
  // Generate terrain geometry
  const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
  const vertices = geometry.attributes.position.array;
  
  // Apply height map
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 2];
    vertices[i + 1] = Math.sin(x) * Math.cos(z) * 1.5;
  }
  
  geometry.computeVertexNormals();

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={geometry} />
      <meshStandardMaterial 
        color="#5D783E"
        wireframe={false}
        roughness={0.8}
      />
    </mesh>
  );
}

export default function TerrainMap() {
  return (
    <Canvas camera={{ position: [0, 8, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Terrain />
      <Sky sunPosition={[100, 100, 20]} />
      <OrbitControls />
    </Canvas>
  );
}`,
    tags: ['3D', 'terrain', 'map', 'three.js', 'procedural'],
    is3D: true,
    fileSize: '2.0 KB',
    price: '39.99'
  }
];

// Add more component collections as needed
