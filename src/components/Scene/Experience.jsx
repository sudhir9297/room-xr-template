import React from "react";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import RigidObjects from "./RigidObjects";
import { useControls } from "leva";
import Slope from "./Slope";
import { Player } from "./Player";
import FloatingUI from "../UI";
import { useModelStore } from "@/Store";
import SolarSystem from "./Test";
import UiTest from "../UI/uiTest";
import { IfInSessionMode, ShowIfInSessionMode } from "@react-three/xr";

const Experience = () => {
  const { physics } = useControls("World Settings", {
    physics: true,
  });

  const { selectedObject } = useModelStore();
  const isSelected = Object.keys(selectedObject).length > 0;

  return (
    <Physics gravity={[0, -2, 0]} timeStep="vary" debug={physics}>
      {/* <RigidObjects /> */}
      <Floor />
      {/* {isSelected ? <FloatingUI /> : null} */}
      {/* <Slope /> */}
      <IfInSessionMode allow={"immersive-vr"}>
        <Player />
      </IfInSessionMode>
      {/* <SolarSystem /> */}
      {/* <UiTest /> */}
    </Physics>
  );
};

export default Experience;
