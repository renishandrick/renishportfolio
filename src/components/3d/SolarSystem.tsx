'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, CameraControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Planet from './Planet';

interface SolarSystemProps {
  activeSection: string;
  onPlanetSelect: (id: string) => void;
}

const BASE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets';

// Using optimized 2K textures to completely eliminate lag on mobile devices and low-end GPUs
const PLANETS = [
  { id: 'hero', name: 'Home Base', radius: 3.5, distance: 20, speed: 0.15, color: '#ffffff', textureUrl: `${BASE_URL}/earth_atmos_2048.jpg`, normalUrl: `${BASE_URL}/earth_normal_2048.jpg`, initialAngle: Math.PI * 0.2 },
  { id: 'projects', name: 'Projects', radius: 5.5, distance: 38, speed: 0.08, color: '#fef08a', textureUrl: `${BASE_URL}/earth_clouds_1024.png`, hasRings: true, initialAngle: Math.PI * 0.8 },
  { id: 'experience', name: 'Experience', radius: 4, distance: 56, speed: 0.05, color: '#ef4444', textureUrl: `${BASE_URL}/earth_atmos_2048.jpg`, initialAngle: Math.PI * 1.4 },
  { id: 'education', name: 'Education', radius: 4.5, distance: 74, speed: 0.04, color: '#fbcfe8', textureUrl: `${BASE_URL}/earth_atmos_2048.jpg`, initialAngle: Math.PI * 1.9 },
  { id: 'skills', name: 'Skills', radius: 3, distance: 92, speed: 0.03, color: '#60a5fa', textureUrl: `${BASE_URL}/earth_atmos_2048.jpg`, initialAngle: Math.PI * 0.5 },
  { id: 'contact', name: 'Comm Link', radius: 3.5, distance: 110, speed: 0.02, color: '#94a3b8', textureUrl: `${BASE_URL}/earth_atmos_2048.jpg`, initialAngle: Math.PI * 1.1 }, // Removed rings and made realistic grey
];

function BlackHole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Event Horizon (Pitch Black) */}
      <mesh>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Accretion Disk */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[15, 25, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[25, 35, 64]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[16, 32, 32]} />
        <meshBasicMaterial color="#7c2d12" transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.BackSide}/>
      </mesh>
    </group>
  );
}

function Scene({ activeSection, onPlanetSelect }: SolarSystemProps) {
  const cameraControlsRef = useRef<CameraControls>(null);

  // Initial camera setup
  useEffect(() => {
    if (cameraControlsRef.current) {
      if (activeSection === 'galaxy') {
        cameraControlsRef.current.setLookAt(0, 80, 140, 0, 0, 0, true);
      }
    }
  }, [activeSection]);

  const handlePlanetClick = (id: string, position: THREE.Vector3, radius: number) => {
    if (activeSection === id) return;
    
    if (cameraControlsRef.current) {
      // Dynamically calculate camera distance based on planet radius to perfectly frame it
      // For a radius of 5.5, dist = 5.5 * 6 = 33 units away.
      const dist = radius * 6;
      
      const offset = position.clone().normalize().multiplyScalar(dist);
      // Offset Y so the camera is slightly higher, looking down, which pushes the planet to the bottom of the screen
      // so it doesn't overlap with the central HTML UI text.
      offset.y += radius * 1.5; 
      
      const targetCamPos = position.clone().add(offset);
      
      cameraControlsRef.current.setLookAt(
        targetCamPos.x, targetCamPos.y, targetCamPos.z,
        position.x, position.y + (radius * 0.5), position.z,
        true
      );
    }
    onPlanetSelect(id);
  };

  return (
    <>
      <CameraControls 
        ref={cameraControlsRef} 
        maxDistance={300} 
        minDistance={5} 
        smoothTime={0.8}
        azimuthRotateSpeed={0.5}
        polarRotateSpeed={0.5}
      />
      
      <ambientLight intensity={1.5} />
      <directionalLight position={[100, 100, 50]} intensity={2} color="#ffffff" />
      <directionalLight position={[-100, -100, -50]} intensity={0.5} color="#ffffff" />
      
      {/* Background Parallax: Only stars and deep-space objects move. 
          This creates a massive 3D depth effect while keeping planet world coordinates 100% stable for the camera. */}
      <ParallaxGroup activeSection={activeSection}>
        <Stars radius={150} depth={100} count={3000} factor={6} saturation={0.5} fade speed={1.5} />
        <BlackHole position={[-140, 40, -180]} />
      </ParallaxGroup>

      {/* Foreground System: No parallax applied so click-targeting works flawlessly */}
      <group>
        {/* The Sun */}
        <group>
          <mesh>
            <sphereGeometry args={[7, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
            <pointLight intensity={5} color="#fef08a" distance={300} decay={1.5} />
          </mesh>
          <mesh>
            <sphereGeometry args={[7.5, 32, 32]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh>
            <sphereGeometry args={[9, 24, 24]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
          <Sparkles count={100} scale={22} size={15} speed={0.4} opacity={0.8} color="#fef08a" />
        </group>

        {/* Orbiting Planets */}
        <Suspense fallback={null}>
          {PLANETS.map((planet) => (
            <Planet
              key={planet.id}
              {...planet}
              isActive={activeSection === planet.id}
              onClick={handlePlanetClick}
            />
          ))}
        </Suspense>
      </group>
    </>
  );
}

// Parallax Wrapper Component
import { useFrame } from '@react-three/fiber';
function ParallaxGroup({ children, activeSection }: { children: React.ReactNode, activeSection: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (activeSection === 'galaxy' && groupRef.current) {
      // Much more subtle parallax to avoid making planets hard to click
      const targetX = (state.pointer.x * Math.PI) / 32;
      const targetY = (state.pointer.y * Math.PI) / 32;
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 2, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 2, delta);
    } else if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 3, delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function SolarSystemWrapper({ activeSection, onPlanetSelect }: SolarSystemProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030305] cursor-crosshair">
      {/* Optimized Canvas for devices: Limits DPR to max 1.5 to eliminate lag on heavy phones */}
      <Canvas camera={{ position: [0, 60, 110], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Scene activeSection={activeSection} onPlanetSelect={onPlanetSelect} />
      </Canvas>
    </div>
  );
}
