import { useFrame } from "@react-three/fiber";
import { Container, Content, Root } from "@react-three/uikit";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Vector3 } from "three";

// Create vectors outside component to avoid recreating them
const tempVector = new Vector3();
const grabbedPosition = new Vector3();
const offset = new Vector3();
const targetPosition = new Vector3();
const currentPosition = new Vector3();

export const DraggableObject = forwardRef(
  (
    {
      children,
      onDragStart,
      onDragEnd,
      onDrag,
      dragConstraints,
      rigidBodyRef,
      smoothness = 0.15, // Lower = smoother, higher = more responsive
      ...props
    },
    ref
  ) => {
    const objectRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPosition = useRef(new Vector3());

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
        console.log(e.target.name);

        if (isDragging) return;

        e.stopPropagation();
        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);

        // Calculate and store the offset between click point and object position
        tempVector.copy(e.point);
        objectRef.current.parent?.worldToLocal(tempVector);
        offset.copy(objectRef.current.position).sub(tempVector);

        // Store initial position
        dragStartPosition.current.copy(objectRef.current.position);
        grabbedPosition.copy(e.point);

        // Initialize target position
        targetPosition.copy(objectRef.current.position);

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

        // Update target position
        tempVector.copy(e.point);
        objectRef.current.parent?.worldToLocal(tempVector);
        tempVector.add(offset);

        // Apply constraints to target
        constrainPosition(tempVector);
        targetPosition.copy(tempVector);

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
      if (!objectRef.current) return;

      // Smooth interpolation of position
      currentPosition.copy(objectRef.current.position);
      currentPosition.lerp(targetPosition, smoothness);
      objectRef.current.position.copy(currentPosition);

      // Handle look at target after position update
      if (isDragging && rigidBodyRef?.current) {
        const rigidBodyPosition = rigidBodyRef.current.translation();
        objectRef.current.lookAt(
          rigidBodyPosition.x,
          rigidBodyPosition.y + 1,
          rigidBodyPosition.z
        );
      }
    });

    return (
      <group ref={combinedRef} {...props}>
        <Root
          positionType="relative"
          pixelSize={0.002}
          sizeX={0.5}
          sizeY={0.5}
          anchorY="bottom"
          justifyContent="center"
          alignItems="center"
        >
          <Content
            positionType="absolute"
            width="100%"
            height="100%"
            backgroundColor={0xffffff}
            borderRadius={20}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            name="dragContainer"
          />
          <Container
            width="80%"
            height="80%"
            padding={20}
            backgroundColor="green"
            justifyContent="center"
            alignItems="center"
            borderWidth={1}
            name="content"
          >
            {children}
          </Container>
        </Root>
      </group>
    );
  }
);

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
