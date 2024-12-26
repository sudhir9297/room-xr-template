import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Euler, Quaternion, Vector3 } from "three";
import { DraggableObject } from "./GrabHelper";
import { useModelStore } from "@/Store";

export const Player = () => {
  const { progress } = useProgress();
  const { camera } = useThree();
  const uiRef = useRef(null);
  const rigidBodyRef = useRef(null);
  const dragGroupRef = useRef(null);
  const capsuleRef = useRef(null);

  const isDragging = useRef(false);

  const OFFSET = { x: 0, y: 0.8, z: -0.9 };

  const { selectedObject } = useModelStore();
  const isSelected = Object.keys(selectedObject).length > 0;

  useEffect(() => {
    if (progress === 100) {
      resetPlayerPosition();
    }
  }, []);

  const resetPlayerPosition = () => {
    if (!rigidBodyRef.current || !capsuleRef.current || !camera) return;

    // Get current VR camera position
    const cameraPosition = new Vector3().setFromMatrixPosition(camera.matrix);

    if (capsuleRef.current) {
      camera.position.copy(
        capsuleRef.current.worldToLocal(cameraPosition.clone())
      );
      rigidBodyRef.current.setTranslation(cameraPosition, true);
    }

    updateCubePosition();
  };

  const updateCubePosition = () => {
    if (!rigidBodyRef.current || !dragGroupRef.current) return;

    const rigidBodyPosition = rigidBodyRef.current.translation();

    // Set drag group position to rigid body position plus offset
    dragGroupRef.current.position.set(
      rigidBodyPosition.x + OFFSET.x,
      rigidBodyPosition.y + OFFSET.y,
      rigidBodyPosition.z + OFFSET.z
    );
    dragGroupRef.current.lookAt(
      rigidBodyPosition.x,
      rigidBodyPosition.y + 0.8,
      rigidBodyPosition.z
    );
  };

  useFrame((state, delta) => {
    if (!isDragging.current) {
      updateCubePosition();
    }
  });

  const userMove = (inputVector) => {
    if (rigidBodyRef.current) {
      const currentLinvel = rigidBodyRef.current.linvel();
      const newLinvel = {
        x: inputVector.x,
        y: currentLinvel.y,
        z: inputVector.z,
      };
      rigidBodyRef.current.setLinvel(newLinvel, true);
    }
  };

  useXRControllerLocomotion(userMove);

  return (
    <>
      <RigidBody
        colliders={false}
        type="dynamic"
        position={[0, 2, 0]}
        enabledRotations={[false, false, false]}
        canSleep={false}
        ref={rigidBodyRef}
      >
        <CapsuleCollider args={[0.6, 0.2]} />
        <XROrigin ref={capsuleRef} position={[0, 0, 0]} />
      </RigidBody>

      <group ref={dragGroupRef}>
        {/* <mesh>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="red" />
        </mesh> */}
        {isSelected ? (
          <DraggableObject
            dragConstraints={{
              minY: -1,
              maxY: 2,
              minX: -5,
              maxX: 5,
            }}
            rigidBodyRef={rigidBodyRef}
          ></DraggableObject>
        ) : null}
      </group>
    </>
  );
};
