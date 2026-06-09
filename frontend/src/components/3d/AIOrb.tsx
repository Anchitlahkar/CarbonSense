import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbMeshProps {
  isThinking: boolean;
  prefersReducedMotion: boolean;
}

const OrbMesh: React.FC<OrbMeshProps> = ({ isThinking, prefersReducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    timeRef.current += delta;
    if (!meshRef.current) return;

    meshRef.current.rotation.y += delta * (isThinking ? 1.6 : 0.4);
    meshRef.current.rotation.x += delta * (isThinking ? 0.8 : 0.2);

    // Dynamic breathing pulse based on state
    const pulse = isThinking
      ? 1.0 + Math.sin(timeRef.current * 6) * 0.15
      : 1.0 + Math.sin(timeRef.current * 1.5) * 0.05;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.0, 1]} />
      <meshStandardMaterial
        color={isThinking ? '#3B82F6' : '#22C55E'}
        wireframe={true}
        emissive={isThinking ? '#3B82F6' : '#22C55E'}
        emissiveIntensity={isThinking ? 0.8 : 0.3}
      />
    </mesh>
  );
};

export const AIOrb: React.FC<{ isThinking?: boolean }> = ({ isThinking = false }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={2.0} color="#3B82F6" />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#22C55E" />
        <OrbMesh isThinking={isThinking} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
};

export default AIOrb;
