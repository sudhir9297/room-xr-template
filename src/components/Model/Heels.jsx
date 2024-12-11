import React, { useContext, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { StoreContext } from "@/context/store";

const Heels = (props) => {
  const groupRef = useRef();

  const { currentVariation, currentRotation } = useContext(StoreContext);
  const { nodes, materials } = useGLTF("/heel.glb");

  const meshList = currentVariation.meshNameList;

  useEffect(() => {
    const radians = THREE.MathUtils.degToRad(currentRotation);
    groupRef.current.rotation.set(0, radians, 0);
  }, [currentRotation]);

  return (
    <group
      {...props}
      dispose={null}
      position={[0, 0, -4]}
      scale={[0.6, 0.6, 0.6]}
      ref={groupRef}
    >
      <mesh geometry={nodes.sole.geometry} material={materials.sole}>
        <meshStandardMaterial
          name="sole"
          side={2}
          color={meshList["sole"].color}
          metalness={meshList["sole"].metalness}
          roughness={meshList["sole"].roughness}
        />
      </mesh>
      <mesh geometry={nodes.inner_base.geometry}>
        <meshStandardMaterial
          name="inner_base"
          side={2}
          color={meshList["inner_base"].color}
          metalness={meshList["inner_base"].metalness}
          roughness={meshList["inner_base"].roughness}
        />
      </mesh>
      <mesh geometry={nodes.inner_side.geometry}>
        <meshStandardMaterial
          name="body"
          side={2}
          color={meshList["inner_side"].color}
          metalness={meshList["inner_side"].metalness}
          roughness={meshList["inner_side"].roughness}
        />
      </mesh>
      <mesh geometry={nodes.body.geometry}>
        <meshStandardMaterial
          name="body"
          side={2}
          color={meshList["body"].color}
          metalness={meshList["body"].metalness}
          roughness={meshList["body"].roughness}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shadow_plane.geometry}
        material={materials.shadow_plane}
        scale={4.77}
      />
    </group>
  );
};

useGLTF.preload("/heel.glb");

export default Heels;
