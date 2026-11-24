
import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShowcaseCar({
  modelPath = "/models/bugatti_chiron.glb",
  rotationOffset = 1.5,
}) {
  const carRef = useRef();
  const { scene } = useGLTF(modelPath);

  const car = useMemo(() => {
    const model = scene.clone(true);

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const scale = 4.5 / Math.max(size.x, size.y, size.z);

    return {
      model,
      scale,
      offset: [
        -center.x * scale,
        -box.min.y * scale,
        -center.z * scale,
      ],
    };
  }, [scene]);

  useFrame((state) => {
    if (!carRef.current) return;

    const t = state.clock.elapsedTime;

    carRef.current.position.z = 0;
    carRef.current.position.x = Math.sin(t * 0.6) * 0.08;

    carRef.current.position.y =
      -0.62 + Math.sin(t * 3) * 0.018;

    carRef.current.rotation.y =
  rotationOffset + Math.sin(t * 0.6) * 0.02;

    carRef.current.rotation.z = Math.sin(t * 1.5) * 0.003;
  });

  return (
    <group ref={carRef} position={[0, -0.62, 0]}>
      <group position={car.offset}>
        <group scale={car.scale}>
          <primitive object={car.model} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/bugatti_chiron.glb");
