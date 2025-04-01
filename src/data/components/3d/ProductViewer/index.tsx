import React from 'react';
import { ComponentItem } from "@/types/component";
import { ProductViewer } from "@/lib/components/3d";

const ProductViewerComponent: ComponentItem = {
  id: 102,
  name: "Product Viewer",
  category: "3D",
  framework: "React Three Fiber",
  description: "A 3D product viewer with orbit controls and environmental lighting",
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
  component: ProductViewer,
  tags: ["3D", "product", "viewer", "three.js"],
  is3D: true,
  fileSize: "1.5 KB",
  price: "29.99"
};

export default ProductViewerComponent;
