"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { useHairStore } from "@/hooks/useHairStore";

function HairMesh() {
  const { selectedColor } = useHairStore();
  const color = useMemo(() => selectedColor, [selectedColor]);

  return (
    <mesh position={[0, 1.2, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

function Mannequin() {
  return (
    <mesh>
      <cylinderGeometry args={[0.8, 1, 2.4, 32]} />
      <meshStandardMaterial color="#f2d7c7" roughness={0.7} />
    </mesh>
  );
}

export function ThreeMannequin() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-900/70 shadow-inner dark:border-slate-800">
      <Canvas camera={{ position: [3, 3, 4] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} />
        <Suspense fallback={null}>
          <group>
            <Mannequin />
            <HairMesh />
          </group>
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}

