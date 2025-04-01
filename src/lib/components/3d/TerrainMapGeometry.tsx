
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TerrainMapGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const width = 20;
  const height = 20;
  const widthSegments = 64;
  const heightSegments = 64;
  
  // Generate terrain data
  const { positions, normals, indices, uvs } = useMemo(() => {
    const positions: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];
    
    // Generate grid with simple noise for elevation
    for (let i = 0; i <= heightSegments; i++) {
      const y = (i / heightSegments) * height - height / 2;
      
      for (let j = 0; j <= widthSegments; j++) {
        const x = (j / widthSegments) * width - width / 2;
        
        // Simple noise function
        const z = Math.sin(j * 0.1) * Math.cos(i * 0.1) * 0.5 + 
                 Math.sin(j * 0.4) * Math.cos(i * 0.3) * 0.25;
        
        positions.push(x, z, y);
        normals.push(0, 1, 0);
        uvs.push(j / widthSegments, i / heightSegments);
        
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
      indices: new Uint32Array(indices),
      uvs: new Float32Array(uvs)
    };
  }, []);

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
    if (meshRef.current && meshRef.current.geometry) {
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
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
};

export default TerrainMapGeometry;
