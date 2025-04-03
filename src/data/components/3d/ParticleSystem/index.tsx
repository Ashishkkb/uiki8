import React from 'react';
import { ComponentItem } from "@/types/component";
import { ParticleSystem } from "@/lib/components/3d";

const ParticleSystemComponent: ComponentItem = {
  id: 104,
  name: "Interactive Particle System",
  category: "3D",
  framework: "React Three Fiber",
  description: "An advanced interactive particle system with real-time controls and physics. Users can interact with particles using different behavior modes.",
  code: `import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ 
  particleCount = 1000, 
  particleSize = 0.05,
  color = "#4f46e5",
  interactiveMode = "attract",
  speed = 0.5
}) {
  const pointsRef = useRef();
  const mousePos = useMousePosition();
  
  // Animation and interaction logic
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const time = clock.getElapsedTime() * speed;
    const positionAttribute = pointsRef.current.geometry.getAttribute('position');
    
    // Update each particle based on interactive mode
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let x = positionAttribute.array[i3];
      let y = positionAttribute.array[i3 + 1];
      let z = positionAttribute.array[i3 + 2];
      
      // Calculate distance to mouse
      const dx = x - mousePos.x;
      const dy = y - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply interaction effect based on mode
      switch(interactiveMode) {
        case "attract":
          if (distance < 2) {
            x += dx * -0.02 * speed;
            y += dy * -0.02 * speed;
          }
          break;
        case "repel":
          if (distance < 2) {
            x += dx * 0.02 * speed;
            y += dy * 0.02 * speed;
          }
          break;
        case "swirl":
          if (distance < 2) {
            const angle = time * 0.5;
            const swirl = 0.04 * speed / (distance + 0.1);
            x += Math.cos(angle) * swirl * dy;
            y += Math.sin(angle) * swirl * dx;
          }
          break;
        case "wave":
          const waveX = originalPositions[i3] + Math.sin(time + originalPositions[i3] * 0.5) * 0.2 * speed;
          const waveY = originalPositions[i3 + 1] + Math.sin(time + originalPositions[i3 + 1] * 0.5) * 0.2 * speed;
          const waveZ = originalPositions[i3 + 2] + Math.sin(time + originalPositions[i3 + 2] * 0.5) * 0.2 * speed;
          
          x = x * 0.95 + waveX * 0.05;
          y = y * 0.95 + waveY * 0.05;
          z = z * 0.95 + waveZ * 0.05;
          break;
      }
      
      // Update position
      positionAttribute.array[i3] = x;
      positionAttribute.array[i3 + 1] = y;
      positionAttribute.array[i3 + 2] = z;
    }
    
    positionAttribute.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color={color}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={texture}
      />
    </points>
  );
}

// Custom hook for interactive mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      // Convert screen coordinates to normalized device coordinates
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Project to 3D space
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      setMousePosition({ x: pos.x, y: pos.y });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [camera]);
  
  return mousePosition;
}

export default function ParticleSystem(props) {
  const [mode, setMode] = useState("attract");
  const [speed, setSpeed] = useState(0.5);
  const [particleCount, setParticleCount] = useState(1000);
  const [particleSize, setParticleSize] = useState(0.05);
  
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas>
        <ParticleField 
          particleCount={particleCount}
          particleSize={particleSize}
          interactiveMode={mode}
          speed={speed}
          color={props.color || "#4f46e5"}
        />
        <OrbitControls />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-lg text-white">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Mode:</span>
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="bg-gray-700 rounded px-2 py-1"
            >
              <option value="attract">Attract</option>
              <option value="repel">Repel</option>
              <option value="swirl">Swirl</option>
              <option value="wave">Wave</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Speed:</span>
            <input 
              type="range" 
              min="0.1" 
              max="2" 
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span>Size:</span>
            <input 
              type="range" 
              min="0.01" 
              max="0.2" 
              step="0.01"
              value={particleSize}
              onChange={(e) => setParticleSize(parseFloat(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span>Count:</span>
            <input 
              type="range" 
              min="100" 
              max="2000" 
              step="100"
              value={particleCount}
              onChange={(e) => setParticleCount(parseInt(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  component: ParticleSystem,
  tags: ["3D", "interactive", "animation", "particles", "physics", "WebGL"],
  is3D: true,
  isNew: true,
  fileSize: "5.8 KB",
  complexity: "complex",
  price: "49.99",
  dependencies: ["@react-three/fiber", "@react-three/drei", "three", "@react-spring/three"]
};

export default ParticleSystemComponent;
