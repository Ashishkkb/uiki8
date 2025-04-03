
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';

interface ParticleSystemProps {
  particleCount?: number;
  particleSize?: number;
  color?: string;
  interactiveMode?: 'attract' | 'repel' | 'swirl' | 'wave';
  speed?: number;
  onLoad?: () => void;
  isInCanvas?: boolean;
}

// Custom hook for interactive mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
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

// Controls UI component
function ParticleControls({ 
  interactiveMode, 
  setInteractiveMode,
  speed,
  setSpeed,
  particleCount,
  setParticleCount,
  particleSize,
  setParticleSize
}: any) {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-lg text-white">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span>Mode:</span>
          <select 
            value={interactiveMode}
            onChange={(e) => setInteractiveMode(e.target.value)}
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
  );
}

function ParticleField({ 
  particleCount = 1000, 
  particleSize = 0.05,
  color = "#4f46e5",
  interactiveMode = "attract",
  speed = 0.5,
  isInCanvas 
}: ParticleSystemProps) {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [originalPositions, setOriginalPositions] = useState<Float32Array | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useMousePosition();
  const texture = useTexture("/placeholder.svg");
  
  // Generate initial particle positions
  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    const original = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Create a sphere distribution
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const radius = 2 + Math.random() * 1.5;
      
      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);
      
      // Store original positions for wave effect
      original[i3] = positions[i3];
      original[i3 + 1] = positions[i3 + 1];
      original[i3 + 2] = positions[i3 + 2];
    }
    
    setPositions(positions);
    setOriginalPositions(original);
  }, [particleCount]);
  
  // Animation and interaction logic
  useFrame(({ clock }) => {
    if (!pointsRef.current || !positions || !originalPositions) return;
    
    const time = clock.getElapsedTime() * speed;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    
    // Update each particle position based on interactive mode
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let x = positionAttribute.array[i3];
      let y = positionAttribute.array[i3 + 1];
      let z = positionAttribute.array[i3 + 2];
      
      // Calculate distance to mouse cursor
      const dx = x - mousePos.x;
      const dy = y - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const originalX = originalPositions[i3];
      const originalY = originalPositions[i3 + 1];
      const originalZ = originalPositions[i3 + 2];
      
      // Apply different effects based on interactive mode
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
          // Create wave effect from original positions
          const waveX = originalX + Math.sin(time + originalX * 0.5) * 0.2 * speed;
          const waveY = originalY + Math.sin(time + originalY * 0.5) * 0.2 * speed;
          const waveZ = originalZ + Math.sin(time + originalZ * 0.5) * 0.2 * speed;
          
          x = x * 0.95 + waveX * 0.05;
          y = y * 0.95 + waveY * 0.05;
          z = z * 0.95 + waveZ * 0.05;
          break;
      }
      
      // Always apply a tiny bit of movement for liveliness
      x += (Math.random() - 0.5) * 0.005 * speed;
      y += (Math.random() - 0.5) * 0.005 * speed;
      z += (Math.random() - 0.5) * 0.005 * speed;
      
      // Update position
      positionAttribute.array[i3] = x;
      positionAttribute.array[i3 + 1] = y;
      positionAttribute.array[i3 + 2] = z;
    }
    
    positionAttribute.needsUpdate = true;
  });
  
  // Return null until positions are calculated
  if (!positions) return null;
  
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

// Interactive ParticleSystemScene component
function ParticleSystemScene({
  particleCount: initialParticleCount = 1000,
  particleSize: initialParticleSize = 0.05,
  color = "#4f46e5",
  interactiveMode: initialMode = "attract",
  speed: initialSpeed = 0.5,
  isInCanvas = false
}: ParticleSystemProps) {
  const [interactiveMode, setInteractiveMode] = useState<'attract' | 'repel' | 'swirl' | 'wave'>(
    initialMode as 'attract' | 'repel' | 'swirl' | 'wave'
  );
  const [speed, setSpeed] = useState(initialSpeed);
  const [particleCount, setParticleCount] = useState(initialParticleCount);
  const [particleSize, setParticleSize] = useState(initialParticleSize);
  
  // Animated camera position for initial reveal
  const { position } = useSpring({
    from: { position: [0, 0, 8] },
    to: { position: [0, 0, 5] },
    config: config.molasses,
  });
  
  if (isInCanvas) {
    return (
      <ParticleField
        particleCount={particleCount}
        particleSize={particleSize}
        color={color}
        interactiveMode={interactiveMode}
        speed={speed}
        isInCanvas={true}
      />
    );
  }

  return (
    <>
      <animated.perspectiveCamera
        position={position as any}
        fov={50}
      />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <ParticleField
        particleCount={particleCount}
        particleSize={particleSize}
        color={color}
        interactiveMode={interactiveMode}
        speed={speed}
      />
      
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Interactive Particle System
      </Text>
      
      {/* Controls display in 3D space */}
      <group position={[0, -2.5, 0]}>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Mode: {interactiveMode}
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Particles: {particleCount}
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Move your mouse to interact with particles
        </Text>
      </group>
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
        rotateSpeed={0.4}
      />
    </>
  );
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 1000,
  particleSize = 0.05,
  color = "#4f46e5",
  interactiveMode = "attract",
  speed = 0.5,
  onLoad,
  isInCanvas = false
}) => {
  const [mode, setMode] = useState<'attract' | 'repel' | 'swirl' | 'wave'>(
    interactiveMode as 'attract' | 'repel' | 'swirl' | 'wave'
  );
  const [particleSpeed, setParticleSpeed] = useState(speed);
  const [count, setCount] = useState(particleCount);
  const [size, setSize] = useState(particleSize);
  
  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);
  
  if (isInCanvas) {
    return <ParticleSystemScene isInCanvas={true} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ParticleSystemScene 
          particleCount={count}
          particleSize={size}
          color={color}
          interactiveMode={mode}
          speed={particleSpeed}
        />
      </Canvas>
      
      <ParticleControls
        interactiveMode={mode}
        setInteractiveMode={setMode}
        speed={particleSpeed}
        setSpeed={setParticleSpeed}
        particleCount={count}
        setParticleCount={setCount}
        particleSize={size}
        setParticleSize={setSize}
      />
    </div>
  );
};

export default ParticleSystem;
