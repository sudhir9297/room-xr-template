import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { usePickObject } from "@/hooks/usePickObject";
import { useModelStore } from "@/Store";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function R1(props) {
  const bind = usePickObject();
  const { nodes, materials } = useGLTF("/r1-transformed.glb");
  const { selectedObjectName, currentTexture } = useModelStore();
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

  return (
    <group {...props} dispose={null}>
      <mesh
        {...bind}
        name="carpet"
        castShadow
        receiveShadow
        geometry={nodes.carpet.geometry}
        material={materials.carpet}
      />
      <mesh
        name="vase"
        castShadow
        receiveShadow
        geometry={nodes.vase.geometry}
        material={materials.gray}
      />
      <mesh
        name="lamp_socket"
        castShadow
        receiveShadow
        geometry={nodes.lamp_socket.geometry}
        material={materials.gray}
      />
      <mesh
        name="sink"
        castShadow
        receiveShadow
        geometry={nodes.sink.geometry}
        material={materials.chrome}
      />
      <mesh
        name="vase1"
        castShadow
        receiveShadow
        geometry={nodes.vase1.geometry}
        material={materials.gray}
      />
      <mesh
        name="bottle"
        castShadow
        receiveShadow
        geometry={nodes.bottle.geometry}
        material={materials.glass}
      />
      <mesh
        name="cuttingboard"
        castShadow
        receiveShadow
        geometry={nodes.cuttingboard.geometry}
        material={materials.glass}
      />{" "}
      <mesh
        name="lamp"
        castShadow
        receiveShadow
        geometry={nodes.lamp.geometry}
        material={materials.gray}
      />
      <mesh
        name="lamp_cord"
        castShadow
        receiveShadow
        geometry={nodes.lamp_cord.geometry}
        material={materials.gray}
      />
      <mesh
        name="bowl"
        castShadow
        receiveShadow
        geometry={nodes.bowl.geometry}
        material={materials.bowl}
      />{" "}
      <mesh
        name="plant_1"
        castShadow
        receiveShadow
        geometry={nodes.plant_1.geometry}
        material={materials.potted_plant_01_leaves}
      />
      <mesh
        name="plant_2"
        castShadow
        receiveShadow
        geometry={nodes.plant_2.geometry}
        material={materials.potted_plant_01_pot}
      />
      <mesh
        {...bind}
        name="table"
        castShadow
        receiveShadow
        geometry={nodes.table.geometry}
        material={materials.wood}
      />
      <RigidBody type="fixed">
        <mesh
          {...bind}
          name="ceiling"
          castShadow
          receiveShadow
          geometry={nodes.ceiling.geometry}
          material={materials.ceiling}
        />
        <mesh
          {...bind}
          name="chairs"
          castShadow
          receiveShadow
          geometry={nodes.chairs.geometry}
          material={materials.chairs}
        />
        <mesh
          name="kitchen"
          {...bind}
          castShadow
          receiveShadow
          geometry={nodes.kitchen.geometry}
          material={materials.kitchen}
        />
        <mesh
          {...bind}
          name="blinders"
          castShadow
          receiveShadow
          geometry={nodes.blinders.geometry}
          material={materials.blinders}
        />
        <mesh
          {...bind}
          name="wallsL"
          castShadow
          receiveShadow
          geometry={nodes.wallsL.geometry}
          material={materials.walls}
        />
        <mesh
          {...bind}
          name="wallsB"
          castShadow
          receiveShadow
          geometry={nodes.wallsB.geometry}
          material={materials.walls}
        />
        <mesh
          {...bind}
          name="wallsF"
          castShadow
          receiveShadow
          geometry={nodes.wallsF.geometry}
          material={materials.walls}
        />
        <mesh
          {...bind}
          name="wallsR"
          castShadow
          receiveShadow
          geometry={nodes.wallsR.geometry}
          material={materials.walls}
        />

        <mesh
          {...bind}
          name="floor"
          castShadow
          receiveShadow
          geometry={nodes.floor.geometry}
          material={materials.floor}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/r1-transformed.glb");
