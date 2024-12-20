import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useRef } from "react";
import { Quaternion } from "three";

export const Player = () => {
  const userRigidBodyRef = useRef(null);
  const userMove = (inputVector, rotationInfo) => {
    if (userRigidBodyRef.current) {
      const currentLinvel = userRigidBodyRef.current.linvel();
      const newLinvel = {
        x: inputVector.x,
        y: currentLinvel.y,
        z: inputVector.z,
      };
      userRigidBodyRef.current.setLinvel(newLinvel, true);
      userRigidBodyRef.current.setRotation(
        new Quaternion().setFromEuler(rotationInfo),
        true
      );
    }
  };

  useXRControllerLocomotion(userMove);

  return (
    <RigidBody
      colliders={false}
      type="dynamic"
      position={[0, 1, 0]}
      enabledRotations={[false, false, false]}
      canSleep={false}
      ref={userRigidBodyRef}
    >
      <CapsuleCollider args={[0.3, 0.2]} />
      <XROrigin position={[0, 0, 0]} />
    </RigidBody>
  );
};
