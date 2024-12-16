import { RigidBody, useRapier } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Slope() {
  // Load models
  const slopePlane = useGLTF("./slope.glb");
  const { world, rapier } = useRapier(); // Access the Rapier physics world

  const [dynamicObjects, setDynamicObjects] = useState([]);

  useFrame(() => {
    for (let i = 0; i < dynamicObjects.length; i++) {
      const po = dynamicObjects[i];
      const mesh = po.mesh;
      const collider = po.collider;
      mesh.position.copy(collider.translation());
      mesh.quaternion.copy(collider.rotation());
    }
  });

  const addPhysics = (child, rigidBodyType, colliderType) => {
    const meshPosition = child.position;

    // Create RigidBody
    const rigidBodyDesc = rapier.RigidBodyDesc[rigidBodyType]();
    rigidBodyDesc.setTranslation(
      meshPosition.x,
      meshPosition.y,
      meshPosition.z
    );
    rigidBodyDesc.setCanSleep(false);

    const rigidBody = world.createRigidBody(rigidBodyDesc);

    let colliderDesc;
    switch (colliderType) {
      default:
        const vertices = new Float32Array(
          child.geometry.attributes.position.array
        );
        const indices = new Uint32Array(child.geometry.index.array);
        colliderDesc = rapier.ColliderDesc.trimesh(vertices, indices);
        break;
    }

    const collider = world.createCollider(colliderDesc, rigidBody);

    return { rigidBody, collider };
  };

  useEffect(() => {
    // Receive Shadows
    slopePlane.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;
        const { rigidBody, collider } = addPhysics(child, "dynamic", "trimesh");

        setDynamicObjects((prev) => [
          ...prev,
          { mesh: child, collider: collider, rigidBody: rigidBody },
        ]);
      }
    });
  }, []);

  return <primitive object={slopePlane.scene} />;
}
