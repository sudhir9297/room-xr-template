import { useFrame } from "@react-three/fiber";
import { Container, Content, Image, Root, Text } from "@react-three/uikit";
import { GripVertical, RotateCcw, X } from "@react-three/uikit-lucide";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Vector3 } from "three";
import { Separator } from "../default/separator";
import { useModelStore } from "@/Store";

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

    const { removeSelectedObject } = useModelStore();

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
          flexDirection="column"
          gap="2"
        >
          <Container
            width="100%"
            height="85%"
            justifyContent="center"
            alignItems="center"
            name="content"
            borderRadius={12}
            backgroundColor={0xffffff}
            backgroundOpacity={0.8}
          >
            {children}
            <ProductDetail />
          </Container>

          <Container
            height="15%"
            // backgroundColor="red"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Container
              width="80%"
              height="50%"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              backgroundColor={0xffffff}
              paddingY="2"
              backgroundOpacity={0.8}
              borderRadius={12}
              paddingX={2}
            >
              <Container
                width="20%"
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                <RotateCcw
                  width="10"
                  height="10"
                  hover={{
                    width: "12",
                    height: "12",
                  }}
                />
              </Container>
              <Separator
                backgroundColor="black"
                backgroundOpacity={0.6}
                orientation="vertical"
                height="100%"
              />
              <Container
                width="100%"
                justifyContent="center"
                alignItems="center"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
              >
                <GripVertical
                  width="10"
                  height="10"
                  hover={{
                    width: "12",
                    height: "12",
                  }}
                />
              </Container>
              <Separator
                backgroundColor="black"
                backgroundOpacity={0.6}
                orientation="vertical"
                height="100%"
              />
              <Container
                width="20%"
                justifyContent="center"
                alignItems="center"
                onClick={() => removeSelectedObject()}
              >
                <X
                  width="10"
                  height="10"
                  hover={{
                    width: "12",
                    height: "12",
                  }}
                />
              </Container>
            </Container>{" "}
          </Container>
        </Root>
      </group>
    );
  }
);

const ProductDetail = () => {
  const { selectedObject, setCurrentVariation, removeSelectedObject } =
    useModelStore();
  const { thumbnail, name, desc, variation } = selectedObject;

  return (
    <Container flexDirection="column" padding={12}>
      <Container
        height="100%"
        flexDirection="column"
        gap={8}
        overflow="scroll"
        scrollbarWidth={0}
      >
        <Container
          width="100%"
          height="100%"
          justifyContent="center"
          backgroundColor="#5d855b"
          borderRadius={2.5}
        >
          <Image
            src={thumbnail}
            objectFit="cover"
            aspectRatio={1}
            onClick={() => handleVariationClick(el)}
          />
        </Container>

        <Text fontSize={12} color="black" fontWeight={"semi-bold"}>
          {name}
        </Text>
        <Text fontSize={8} color="#535665">
          {desc}
        </Text>

        <Container width={"100%"} height={40} gap="3" marginTop={4}>
          {variation?.map((el) => (
            <Image
              borderWidth={0.2}
              borderRadius={2}
              src={el.thumbnail}
              objectFit="cover"
              aspectRatio={1}
              onClick={() => setCurrentVariation(el)}
            />
          ))}
        </Container>
      </Container>
    </Container>
  );
};

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
