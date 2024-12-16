import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { usePhysicsObjects } from "@/hooks/usePhysicsHooks";

export default function Slope() {
  const slopePlane = useGLTF("./slope.glb");
  const { addPhysics } = usePhysicsObjects();

  useEffect(() => {
    slopePlane.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;
        const name = child.name?.split("_") || [];

        // if (child.name === "nav_mesh") {
        //   child.visible = false;
        //   child.side = 1;
        // addPhysics(child, type, null, false, null, null);
        //   return;
        // }

        if (name[0] === "trimesh") {
          const type = name[1];
          const autoAnimate = type === "dynamic" ? true : false;
          addPhysics(child, type, null, autoAnimate, null, null);
          return;
        }
      }
    });
  }, []);

  return <primitive object={slopePlane.scene} />;
}
