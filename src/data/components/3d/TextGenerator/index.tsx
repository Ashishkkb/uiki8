import React from 'react';
import { ComponentItem } from "@/types/component";
import { TextGenerator } from "@/lib/components/3d";

const TextGeneratorComponent: ComponentItem = {
  id: 105,
  name: "3D Text Generator",
  category: "3D",
  framework: "React Three Fiber",
  description: "Create interactive 3D text with customizable fonts, extrusion, materials, and animations",
  code: `import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei';
import * as THREE from 'three';

function Text3DObject({
  text = 'Hello',
  font = '/fonts/inter_regular.json',
  matcapId = '3',
  bevelEnabled = true,
  bevelSize = 0.05,
  bevelOffset = 0,
  bevelSegments = 4,
  curveSegments = 12,
  depth = 0.2,
  ...props
}) {
  const textRef = useRef();
  const [matcapTexture] = useMatcapTexture(matcapId, 256);
  const [bounceAnimation, setBounceAnimation] = useState(true);
  const [rotateAnimation, setRotateAnimation] = useState(false);
  
  // Animation
  useFrame((state, delta) => {
    if (!textRef.current) return;
    
    if (bounceAnimation) {
      // Bounce animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    
    if (rotateAnimation) {
      // Rotation animation
      textRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group {...props}>
      <Center>
        <Text3D
          ref={textRef}
          font={font}
          scale={1}
          bevelEnabled={bevelEnabled}
          bevelSize={bevelSize}
          bevelOffset={bevelOffset}
          bevelSegments={bevelSegments}
          curveSegments={curveSegments}
          depth={depth}
        >
          {text}
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
      
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function TextGenerator() {
  const [text, setText] = useState('Hello 3D');
  const [selectedMatcap, setSelectedMatcap] = useState('3');
  const [depth, setDepth] = useState(0.2);
  
  const matcapOptions = [
    { id: '3', name: 'Gold' },
    { id: '4', name: 'Blue Metal' },
    { id: '7B', name: 'Chrome' },
    { id: '16', name: 'Pearl' },
    { id: '2', name: 'Red Plastic' }
  ];

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <Text3DObject 
          text={text} 
          matcapId={selectedMatcap} 
          depth={depth} 
          position={[0, 0, 0]} 
        />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true} 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '80%',
        padding: '10px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '8px',
      }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          style={{ 
            padding: '8px', 
            borderRadius: '4px', 
            border: 'none' 
          }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Depth: {depth.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={depth}
              onChange={(e) => setDepth(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Material
            </label>
            <select
              value={selectedMatcap}
              onChange={(e) => setSelectedMatcap(e.target.value)}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: 'none' }}
            >
              {matcapOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  component: TextGenerator,
  tags: ["3D", "Text", "Typography", "Interactive", "Customizable"],
  isNew: true,
  fileSize: "9.8 KB",
  price: "34.99",
  is3D: true
};

export default TextGeneratorComponent;
