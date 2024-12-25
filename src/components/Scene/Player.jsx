import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Container, Image, Root } from "@react-three/uikit";
import { useXRControllerLocomotion, XROrigin } from "@react-three/xr";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";

export const Player = () => {
  const { progress } = useProgress();
  const { camera } = useThree();

  const userRigidBodyRef = useRef(null);
  const dragGroupRef = useRef(null);
  const uiRef = useRef();

  const capsuleRef = useRef(null);

  const isDragging = useRef(false);
  const lastPosition = useRef(new Vector3());
  const dragOffset = useRef(new Vector3());

  const orbitAngle = useRef(0);
  const ORBIT_RADIUS = 2;

  useEffect(() => {
    if (progress === 100) {
      resetPlayerPosition();
    }
  }, []);

  const resetPlayerPosition = () => {
    // Get initial position from camera matrix
    const initialPosition = new Vector3().setFromMatrixPosition(camera.matrix);

    // If you have a VR player reference
    // if (capsuleRef.current) {
    //   camera.position.copy(
    //     capsuleRef.current.worldToLocal(initialPosition.clone())
    //   );
    // }

    // Set new player position
    const newPosition = new Vector3(
      initialPosition.x,
      initialPosition.y,
      initialPosition.z
    );

    // Update player position
    if (userRigidBodyRef.current) {
      userRigidBodyRef.current.setTranslation(newPosition, true);
    }
  };

  const updateCubePosition = (pointerPosition = null) => {
    if (!userRigidBodyRef.current || !dragGroupRef.current) return;

    const rigidBodyPosition = userRigidBodyRef.current.translation();
    let direction;

    if (pointerPosition) {
      if (!isDragging.current) {
        // Store initial click point
        lastPosition.current.set(pointerPosition.x, 0, pointerPosition.z);
        isDragging.current = true;
      }

      // Calculate angle from initial click point
      const dx = pointerPosition.x - rigidBodyPosition.x;
      const dz = pointerPosition.z - rigidBodyPosition.z;
      const targetAngle = Math.atan2(dz, dx);

      // Smooth angle transition
      const angleDiff = targetAngle - orbitAngle.current;
      orbitAngle.current += angleDiff * 0.1; // Adjust smoothing factor as needed
    }

    // Calculate orbital position
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
    // Update position with smoothing
    lastPosition.current.lerp(targetPosition, 0.1);
    dragGroupRef.current.position.copy(lastPosition.current);
    dragGroupRef.current.lookAt(
      rigidBodyPosition.x,
      rigidBodyPosition.y,
      rigidBodyPosition.z
    );

    uiRef.current.lookAt(
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
    if (userRigidBodyRef.current) {
      const currentLinvel = userRigidBodyRef.current.linvel();
      const newLinvel = {
        x: inputVector.x,
        y: currentLinvel.y,
        z: inputVector.z,
      };
      userRigidBodyRef.current.setLinvel(newLinvel, true);
      userRigidBodyRef.current.setRotation(
        new Quaternion().setFromEuler(rotationInfo),
        true
      );
    }
  };

  useXRControllerLocomotion(userMove);

  const onPointerDown = (e) => {
    isDragging.current = true;
  };
  const onPointerMove = (e) => {
    if (
      isDragging.current &&
      userRigidBodyRef.current &&
      dragGroupRef.current
    ) {
      updateCubePosition(e.point);
    }
  };
  const onPointerUp = (e) => {
    isDragging.current = false;
  };

  return (
    <>
      <RigidBody
        colliders={false}
        type="dynamic"
        position={[0, 1, 0]}
        enabledRotations={[false, false, false]}
        canSleep={false}
        ref={userRigidBodyRef}
      >
        <CapsuleCollider args={[0.3, 0.2]} />
        <XROrigin ref={capsuleRef} position={[0, 0, 0]} />
      </RigidBody>

      <group ref={dragGroupRef}>
        <mesh
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          position={[0, 0.3, 0]}
        >
          <boxGeometry args={[2, 0.3, 0.02]} />
          <meshStandardMaterial color="green" />
        </mesh>

        <group ref={uiRef}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[2, 1, 0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
          {/* <UI /> */}
        </group>
      </group>
    </>
  );
};

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
