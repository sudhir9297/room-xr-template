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
      <Sun width="8" height="8" color="white" />,
      <ShoppingBagIcon width="8" height="8" color="white" />,
      <Settings width="8" height="8" color="white" />,
      <LogOut width="8" height="8" color="white" />,
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
            height="50%"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="4"
            borderRadius="8"
            backgroundOpacity="0.25"
            borderWidth="0.3"
            borderColor="grey"
            borderOpacity="0.5"
          >
            <Container
              width="15"
              height="15"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              hover={{
                backgroundColor: "#2D82fe",
              }}
              onClick={resetUI}
            >
              <RotateCcw width="8" height="8" color="white" />
            </Container>
            {IconList.map((el, idx) => (
              <Container
                key={idx}
                width="15"
                height="15"
                justifyContent="center"
                alignItems="center"
                borderRadius={4}
                hover={{
                  backgroundColor: "#2D82fe",
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
