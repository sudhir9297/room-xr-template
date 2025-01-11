import { useCombinedRefs } from "@/constant/utils";
import { useDragObject } from "@/hooks/useDragObject";
import { useFrame } from "@react-three/fiber";
import { Container, Root } from "@react-three/uikit";
import {
  LogOut,
  RotateCcw,
  Settings,
  ShoppingBagIcon,
  Sun,
} from "@react-three/uikit-lucide";
import { forwardRef, useRef } from "react";
import { Vector3 } from "three";

const currentPosition = new Vector3();

export const BottomPanelLayout = forwardRef(
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

    const IconList = [
      <Sun
        width="10"
        height="10"
        hover={{
          color: "white",
        }}
      />,
      <ShoppingBagIcon
        width="10"
        height="10"
        hover={{
          color: "white",
        }}
      />,
      <Settings
        width="10"
        height="10"
        hover={{
          color: "white",
        }}
      />,
      <LogOut
        width="10"
        height="10"
        hover={{
          color: "white",
        }}
      />,
    ];

    return (
      <group ref={combinedRef} {...props}>
        {children}
        <Root
          positionType="relative"
          anchorY="top"
          pixelSize={0.002}
          sizeX={0.5}
          sizeY={0.1}
          flexDirection="column"
        >
          <Container
            backgroundColor="white"
            backgroundOpacity="0.5"
            height="50%"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="6"
            borderRadius="12"
          >
            <Container
              padding="4"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              backgroundColor={"white"}
              backgroundOpacity={0.9}
              onClick={resetUI}
              hover={{
                backgroundOpacity: 1,
                backgroundColor: "#0064e0",
              }}
            >
              <RotateCcw
                width="10"
                height="10"
                hover={{
                  color: "white",
                }}
              />
            </Container>
            {IconList.map((el, idx) => (
              <Container
                key={idx}
                padding="4"
                justifyContent="center"
                alignItems="center"
                borderRadius={4}
                backgroundColor={"white"}
                backgroundOpacity={0.9}
                hover={{
                  backgroundOpacity: 1,
                  backgroundColor: "#FFC107",
                }}
              >
                {el}
              </Container>
            ))}
          </Container>
          <Container
            height="50%"
            width="100%"
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
