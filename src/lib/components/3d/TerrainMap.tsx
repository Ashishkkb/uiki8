
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

function Terrain({ width = 20, height = 20, widthSegments = 64, heightSegments = 64, ...props }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Generate terrain data
  const { positions, normals, indices } = useMemo(() => {
    const positions: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];
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
    const uvs: number[] = [];
    
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
    
    if (context) {
      // Create gradient for terrain colors
      const gradient = context.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, '#3A8C38'); // Mountain top (green)
      gradient.addColorStop(0.4, '#5D783E'); // Forest (dark green)
      gradient.addColorStop(0.7, '#D2B98B'); // Low lands (light brown)
      gradient.addColorStop(1, '#81A1C1'); // Water (blue)
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    
    return texture;
  }, []);

  // Add normals for better lighting
  useFrame(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      geometry.computeVertexNormals();
    }
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
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-uv"
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

function generateNoise(width: number, height: number) {
  const noise: number[] = [];
  
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
}
