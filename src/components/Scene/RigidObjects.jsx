import { Text } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";

export default function RigidObjects() {
  return (
    <group position={[10, 0, 0]}>
      {/* Rigid body boxes */}
      <RigidBody position={[0, 5, 2]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"hotpink"} />
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

      {/* Fun toy */}
      <RigidBody colliders={false} position={[0, 7, -10]}>
        <CylinderCollider args={[0.03, 2.5]} position={[0, 0.25, 0]} />
        <BallCollider args={[0.25]} />
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[2.5, 0.2, 0.5]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </RigidBody>
    </group>
  );
}
