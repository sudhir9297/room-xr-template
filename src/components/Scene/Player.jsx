import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Container, Content, Image, Root } from "@react-three/uikit";
import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { DraggableObject } from "./GrabHelper";
import { RotateCcw, GripVertical, Sun } from "@react-three/uikit-lucide";
import { Separator } from "../default/separator";

export const Player = () => {
  const { progress } = useProgress();
  const { camera } = useThree();
  const uiRef = useRef(null);
  const rigidBodyRef = useRef(null);
  const dragGroupRef = useRef(null);
  const capsuleRef = useRef(null);

  const isDragging = useRef(false);
  const lastPosition = useRef(new Vector3());
  const pointOffset = useRef(new Vector3());

  const orbitAngle = useRef(0);
  const ORBIT_RADIUS = 1;

  useEffect(() => {
    if (progress === 100) {
      resetPlayerPosition();
    }
  }, []);

  const resetPlayerPosition = () => {
    const initialPosition = new Vector3().setFromMatrixPosition(camera.matrix);
    const newPosition = new Vector3(
      initialPosition.x,
      initialPosition.y,
      initialPosition.z
    );

    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(newPosition, true);
    }
  };

  const updateCubePosition = (pointerPosition = null) => {
    if (!rigidBodyRef.current || !dragGroupRef.current) return;

    const rigidBodyPosition = rigidBodyRef.current.translation();
    let direction;

    if (pointerPosition) {
      // Apply the offset to maintain relative position from click point
      const adjustedPosition = new Vector3(
        pointerPosition.x - pointOffset.current.x,
        0,
        pointerPosition.z - pointOffset.current.z
      );

      if (!isDragging.current) {
        lastPosition.current.set(adjustedPosition.x, 0, adjustedPosition.z);
        isDragging.current = true;
      }

      const dx = adjustedPosition.x - rigidBodyPosition.x;
      const dz = adjustedPosition.z - rigidBodyPosition.z;
      const targetAngle = Math.atan2(dz, dx);

      const angleDiff = targetAngle - orbitAngle.current;
      orbitAngle.current += angleDiff * 0.1;
    }

    direction = new Vector3(
      Math.cos(orbitAngle.current),
      0,
      Math.sin(orbitAngle.current)
    );

    direction.multiplyScalar(ORBIT_RADIUS);

    const targetPosition = new Vector3(
      rigidBodyPosition.x + direction.x,
      rigidBodyPosition.y,
      rigidBodyPosition.z + direction.z
    );

    lastPosition.current.lerp(targetPosition, 0.1);
    dragGroupRef.current.position.copy(lastPosition.current);
    dragGroupRef.current.lookAt(
      rigidBodyPosition.x,
      rigidBodyPosition.y,
      rigidBodyPosition.z
    );
  };

  useFrame((state, delta) => {
    if (!isDragging.current) {
      updateCubePosition();
    }
  });

  const userMove = (inputVector, rotationInfo) => {
    if (rigidBodyRef.current) {
      const currentLinvel = rigidBodyRef.current.linvel();
      const newLinvel = {
        x: inputVector.x,
        y: currentLinvel.y,
        z: inputVector.z,
      };
      rigidBodyRef.current.setLinvel(newLinvel, true);
      rigidBodyRef.current.setRotation(
        new Quaternion().setFromEuler(rotationInfo),
        true
      );
    }
  };

  useXRControllerLocomotion(userMove);

  const onPointerDown = (e) => {
    isDragging.current = true;
    // Calculate and store the offset between pointer position and dragGroup position
    if (dragGroupRef.current) {
      pointOffset.current.set(
        e.point.x - dragGroupRef.current.position.x,
        0,
        e.point.z - dragGroupRef.current.position.z
      );
    }
    e.stopPropagation();
  };

  const onPointerMove = (e) => {
    if (isDragging.current && rigidBodyRef.current && dragGroupRef.current) {
      updateCubePosition(e.point);
    }
  };

  const onPointerUp = (e) => {
    isDragging.current = false;
  };

  // Rest of the component remains the same...
  return (
    <>
      <RigidBody
        colliders={false}
        type="dynamic"
        position={[0, 1, 0]}
        enabledRotations={[false, false, false]}
        canSleep={false}
        ref={rigidBodyRef}
      >
        <CapsuleCollider args={[0.6, 0.2]} />
        <XROrigin ref={capsuleRef} position={[0, 0, 0]} />
      </RigidBody>

      <group ref={dragGroupRef}>
        <DraggableObject
          dragConstraints={{
            minY: 0,
            maxY: 10,
            minX: -5,
            maxX: 5,
          }}
          rigidBodyRef={rigidBodyRef}
        >
          <UI />
        </DraggableObject>
        <Root
          positionType="relative"
          pixelSize={0.002}
          sizeX={0.5}
          sizeY={0.1}
          anchorY="top"
          name="dragGrab"
          backgroundColor={0xff0000}
          padding={12}
        >
          <Container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            backgroundColor={0xffffff}
            paddingY="2"
            backgroundOpacity={0.8}
            borderRadius={12}
            paddingX={2}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerOut={onPointerUp}
          >
            <Container
              width="20%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Sun
                width="12"
                height="12"
                hover={{
                  width: "14",
                  height: "14",
                }}
              />
            </Container>
            <Separator
              backgroundColor="black"
              backgroundOpacity={0.6}
              orientation="vertical"
              height="100%"
            />
            <Container width="100%" justifyContent="center" alignItems="center">
              <GripVertical
                width="12"
                height="12"
                hover={{
                  width: "14",
                  height: "14",
                }}
              />
            </Container>
            <Separator
              backgroundColor="black"
              backgroundOpacity={0.6}
              orientation="vertical"
              height="100%"
            />
            <Container width="20%" justifyContent="center" alignItems="center">
              <RotateCcw
                width="12"
                height="12"
                hover={{
                  width: "14",
                  height: "14",
                }}
              />
            </Container>
          </Container>
        </Root>
      </group>
    </>
  );
};

const UI = () => {
  return (
    <Container
      width="60%"
      height="60%"
      justifyContent="center"
      backgroundColor="#f2f2f2"
      borderRadius={2.5}
    >
      <Image
        src={"./texture/productThumbnail/vitra_eames.png"}
        objectFit="cover"
        aspectRatio={1}
        onClick={() => console.log("Clicked")}
      />
    </Container>
  );
};
