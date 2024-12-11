"use client";

import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </div>
  );
}
