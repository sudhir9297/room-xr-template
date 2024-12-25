import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Container, Image, Root } from "@react-three/uikit";
import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { DraggableObject, useDragConstraint } from "./GrabHelper";
import { Scale } from "@react-three/uikit-lucide";

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
        <Root
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          positionType="relative"
          pixelSize={0.002}
          sizeX={0.4}
          sizeY={0.1}
          name="UI2"
        >
          <Container
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            backgroundColor="black"
            borderRadius={2.5}
            name="UI3"
          >
            <Container
              width="60%"
              height="20%"
              borderRadius={12}
              justifyContent="center"
              backgroundColor="#f2f2f2"
              name="UI4"
            ></Container>
          </Container>
        </Root>

        <DraggableObject
          dragConstraints={{
            minY: 0,
            maxY: 10,
            minX: -5,
            maxX: 5,
          }}
          lookAtTarget={{ x: 0, y: 1.5, z: 0 }}
          rigidBodyRef={rigidBodyRef}
        >
          <Root
            positionType="relative"
            pixelSize={0.002}
            sizeX={0.5}
            sizeY={0.5}
            justifyContent="center"
            alignItems="center"
            backgroundColor="black"
            borderRadius={2.5}
            name="UI5"
          >
            <Container
              width="60%"
              height="60%"
              borderRadius={12}
              justifyContent="center"
              alignItems="center"
              backgroundColor="green"
              name="UI6"
              padding={4}
              onPointerEnter={(e) => e.currentObject.scale.setScalar(1.2)}
              onPointerLeave={() => dragGroupRef.current.scale.setScalar(1)}
            >
              <UI />
            </Container>
          </Root>
        </DraggableObject>
      </group>
    </>
  );
};

const UI = () => {
  return (
    <Container
      width="50%"
      height="50%"
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
