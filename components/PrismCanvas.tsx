"use client"
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Child component that handles rotation within Canvas context
function RotatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  // Slow rotation animation matching 30 s per full rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = (2 * Math.PI) / 30; // radians per second
      meshRef.current.rotation.y += rotationSpeed * delta;
      meshRef.current.rotation.x += (rotationSpeed / 2) * delta;
    }
  });
  return (
    <mesh ref={meshRef}>
      {/* Tetrahedron geometry; you can swap for OctahedronGeometry or custom buffer geometry */}
      <tetrahedronGeometry args={[1.5]} />
      <primitive
        object={
          new THREE.MeshPhysicalMaterial({
            transmission: 0.9,
            thickness: 0.5,
            roughness: 0.1,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            envMapIntensity: 1,
            color: new THREE.Color('white'),
          })
        }
      />
    </mesh>
  );
}

export default function PrismCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* Environment provides reflections */}
      {/* <Environment preset="studio" /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingMesh />
    </Canvas>
  );
}
