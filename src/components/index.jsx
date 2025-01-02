"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Heart } from "lucide-react";
import { ACESFilmicToneMapping } from "three";

import Experience from "./Experience";
import Lights from "./Light";
import { OrbitControls } from "@react-three/drei";

const store = createXRStore();

const HomePage = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <main className="text-center">
          <h1 className="text-7xl font-bold text-gray-800 mb-12">Room Decor</h1>
          <button
            onClick={() => store.enterVR()}
            className="inline-block bg-blue-500 text-white font-medium py-2 px-6 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Launch VR
          </button>
        </main>
        <footer className="absolute bottom-4 text-gray-600 text-xs">
          <p className="flex items-center justify-center">
            Built with <Heart className="mx-1 text-red-500" size={12} /> using{" "}
            <a
              href="https://github.com/pmndrs/uikit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mx-1"
            >
              uikit
            </a>
            and{" "}
            <a
              href="https://github.com/pmndrs/xr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mx-1"
            >
              xr
            </a>
          </p>
        </footer>
      </div>

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
          <OrbitControls />
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
