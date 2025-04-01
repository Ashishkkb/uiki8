
import React from 'react';
import { ComponentItem } from "@/types/component";
import { RotatingCube } from "@/lib/components/3d";

const RotatingCubeComponent: ComponentItem = {
  id: 101,
  name: "Rotating Cube",
  category: "3D",
  framework: "React Three Fiber",
  description: "An interactive 3D cube that rotates and responds to user interaction",
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
  component: RotatingCube,
  tags: ["3D", "interactive", "three.js", "animation"],
  is3D: true,
  fileSize: "1.2 KB",
  price: "19.99"
};

export default RotatingCubeComponent;
