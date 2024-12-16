"use client";
import React, { Suspense } from "react";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Grid, OrbitControls } from "@react-three/drei";

import Experience from "./Scene/Experience";
import Lights from "./Light";
import { Leva } from "leva";

const store = createXRStore({
  hand: { teleportPointer: false },
  controller: { teleportPointer: false },
});

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
        shadows
        camera={{ position: [30, 20, 30], fov: 45 }}
        gl={{ localClippingEnabled: true }}
      >
        <Suspense fallback={null}>
          <Grid
            args={[300, 300]}
            sectionColor={"lightgray"}
            cellColor={"gray"}
            position={[0, -0.99, 0]}
            userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
          />
          <Perf position="top-left" />
          <Lights />
          <OrbitControls />
          <XR store={store}>
            <Experience />
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HomePage;
