import { useCallback } from "react";
import { useModelStore } from "@/Store";
import { ProductList } from "@/constant/data";

export const heldObjects = new Map();

export const usePickObject = () => {
  const { dynamicObjects, addSelectedObject, setCurrentVariation } =
    useModelStore();

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

  // const findPhysicsObject = (mesh) => {
  //   return dynamicObjects.find((po) => po.mesh === mesh);
  // };

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    const pointerId = e.pointerId;

    // if (heldObjects.has(pointerId)) {
    //   return;
    // }

    // const physicsObject = findPhysicsObject(e.object);
    // physicsObject.rigidBody.setGravityScale(0, false);
    // addSelectedObject(e.object);

    Object.entries(ProductList).forEach(([key, value]) => {
      if (key === e.object.name.split("_")[1]) {
        addSelectedObject(value);
        setCurrentVariation(value.variation[0]);
      }
    });
  });

  // const onPointerUp = useCallback((e) => {
  //   const pointerId = e.pointerId;
  //   if (heldObjects.has(pointerId)) {
  //     const { object } = heldObjects.get(pointerId);
  //     object.rigidBody.setGravityScale(1, true);
  //     heldObjects.delete(pointerId);
  //   }
  // });

  // const onPointerMove = useCallback((e) => {
  //   const pointerId = e.pointerId;

  //   if (heldObjects.has(pointerId)) {
  //     const { object } = heldObjects.get(pointerId);

  //     object.rigidBody.setTranslation(
  //       new rapier.Vector3(e.point.x, e.point.y, e.point.z),
  //       true
  //     );
  //   }
  // });

  return { onPointerDown };
};
