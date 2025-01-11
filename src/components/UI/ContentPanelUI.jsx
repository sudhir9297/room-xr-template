import { useFrame } from "@react-three/fiber";
import { Container, Image, Root, Text } from "@react-three/uikit";
import { GripVertical, RotateCcw, X } from "@react-three/uikit-lucide";
import { forwardRef, useRef } from "react";
import { Vector3 } from "three";
import { Separator } from "../default/separator";
import { useModelStore } from "@/Store";
import { useCombinedRefs } from "@/constant/utils";
import { useDragObject } from "@/hooks/useDragObject";

const currentPosition = new Vector3();

export const ContentPanelUI = forwardRef(
  (
    { rigidBodyRef, dragConstraints, smoothness = 0.15, children, ...props },
    ref
  ) => {
    const panelRef = useRef(null);
    const { onPointerDown, onPointerUp, onPointerMove, targetPosition } =
      useDragObject(panelRef, dragConstraints);
    const combinedRef = useCombinedRefs(ref, panelRef);

    useFrame(() => {
      if (!panelRef.current && !rigidBodyRef.current) return;

      currentPosition.copy(panelRef.current.position);
      currentPosition.lerp(targetPosition.current, smoothness);
      panelRef.current.position.copy(currentPosition);

      const rigidBodyPosition = rigidBodyRef.current.translation();

      panelRef.current.lookAt(
        rigidBodyPosition.x,
        rigidBodyPosition.y + 1.2,
        rigidBodyPosition.z
      );
    });

    const resetUI = () => {
      targetPosition.current.copy(new Vector3(0, 0, 0));
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
          justifyContent="space-between"
          transformTranslateY="-2%"
        >
          <ProductDetail resetUI={resetUI} />
          <Container
            width="100%"
            height="25"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
          >
            <Container
              width="20%"
              height="20%"
              backgroundColor="white"
              borderRadius="12"
              hover={{
                width: "20.5%",
                height: "20.5%",
              }}
            />
          </Container>
        </Root>
      </group>
    );
  }
);

const ProductDetail = ({ resetUI }) => {
  const { selectedObjectData, setCurrentTexture, clearSelectedObject } =
    useModelStore();

  return (
    <Container
      flexDirection="column"
      flexGrow={1}
      borderRadius={12}
      padding="8"
      backgroundColor="white"
      backgroundOpacity="0.5"
    >
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
      <Container justifyContent="center" paddingTop={5}>
        <Container
          width="10%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          onClick={resetUI}
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

        <Container flexGrow={1} alignItems="center" justifyContent="center">
          <Text fontSize="8" fontWeight="bold">
            {selectedObjectData.name}
          </Text>
        </Container>

        <Container
          width="10%"
          height="100%"
          justifyContent="center"
          alignItems="center"
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
      </Container>
    </Container>
  );
};
