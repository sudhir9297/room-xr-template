import { Container, Image, Root } from "@react-three/uikit";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { TransformControls } from "@react-three/drei";

const UiTest = () => {
  const emptyGroupRef = useRef();
  const emptyGroupAngle = useRef(0);
  const uiRef = useRef();

  // Constants for orbital motion
  const CAPSULE_ORBIT_RADIUS = 5;
  const CAPSULE_ORBIT_SPEED = 0.1;

  useFrame((state, delta) => {
    // Update capsule position (orbiting center)
    emptyGroupAngle.current += delta * CAPSULE_ORBIT_SPEED;
    const capsuleX = Math.cos(emptyGroupAngle.current) * CAPSULE_ORBIT_RADIUS;
    const capsuleZ = Math.sin(emptyGroupAngle.current) * CAPSULE_ORBIT_RADIUS;
    emptyGroupRef.current.position.set(capsuleX, 0, capsuleZ);
    emptyGroupRef.current.lookAt(0, 0, 0);

    uiRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <group ref={emptyGroupRef} position={[CAPSULE_ORBIT_RADIUS, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="green" />
        </mesh>

        <group ref={uiRef} position={[2, 0.5, 2]}>
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[2, 2, 0.05]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          {/* <UI /> */}
        </group>
      </group>
    </>
  );
};

export default UiTest;

const UI = () => {
  return (
    <Root
      positionType="relative"
      anchorY="top"
      pixelSize={0.002}
      sizeX={1}
      sizeY={1}
    >
      <Container
        width="100%"
        height="100%"
        justifyContent="center"
        backgroundColor="#f2f2f2"
        borderRadius={2.5}
      >
        <Image
          src={"./texture/productThumbnail/vitra_eames.png"}
          objectFit="cover"
          aspectRatio={1}
          onClick={() => handleVariationClick(el)}
        />
      </Container>
    </Root>
  );
};
