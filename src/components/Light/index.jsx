import { SoftShadows, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const directionalLightRef = useRef();
  const lookAtRef = useRef();

  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.target.position.set(8, 0, 0); // Target location (x, y, z)
      directionalLightRef.current.target.updateMatrixWorld(); // Update the target's world matrix
    }
  }, []);

  return (
    <>
      <SoftShadows size={2} focus={4} samples={12} />
      <directionalLight
        castShadow
        shadow-bias={-0.001}
        position={[12.1, 5.6, -12.4]}
        intensity={3}
        shadow-mapSize={1024}
        ref={directionalLightRef}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-20, 20, 10, -5, 0.01, 100]}
        />
      </directionalLight>
      <ambientLight intensity={1} />
    </>
  );
}
