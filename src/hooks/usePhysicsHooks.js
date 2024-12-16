import { useState } from "react";
import { useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

// Custom hook to manage physics objects
export const usePhysicsObjects = () => {
  const [dynamicObjects, setDynamicObjects] = useState([]);
  const [staticObjects, setStaticObjects] = useState([]);
  const { world, rapier } = useRapier();

  // Centralized physics object addition function
  const addPhysics = (
    mesh,
    rigidBodyType,
    colliderType,
    autoAnimate = true,
    postPhysicsFn,
    colliderSettings,
    isCustomCollider = false
  ) => {
    const physics = world;
    const physicsObjectList = [];

    // Create rigid body description
    const rigidBodyDesc = rapier.RigidBodyDesc[rigidBodyType]();
    rigidBodyDesc
      .setTranslation(
        isCustomCollider ? mesh.parent.position.x : mesh.position.x,
        isCustomCollider ? mesh.parent.position.y : mesh.position.y,
        isCustomCollider ? mesh.parent.position.z : mesh.position.z
      )
      .setCanSleep(false);

    const rigidBody = physics.createRigidBody(rigidBodyDesc);
    let colliderDesc;

    // Collider type selection (similar to your original implementation)
    switch (colliderType) {
      case "convexHull":
        {
          const points = new Float32Array(
            mesh.geometry.attributes.position.array
          );
          colliderDesc = rapier.ColliderDesc.convexHull(points)
            .setMass(1)
            .setRestitution(0.5);
        }
        break;
      case "cuboid":
        {
          const { width, height, depth } = colliderSettings;
          colliderDesc = rapier.ColliderDesc.cuboid(width, height, depth);
        }
        break;
      // ... other cases (ball, capsule, cylinder) remain the same
      default:
        {
          const vertices = new Float32Array(
            mesh.geometry.attributes.position.array
          );
          let indices = new Uint32Array(mesh.geometry.index.array);
          colliderDesc = rapier.ColliderDesc.trimesh(vertices, indices)
            .setMass(0.5)
            .setRestitution(0.1);
        }
        break;
    }

    if (!colliderDesc) {
      console.error("Collider Mesh Error: convex mesh creation failed.");
      return [];
    }

    const collider = physics.createCollider(colliderDesc, rigidBody);

    // Handle custom colliders and mesh tracking
    if (isCustomCollider) {
      mesh.parent.traverse((child) => {
        if (child.isMesh && child.name.split("_")[0] !== "collider") {
          child.castShadow = true;
          child.receiveShadow = true;

          const physicsObject = {
            mesh: child,
            parent: mesh.parent,
            collider,
            rigidBody,
            fn: postPhysicsFn,
            autoAnimate,
          };

          if (rigidBodyType === "dynamic") {
            setDynamicObjects((prev) => [...prev, physicsObject]);
          } else {
            setStaticObjects((prev) => [...prev, physicsObject]);
          }
        }
      });
    } else {
      const physicsObject = {
        mesh: mesh,
        collider,
        rigidBody,
        fn: postPhysicsFn,
        autoAnimate,
      };

      if (rigidBodyType === "dynamic") {
        setDynamicObjects((prev) => [...prev, physicsObject]);
      } else {
        setStaticObjects((prev) => [...prev, physicsObject]);
      }
    }

    return physicsObjectList;
  };

  // Reusable frame update logic
  const updatePhysicsObjects = (objects) => {
    objects.forEach((po) => {
      if (po.autoAnimate) {
        const mesh = po.mesh;
        const collider = po.collider;
        const parent = po.parent;

        if (parent) {
          parent.position.copy(collider.translation());
          parent.quaternion.copy(collider.rotation());
        } else {
          mesh.position.copy(collider.translation());
          mesh.quaternion.copy(collider.rotation());
        }

        // Optional post-physics function
        if (po.fn) {
          po.fn();
        }
      }
    });
  };

  useFrame(() => {
    updatePhysicsObjects([...dynamicObjects]);
  });

  return {
    addPhysics,
    dynamicObjects,
    staticObjects,
    setDynamicObjects,
    setStaticObjects,
  };
};
