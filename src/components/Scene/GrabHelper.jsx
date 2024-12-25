import { useFrame } from "@react-three/fiber";
import { Container, Root } from "@react-three/uikit";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Vector3 } from "three";

// Create vectors outside component to avoid recreating them
const tempVector = new Vector3();
const grabbedPosition = new Vector3();

export const DraggableObject = forwardRef(
  (
    {
      children,
      onDragStart,
      onDragEnd,
      onDrag,

      dragConstraints, // { minX, maxX, minY, maxY, minZ, maxZ }
      rigidBodyRef, // Reference to the rigid body
      ...props
    },
    ref
  ) => {
    const objectRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPosition = useRef(new Vector3());

    // Combine refs
    const combinedRef = useCombinedRefs(ref, objectRef);

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
        if (isDragging) return;

        e.stopPropagation();
        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);

        // Store initial position
        dragStartPosition.current.copy(objectRef.current.position);
        grabbedPosition.copy(e.point);

        onDragStart?.({
          point: e.point,
          object: objectRef.current,
          event: e,
        });
      },
      [isDragging, onDragStart]
    );

    const onPointerUp = useCallback(
      (e) => {
        if (!isDragging) return;

        e.target.releasePointerCapture(e.pointerId);
        setIsDragging(false);

        onDragEnd?.({
          point: e.point,
          object: objectRef.current,
          event: e,
          dragStartPosition: dragStartPosition.current,
        });
      },
      [isDragging, onDragEnd]
    );

    const onPointerMove = useCallback(
      (e) => {
        if (!isDragging || !objectRef.current) return;

        // Get world position
        tempVector.copy(e.point);
        objectRef.current.parent?.worldToLocal(tempVector);

        // Apply constraints
        const newPosition = constrainPosition(tempVector);
        objectRef.current.position.copy(newPosition);

        // Handle look at target
        if (rigidBodyRef.current) {
          const rigidBodyPosition = rigidBodyRef.current.translation();

          objectRef.current.lookAt(
            rigidBodyPosition.x,
            rigidBodyPosition.y + 1,
            rigidBodyPosition.z
          );
        }

        onDrag?.({
          point: e.point,
          object: objectRef.current,
          event: e,
          dragStartPosition: dragStartPosition.current,
        });
      },
      [isDragging, onDrag, constrainPosition]
    );

    useFrame(() => {
      if (isDragging && objectRef.current) {
      }
    });

    return (
      <group
        ref={combinedRef}
        {...props}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        {children}
      </group>
    );
  }
);

// Utility function to combine refs
function useCombinedRefs(...refs) {
  return useCallback(
    (element) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") ref(element);
        else ref.current = element;
      });
    },
    [refs]
  );
}
