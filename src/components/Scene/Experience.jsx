import React from "react";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import RigidObjects from "./RigidObjects";
import { useControls } from "leva";
import Slope from "./Slope";

const Experience = () => {
  const { physics } = useControls("World Settings", {
    physics: true,
  });

  return (
    <Physics gravity={[0, -2, 0]} timeStep="vary" debug={physics}>
      {/* <RigidObjects /> */}
      {/* <Floor /> */}
      <Slope />
    </Physics>
  );
};

export default Experience;
