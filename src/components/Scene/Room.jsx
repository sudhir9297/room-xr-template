import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { usePickObject } from "@/hooks/usePickObject";
import { useThree } from "@react-three/fiber";
import { useModelStore } from "@/Store";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/room-transformed.glb");

  const { selectedObjectName, selectedObjectData, currentTexture } =
    useModelStore();

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

  const bind = usePickObject();

  return (
    <group scale={[0.8, 0.8, 0.8]} {...props} dispose={null}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider position={[12.9, 3, 0]} args={[0.5, 3, 8]} />
        <mesh
          {...bind}
          name="cabinet"
          castShadow
          receiveShadow
          geometry={nodes.cabinet_Material015_0.geometry}
          material={materials["Material.005"]}
          position={[13.137, 6.081, 0.931]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.697, 5.048, 0.073]}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          {...bind}
          castShadow
          receiveShadow
          name="floor"
          geometry={nodes.floor.geometry}
          material={materials["floor.001"]}
          position={[5.692, 0, 0]}
        />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider position={[7.4, 1.2, 0.7]} args={[3, 1.2, 3.9]} />
        <mesh
          name="seat_Leather_0"
          castShadow
          receiveShadow
          geometry={nodes.seat_Leather_0.geometry}
          material={materials["Leather.001"]}
          position={[7.346, 1.211, -2.588]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.512, 0.512, 0.054]}
        />
      </RigidBody>
      <mesh
        name="bowl_grey_0"
        castShadow
        receiveShadow
        geometry={nodes.bowl_grey_0.geometry}
        material={materials["grey.003"]}
        position={[13.245, 2.007, 5.488]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.335, 0.335, 0.257]}
      />

      <mesh
        name="candle_Material007_0"
        castShadow
        receiveShadow
        geometry={nodes.candle_Material007_0.geometry}
        material={materials["Material.025"]}
        position={[13.111, 2.349, -2.913]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.077}
      />
      <mesh
        name="candle_Material008_0"
        castShadow
        receiveShadow
        geometry={nodes.candle_Material008_0.geometry}
        material={materials["Material.024"]}
        position={[13.111, 2.349, -2.913]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.077}
      />
      <mesh
        name="candle_Material013_0"
        castShadow
        receiveShadow
        geometry={nodes.candle_Material013_0.geometry}
        material={materials["Material.023"]}
        position={[13.111, 2.349, -2.913]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.077}
      />
      <mesh
        {...bind}
        name="carpet"
        castShadow
        receiveShadow
        geometry={nodes.carpet_Carpet__0.geometry}
        material={materials["Carpet.001"]}
        position={[7.344, 0.049, 0.538]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[3.865, 4.964, 0.011]}
      />
      <mesh
        name="chopping_board1_Material1_0"
        castShadow
        receiveShadow
        geometry={nodes.chopping_board1_Material1_0.geometry}
        material={materials["Material1.001"]}
        position={[13.559, 1.984, 3.793]}
        rotation={[-1.593, -1.28, -0.023]}
        scale={[0.027, 0.031, 0.027]}
      />
      <mesh
        name="chopping_board2_Material2_0"
        castShadow
        receiveShadow
        geometry={nodes.chopping_board2_Material2_0.geometry}
        material={materials["Material2.001"]}
        position={[13.625, 2.001, 3.939]}
        rotation={[-1.6, -1.347, -0.03]}
        scale={[0.028, 0.032, 0.028]}
      />
      <mesh
        name="faucet_Material006_0"
        castShadow
        receiveShadow
        geometry={nodes.faucet_Material006_0.geometry}
        material={materials["Material.020"]}
        position={[13.635, 1.925, 2.87]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.004, 0.004, 0.032]}
      />

      <mesh
        name="flower_leaf1_0"
        castShadow
        receiveShadow
        geometry={nodes.flower_leaf1_0.geometry}
        material={materials["leaf1.001"]}
        position={[7.43, 1.788, 1.306]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.026}
      />
      <mesh
        name="flower_leaf2_0"
        castShadow
        receiveShadow
        geometry={nodes.flower_leaf2_0.geometry}
        material={materials["leaf2.001"]}
        position={[7.43, 1.788, 1.306]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.026}
      />
      <mesh
        name="house"
        castShadow
        receiveShadow
        geometry={nodes.house.geometry}
        material={materials["Material.004"]}
        position={[5.692, 3.065, -0.006]}
      />
      <mesh
        name="IKEA_seat_wood__0"
        castShadow
        receiveShadow
        geometry={nodes.IKEA_seat_wood__0.geometry}
        material={materials["wood.001"]}
        position={[13.058, 0.648, -6.714]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.355, 0.314, 0.314]}
      />
      <mesh
        name="jar1_Material3_0"
        castShadow
        receiveShadow
        geometry={nodes.jar1_Material3_0.geometry}
        material={materials["Material3.001"]}
        position={[13.293, 1.88, -2.203]}
        rotation={[-Math.PI / 2, 0, -1.875]}
        scale={0.018}
      />
      <mesh
        name="jar2_Material4_0"
        castShadow
        receiveShadow
        geometry={nodes.jar2_Material4_0.geometry}
        material={materials["Material4.001"]}
        position={[13.24, 1.97, -2.467]}
        rotation={[-Math.PI / 2, 0, -1.247]}
        scale={0.017}
      />
      <mesh
        name="jar3_Material002_0"
        castShadow
        receiveShadow
        geometry={nodes.jar3_Material002_0.geometry}
        material={materials["Material.019"]}
        position={[13.459, 1.924, 4.842]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.169}
      />
      <mesh
        name="jar4_Material017_0"
        castShadow
        receiveShadow
        geometry={nodes.jar4_Material017_0.geometry}
        material={materials["Material.018"]}
        position={[13.33, 1.911, 4.443]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.157}
      />
      <mesh
        name="lighting_Material001_0"
        castShadow
        receiveShadow
        geometry={nodes.lighting_Material001_0.geometry}
        material={materials["Material.026"]}
        position={[9.517, 4.932, -0.538]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.054, 0.054, 0.466]}
      />
      <mesh
        name="lighting_Material003_0"
        castShadow
        receiveShadow
        geometry={nodes.lighting_Material003_0.geometry}
        material={materials["Material.027"]}
        position={[9.517, 4.932, -0.538]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.054, 0.054, 0.466]}
      />
      <mesh
        name="lighting_Material014_0"
        castShadow
        receiveShadow
        geometry={nodes.lighting_Material014_0.geometry}
        material={materials["Material.028"]}
        position={[9.517, 4.932, -0.538]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.054, 0.054, 0.466]}
      />
      <mesh
        name="painting_Material010_0"
        castShadow
        receiveShadow
        geometry={nodes.painting_Material010_0.geometry}
        material={materials["Material.021"]}
        position={[13.562, 2.381, -4.283]}
        rotation={[-Math.PI / 2, 0.148, 0]}
        scale={[0.055, 0.634, 0.634]}
      />

      <mesh
        {...bind}
        name="table"
        castShadow
        receiveShadow
        geometry={nodes.table_Material5001_0.geometry}
        material={materials["Material5.002"]}
        position={[7.375, 1.332, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.636, 1.636, 0.218]}
      />
      <mesh
        name="vase_grey001_0"
        castShadow
        receiveShadow
        geometry={nodes.vase_grey001_0.geometry}
        material={materials["grey.002"]}
        position={[7.419, 1.749, 1.299]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.169}
      />
      <mesh
        name="window_Material016_0"
        castShadow
        receiveShadow
        geometry={nodes.window_Material016_0.geometry}
        material={materials["Material.012"]}
        position={[5.692, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.026}
      />
    </group>
  );
}

useGLTF.preload("/room-transformed.glb");
