import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const SolarSystem = () => {
  const earthRef = useRef();
  const moonRef = useRef();

  // Configuration
  const sunRadius = 2;
  const earthRadius = 0.6;
  const moonRadius = 0.2;
  const earthOrbitRadius = 8;
  const moonOrbitRadius = 1.5;
  const earthOrbitSpeed = 0.5;
  const moonOrbitSpeed = 2; // Moon orbits faster than Earth

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Update Earth's position
    if (earthRef.current) {
      earthRef.current.position.x =
        Math.cos(time * earthOrbitSpeed) * earthOrbitRadius;
      earthRef.current.position.z =
        Math.sin(time * earthOrbitSpeed) * earthOrbitRadius;
      earthRef.current.rotation.y += 0.02;
    }

    // Update Moon's position relative to Earth
    if (moonRef.current && earthRef.current) {
      const moonTime = time * moonOrbitSpeed;
      moonRef.current.position.x =
        earthRef.current.position.x + Math.cos(moonTime) * moonOrbitRadius;
      moonRef.current.position.z =
        earthRef.current.position.z + Math.sin(moonTime) * moonOrbitRadius;
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Sun */}
      <Sphere args={[sunRadius, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={2}
        />
      </Sphere>

      {/* Sun's glow */}
      <Sphere args={[sunRadius + 0.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FDB813"
          transparent
          opacity={0.3}
          emissive="#FDB813"
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Earth */}
      <Sphere
        ref={earthRef}
        args={[earthRadius, 32, 32]}
        position={[earthOrbitRadius, 0, 0]}
      >
        <meshStandardMaterial color="#2C5BA1" metalness={0.2} roughness={0.8} />
      </Sphere>

      {/* Moon */}
      <Sphere
        ref={moonRef}
        args={[moonRadius, 32, 32]}
        position={[earthOrbitRadius + moonOrbitRadius, 0, 0]}
      >
        <meshStandardMaterial color="#C4C4C4" metalness={0.2} roughness={0.8} />
      </Sphere>

      {/* Earth's orbit line */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry
            args={[earthOrbitRadius - 0.1, earthOrbitRadius + 0.1, 64]}
          />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            side={2}
          />
        </mesh>
      </group>
    </group>
  );
};

export default SolarSystem;
