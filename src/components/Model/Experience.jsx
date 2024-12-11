import React from "react";
import Floor from "./Floor";
import { Sphere } from "./FloatingSphere";
import { Grid } from "@react-three/drei";

const Experience = () => {
  return (
    <group>
      <Floor />
      <Sphere />
      <Sphere position={[2, 4, -4]} scale={0.9} />
      <Sphere position={[-2, 2, -4]} scale={0.8} />
      {/* <Grid
        args={[300, 300]}
        cellColor="#6f6f6f"
        sectionColor={"lightBlue"}
        position={[0, -0.99, 0]}
        userData={{ camExcludeCollision: true }}
      /> */}
    </group>
  );
};

export default Experience;
