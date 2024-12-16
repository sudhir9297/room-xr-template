import React from "react";
import Floor from "./Floor";
import { Sphere } from "./FloatingSphere";

import { Physics } from "@react-three/rapier";
import RigidObjects from "./RigidObjects";
import { useControls } from "leva";
import Slope from "./Slope";

const Experience = () => {
  const { physics } = useControls("World Settings", {
    physics: true,
  });

  return (
    <Physics timeStep="vary" debug={physics}>
      <RigidObjects />
      <Floor />
      <Slope />
    </Physics>
  );
};

export default Experience;
