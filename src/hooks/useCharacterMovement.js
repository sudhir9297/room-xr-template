import { useXRControllerLocomotion } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { Euler, Quaternion } from "three";

export const useCharacterMovement = (
  rigidBodyRef,
  initialPosition = { x: 0, y: 0, z: 0 }
) => {
  const accumulatedRotationRef = useRef(0);
  const initialPositionRef = useRef(initialPosition);
  const [isMoving, setIsMoving] = useState(false);
  const movementTimeoutRef = useRef(null);

  const handleMovement = (inputVector, rotationInfo) => {
    if (!rigidBodyRef.current) return;

    // Check if there's actual movement
    const isActuallyMoving =
      Math.abs(inputVector.x) > 0.01 ||
      Math.abs(inputVector.z) > 0.01 ||
      (rotationInfo !== undefined && Math.abs(rotationInfo) > 0.01);

    // Update movement state
    if (isActuallyMoving) {
      setIsMoving(true);
      // Clear any existing timeout
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
      // Set new timeout to stop movement state
      movementTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 150); // Small delay to prevent flickering
    }

    // Handle linear velocity
    const currentLinvel = rigidBodyRef.current.linvel();
    const newLinvel = {
      x: inputVector.x,
      y: currentLinvel.y,
      z: inputVector.z,
    };
    rigidBodyRef.current.setLinvel(newLinvel, true);

    // Handle rotation with accumulation
    if (rotationInfo !== undefined) {
      accumulatedRotationRef.current += rotationInfo;

      const euler = new Euler(0, accumulatedRotationRef.current, 0, "YXZ");
      rigidBodyRef.current.setRotation(
        new Quaternion().setFromEuler(euler),
        true
      );
    }
  };

  const resetPosition = () => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(initialPositionRef.current, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  const setInitialPosition = (newPosition) => {
    initialPositionRef.current = newPosition;
  };

  const resetAll = () => {
    resetPosition();
    resetRotation();
  };

  const resetRotation = () => {
    accumulatedRotationRef.current = 0;
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setRotation(new Quaternion(), true);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  // Apply XR controller locomotion
  useXRControllerLocomotion(handleMovement);

  return {
    handleMovement,
    getAccumulatedRotation: () => accumulatedRotationRef.current,
    resetRotation,
    resetPosition,
    resetAll,
    setInitialPosition,
    getCurrentPosition: () => rigidBodyRef.current?.translation(),
    isMoving, // New state exposed
  };
};
