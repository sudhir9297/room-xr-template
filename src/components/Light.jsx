import { SoftShadows, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Lights() {
  const mainLightRef = useRef();

  const rimLightRef = useRef();
  const targetRef = useRef();
  const { scene } = useThree();

  // useHelper(mainLightRef, THREE.DirectionalLightHelper, 1);
  // useHelper(rimLightRef, THREE.DirectionalLightHelper, 1);

  // useEffect(() => {
  //   if (mainLightRef.current) {
  //     const shadowCameraHelper = new THREE.CameraHelper(
  //       mainLightRef.current.shadow.camera
  //     );
  //     scene.add(shadowCameraHelper);

  //     return () => {
  //       scene.remove(shadowCameraHelper);
  //     };
  //   }
  // }, [scene]);

  useEffect(() => {
    if (mainLightRef.current && targetRef.current) {
      mainLightRef.current.target = targetRef.current;
    }

    if (rimLightRef.current && targetRef.current) {
      rimLightRef.current.target = targetRef.current;
    }

    if (targetRef.current) {
      scene.add(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        scene.remove(targetRef.current);
      }
    };
  }, [scene]);

  return (
    <>
      <object3D ref={targetRef} position={[8, 0, 0]}></object3D>
      <SoftShadows size={12} focus={4} samples={17} />
      <directionalLight
        ref={mainLightRef}
        castShadow
        position={[4, 5, -12]}
        intensity={6.5}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        color="#ffd0b1"
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 20, 7, -3.5, 0.1, 20]}
        />
      </directionalLight>

      <directionalLight
        ref={rimLightRef}
        position={[-5, 5, -8]}
        intensity={0.8}
        color="#fff5e6"
      />

      <ambientLight intensity={0.2} color="#e6eeff" />

      <hemisphereLight
        skyColor="#b1e1ff"
        groundColor="#000000"
        intensity={0.4}
      />
    </>
  );
}
