import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { usePhysicsObjects } from "@/hooks/usePhysicsHooks";
import { usePickObject } from "@/hooks/usePickObject";
import { useThree } from "@react-three/fiber";

import { useModelStore } from "@/Store";

export default function Slope() {
  const { selectedObjectName, selectedObjectData, currentTexture } =
    useModelStore();

  const slopePlane = useGLTF("./slope.glb");
  const { addPhysics } = usePhysicsObjects();

  const { scene: Scene } = useThree();
  const TextureLoader = new THREE.TextureLoader();
  TextureLoader.setCrossOrigin("*");

  useEffect(() => {
    if (!currentTexture) return;

    Scene.traverse((obj) => {
      if (selectedObjectName === obj.name && obj.type === "Mesh") {
        if (currentTexture.map) {
          const albedoMap = TextureLoader.load(currentTexture.map);
          albedoMap.repeat.set(currentTexture.repeatX, currentTexture.repeatY);
          albedoMap.wrapS = THREE.RepeatWrapping;
          albedoMap.wrapT = THREE.RepeatWrapping;
          albedoMap.colorSpace = THREE.SRGBColorSpace;
          obj.material.map = albedoMap;
        }
        obj.material.color = new THREE.Color(
          currentTexture.color
        ).convertSRGBToLinear();
        obj.material.needsUpdate = true;
      }
    });

    return () => {};
  }, [currentTexture]);

  useEffect(() => {
    slopePlane.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;
        child.side = 2;

        const name = child.name?.split("_") || [];

        if (name.includes("ignore")) {
          child.pointerEvents = "none";
        } else {
        }

        if (name[0] === "trimesh") {
          const type = name[1];
          const autoAnimate = type === "dynamic" ? true : false;
          addPhysics(child, type, null, autoAnimate, null, null);
          return;
        }
      }
    });
  }, []);

  const bind = usePickObject();

  return (
    <group {...bind}>
      <primitive object={slopePlane.scene} />
    </group>
  );
}
