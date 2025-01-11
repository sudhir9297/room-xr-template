import { useCallback, useRef } from "react";
import { Vector3 } from "three";

const tempVector = new Vector3();
const offset = new Vector3();

export const useDragObject = (child, dragConstraints) => {
  const isDragging = useRef(false);
  const targetPosition = useRef(new Vector3());

  const constrainPosition = useCallback(
    (position) => {
      if (!dragConstraints) return position;

      position.x = Math.max(
        dragConstraints.minX ?? -Infinity,
        Math.min(dragConstraints.maxX ?? Infinity, position.x)
      );
      position.y = Math.max(
        dragConstraints.minY ?? -Infinity,
        Math.min(dragConstraints.maxY ?? Infinity, position.y)
      );
      position.z = Math.max(
        dragConstraints.minZ ?? -Infinity,
        Math.min(dragConstraints.maxZ ?? Infinity, position.z)
      );

      return position;
    },
    [dragConstraints]
  );

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      isDragging.current = true;
      e.target.setPointerCapture(e.pointerId);

      tempVector.copy(e.point);
      child.current.parent?.worldToLocal(tempVector);
      offset.copy(child.current.position).sub(tempVector);

      targetPosition.current.copy(child.current.position);
    },
    [isDragging.current]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (!isDragging.current) return;

      e.target.releasePointerCapture(e.pointerId);
      isDragging.current = false;
    },
    [isDragging.current]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging.current || !child.current) return;

      tempVector.copy(e.point);
      child.current.parent?.worldToLocal(tempVector);
      tempVector.add(offset);

      constrainPosition(tempVector);
      targetPosition.current.copy(tempVector);
    },
    [isDragging.current]
  );

  return { onPointerDown, onPointerMove, onPointerUp, targetPosition };
};
