import React from "react";
import { Physics } from "@react-three/rapier";
import { IfInSessionMode } from "@react-three/xr";
import { useControls } from "leva";

import { Player } from "./Player";
import { Model } from "./Room";

const Experience = () => {
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <Physics gravity={[0, -2, 0]} timeStep="vary" debug={physics}>
      <Model />
      <IfInSessionMode allow={"immersive-vr"}>
        <Player />
      </IfInSessionMode>
    </Physics>
  );
};

export default Experience;
