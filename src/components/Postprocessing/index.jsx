import React from "react";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

const PostProcessing = () => {
  return (
    <EffectComposer>
      <N8AO
        aoRadius={30}
        distanceFalloff={0.2}
        intensity={2}
        screenSpaceRadius
        halfRes
      />
    </EffectComposer>
  );
};

export default PostProcessing;
