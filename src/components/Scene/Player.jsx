import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { DraggableObject } from "../UI/GrabHelper";
import { useModelStore } from "@/Store";

export const Player = () => {
  const { progress } = useProgress();
  const { camera } = useThree();
  const rigidBodyRef = useRef(null);
  const dragGroupRef = useRef(null);
  const capsuleRef = useRef(null);
  const orbitAngle = useRef(0);
  const OFFSET = { x: 0, y: 0.8, z: -0.9 };
  const lastPosition = useRef(new Vector3());

  const { selectedObjectName } = useModelStore();

  const prevSelectedObjectRef = useRef();
  const targetPositionRef = useRef(new Vector3());

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

    updateGroupForUi();
  };

  useEffect(() => {
    if (!rigidBodyRef.current || !dragGroupRef.current) return;

    const prevSelected = prevSelectedObjectRef.current;
    const currentSelected = selectedObjectName;

    if (prevSelected !== currentSelected) {
      const cameraDirection = new Vector3(0, 0, -1).applyQuaternion(
        camera.quaternion
      );
      orbitAngle.current = Math.atan2(cameraDirection.z, cameraDirection.x);
    }

    prevSelectedObjectRef.current = selectedObjectName;
  }, [selectedObjectName]);

  const updateGroupForUi = () => {
    if (!rigidBodyRef.current || !dragGroupRef.current) return;

    const rigidBodyPosition = rigidBodyRef.current.translation();

    if (selectedObjectName) {
      const direction = new Vector3(
        Math.cos(orbitAngle.current),
        0,
        Math.sin(orbitAngle.current)
      );
      direction.multiplyScalar(Math.abs(OFFSET.z));

      targetPositionRef.current.set(
        rigidBodyPosition.x + direction.x,
        rigidBodyPosition.y + OFFSET.y,
        rigidBodyPosition.z + direction.z
      );
    } else {
      // Use regular offset when no object is selected
      targetPositionRef.current.set(
        rigidBodyPosition.x + OFFSET.x,
        rigidBodyPosition.y + OFFSET.y,
        rigidBodyPosition.z + OFFSET.z
      );
    }

    lastPosition.current.lerp(targetPositionRef.current, 0.1);
    dragGroupRef.current.position.copy(lastPosition.current);

    dragGroupRef.current.lookAt(
      rigidBodyPosition.x,
      rigidBodyPosition.y + 0.8,
      rigidBodyPosition.z
    );
  };

  useFrame((state, delta) => {
    updateGroupForUi();
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
        enabledRotations={[false, false, false]}
        canSleep={false}
        ref={rigidBodyRef}
      >
        <CapsuleCollider args={[0.6, 0.2]} />
        <XROrigin ref={capsuleRef} position={[0, 0, 0]} />
      </RigidBody>

      <group ref={dragGroupRef}>
        {/* <mesh>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="red" />
        </mesh> */}

        {selectedObjectName ? (
          <DraggableObject
            dragConstraints={{
              minY: -1,
              maxY: 2,
              minX: -5,
              maxX: 5,
            }}
            rigidBodyRef={rigidBodyRef}
          />
        ) : null}
      </group>
    </>
  );
};
