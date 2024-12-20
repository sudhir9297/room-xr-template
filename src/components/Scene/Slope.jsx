import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { usePhysicsObjects } from "@/hooks/usePhysicsHooks";
import { usePickObject } from "@/hooks/usePickObject";
import { useFrame, useThree } from "@react-three/fiber";
import { useRayPointer, useXRInputSourceEvent } from "@react-three/xr";
import { useModelStore } from "@/Store";

export default function Slope() {
  const groupRef = useRef();
  const { selectedObject, currentVariation } = useModelStore();

  const slopePlane = useGLTF("./slope.glb");
  const { addPhysics } = usePhysicsObjects();

  const { scene: Scene } = useThree();
  const TextureLoader = new THREE.TextureLoader();
  TextureLoader.setCrossOrigin("*");

  useEffect(() => {
    if (!currentVariation) return;

    Scene.traverse((obj) => {
      Object.entries(currentVariation.varData).forEach(([name, data]) => {
        if (name === obj.name && obj.type === "Mesh") {
          if (data.map) {
            const albedoMap = TextureLoader.load(data.map);
            albedoMap.repeat.set(data.repeatX, data.repeatY);
            albedoMap.wrapS = THREE.RepeatWrapping;
            albedoMap.wrapT = THREE.RepeatWrapping;
            albedoMap.colorSpace = THREE.SRGBColorSpace;
            obj.material.map = albedoMap;
          }
          obj.material.color = new THREE.Color(
            data.color
          ).convertSRGBToLinear();
          obj.material.needsUpdate = true;
        }
      });
    });

    return () => {};
  }, [currentVariation]);

  const ApplyVariation = () => {};

  useEffect(() => {
    slopePlane.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;

        const name = child.name?.split("_") || [];

        if (name.includes("ignore")) {
          child.pointerEvents = "none";
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
    <group ref={groupRef} {...bind}>
      <primitive object={slopePlane.scene} />
    </group>
  );
}
