import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface EarthMeshProps {
  scenario: 'current' | 'optimized' | 'aggressive';
  prefersReducedMotion: boolean;
}

// Procedurally generate a high-tech data grid canvas texture for continents
function createScientificEarthTexture(scenario: 'current' | 'optimized' | 'aggressive'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background - Deep Ocean
  ctx.fillStyle = '#050A0E';
  ctx.fillRect(0, 0, 1024, 512);

  // Colors for continental data grids
  const baseGridColor = 
    scenario === 'current' ? 'rgba(239, 68, 68, 0.25)' :
    scenario === 'optimized' ? 'rgba(59, 130, 246, 0.25)' :
    'rgba(34, 197, 94, 0.25)';

  const activeNodeColor = 
    scenario === 'current' ? '#EF4444' :
    scenario === 'optimized' ? '#3B82F6' :
    '#22C55E';

  // Draw simplified world continent boundaries as a grid of sci-fi telemetry dots
  const drawContinentBlob = (cx: number, cy: number, rx: number, ry: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw dot matrix inside continent
    const step = 8;
    for (let x = cx - rx; x < cx + rx; x += step) {
      for (let y = cy - ry; y < cy + ry; y += step) {
        if (ctx.isPointInPath(x, y)) {
          ctx.fillStyle = Math.random() > 0.85 ? activeNodeColor : baseGridColor;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  };

  // North America
  drawContinentBlob(280, 180, 120, 80);
  // South America
  drawContinentBlob(360, 340, 70, 110);
  // Greenland
  drawContinentBlob(380, 80, 50, 35);
  // Eurasia / Africa
  drawContinentBlob(620, 160, 180, 100);
  drawContinentBlob(580, 290, 80, 90);
  // Australia
  drawContinentBlob(820, 360, 60, 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

const EarthMesh: React.FC<EarthMeshProps> = ({ scenario, prefersReducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Generate texture on scenario change
  const earthTexture = useMemo(() => createScientificEarthTexture(scenario), [scenario]);

  const config = useMemo(() => {
    const isCurrent = scenario === 'current';
    const isOptimized = scenario === 'optimized';
    
    return {
      rotationSpeed: prefersReducedMotion ? 0 : (isCurrent ? 0.12 : isOptimized ? 0.08 : 0.05),
      cloudSpeed: prefersReducedMotion ? 0 : (isCurrent ? -0.15 : isOptimized ? -0.1 : -0.06),
      atmosphereColor: isCurrent ? '#EF4444' : isOptimized ? '#3B82F6' : '#22C55E',
      atmosphereOpacity: isCurrent ? 0.55 : isOptimized ? 0.4 : 0.25, // Current scenario has dense atmospheric carbon haze
    };
  }, [scenario, prefersReducedMotion]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * config.cloudSpeed;
      cloudRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group>
      {/* 1. Base Core Physical Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
          metalness={0.1}
          bumpScale={0.02}
        />
      </mesh>
      
      {/* 2. Cloud and Weather Vector Layer */}
      <mesh ref={cloudRef} scale={1.03}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <meshStandardMaterial
          color={config.atmosphereColor}
          transparent={true}
          opacity={0.12}
          wireframe={true}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Volumetric Sci-fi Atmosphere Shell */}
      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial
          color={config.atmosphereColor}
          transparent={true}
          opacity={config.atmosphereOpacity}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 4. Outer Haze Layer */}
      <mesh scale={1.15}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color={config.atmosphereColor}
          transparent={true}
          opacity={config.atmosphereOpacity * 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
  );
};

export const PlanetTwinScene: React.FC<{ scenario: 'current' | 'optimized' | 'aggressive' }> = ({ scenario }) => {
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div className="w-full h-full relative min-h-[280px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-label={`3D simulated scientific globe rendering the ${scenario} trajectory.`}
      >
        <ambientLight intensity={0.4} />
        {/* Core Sunlight light source */}
        <directionalLight position={[5, 3, 5]} intensity={1.8} color="#FFFFFF" />
        {/* Back scatter light */}
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color={
          scenario === 'current' ? '#EF4444' :
          scenario === 'optimized' ? '#3B82F6' :
          '#22C55E'
        } />
        
        {!prefersReducedMotion && (
          <Stars 
            radius={100} 
            depth={50} 
            count={600} 
            factor={4} 
            saturation={0.5} 
            fade 
            speed={prefersReducedMotion ? 0 : 0.2} 
          />
        )}
        <EarthMesh scenario={scenario} prefersReducedMotion={prefersReducedMotion} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default PlanetTwinScene;
