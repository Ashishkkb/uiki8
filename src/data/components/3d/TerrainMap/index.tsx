
import React from 'react';
import { ComponentItem } from "@/types/component";

const TerrainMapComponent: ComponentItem = {
  id: 103,
  name: "Terrain Map",
  category: "3D",
  framework: "React Three Fiber",
  description: "A 3D terrain map with procedural generation and texture mapping",
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
  tags: ["3D", "terrain", "map", "three.js", "procedural"],
  is3D: true,
  fileSize: "2.0 KB",
  price: "39.99"
};

export default TerrainMapComponent;
