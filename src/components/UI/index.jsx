import React, { useRef, useState } from "react";
import { ImageData, MenuData } from "@/constant/data";
import { useFrame, useThree } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import { Container, Image, Root, Text } from "@react-three/uikit";

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

  const [activeTab, setActiveTab] = useState("Home");
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <group ref={rootRef}>
      <Root
        borderRadius={4}
        positionType="relative"
        backgroundColor="white"
        anchorY="top"
        pixelSize={0.002}
        sizeX={0.2}
        sizeY={0.2}
      >
        <Container flexDirection={"column"}>
          <Container
            flexDirection="row"
            overflow="scroll"
            scrollbarWidth={4}
            padding="4"
            gap={16}
          >
            {MenuData.map((tab) => (
              <Text
                onClick={() => handleTabClick(tab.name)}
                fontSize={8}
                width={100}
              >
                {tab.name}
              </Text>
            ))}
          </Container>

          <Container
            flexShrink={1}
            flexDirection="row"
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent="center"
            overflow="scroll"
            gap={8}
            marginTop={4}
          >
            {ImageData.map((i) => (
              <ImageContainer key={i.name} data={i} activeTab={activeTab} />
            ))}
          </Container>
        </Container>
      </Root>
    </group>
  );
};

export default FloatingUI;

const ImageContainer = ({ data, activeTab }) => {
  return (
    <Container flexShrink={0} flexDirection="column">
      <Image
        borderRadius={3}
        src={data.cover}
        width={40}
        height={40}
        objectFit="cover"
        aspectRatio={1}
      />
      <Text fontWeight="medium" fontSize={5} lineHeight="100%" marginTop={3}>
        {activeTab}
      </Text>
      <Text fontWeight="medium" fontSize={4} lineHeight="100%">
        {data.name}
      </Text>
    </Container>
  );
};
