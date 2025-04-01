
import React from 'react';
import { ComponentItem } from "@/types/component";

const ParticleSystemComponent: ComponentItem = {
  id: 104,
  name: "3D Particle System",
  category: "3D",
  framework: "React Three Fiber",
  description: "GPU-accelerated particle system for creating stunning visual effects like fire, smoke, and magical auras",
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
    return new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false
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
  tags: ["3D", "Particles", "Animation", "Effects", "GPU"],
  isNew: true,
  fileSize: "15.2 KB",
  price: "49.99",
  is3D: true
};

export default ParticleSystemComponent;
