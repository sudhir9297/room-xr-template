import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import { Container, Image, Root, Text } from "@react-three/uikit";
import { useModelStore } from "@/Store/index.js";

const FloatingUI = ({
  distance = 0.56,
  offset = [0, 0, 0],
  lerpFactor = 0.1,
}) => {
  const { camera } = useThree();
  const rootRef = useRef();
  const targetPos = useRef(new Vector3());
  const currentPos = useRef(new Vector3());
  const positionHelper = useRef(new Vector3());
  const quaternionHelper = useRef(new Quaternion());
  const currentQuaternion = useRef(new Quaternion());

  useFrame(() => {
    if (!rootRef.current) return;

    // Get camera position and rotation
    camera.matrixWorld.decompose(
      positionHelper.current,
      quaternionHelper.current,
      new Vector3()
    );

    // Calculate target position in front of camera
    targetPos.current
      .set(0, 0, -distance)
      .applyQuaternion(quaternionHelper.current)
      .add(positionHelper.current);

    // Add offset
    targetPos.current.add(new Vector3(...offset));

    // Get current position
    currentPos.current.copy(rootRef.current.position);

    // Lerp position
    currentPos.current.lerp(targetPos.current, lerpFactor);
    rootRef.current.position.copy(currentPos.current);

    // Lerp rotation
    currentQuaternion.current.copy(rootRef.current.quaternion);
    currentQuaternion.current.slerp(quaternionHelper.current, lerpFactor);
    rootRef.current.quaternion.copy(currentQuaternion.current);
  });

  return (
    <group ref={rootRef}>
      <Root
        positionType="relative"
        anchorY="top"
        pixelSize={0.002}
        sizeX={0.2}
        sizeY={0.2}
      >
        <ProductDetail />
      </Root>
    </group>
  );
};

export default FloatingUI;

const ProductDetail = ({ handleVariationClick }) => {
  const { selectedObject, setCurrentVariation, removeSelectedObject } =
    useModelStore();

  const { thumbnail, name, desc, variation } = selectedObject;

  return (
    <Container flexDirection="column" padding="4">
      <Container
        justifyContent="flex-end"
        alignItems="flex-end"
        marginBottom={2}
      >
        <Text
          fontSize={4}
          width={8}
          height={8}
          padding={2.5}
          borderRadius={12}
          color="#535665"
          backgroundColor="white"
          fontWeight="semi-bold"
          onClick={() => removeSelectedObject()}
        >
          X
        </Text>
      </Container>
      <Container backgroundColor="white" padding={4} borderRadius={4}>
        <Container
          height="100%"
          flexDirection="column"
          gap={4}
          overflow="scroll"
          scrollbarWidth={0}
        >
          <Container
            width="100%"
            height="100%"
            justifyContent="center"
            backgroundColor="#f2f2f2"
            borderRadius={2.5}
          >
            <Image
              src={thumbnail}
              objectFit="cover"
              aspectRatio={1}
              onClick={() => handleVariationClick(el)}
            />
          </Container>
          <Text fontSize={6} fontWeight="semi-bold">
            {name}
          </Text>
          <Text fontSize={4} color="#535665">
            {desc}
          </Text>

          <Container width={"100%"} height={20} gap="3" marginTop={4}>
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
    </Container>
  );
};
