"use client";
import React, { Suspense } from "react";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";

import Experience from "./Scene/Experience";
import Lights from "./Light";
import { Leva } from "leva";
import { ACESFilmicToneMapping } from "three";

const store = createXRStore();

const HomePage = () => {
  return (
    <div className="relative w-screen h-screen">
      <button
        className="absolute bottom-2 right-2 z-20  bg-white py-2 px-4 rounded-md  "
        onClick={() => store.enterVR()}
      >
        Enter VR
      </button>
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [50, 50, 50], fov: 45 }}
        gl={{
          localClippingEnabled: true,
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={["#303030"]} />
        <Suspense fallback={null}>
          <Perf position="top-left" />
          <Lights />
          {/* <OrbitControls /> */}
          <XR store={store}>
            <Experience />
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HomePage;
