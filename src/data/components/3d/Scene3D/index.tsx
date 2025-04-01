
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Scene } from "@/lib/components/3d";

const Scene3DComponent: ComponentItem = {
  id: 97,
  name: "Scene3D",
  category: "3D",
  framework: "React Three Fiber",
  description: "A configurable 3D scene with customizable environment and objects",
  code: `import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ObjectProps {
  position?: [number, number, number];
  color?: string;
  size?: [number, number, number];
  rotation?: [number, number, number];
}

const SceneObject = ({ position = [0, 0, 0], color = '#6a9d80', size = [1, 1, 1], rotation = [0, 0, 0] }: ObjectProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={hovered ? '#ff9f00' : color} />
    </mesh>
  );
};

interface Scene3DProps {
  objects?: ObjectProps[];
  environment?: string;
  cameraPosition?: [number, number, number];
  shadows?: boolean;
  backgroundColor?: string;
}

const Scene3D = ({
  objects = [{ position: [0, 0, 0], color: '#6a9d80', size: [1, 1, 1] }],
  environment = 'sunset',
  cameraPosition = [0, 0, 5],
  shadows = true,
  backgroundColor = '#f3f4f6'
}: Scene3DProps) => {
  return (
    <div style={{ width: '100%', height: '100%', background: backgroundColor }}>
      <Canvas 
        shadows={shadows}
        camera={{ position: cameraPosition }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        
        {objects.map((object, index) => (
          <SceneObject 
            key={index}
            position={object.position}
            color={object.color}
            size={object.size}
            rotation={object.rotation}
          />
        ))}
        
        <Environment preset={environment as any} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Scene3D;`,
  component: Scene,
  tags: ["3D", "scene", "three.js", "environment"],
  is3D: true,
  fileSize: "2.4 KB",
  price: "29.99",
  complexity: "complex",
  lastUpdated: "2024-01-18",
  license: "MIT",
  dependencies: ["@react-three/fiber", "@react-three/drei", "three"]
};

export default Scene3DComponent;
