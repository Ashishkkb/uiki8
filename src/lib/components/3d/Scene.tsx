
import React, { useRef } from 'react';
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
  const [hovered, setHovered] = React.useState(false);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh
      ref={mesh}
      position={position as [number, number, number]}
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

const Scene = ({
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

export default Scene;
