"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { ACESFilmicToneMapping } from "three";

import Experience from "./Experience";
import Lights from "./Light";
import InitialPage from "./InitialPage";

const store = createXRStore({
  controller: {
    touchPointer: false,
    grabPointer: false,
    rayPointer: {
      minDistance: 0,
    },
  },
  hand: {
    touchPointer: false,
    grabPointer: false,
    rayPointer: {
      minDistance: 0,
    },
  },
});

const HomePage = () => {
  return (
    <div className="relative w-screen h-screen">
      <InitialPage store={store} />

      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [12, 1.6, 12], fov: 60 }}
        gl={{
          localClippingEnabled: true,
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={["#b1e1ff"]} />
        <Suspense fallback={null}>
          <Lights />
          <XR store={store}>
            <Experience />
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HomePage;
