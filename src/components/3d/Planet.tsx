'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text, useTexture, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  id: string;
  name: string;
  radius: number;
  distance: number; 
  speed: number;    
  color: string;
  initialAngle: number;
  textureUrl: string;
  normalUrl?: string;
  hasRings?: boolean;
  ringColor?: string;
  isActive: boolean;
  onClick: (id: string, position: THREE.Vector3, radius: number) => void;
  onActivate: (id: string, position: THREE.Vector3, radius: number) => void;
}

export default function Planet({
  id,
  name,
  radius,
  distance,
  speed,
  color,
  initialAngle,
  textureUrl,
  normalUrl,
  hasRings,
  ringColor,
  isActive,
  onClick,
  onActivate,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  
  // Load textures from Drei (Suspense is required in parent)
  const [colorMap, normalMap] = useTexture([
    textureUrl, 
    normalUrl || textureUrl // fallback to color map if no normal map
  ]);

  useEffect(() => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = initialAngle;
    }
  }, [initialAngle]);

  // When this planet becomes active, calculate its exact current world position and notify the parent
  // so the camera can perfectly lock onto it no matter where it is in its orbit!
  useEffect(() => {
    if (isActive && meshRef.current) {
      const pos = new THREE.Vector3();
      meshRef.current.getWorldPosition(pos);
      onActivate(id, pos, radius);
    }
  }, [isActive, id, radius, onActivate]);

  const orbitPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
  }

  useFrame((state, delta) => {
    if (orbitGroupRef.current && !isActive) {
      orbitGroupRef.current.rotation.y += speed * delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.2 * delta;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isActive && meshRef.current) {
      const pos = new THREE.Vector3();
      meshRef.current.getWorldPosition(pos);
      onClick(id, pos, radius);
    }
  };

  return (
    <group>
      <Line 
        points={orbitPoints} 
        color="#ffffff" 
        lineWidth={1} 
        transparent
        opacity={isActive ? 0.6 : 0.2}
      />

      <group ref={orbitGroupRef}>
        <group position={[distance, 0, 0]}>
          
          {/* Billboard forces the text to always face the camera perfectly */}
          <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false} 
          >
            <Text
              position={[0, radius + 2.5, 0]}
              fontSize={1.8}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
              visible={!isActive}
            >
              {name}
            </Text>
          </Billboard>

          {/* Realistic Planet - Optimized Geometry */}
          <Sphere 
            ref={meshRef} 
            args={[radius, 32, 32]} 
            onClick={handleClick}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            <meshStandardMaterial 
              map={colorMap}
              normalMap={normalUrl ? normalMap : undefined}
              color={color} // Tint color
              roughness={0.5}
              metalness={0.2}
              emissive={color}
              emissiveIntensity={isActive ? 0.6 : 0.3}
            />
          </Sphere>

          {/* Atmosphere Glow - Optimized Geometry */}
          <Sphere args={[radius * 1.08, 24, 24]} visible={!hasRings}>
            <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
          </Sphere>

          {/* Rings - Optimized Geometry */}
          {hasRings && (
            <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[radius * 1.4, radius * 2.4, 32]} />
              <meshStandardMaterial 
                map={colorMap} 
                color={ringColor || color} 
                transparent 
                opacity={0.9} 
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}
