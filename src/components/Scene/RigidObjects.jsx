import { usePickObject } from "@/hooks/usePickObject";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function RigidObjects() {
  const bind = usePickObject();

  return (
    <group {...bind} position={[5, 0, 0]}>
      {/* Rigid body boxes */}

      <RigidBody position={[0, 5, 2]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[0, 4, 2]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[0, 4, 0]} colliders={false}>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[0, 4, -2]} colliders={false}>
        <CuboidCollider args={[1.5 / 2, 1.5 / 2, 1.5 / 2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[0, 4, -5]} colliders={false}>
        <CuboidCollider args={[1, 1, 1]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
    </group>
  );
}
