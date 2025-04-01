
import { ComponentItem } from "@/types/component";

const threeDComponents: ComponentItem[] = [
  {
    id: 101,
    name: "3D Rotating Cube",
    category: "3D",
    framework: "React Three Fiber",
    description: "A customizable 3D cube that rotates smoothly on mouse interaction with realistic lighting and shadows.",
    code: `import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import * as THREE from 'three';

function Cube(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
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
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Cube position={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}`,
    price: 19.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#1E293B] to-[#334155]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/d0O0MHa.gif" alt="3D Rotating Cube" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Animation", "Interactive", "ThreeJS", "React"],
    isNew: true,
    fileSize: "5.7 KB",
    is3D: true
  },
  {
    id: 102,
    name: "3D Product Viewer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Interactive 3D product viewer with zoom, rotate, and material customization capabilities.",
    code: `import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

function Model({ url, position = [0, 0, 0], ...props }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const [materialColor, setMaterialColor] = useState('#ffffff');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) / 6;
  });

  // Apply the material color to all meshes in the model
  scene.traverse((node) => {
    if (node.isMesh) {
      node.material.color.set(materialColor);
    }
  });

  return (
    <group ref={groupRef} position={position} {...props}>
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

export default function ProductViewer({ modelUrl = "/path/to/model.glb" }) {
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
}`,
    price: 39.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#111827] to-[#1F2937]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/JQjV3zr.gif" alt="3D Product Viewer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "E-commerce", "Product", "Interactive", "GLTF"],
    isNew: true,
    fileSize: "8.3 KB",
    is3D: true
  },
  {
    id: 103,
    name: "3D Terrain Map",
    category: "3D",
    framework: "React Three Fiber",
    description: "Dynamic 3D terrain visualization with height map, texturing, and interactive camera controls.",
    code: `import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

function Terrain({ width = 20, height = 20, widthSegments = 64, heightSegments = 64, ...props }) {
  const meshRef = useRef();
  
  // Generate terrain data
  const { positions, normals, indices } = useMemo(() => {
    const positions = [];
    const normals = [];
    const indices = [];
    const noise = generateNoise(widthSegments, heightSegments);
    
    // Generate grid
    for (let i = 0; i <= heightSegments; i++) {
      const y = (i / heightSegments) * height - height / 2;
      
      for (let j = 0; j <= widthSegments; j++) {
        const x = (j / widthSegments) * width - width / 2;
        
        // Apply noise to z coordinate for height
        const z = noise[i * (widthSegments + 1) + j] * 2;
        
        positions.push(x, z, y);
        normals.push(0, 1, 0);
        
        if (i < heightSegments && j < widthSegments) {
          const a = i * (widthSegments + 1) + j;
          const b = i * (widthSegments + 1) + j + 1;
          const c = (i + 1) * (widthSegments + 1) + j;
          const d = (i + 1) * (widthSegments + 1) + j + 1;
          
          indices.push(a, b, c);
          indices.push(c, b, d);
        }
      }
    }
    
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices)
    };
  }, [width, height, widthSegments, heightSegments]);

  // Generate terrain texture coordinates
  const uvs = useMemo(() => {
    const uvs = [];
    
    for (let i = 0; i <= heightSegments; i++) {
      for (let j = 0; j <= widthSegments; j++) {
        uvs.push(j / widthSegments);
        uvs.push(i / heightSegments);
      }
    }
    
    return new Float32Array(uvs);
  }, [widthSegments, heightSegments]);

  // Create texture colors based on height
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Create gradient for terrain colors
    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#3A8C38'); // Mountain top (green)
    gradient.addColorStop(0.4, '#5D783E'); // Forest (dark green)
    gradient.addColorStop(0.7, '#D2B98B'); // Low lands (light brown)
    gradient.addColorStop(1, '#81A1C1'); // Water (blue)
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    
    return texture;
  }, []);

  // Add normals for better lighting
  useFrame(() => {
    const geometry = meshRef.current.geometry;
    geometry.computeVertexNormals();
  });

  return (
    <mesh {...props} ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'normal']}
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'uv']}
          array={uvs}
          count={uvs.length / 2}
          itemSize={2}
        />
      </bufferGeometry>
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

function generateNoise(width, height) {
  const noise = [];
  
  // Create Perlin-like noise
  for (let i = 0; i <= height; i++) {
    for (let j = 0; j <= width; j++) {
      // Simple noise function (would use a library like SimplexNoise in production)
      const value = Math.sin(j * 0.1) * Math.cos(i * 0.1) * 0.5
                   + Math.sin(j * 0.4) * Math.cos(i * 0.3) * 0.25;
      
      noise.push(value);
    }
  }
  
  return noise;
}

export default function TerrainMap() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Terrain />
        <Sky sunPosition={[100, 100, 20]} />
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}`,
    price: 29.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#065F46] to-[#064E3B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/JXzjy0v.gif" alt="3D Terrain Map" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Maps", "GIS", "Terrain", "Data Visualization"],
    isNew: true,
    fileSize: "12.5 KB",
    is3D: true
  },
  {
    id: 104,
    name: "3D Particle System",
    category: "3D",
    framework: "React Three Fiber",
    description: "GPU-accelerated particle system for creating stunning visual effects like fire, smoke, and magical auras.",
    code: `import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Particle system component
function ParticleSystem({ count = 5000, color = '#ff5500', speed = 0.2, scale = 1, type = 'fire', ...props }) {
  const mesh = useRef();
  const [positions, setPositions] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  
  // Generate particle data
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorObj = new THREE.Color(color);
    const tempColor = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Different distributions for different effect types
      switch (type) {
        case 'fire':
          // Cone-like distribution for fire
          const radius = Math.random() * scale;
          const theta = Math.random() * Math.PI * 2;
          positions[i3] = radius * Math.sin(theta);
          positions[i3 + 1] = Math.random() * 2 * scale;
          positions[i3 + 2] = radius * Math.cos(theta);
          
          // Color gradient from yellow to red
          tempColor.copy(colorObj).lerp(new THREE.Color('#ffcc00'), Math.random());
          break;
          
        case 'smoke':
          // Wider distribution for smoke
          positions[i3] = (Math.random() - 0.5) * scale;
          positions[i3 + 1] = Math.random() * 3 * scale;
          positions[i3 + 2] = (Math.random() - 0.5) * scale;
          
          // Gray tone for smoke
          tempColor.copy(colorObj).lerp(new THREE.Color('#aaaaaa'), Math.random());
          break;
          
        case 'magic':
          // Spherical distribution for magic effect
          const phi = Math.acos(2 * Math.random() - 1);
          const theta2 = Math.random() * Math.PI * 2;
          const r = scale * Math.cbrt(Math.random());
          
          positions[i3] = r * Math.sin(phi) * Math.cos(theta2);
          positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta2);
          positions[i3 + 2] = r * Math.cos(phi);
          
          // Colorful gradient for magic
          tempColor.setHSL(Math.random(), 0.7, 0.5);
          break;
          
        default:
          // Default random distribution
          positions[i3] = (Math.random() - 0.5) * scale;
          positions[i3 + 1] = (Math.random() - 0.5) * scale;
          positions[i3 + 2] = (Math.random() - 0.5) * scale;
          tempColor.copy(colorObj);
      }
      
      colors[i3] = tempColor.r;
      colors[i3 + 1] = tempColor.g;
      colors[i3 + 2] = tempColor.b;
      
      // Varied particle sizes
      sizes[i] = Math.random() * 0.5 + 0.5;
    }
    
    setPositions(positions);
    setColors(colors);
    setSizes(sizes);
  }, [count, color, scale, type]);

  // Animation for particle movement
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime() * speed;
    const positionArray = mesh.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      switch (type) {
        case 'fire':
          // Rising motion for fire
          positionArray[i3 + 1] += speed * 0.03;
          positionArray[i3] += Math.sin(time + i) * 0.01;
          positionArray[i3 + 2] += Math.cos(time + i) * 0.01;
          
          // Reset particles that go too high
          if (positionArray[i3 + 1] > scale * 2) {
            positionArray[i3 + 1] = Math.random() * 0.5;
            positionArray[i3] = (Math.random() - 0.5) * scale * 0.3;
            positionArray[i3 + 2] = (Math.random() - 0.5) * scale * 0.3;
          }
          break;
          
        case 'smoke':
          // Rising and expanding motion for smoke
          positionArray[i3 + 1] += speed * 0.02;
          positionArray[i3] += Math.sin(time + i) * 0.005;
          positionArray[i3 + 2] += Math.cos(time + i) * 0.005;
          
          // Reset particles that go too high
          if (positionArray[i3 + 1] > scale * 3) {
            positionArray[i3 + 1] = Math.random() * 0.5;
            positionArray[i3] = (Math.random() - 0.5) * scale * 0.2;
            positionArray[i3 + 2] = (Math.random() - 0.5) * scale * 0.2;
          }
          break;
          
        case 'magic':
          // Orbital motion for magic
          const angle = time * (i % 10 + 1) * 0.01;
          const radius = Math.abs(positions[i3]) + Math.abs(positions[i3 + 2]);
          positionArray[i3] = Math.sin(angle) * radius;
          positionArray[i3 + 2] = Math.cos(angle) * radius;
          positionArray[i3 + 1] = positions[i3 + 1] + Math.sin(time + i) * 0.1;
          break;
          
        default:
          // Generic pulsing motion
          positionArray[i3] = positions[i3] + Math.sin(time + i) * 0.1;
          positionArray[i3 + 1] = positions[i3 + 1] + Math.cos(time + i) * 0.1;
          positionArray[i3 + 2] = positions[i3 + 2] + Math.sin(time + i * 0.7) * 0.1;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const particleMaterial = useMemo(() => {
    const texture = new THREE.TextureLoader().load('/lovable-uploads/particle.png');
    
    return new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
      map: texture
    });
  }, []);

  if (!positions || !colors || !sizes) return null;

  return (
    <points ref={mesh} {...props}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'size']}
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive attach="material" object={particleMaterial} />
    </points>
  );
}

export default function ParticleSystemEffect() {
  const [effectType, setEffectType] = useState('fire');
  
  const effectTypes = [
    { name: 'Fire', value: 'fire', color: '#ff5500' },
    { name: 'Smoke', value: 'smoke', color: '#777777' },
    { name: 'Magic', value: 'magic', color: '#8B5CF6' }
  ];

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleSystem 
          type={effectType} 
          color={effectTypes.find(e => e.value === effectType)?.color} 
          scale={2}
        />
        <OrbitControls dampingFactor={0.05} />
      </Canvas>
      
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {effectTypes.map((effect) => (
          <button
            key={effect.value}
            style={{
              padding: '8px 12px',
              background: effectType === effect.value ? effect.color : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: effectType === effect.value ? 1 : 0.8,
            }}
            onClick={() => setEffectType(effect.value)}
          >
            {effect.name}
          </button>
        ))}
      </div>
    </div>
  );
}`,
    price: 49.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#4C1D95] to-[#7E22CE]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/bqTWiwp.gif" alt="3D Particle System" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Particles", "Animation", "Effects", "GPU"],
    isNew: true,
    fileSize: "15.2 KB",
    is3D: true
  },
  {
    id: 105,
    name: "3D Text Generator",
    category: "3D",
    framework: "React Three Fiber",
    description: "Create interactive 3D text with customizable fonts, extrusion, materials, and animations.",
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
      
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '8px' }}>
        <button
          style={{
            padding: '8px 12px',
            background: bounceAnimation ? '#6366F1' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setBounceAnimation(!bounceAnimation)}
        >
          Bounce
        </button>
        <button
          style={{
            padding: '8px 12px',
            background: rotateAnimation ? '#6366F1' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setRotateAnimation(!rotateAnimation)}
        >
          Rotate
        </button>
      </div>
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
    price: 34.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#312E81] to-[#4338CA]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/2yFGYOg.gif" alt="3D Text Generator" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Text", "Typography", "Interactive", "Customizable"],
    isNew: true,
    fileSize: "9.8 KB",
    is3D: true
  },
  {
    id: 106,
    name: "3D Physics Playground",
    category: "3D",
    framework: "React Three Fiber",
    description: "Interactive physics simulation with realistic collisions, gravity, and material properties using rapier physics engine.",
    code: `import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Ground plane
function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#f5f5f5" />
    </mesh>
  );
}

// Box with physics
function PhysicsBox({ position, size = [1, 1, 1], color = 'blue', ...props }) {
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    position, 
    args: size,
    ...props 
  }));
  
  const handleClick = () => {
    // Apply an impulse to make it jump when clicked
    api.applyImpulse([0, 5, 0], [0, 0, 0]);
    api.angularVelocity.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
  };

  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleClick}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Sphere with physics
function PhysicsSphere({ position, radius = 0.5, color = 'red', ...props }) {
  const [ref, api] = useSphere(() => ({ 
    mass: 1, 
    position, 
    args: radius,
    ...props 
  }));
  
  const handleClick = () => {
    // Apply an impulse when clicked
    api.applyImpulse([
      (Math.random() - 0.5) * 5,
      5,
      (Math.random() - 0.5) * 5
    ], [0, 0, 0]);
  };

  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleClick}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Wall made of boxes
function Wall({ position, width, height, depth }) {
  const boxes = [];
  const boxSize = 0.5;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      boxes.push(
        <PhysicsBox
          key={`${x}-${y}`}
          position={[
            position[0] + (x - width/2 + 0.5) * boxSize,
            position[1] + (y + 0.5) * boxSize,
            position[2]
          ]}
          size={[boxSize, boxSize, boxSize]}
          color={new THREE.Color().setHSL(y/height, 0.7, 0.5)}
        />
      );
    }
  }
  
  return <>{boxes}</>;
}

// Sphere dropper
function SphereBall({ position }) {
  const [spheres, setSpheres] = useState([]);
  const nextId = useRef(0);
  
  const dropSphere = () => {
    const id = nextId.current++;
    const color = "hsl(" + (Math.random() * 360) + ", 70%, 50%)";
    const radius = Math.random() * 0.3 + 0.2;
    
    setSpheres(prevSpheres => [
      ...prevSpheres,
      { id, position: [...position], color, radius }
    ]);
    
    // Remove spheres after they've been around for a while
    if (spheres.length > 15) {
      setSpheres(spheres.slice(1));
    }
  };

  return (
    <>
      <mesh position={position} onClick={dropSphere}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} />
      </mesh>
      
      {spheres.map(sphere => (
        <PhysicsSphere
          key={sphere.id}
          position={sphere.position}
          radius={sphere.radius}
          color={sphere.color}
          restitution={0.7}
        />
      ))}
    </>
  );
}

// Domino setup
function Dominos({ count = 10, spacing = 0.7, position = [0, 0.5, 0] }) {
  const dominos = [];
  
  for (let i = 0; i < count; i++) {
    dominos.push(
      <PhysicsBox
        key={i}
        position={[position[0] + i * spacing, position[1], position[2]]}
        size={[0.2, 1, 0.5]}
        color={new THREE.Color().setHSL(i/count, 0.7, 0.5)}
      />
    );
  }
  
  return <>{dominos}</>;
}

export default function PhysicsPlayground() {
  const [gravity, setGravity] = useState(-9.8);
  const [showWall, setShowWall] = useState(false);
  const [showDominos, setShowDominos] = useState(false);
  
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        
        <Physics gravity={[0, gravity, 0]}>
          <Plane />
          
          {/* Central box */}
          <PhysicsBox position={[0, 2, 0]} color="royalblue" />
          
          {/* Sphere dropper */}
          <SphereBall position={[0, 5, 0]} />
          
          {/* Optional wall */}
          {showWall && <Wall position={[-2, 0, 0]} width={6} height={5} depth={1} />}
          
          {/* Optional dominos */}
          {showDominos && <Dominos count={10} position={[0, 0.5, -2]} />}
        </Physics>
        
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256}
          />
        </Suspense>
        
        <OrbitControls />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
        width: '80%',
      }}>
        <div>
          <label style={{ color: 'white', fontSize: '12px', marginBottom: '4px', display: 'block' }}>
            Gravity: {gravity.toFixed(1)}
          </label>
          <input 
            type="range" 
            min="-20" 
            max="0" 
            step="0.1" 
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              flex: 1,
              padding: '8px',
              background: showWall ? '#3B82F6' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
            onClick={() => setShowWall(!showWall)}
          >
            {showWall ? 'Hide Wall' : 'Show Wall'}
          </button>
          
          <button
            style={{
              flex: 1,
              padding: '8px',
              background: showDominos ? '#3B82F6' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
            onClick={() => setShowDominos(!showDominos)}
          >
            {showDominos ? 'Hide Dominos' : 'Show Dominos'}
          </button>
        </div>
      </div>
    </div>
  );
}`,
    price: 59.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#0F172A] to-[#1E293B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/7KVmwl6.gif" alt="3D Physics Playground" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Physics", "Interactive", "Simulation", "Game"],
    isNew: true,
    fileSize: "14.3 KB",
    is3D: true
  },
  {
    id: 107,
    name: "3D Data Visualization",
    category: "3D",
    framework: "React Three Fiber",
    description: "Visualize complex datasets with interactive 3D bar charts, scatter plots, and heat maps.",
    code: `import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Sample data (could be fetched from API)
const generateData = (rows, cols) => {
  const data = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Generate some interesting patterns
      const value = Math.sin(i * 0.3) * Math.cos(j * 0.3) * 3 + 
                    Math.sin(i * 0.1 + j * 0.2) * 2;
                    
      data.push({
        x: j - cols / 2,
        y: value,
        z: i - rows / 2,
        color: value < 0 ? '#3B82F6' : '#F59E0B'
      });
    }
  }
  return data;
};

// 3D Bar Chart
function BarChart({ data, maxHeight = 5, barWidth = 0.8 }) {
  return (
    <group>
      {data.map((point, index) => {
        const height = Math.abs(point.y);
        const yPosition = point.y > 0 ? 0 : -height;
        
        return (
          <mesh 
            key={index} 
            position={[point.x, yPosition + height / 2, point.z]}
            castShadow
          >
            <boxGeometry args={[barWidth, height, barWidth]} />
            <meshStandardMaterial 
              color={point.color} 
              opacity={0.8}
              transparent
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Scatter Plot
function ScatterPlot({ data, pointSize = 0.3 }) {
  return (
    <group>
      {data.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]} castShadow>
          <sphereGeometry args={[pointSize, 16, 16]} />
          <meshStandardMaterial color={point.color} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Surface Plot
function SurfacePlot({ data, rows, cols, maxHeight = 5 }) {
  // Create a geometry for the surface
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      cols - 1, 
      rows - 1, 
      cols - 1, 
      rows - 1
    );
    
    // Reposition vertices based on data values
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        const vertex = index;
        
        // Update y position based on data
        if (geo.attributes.position) {
          // We need to adjust the vertex positions directly 
          // in the geometry's attribute array
          const idx = vertex * 3 + 1; // y is at position 1 (x,y,z)
          geo.attributes.position.array[idx] = data[index].y;
        }
      }
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [data, rows, cols]);

  // Create colors for the surface
  const colors = useMemo(() => {
    const colorsArray = [];
    for (const point of data) {
      const color = new THREE.Color(point.color);
      colorsArray.push(color.r, color.g, color.b);
    }
    return new Float32Array(colorsArray);
  }, [data]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <primitive object={geometry} />
      <meshStandardMaterial 
        vertexColors
        side={THREE.DoubleSide} 
        wireframe={false}
      />
    </mesh>
  );
}

// Axes helper
function Axes({ size = 10 }) {
  return (
    <group>
      {/* X axis */}
      <Line
        points={[
          [0, 0, 0],
          [size, 0, 0]
        ]}
        color="red"
        lineWidth={2}
      />
      <Text
        position={[size + 0.5, 0, 0]}
        color="red"
        fontSize={0.5}
        anchorX="left"
      >
        X
      </Text>
      
      {/* Y axis */}
      <Line
        points={[
          [0, 0, 0],
          [0, size, 0]
        ]}
        color="green"
        lineWidth={2}
      />
      <Text
        position={[0, size + 0.5, 0]}
        color="green"
        fontSize={0.5}
        anchorX="center"
      >
        Y
      </Text>
      
      {/* Z axis */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, size]
        ]}
        color="blue"
        lineWidth={2}
      />
      <Text
        position={[0, 0, size + 0.5]}
        color="blue"
        fontSize={0.5}
        anchorX="left"
      >
        Z
      </Text>
    </group>
  );
}

export default function DataVisualization() {
  const [rows] = useState(20);
  const [cols] = useState(20);
  const [visualizationType, setVisualizationType] = useState('bars');
  
  const data = useMemo(() => generateData(rows, cols), [rows, cols]);
  
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        <Grid
          args={[20, 20]}
          position={[0, -0.01, 0]}
          cellColor="#aaa"
          sectionColor="#555"
        />
        
        <Axes size={10} />
        
        {visualizationType === 'bars' && (
          <BarChart data={data} />
        )}
        
        {visualizationType === 'scatter' && (
          <ScatterPlot data={data} />
        )}
        
        {visualizationType === 'surface' && (
          <SurfacePlot data={data} rows={rows} cols={cols} />
        )}
        
        <OrbitControls />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
      }}>
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'bars' ? '#3B82F6' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('bars')}
        >
          Bar Chart
        </button>
        
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'scatter' ? '#3B82F6' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('scatter')}
        >
          Scatter Plot
        </button>
        
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'surface' ? '#3B82F6' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('surface')}
        >
          Surface
        </button>
      </div>
    </div>
  );
}`,
    price: 49.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/1R367dp.gif" alt="3D Data Visualization" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Data Visualization", "Charts", "Analytics", "Business"],
    isNew: true,
    fileSize: "13.7 KB",
    is3D: true
  },
  {
    id: 108,
    name: "3D Model Viewer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Professional GLTF/GLB model viewer with environment lighting, camera controls, and model inspector.",
    code: `import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows, 
  useHelper,
  Html,
  Stats
} from '@react-three/drei';
import * as THREE from 'three';
import { folder, useControls } from 'leva';

// Model component
function Model({ 
  url = '/models/robot.glb', 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  showWireframe = false,
  enableAnimation = true,
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { animationClip } = useControls({
    animationClip: {
      value: 0,
      min: 0,
      max: animations.length - 1,
      step: 1,
      disabled: animations.length <= 1,
    },
  });

  // Clone materials to avoid modifying the original
  useFrame((state) => {
    if (group.current && enableAnimation) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  
  // Apply wireframe to all materials if enabled
  scene.traverse((child) => {
    if (child.isMesh) {
      // Clone the material to avoid modifying the original
      if (child.material && !child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }
      
      if (showWireframe) {
        child.material = new THREE.MeshBasicMaterial({
          wireframe: true,
          color: 'white',
        });
      } else if (child.userData.originalMaterial) {
        child.material = child.userData.originalMaterial;
      }
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// Camera controls with debug information
function CameraController({ showControls }) {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  
  // Get camera information for display
  const cameraInfo = {
    position: camera.position,
    rotation: camera.rotation,
    fov: camera.fov,
  };
  
  return (
    <>
      <OrbitControls 
        args={[camera, domElement]} 
        enableDamping 
        dampingFactor={0.05} 
      />
      
      {showControls && (
        <Html position={[-1.5, 2, 0]} center transform occlude>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            width: '240px'
          }}>
            <div>Camera</div>
            <div>Pos X: {cameraInfo.position.x.toFixed(2)}</div>
            <div>Pos Y: {cameraInfo.position.y.toFixed(2)}</div>
            <div>Pos Z: {cameraInfo.position.z.toFixed(2)}</div>
            <div>FOV: {cameraInfo.fov.toFixed(1)}°</div>
          </div>
        </Html>
      )}
    </>
  );
}

// Lighting setup component
function Lighting({ 
  showHelpers = false,
  intensity = 1, 
  position = [10, 10, 10]
}) {
  const spotLightRef = useRef();
  
  // Show spotlight helper if enabled
  useHelper(showHelpers && spotLightRef, THREE.SpotLightHelper, 'red');
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        ref={spotLightRef}
        position={position} 
        angle={0.3} 
        penumbra={1} 
        intensity={intensity} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
    </>
  );
}

// Ground helper component
function Ground({ visible = true }) {
  if (!visible) return null;
  
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      
      <ContactShadows 
        position={[0, -0.99, 0]}
        opacity={0.7}
        scale={15}
        blur={2}
        far={1}
        resolution={256}
      />
    </>
  );
}

// Controls panel component
function ControlsPanel({ 
  showWireframe, 
  setShowWireframe,
  showControls,
  setShowControls,
  showStats,
  setShowStats,
  showGround,
  setShowGround,
  lightIntensity,
  setLightIntensity,
  environmentPreset,
  setEnvironmentPreset,
  enableAnimation,
  setEnableAnimation
}) {
  const environments = [
    'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
  ];
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '10px',
      borderRadius: '8px',
      color: 'white',
      width: '80%',
      maxWidth: '400px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showWireframe} 
            onChange={() => setShowWireframe(!showWireframe)} 
          />
          Wireframe
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showControls} 
            onChange={() => setShowControls(!showControls)} 
          />
          Show Debug
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showStats} 
            onChange={() => setShowStats(!showStats)} 
          />
          Statistics
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showGround} 
            onChange={() => setShowGround(!showGround)} 
          />
          Show Ground
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={enableAnimation} 
            onChange={() => setEnableAnimation(!enableAnimation)} 
          />
          Animation
        </label>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Light Intensity: {lightIntensity.toFixed(1)}
        </label>
        <input 
          type="range" 
          min="0" 
          max="2" 
          step="0.1" 
          value={lightIntensity}
          onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Environment
        </label>
        <select 
          value={environmentPreset} 
          onChange={(e) => setEnvironmentPreset(e.target.value)}
          style={{ width: '100%', padding: '5px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
        >
          {environments.map(env => (
            <option key={env} value={env}>{env}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function ModelViewer({ modelUrl = "/models/robot.glb" }) {
  const [showWireframe, setShowWireframe] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showGround, setShowGround] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [environmentPreset, setEnvironmentPreset] = useState('sunset');
  const [enableAnimation, setEnableAnimation] = useState(true);

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        <color attach="background" args={['#15151a']} />
        
        {showStats && <Stats />}
        
        <Lighting 
          showHelpers={showControls} 
          intensity={lightIntensity}
        />
        
        <Suspense fallback={null}>
          <Model 
            url={modelUrl} 
            scale={1} 
            showWireframe={showWireframe}
            enableAnimation={enableAnimation}
          />
          
          <Environment preset={environmentPreset} background={false} />
          <Ground visible={showGround} />
        </Suspense>
        
        <CameraController showControls={showControls} />
      </Canvas>
      
      <ControlsPanel
        showWireframe={showWireframe}
        setShowWireframe={setShowWireframe}
        showControls={showControls}
        setShowControls={setShowControls}
        showStats={showStats}
        setShowStats={setShowStats}
        showGround={showGround}
        setShowGround={setShowGround}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        environmentPreset={environmentPreset}
        setEnvironmentPreset={setEnvironmentPreset}
        enableAnimation={enableAnimation}
        setEnableAnimation={setEnableAnimation}
      />
    </div>
  );
}`,
    price: 69.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#0F172A] to-[#1E293B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/WV0QoCG.gif" alt="3D Model Viewer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Model Viewer", "GLTF", "Professional", "AR/VR"],
    isNew: true,
    fileSize: "17.8 KB",
    is3D: true
  },
  {
    id: 109,
    name: "3D Audio Visualizer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Real-time audio visualization in 3D with frequency analysis and reactive visual effects.",
    code: `import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Audio analyzer component
const AudioAnalyzer = ({ audioUrl = '/audio/sample.mp3', onData, visualizationType = 'bars' }) => {
  const [audio] = useState(() => new Audio(audioUrl));
  const [analyser, setAnalyser] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dataArray = useRef(null);
  
  // Initialize audio context and analyzer
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);
    
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 512;
    const bufferLength = analyzer.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength);
    
    setAnalyser(analyzer);
    
    // Clean up
    return () => {
      if (audioCtx.state !== 'closed') {
        audioCtx.close();
      }
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);
  
  // Set up audio source when play is clicked
  const togglePlay = () => {
    if (!audioContext || !analyser) return;
    
    if (!isPlaying) {
      // Resume audio context if suspended (autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  
  // Update frequency data on each frame
  useFrame(() => {
    if (analyser && isPlaying) {
      analyser.getByteFrequencyData(dataArray.current);
      onData(dataArray.current);
    }
  });
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    }}>
      <button
        onClick={togglePlay}
        style={{
          padding: '8px 16px',
          background: isPlaying ? '#EF4444' : '#10B981',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {isPlaying ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="5" width="4" height="14" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" fill="currentColor" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            Play
          </>
        )}
      </button>
    </div>
  );
};

// 3D Bars visualization
function BarsVisualization({ audioData, barCount = 64, maxHeight = 5 }) {
  const bars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < barCount; i++) {
      arr.push({
        id: i,
        position: [
          (i / barCount) * 20 - 10,
          0,
          0
        ]
      });
    }
    return arr;
  }, [barCount]);
  
  const barMeshes = useRef({});
  
  useFrame(() => {
    if (!audioData) return;
    
    // Update bar heights based on audio data
    for (let i = 0; i < barCount; i++) {
      if (barMeshes.current[i]) {
        const dataIndex = Math.floor((i / barCount) * audioData.length);
        const value = audioData[dataIndex] / 255.0;
        
        // Update height and y-position
        const height = value * maxHeight || 0.05;
        barMeshes.current[i].scale.y = height;
        barMeshes.current[i].position.y = height / 2;
        
        // Update color based on frequency
        barMeshes.current[i].material.color.setHSL(
          value * 0.3 + 0.6, // hue (blue to purple)
          0.8, // saturation
          0.5 // lightness
        );
      }
    }
  });
  
  return (
    <group>
      {bars.map((bar) => (
        <mesh
          key={bar.id}
          ref={(mesh) => (barMeshes.current[bar.id] = mesh)}
          position={bar.position}
        >
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#6366F1" />
        </mesh>
      ))}
    </group>
  );
}

// Circle visualization
function CircleVisualization({ audioData, pointCount = 100, radius = 5 }) {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      arr.push({
        id: i,
        angle,
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ],
        originalPosition: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ]
      });
    }
    return arr;
  }, [pointCount, radius]);
  
  const pointMeshes = useRef({});
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!audioData) return;
    
    for (let i = 0; i < pointCount; i++) {
      if (pointMeshes.current[i]) {
        const dataIndex = Math.floor((i / pointCount) * audioData.length);
        const value = audioData[dataIndex] / 255.0;
        
        // Calculate new position with audio reactivity
        const pulseRadius = radius + value * 2;
        const { angle, originalPosition } = points[i];
        
        pointMeshes.current[i].position.x = Math.cos(angle) * pulseRadius;
        pointMeshes.current[i].position.z = Math.sin(angle) * pulseRadius;
        
        // Add some subtle vertical movement
        pointMeshes.current[i].position.y = Math.sin(time + i * 0.1) * 0.5 + value * 2;
        
        // Update scale based on audio data
        const scale = 0.1 + value * 0.4;
        pointMeshes.current[i].scale.set(scale, scale, scale);
        
        // Update color based on frequency
        pointMeshes.current[i].material.color.setHSL(
          (i / pointCount) * 0.6 + 0.4, // hue (rainbow)
          0.8, // saturation
          0.5 + value * 0.5 // lightness
        );
      }
    }
  });
  
  return (
    <group>
      {points.map((point) => (
        <mesh
          key={point.id}
          ref={(mesh) => (pointMeshes.current[point.id] = mesh)}
          position={point.position}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  );
}

// Wave visualization
function WaveVisualization({ audioData, resolution = 128, size = 10 }) {
  // Create geometric plane to distort
  const { geometry, originalPositions } = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(
      size * 2, size * 2, 
      resolution - 1, resolution - 1
    );
    
    // Store original positions for animation
    const positions = planeGeometry.attributes.position.array.slice();
    
    return { 
      geometry: planeGeometry,
      originalPositions: positions
    };
  }, [resolution, size]);
  
  const mesh = useRef();
  
  // Update geometry based on audio data
  useFrame((state) => {
    if (!audioData || !mesh.current) return;
    
    const time = state.clock.getElapsedTime() * 0.5;
    const positionAttribute = mesh.current.geometry.attributes.position;
    
    // Iterate through each vertex
    for (let i = 0; i < positionAttribute.count; i++) {
      // Get x, y, z indices
      const i3 = i * 3;
      
      // Get original position
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      
      // Calculate distance from center (0,0)
      const distance = Math.sqrt(x * x + y * y);
      
      // Map distance to audio data index
      const binIndex = Math.min(
        Math.floor(distance / size * (audioData.length / 2)), 
        audioData.length - 1
      );
      
      // Get amplitude from audio data (0 to 1)
      const amplitude = audioData[binIndex] / 255.0;
      
      // Calculate wave displacement
      const displacement = 
        Math.sin(distance * 0.3 - time * 2) * amplitude * 2 + 
        Math.sin(x * 0.5 - time) * amplitude;
      
      // Update z position (height) based on audio data and wave patterns
      positionAttribute.array[i3 + 2] = displacement;
    }
    
    positionAttribute.needsUpdate = true;
  });
  
  // Custom shader material for wave effect
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x6366F1,
      wireframe: true,
      emissive: 0x2563EB,
      emissiveIntensity: 0.5,
    });
  }, []);
  
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={geometry} />
      <primitive object={material} />
    </mesh>
  );
}

export default function AudioVisualizer({ audioUrl = '/audio/sample.mp3' }) {
  const [audioData, setAudioData] = useState(null);
  const [visualizationType, setVisualizationType] = useState('bars');
  
  const handleAudioData = (data) => {
    setAudioData(data);
  };
  
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', background: '#000' }}>
      <Canvas>
        <color attach="background" args={['#050816']} />
        <fog attach="fog" args={['#050816', 5, 20]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        
        {visualizationType === 'bars' && (
          <BarsVisualization audioData={audioData} />
        )}
        
        {visualizationType === 'circle' && (
          <CircleVisualization audioData={audioData} />
        )}
        
        {visualizationType === 'wave' && (
          <WaveVisualization audioData={audioData} />
        )}
        
        <OrbitControls />
      </Canvas>
      
      <AudioAnalyzer audioUrl={audioUrl} onData={handleAudioData} />
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        display: 'flex',
        gap: '8px'
      }}>
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'bars' ? '#6366F1' : '#1E1E2A',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('bars')}
        >
          Bars
        </button>
        
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'circle' ? '#6366F1' : '#1E1E2A',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('circle')}
        >
          Circle
        </button>
        
        <button
          style={{
            padding: '8px 12px',
            background: visualizationType === 'wave' ? '#6366F1' : '#1E1E2A',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setVisualizationType('wave')}
        >
          Wave
        </button>
      </div>
    </div>
  );
}`,
    price: 54.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#050816] to-[#1E1B4B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/YQ6CWXN.gif" alt="3D Audio Visualizer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Audio", "Visualizer", "Music", "Interactive"],
    isNew: true,
    fileSize: "16.2 KB",
    is3D: true
  },
  {
    id: 110,
    name: "3D Configurator",
    category: "3D",
    framework: "React Three Fiber",
    description: "Interactive product configurator with customizable materials, colors, and features for e-commerce.",
    code: `import { useState, useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  useTexture,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

// Define product configuration options
const materialOptions = [
  { id: 'leather', name: 'Leather', price: 300 },
  { id: 'fabric', name: 'Fabric', price: 200 },
  { id: 'wood', name: 'Wood', price: 250 }
];

const colorOptions = [
  { id: 'black', name: 'Black', color: '#222', price: 0 },
  { id: 'brown', name: 'Brown', color: '#964B00', price: 0 },
  { id: 'white', name: 'White', color: '#f1f1f1', price: 50 },
  { id: 'red', name: 'Red', color: '#C0392B', price: 100 },
  { id: 'blue', name: 'Blue', color: '#2980B9', price: 100 }
];

const featureOptions = [
  { id: 'armrests', name: 'Armrests', price: 150, default: true },
  { id: 'cushions', name: 'Extra Cushions', price: 100, default: false },
  { id: 'wheels', name: 'Wheels', price: 80, default: true },
  { id: 'headrest', name: 'Headrest', price: 120, default: false }
];

// Interactive model with configuration
function ConfigurableModel({
  materialType = 'leather',
  color = '#222',
  features = ['armrests', 'wheels'],
  url = '/models/chair.glb',
}) {
  const group = useRef();
  const { scene, nodes, materials } = useGLTF(url);
  
  // Load textures for different material options
  const leatherTexture = useTexture('/textures/leather.jpg');
  const fabricTexture = useTexture('/textures/fabric.jpg');
  const woodTexture = useTexture('/textures/wood.jpg');
  
  // Rotate model smoothly
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) / 6;
  });
  
  // Apply materials and colors to the model
  scene.traverse((child) => {
    if (child.isMesh) {
      // Skip specific parts based on feature configuration
      if (
        (child.name.includes('armrest') && !features.includes('armrests')) ||
        (child.name.includes('cushion') && !features.includes('cushions')) ||
        (child.name.includes('wheel') && !features.includes('wheels')) ||
        (child.name.includes('headrest') && !features.includes('headrest'))
      ) {
        child.visible = false;
        return;
      }
      
      // Make sure all enabled parts are visible
      child.visible = true;
      child.castShadow = true;
      child.receiveShadow = true;
      
      // Apply material based on selection
      switch (materialType) {
        case 'leather':
          child.material = new THREE.MeshStandardMaterial({
            map: leatherTexture,
            color: color,
            roughness: 0.9,
            metalness: 0.1,
          });
          break;
        case 'fabric':
          child.material = new THREE.MeshStandardMaterial({
            map: fabricTexture,
            color: color,
            roughness: 1.0,
            metalness: 0.0,
          });
          break;
        case 'wood':
          child.material = new THREE.MeshStandardMaterial({
            map: woodTexture,
            color: color,
            roughness: 0.7,
            metalness: 0.2,
          });
          break;
        default:
          child.material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8,
            metalness: 0.2,
          });
      }
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Snapshot feature to take product images
function SnapshotButton() {
  const { gl, scene, camera } = useThree();
  
  const takeSnapshot = () => {
    const dataUrl = gl.domElement.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'product-configuration.png';
    link.click();
  };
  
  return (
    <Html position={[3, 3, 0]}>
      <button
        onClick={takeSnapshot}
        style={{
          padding: '8px 12px',
          background: '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 2H15L17 5H21C21.5523 5 22 5.44772 22 6V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V6C2 5.44772 2.44772 5 3 5H7L9 2Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        Save Image
      </button>
    </Html>
  );
}

export default function ProductConfigurator() {
  // Configuration state
  const [material, setMaterial] = useState('leather');
  const [color, setColor] = useState('#222');
  const [activeFeatures, setActiveFeatures] = useState(
    featureOptions.filter(f => f.default).map(f => f.id)
  );
  
  // Calculate total price
  const basePrice = 1000; // Base product price
  const materialPrice = materialOptions.find(m => m.id === material)?.price || 0;
  const colorPrice = colorOptions.find(c => c.color === color)?.price || 0;
  const featuresPrice = featureOptions
    .filter(f => activeFeatures.includes(f.id))
    .reduce((sum, feature) => sum + feature.price, 0);
  
  const totalPrice = basePrice + materialPrice + colorPrice + featuresPrice;
  
  // Toggle feature selection
  const toggleFeature = (featureId) => {
    setActiveFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />

        <Suspense fallback={null}>
          <ConfigurableModel 
            materialType={material}
            color={color}
            features={activeFeatures}
          />
          <Environment preset="apartment" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
          />
          <SnapshotButton />
        </Suspense>
        
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={5} maxDistance={15} />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
        width: '250px',
        background: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        padding: '16px',
        zIndex: 1000,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
          Configure Your Product
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Material</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {materialOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setMaterial(option.id)}
                style={{
                  padding: '8px 12px',
                  background: material === option.id ? '#3B82F6' : '#f5f5f5',
                  color: material === option.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {option.name} (+${option.price})
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Color</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colorOptions.map((option) => (
              <button
                key={option.color}
                onClick={() => setColor(option.color)}
                style={{
                  width: '32px',
                  height: '32px',
                  background: option.color,
                  border: color === option.color ? '3px solid #3B82F6' : '3px solid transparent',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'transform 0.1s',
                  transform: color === option.color ? 'scale(1.1)' : 'scale(1)',
                }}
                title={`${option.name} ${option.price > 0 ? '(+$' + option.price + ')' : ''}`}
              />
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Features</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {featureOptions.map((option) => (
              <label 
                key={option.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer' 
                }}
              >
                <input
                  type="checkbox"
                  checked={activeFeatures.includes(option.id)}
                  onChange={() => toggleFeature(option.id)}
                  style={{ marginRight: '8px' }}
                />
                {option.name} (+${option.price})
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
            ${totalPrice}
          </div>
          
          <button
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              background: '#4F46E5',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#4338CA'}
            onMouseOut={e => e.currentTarget.style.background = '#4F46E5'}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}`,
    price: 79.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#FFFFFF] to-[#F3F4F6]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/mLeF3KV.gif" alt="3D Configurator" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "E-commerce", "Configurator", "Product", "Interactive"],
    isNew: true,
    fileSize: "18.5 KB",
    is3D: true
  }
];

export default threeDComponents;
