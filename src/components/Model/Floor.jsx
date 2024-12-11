import React from "react";

const Floor = () => {
  return (
    <mesh receiveShadow position={[0, -3.5, 0]}>
      <boxGeometry args={[300, 5, 300]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

export default Floor;
