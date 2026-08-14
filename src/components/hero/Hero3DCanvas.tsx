"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function RedParticleField() {
  const ref = useRef<THREE.Points>(null!);

  // Generate 800 lightweight particles in spherical layout
  const count = 800;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 6 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#DB4338"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#DB4338" intensity={1.5} />
        <RedParticleField />
      </Canvas>
    </div>
  );
}
