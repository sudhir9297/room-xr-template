import { useFrame } from "@react-three/fiber";
import { Container, Image, Root, Text } from "@react-three/uikit";
import { RotateCcw, X } from "@react-three/uikit-lucide";
import { forwardRef, useEffect, useRef } from "react";
import { Vector3 } from "three";
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
        rigidBodyPosition.y + 0.8,
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
              height="15%"
              backgroundColor="white"
              borderRadius="12"
              hover={{
                width: "20.5%",
                height: "15.5%",
              }}
            />
          </Container>
        </Root>
      </group>
    );
  }
);

const ProductDetail = ({ resetUI }) => {
  const containerRef = useRef();
  const { selectedObjectData, setCurrentTexture, clearSelectedObject } =
    useModelStore();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollPosition.value = [0, 0];
    }
    return () => {};
  }, [selectedObjectData]);

  return (
    <Container
      flexDirection="column"
      flexGrow={1}
      borderRadius={8}
      padding="6"
      backgroundColor="white"
      backgroundOpacity="0.25"
      borderWidth="0.3"
      borderColor="grey"
      borderOpacity="0.5"
    >
      <Container
        flexGrow={1}
        overflow="scroll"
        scrollbarWidth={1}
        scrollbarColor="white"
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={4}
        ref={containerRef}
      >
        {selectedObjectData.textures.map((el, i) => (
          <Container
            key={i}
            width="30%"
            flexDirection="column"
            gap={2}
            marginBottom={5}
            backgroundColor="white"
            backgroundOpacity="0.4"
            padding={3}
            borderRadius={6}
            borderWidth="0.3"
            borderColor="grey"
            borderOpacity="0.5"
            hover={{
              borderWidth: "0.8",
            }}
          >
            <Image
              flexGrow={1}
              src={el.map}
              objectFit="cover"
              aspectRatio={1}
              onClick={() => setCurrentTexture(el)}
              borderRadius={6}
            />
            <Text
              paddingX="2"
              fontSize="6"
              fontWeight="semi-bold"
              color="white"
            >
              {el.name}
            </Text>
          </Container>
        ))}
      </Container>
      <Container justifyContent="center" paddingTop={4} paddingBottom={1}>
        <Container
          width="15"
          height="15"
          justifyContent="center"
          alignItems="center"
          borderRadius="5"
          hover={{
            backgroundColor: "#2D82fe",
          }}
          onClick={resetUI}
        >
          <RotateCcw width="8" height="8" color="white" />
        </Container>

        <Container flexGrow={1} alignItems="center" justifyContent="center">
          <Text fontSize="8" fontWeight="bold" color="white">
            {selectedObjectData.name}
          </Text>
        </Container>

        <Container
          width="15"
          height="15"
          justifyContent="center"
          alignItems="center"
          borderRadius="5"
          hover={{
            backgroundColor: "#FF5958",
          }}
          onClick={clearSelectedObject}
        >
          <X width="8" height="8" color="white" />
        </Container>
      </Container>
    </Container>
  );
};
