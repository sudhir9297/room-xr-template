import React from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  return (
    <RigidBody type="fixed">
      <mesh receiveShadow position={[0, -3.5, 0]}>
        <boxGeometry args={[300, 5, 300]} />
        <meshStandardMaterial color="#97ABAC" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
