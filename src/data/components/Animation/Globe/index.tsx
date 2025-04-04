
import React from 'react';
import { ComponentItem } from "@/types/component";
import Globe from './GlobeComponent';

const GlobeComponentItem: ComponentItem = {
  id: 104,
  name: "3D Interactive Globe",
  description: "Interactive 3D globe with customizable markers and animations",
  category: "Animation",
  framework: "React",
  language: "TypeScript",
  tags: ["3D", "Globe", "Interactive", "Three.js", "Data Visualization"],
  isNew: true,
  is3D: true,
  component: () => <Globe />,
  code: `import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface LocationMarker {
  lat: number;
  lng: number;
  color?: string;
  size?: number;
  label?: string;
}

interface GlobeProps {
  markers?: LocationMarker[];
  globeColor?: string;
  highlightColor?: string;
  markerColor?: string;
  backgroundColor?: string;
  wireframe?: boolean;
  autoRotate?: boolean;
  showAtmosphere?: boolean;
  className?: string;
}

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

const GlobeSphere: React.FC<{
  wireframe?: boolean;
  globeColor?: string;
  highlightColor?: string;
  showAtmosphere?: boolean;
  autoRotate?: boolean;
  markers?: LocationMarker[];
}> = ({ 
  wireframe = false, 
  globeColor = '#1a66a0',
  highlightColor = '#4fb8e7',
  showAtmosphere = true,
  autoRotate = true,
  markers = [] 
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const markersGroupRef = useRef<THREE.Group>(null);
  
  // Create texture
  const texture = useRef(new THREE.CanvasTexture(createGlobeTexture(highlightColor)));
  
  function createGlobeTexture(highlightColor: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Fill with base color
    context.fillStyle = '#111827';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    context.strokeStyle = highlightColor;
    context.lineWidth = 0.5;
    context.globalAlpha = 0.3;
    
    // Parallels
    for (let i = 0; i <= 18; i++) {
      const y = i * (canvas.height / 18);
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
    
    // Meridians
    for (let i = 0; i <= 36; i++) {
      const x = i * (canvas.width / 36);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    
    return canvas;
  }
  
  useFrame((_, delta) => {
    if (autoRotate && sphereRef.current) {
      sphereRef.current.rotation.y += 0.05 * delta;
      
      if (markersGroupRef.current) {
        markersGroupRef.current.rotation.y += 0.05 * delta;
      }
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.copy(sphereRef.current!.rotation);
    }
  });
  
  useEffect(() => {
    // Update texture if highlight color changes
    texture.current = new THREE.CanvasTexture(createGlobeTexture(highlightColor));
  }, [highlightColor]);
  
  return (
    <>
      <group>
        {/* Globe */}
        <Sphere args={[1, 64, 64]} ref={sphereRef}>
          <meshPhongMaterial 
            color={globeColor} 
            wireframe={wireframe} 
            map={texture.current}
            transparent={true}
            opacity={0.9}
          />
        </Sphere>
        
        {/* Atmosphere */}
        {showAtmosphere && (
          <Sphere args={[1.02, 64, 64]} ref={atmosphereRef}>
            <meshPhongMaterial 
              color={highlightColor} 
              transparent={true}
              opacity={0.1}
              side={THREE.BackSide}
            />
          </Sphere>
        )}
        
        {/* Markers */}
        <group ref={markersGroupRef}>
          {markers.map((marker, idx) => {
            const position = latLngToVector3(marker.lat, marker.lng, 1.01);
            return (
              <mesh key={idx} position={position}>
                <sphereGeometry args={[marker.size || 0.02, 16, 16]} />
                <meshBasicMaterial color={marker.color || '#ff6b6b'} />
              </mesh>
            );
          })}
        </group>
      </group>
    </>
  );
};

const Globe: React.FC<GlobeProps> = ({
  markers = [],
  globeColor = '#1a66a0',
  highlightColor = '#4fb8e7',
  markerColor = '#ff6b6b',
  backgroundColor = 'transparent',
  wireframe = false,
  autoRotate = true,
  showAtmosphere = true,
  className = ''
}) => {
  // Process markers
  const processedMarkers = markers.map(marker => ({
    ...marker,
    color: marker.color || markerColor
  }));
  
  return (
    <div className={"w-full h-full " + className} style={{ background: backgroundColor }}>
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
        />
        <GlobeSphere 
          wireframe={wireframe}
          globeColor={globeColor}
          highlightColor={highlightColor}
          showAtmosphere={showAtmosphere}
          autoRotate={autoRotate}
          markers={processedMarkers}
        />
        <OrbitControls 
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          enableDamping
          dampingFactor={0.05}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

const GlobeDemo = () => {
  // Sample markers for major cities
  const markers: LocationMarker[] = [
    { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.03, color: "#ff6b6b" },
    { lat: 51.5074, lng: -0.1278, label: "London", size: 0.03, color: "#4ecdc4" },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.03, color: "#ffbe0b" },
    { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.03, color: "#8338ec" },
    { lat: -23.5505, lng: -46.6333, label: "São Paulo", size: 0.03, color: "#ff006e" },
    { lat: 19.4326, lng: -99.1332, label: "Mexico City", size: 0.03, color: "#3a86ff" },
    { lat: 37.7749, lng: -122.4194, label: "San Francisco", size: 0.03, color: "#8ac926" },
    { lat: 55.7558, lng: 37.6173, label: "Moscow", size: 0.03, color: "#fb5607" }
  ];
  
  return (
    <div className="w-full h-[500px] flex flex-col">
      <Globe
        markers={markers}
        globeColor="#1e40af"
        highlightColor="#60a5fa"
        showAtmosphere={true}
        autoRotate={true}
        className="w-full h-full rounded-xl overflow-hidden"
      />
    </div>
  );
};

export default GlobeDemo;`
};

export default GlobeComponentItem;
