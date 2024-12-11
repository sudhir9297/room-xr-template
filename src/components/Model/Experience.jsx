import React from "react";
import Floor from "./Floor";
import { Sphere } from "./FloatingSphere";
import { Grid } from "@react-three/drei";
import Heels from "./Heels";

const Experience = () => {
  return (
    <group>
      <Floor />

      {/* <Grid
        args={[300, 300]}
        cellColor="#6f6f6f"
        sectionColor={"lightBlue"}
        position={[0, -0.99, 0]}
        // userData={{ camExcludeCollision: true }}
      /> */}

      <Heels />
    </group>
  );
};

export default Experience;
