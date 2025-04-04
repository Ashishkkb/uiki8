
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, OrbitControls, Center, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedText3DProps {
  text?: string;
  color?: string;
  hoverColor?: string;
  bevelEnabled?: boolean;
  bevelSize?: number;
  bevelThickness?: number;
  font?: string;
  fontSize?: number;
  height?: number;
  rotationSpeed?: number;
}

const FloatingText = ({ 
  text = "LOVABLE", 
  color = "#6d28d9",
  hoverColor = "#d946ef",
  bevelEnabled = true,
  bevelSize = 0.05,
  bevelThickness = 0.05,
  fontSize = 1,
  height = 0.2,
  rotationSpeed = 0.01
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += rotationSpeed;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      
      // Pulse effect when clicked
      if (clicked) {
        mesh.current.scale.x = THREE.MathUtils.lerp(
          mesh.current.scale.x,
          Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 1,
          0.1
        );
        mesh.current.scale.y = THREE.MathUtils.lerp(
          mesh.current.scale.y,
          Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 1,
          0.1
        );
      } else {
        mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, 1, 0.1);
        mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, 1, 0.1);
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <Text3D
        font="/fonts/inter_bold.json"
        size={fontSize}
        height={height}
        bevelEnabled={bevelEnabled}
        bevelSize={bevelSize}
        bevelThickness={bevelThickness}
        bevelSegments={5}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial 
          color={hovered ? hoverColor : color} 
          emissive={hovered ? hoverColor : color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </mesh>
  );
};

const AnimatedText3D: React.FC<AnimatedText3DProps> = (props) => {
  return (
    <div className="w-full h-[400px] bg-black/80 rounded-xl overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Center>
          <FloatingText {...props} />
        </Center>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedText3D;
