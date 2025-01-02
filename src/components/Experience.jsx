import React from "react";
import { Physics } from "@react-three/rapier";
import { IfInSessionMode } from "@react-three/xr";

import { Player } from "./Player";
import { R1 } from "./Room";

const Experience = () => {
  return (
    <Physics gravity={[0, -2, 0]} timeStep="vary">
      <R1 />
      <IfInSessionMode allow={"immersive-vr"}>
        <Player />
      </IfInSessionMode>
    </Physics>
  );
};

export default Experience;
