import * as THREE from "three";
import { usePickObject } from "@/hooks/usePickObject";
import { useModelStore } from "@/Store";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Scene = () => {
  const { selectedObjectName, selectedObjectData, currentTexture } =
    useModelStore();
  const { scene: Scene } = useThree();
  const TextureLoader = new THREE.TextureLoader();
  TextureLoader.setCrossOrigin("*");

  useEffect(() => {
    if (!currentTexture) return;

    Scene.traverse((obj) => {
      if (selectedObjectName === obj.name && obj.type === "Mesh") {
        if (selectedObjectData.map) {
          const albedoMap = TextureLoader.load(selectedObjectData.map);
          albedoMap.repeat.set(
            selectedObjectData.repeatX,
            selectedObjectData.repeatY
          );
          albedoMap.wrapS = THREE.RepeatWrapping;
          albedoMap.wrapT = THREE.RepeatWrapping;
          albedoMap.colorSpace = THREE.SRGBColorSpace;
          obj.material.map = albedoMap;
        }
        obj.material.color = new THREE.Color(
          selectedObjectData.color
        ).convertSRGBToLinear();
        obj.material.needsUpdate = true;
      }
    });

    return () => {};
  }, [currentTexture]);

  const bind = usePickObject();
  return (
    <group {...bind} position={[0, 0, 0]}>
      <RigidBody type="fixed">
        <mesh receiveShadow position={[0, -1, 0]} name="floor" {...bind}>
          <boxGeometry args={[300, 2, 300]} />
          <meshStandardMaterial color="#97ABAC" />
        </mesh>
      </RigidBody>

      <group position={[5, 0, 0]}>
        <RigidBody>
          <mesh receiveShadow castShadow position={[0, 5, 2]} name="box2">
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 4, 2]}>
          <mesh receiveShadow castShadow name="box1">
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 4, 0]} colliders={false}>
          <CuboidCollider args={[0.5, 0.5, 0.5]} />
          <mesh receiveShadow castShadow name="box2">
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 4, -2]} colliders={false}>
          <CuboidCollider args={[1.5 / 2, 1.5 / 2, 1.5 / 2]} />
          <mesh receiveShadow castShadow name="box2">
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 4, -5]} colliders={false}>
          <CuboidCollider args={[1, 1, 1]} />
          <mesh receiveShadow castShadow name="box1">
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh>
        </RigidBody>
      </group>
    </group>
  );
};

export default Scene;
