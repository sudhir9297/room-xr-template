"use client";
import React from "react";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";

import Experience from "./Model/Experience";
import Lights from "./Light";
import FloatingUI from "./UI";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const HomePage = () => {
  return (
    <div className="relative w-screen h-screen">
      <button
        className="absolute bottom-2 right-2 z-20  bg-white py-2 px-4 rounded-md font-semibold "
        onClick={() => store.enterVR()}
      >
        Enter VR
      </button>
      <Canvas
        shadows
        camera={{ position: [5, 2, 10], fov: 45 }}
        gl={{ localClippingEnabled: true }}
      >
        <XR store={store}>
          <Experience />
          <FloatingUI />
          <Lights />
          <Perf position="top-left" />
        </XR>
      </Canvas>
    </div>
  );
};

export default HomePage;
