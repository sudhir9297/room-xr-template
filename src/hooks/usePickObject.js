import { useCallback } from "react";
import { usePhysicsObjects } from "./usePhysicsHooks";
import { useFrame } from "@react-three/fiber";
import { useModelStore } from "@/Store";
import { useRapier } from "@react-three/rapier";
import { Quaternion, Vector3 } from "three";
import { useXRInputSourceState } from "@react-three/xr";

const heldObjects = new Map();

export const usePickObject = () => {
  const { dynamicObjects } = useModelStore();
  const { rapier } = useRapier();

  const controllerPosition = new Vector3();
  const controllerRotation = new Quaternion();

  const rightController = useXRInputSourceState("controller", "right");
  const leftController = useXRInputSourceState("controller", "left");

  // useFrame(() => {
  //   updateHeldObject();
  // });

  // const updateHeldObject = () => {
  //   for (const [handName, heldObject] of heldObjects) {
  //     const { object } = heldObject;

  //     rightController.object.getWorldPosition(controllerPosition);
  //     rightController.object.getWorldQuaternion(controllerRotation);

  //     object.rigidBody.setTranslation(
  //       new rapier.Vector3(
  //         controllerPosition.x,
  //         controllerPosition.y,
  //         controllerPosition.z
  //       ),
  //       true
  //     );

  //     object.rigidBody.setRotation(
  //       new rapier.Quaternion(
  //         controllerRotation.x,
  //         controllerRotation.y,
  //         controllerRotation.z,
  //         controllerRotation.w
  //       ),
  //       true
  //     );
  //   }
  // };

  const findPhysicsObject = (mesh) => {
    return dynamicObjects.find((po) => po.mesh === mesh);
  };

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    const pointerId = e.pointerId;
    if (pointerId in heldObjects) {
      return;
    }

    const physicsObject = findPhysicsObject(e.object);
    physicsObject.rigidBody.setGravityScale(0, false);
    heldObjects.set(pointerId, { object: physicsObject });
  });

  const onPointerUp = useCallback((e) => {
    const pointerId = e.pointerId;
    if (heldObjects.has(pointerId)) {
      const { object } = heldObjects.get(pointerId);
      object.rigidBody.setGravityScale(1, true);
      heldObjects.delete(pointerId);
    }
  });

  const onPointerMove = useCallback((e) => {
    const pointerId = e.pointerId;

    if (heldObjects.has(pointerId)) {
      const { object } = heldObjects.get(pointerId);

      object.rigidBody.setTranslation(
        new rapier.Vector3(e.point.x, e.point.y, e.point.z),
        true
      );
    }
  });

  return { onPointerDown, onPointerUp };
};
