import { Float } from "@react-three/drei";
import { useState } from "react";

export function Sphere({
  floatIntensity = 15,
  position = [0, 5, -8],
  scale = 1,
}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Float floatIntensity={floatIntensity}>
      <mesh
        castShadow
        position={position}
        scale={scale}
        onClick={() => setIsClicked(!isClicked)}
      >
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          roughness={1}
          color={isClicked ? "lightblue" : "hotpink"}
        />
      </mesh>
    </Float>
  );
}
