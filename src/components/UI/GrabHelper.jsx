import { useFrame, useThree } from "@react-three/fiber";
import { Container, Image, Root, Text } from "@react-three/uikit";
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
      smoothness = 0.15,
      ...props
    },
    ref
  ) => {
    const objectRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPosition = useRef(new Vector3());
    const { camera } = useThree();
    const { clearSelectedObject } = useModelStore();

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

      const rigidBodyPosition = rigidBodyRef.current.translation();
      objectRef.current.lookAt(
        rigidBodyPosition.x,
        camera.position.y + 0.5,
        rigidBodyPosition.z
      );
    });

    const resetUI = () => {
      targetPosition.copy(new Vector3(0, 0, 0));
    };

    return (
      <group ref={combinedRef} {...props}>
        <Root
          positionType="relative"
          anchorY="bottom"
          pixelSize={0.002}
          sizeX={0.5}
          sizeY={0.5}
          flexDirection="column"
        >
          <ProductDetail />
          <Container
            height="15%"
            // backgroundColor="red"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Container
              width="90%"
              height="50%"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              paddingY="2"
              borderRadius={12}
              paddingX={2}
            >
              <Container
                width="15%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                onClick={resetUI}
                borderTopLeftRadius={12}
                borderBottomLeftRadius={12}
                backgroundColor={0xffffff}
                backgroundOpacity={0.5}
                hover={{
                  backgroundOpacity: 1,
                  backgroundColor: "#FFC107",
                }}
              >
                <RotateCcw
                  width="8"
                  height="8"
                  hover={{
                    width: "10",
                    height: "10",
                    color: "white",
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
                backgroundColor={0xffffff}
                backgroundOpacity={0.5}
                height="100%"
                hover={{
                  backgroundOpacity: 1,
                }}
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
                width="15%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                borderTopRightRadius={12}
                borderBottomRightRadius={12}
                backgroundColor={0xffffff}
                backgroundOpacity={0.5}
                hover={{
                  backgroundOpacity: 1,
                  backgroundColor: "#FF4C4C",
                }}
                onClick={clearSelectedObject}
              >
                <X
                  width="8"
                  height="8"
                  hover={{
                    width: "10",
                    height: "10",
                    color: "white",
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
  const { selectedObjectData, setCurrentTexture } = useModelStore();

  return (
    <Container
      flexDirection="column"
      padding={4}
      backgroundColor="#f2f2f2"
      borderRadius={10}
      flexGrow={1}
    >
      <Container justifyContent="center" paddingBottom={2}>
        <Text fontSize="8" fontWeight="bold">
          {selectedObjectData.name}
        </Text>
      </Container>
      <Container
        flexGrow={1}
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={4}
        flexWrap="wrap"
        overflow="scroll"
        scrollbarWidth={1}
        scrollbarColor="black"
      >
        {selectedObjectData.textures.map((el, i) => (
          <Container
            key={i}
            width="30%"
            flexDirection="column"
            gap={2}
            marginBottom={5}
            backgroundColor="white"
            padding={3}
            borderRadius={6}
          >
            <Image
              flexGrow={1}
              src={el.map}
              objectFit="cover"
              aspectRatio={1}
              onClick={() => setCurrentTexture(el)}
              borderRadius={6}
            />
            <Text paddingX="2" fontSize="6" fontWeight="semi-bold">
              {el.name}
            </Text>
          </Container>
        ))}
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
