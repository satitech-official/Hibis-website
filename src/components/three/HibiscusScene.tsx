// @ts-nocheck -- Three v0.185 ships without bundled declarations in this starter.
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function PetalCluster() {
  const groupRef = useRef<THREE.Group>(null);

  const petals = useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => ({
      angle: (index / 5) * Math.PI * 2,
      scale: 0.85 + index * 0.08,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.22;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {petals.map((petal, index) => (
        <mesh
          key={index}
          rotation={[Math.PI / 2.8, 0, petal.angle]}
          position={[Math.cos(petal.angle) * 0.46, Math.sin(petal.angle) * 0.46, 0]}
          scale={[petal.scale, petal.scale * 0.58, petal.scale]}
        >
          <sphereGeometry args={[0.6, 48, 48]} />
          <MeshTransmissionMaterial
            color="#b8893e"
            thickness={0.35}
            roughness={0.2}
            transmission={0.95}
            ior={1.18}
            chromaticAberration={0.03}
            backside
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#d7bd85" emissive="#c99c4b" emissiveIntensity={0.55} />
      </mesh>
    </group>
  );
}

export function HibiscusScene() {
  return (
    <div className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[440px] lg:w-[440px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 2, 3]} intensity={1.8} color="#d6ad63" />
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.5}>
          <PetalCluster />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
