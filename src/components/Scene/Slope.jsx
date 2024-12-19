import * as THREE from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { usePhysicsObjects } from "@/hooks/usePhysicsHooks";
import { usePickObject } from "@/hooks/usePickObject";
import { useFrame } from "@react-three/fiber";

export default function Slope() {
  const slopePlane = useGLTF("./slope.glb");
  const { addPhysics } = usePhysicsObjects();

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
    <group {...bind}>
      <primitive object={slopePlane.scene} />
    </group>
  );
}
