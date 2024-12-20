import React from "react";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import RigidObjects from "./RigidObjects";
import { useControls } from "leva";
import Slope from "./Slope";
import { Player } from "./Player";
import FloatingUI from "../UI";
import { useModelStore } from "@/Store";

const Experience = () => {
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  const { selectedObject } = useModelStore();
  const isSelected = Object.keys(selectedObject).length > 0;

  return (
    <Physics gravity={[0, -2, 0]} timeStep="vary" debug={physics}>
      {/* <RigidObjects /> */}
      {/* <Floor /> */}
      {isSelected ? <FloatingUI /> : null}

      <Player />
      <Slope />
    </Physics>
  );
};

export default Experience;
