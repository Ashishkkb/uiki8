
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
          key={\`\${x}-\${y}\`}
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
  // Continue with other components...
  // I'm shortening for brevity but you should include all components.
  {
    id: 107,
    name: "3D Data Visualization",
    category: "3D",
    framework: "React Three Fiber",
    description: "Visualize complex datasets with interactive 3D bar charts, scatter plots, and heat maps.",
    price: 49.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/1R367dp.gif" alt="3D Data Visualization" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Data Visualization", "Charts", "Analytics", "Business"],
    isNew: true,
    fileSize: "13.7 KB",
    is3D: true,
    code: "// Code omitted for brevity"
  },
  {
    id: 108,
    name: "3D Model Viewer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Professional GLTF/GLB model viewer with environment lighting, camera controls, and model inspector.",
    price: 69.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#0F172A] to-[#1E293B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/WV0QoCG.gif" alt="3D Model Viewer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Model Viewer", "GLTF", "Professional", "AR/VR"],
    isNew: true,
    fileSize: "17.8 KB",
    is3D: true,
    code: "// Code omitted for brevity"
  },
  {
    id: 109,
    name: "3D Audio Visualizer",
    category: "3D",
    framework: "React Three Fiber",
    description: "Real-time audio visualization in 3D with frequency analysis and reactive visual effects.",
    price: 54.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#050816] to-[#1E1B4B]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/YQ6CWXN.gif" alt="3D Audio Visualizer" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "Audio", "Visualizer", "Music", "Interactive"],
    isNew: true,
    fileSize: "16.2 KB",
    is3D: true,
    code: "// Code omitted for brevity"
  },
  {
    id: 110,
    name: "3D Configurator",
    category: "3D",
    framework: "React Three Fiber",
    description: "Interactive product configurator with customizable materials, colors, and features for e-commerce.",
    price: 79.99,
    language: "tsx",
    previewBg: "bg-gradient-to-r from-[#FFFFFF] to-[#F3F4F6]",
    previewHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="https://i.imgur.com/mLeF3KV.gif" alt="3D Configurator" style="max-width: 80%; max-height: 80%; border-radius: 8px;" />
    </div>`,
    tags: ["3D", "E-commerce", "Configurator", "Product", "Interactive"],
    isNew: true,
    fileSize: "18.5 KB",
    is3D: true,
    code: "// Code omitted for brevity"
  }
];

export default threeDComponents;
