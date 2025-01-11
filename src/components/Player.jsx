import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import { XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { ContentPanelUI } from "./UI/ContentPanelUI";
import { useModelStore } from "@/Store";
import { useCharacterMovement } from "@/hooks/useCharacterMovement";
import { BottomPanelLayout } from "./UI/BottomPanelUI";

export const Player = () => {
  const { camera } = useThree();
  const rigidBodyRef = useRef(null);
  const capsuleRef = useRef(null);
  const orbitAngle = useRef(0);

  const { selectedObjectName } = useModelStore();
  useCharacterMovement(rigidBodyRef, { x: 0, y: 5, z: 0 });

  const prevSelectedObjectRef = useRef();

  const groupRef = useRef(null);
  const targetPosition = useRef(new Vector3());
  const initialHeight = useRef(0.8);

  useEffect(() => {
    if (groupRef.current) {
      initialHeight.current = groupRef.current.position.y;
    }
  }, []);

  useEffect(() => {
    if (!rigidBodyRef.current) return;

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

  useFrame(() => {
    if (!groupRef.current || !selectedObjectName) return;

    const direction = new Vector3(
      Math.cos(orbitAngle.current),
      0,
      Math.sin(orbitAngle.current)
    );
    direction.multiplyScalar(Math.abs(-0.8));
    direction.y = initialHeight.current;

    targetPosition.current.copy(direction);
    groupRef.current.position.lerp(targetPosition.current, 0.15);

    const rigidBodyPosition = rigidBodyRef.current.translation();

    groupRef.current.lookAt(
      rigidBodyPosition.x,
      rigidBodyPosition.y + 0.8,
      rigidBodyPosition.z
    );
  });

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

        <group ref={groupRef} position={[0, 0.8, -0.8]}>
          {/* <mesh>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial color="red" />
          </mesh> */}

          <BottomPanelLayout
            rigidBodyRef={rigidBodyRef}
            dragConstraints={{
              minY: -0.5,
            }}
          >
            {selectedObjectName ? (
              <ContentPanelUI
                dragConstraints={{
                  minY: -0.5,
                }}
                rigidBodyRef={rigidBodyRef}
              />
            ) : null}
          </BottomPanelLayout>
        </group>
      </RigidBody>
    </>
  );
};
