
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Wheel({ position }) {
  const wheel = useRef();

  useFrame((_, delta) => {
    if (wheel.current) {
      wheel.current.rotation.x += delta * 12;
    }
  });

  return (
    <group ref={wheel} position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.36, 0.36, 0.22, 32]} />
        <meshStandardMaterial color="#101116" roughness={0.85} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.235, 32]} />
        <meshStandardMaterial
          color="#AEB7C5"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function RacingCar() {
  const car = useRef();

  useFrame((state) => {
    if (!car.current) return;

    const t = state.clock.elapsedTime;

    car.current.position.y = Math.sin(t * 3) * 0.025;
    car.current.rotation.z = Math.sin(t * 1.5) * 0.015;
  });

  return (
    <group ref={car} position={[0, -0.35, 0]}>

      {/* Main car body */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[1.9, 0.48, 3.5]} />
        <meshStandardMaterial
          color="#101B32"
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>

      {/* Front hood */}
      <mesh position={[0, 0.43, 1.15]} castShadow>
        <boxGeometry args={[1.78, 0.15, 1.05]} />
        <meshStandardMaterial
          color="#152A4D"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Rear body */}
      <mesh position={[0, 0.43, -1.2]} castShadow>
        <boxGeometry args={[1.85, 0.2, 0.85]} />
        <meshStandardMaterial color="#10203B" metalness={0.8} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.83, -0.25]} castShadow>
        <boxGeometry args={[1.42, 0.68, 1.7]} />
        <meshStandardMaterial
          color="#07101D"
          metalness={0.8}
          roughness={0.12}
        />
      </mesh>

      {/* Front windshield */}
      <mesh position={[0, 1.05, 0.45]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.7]} />
        <meshStandardMaterial
          color="#152D45"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Rear glass */}
      <mesh position={[0, 1.05, -0.9]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.65]} />
        <meshStandardMaterial color="#10243C" metalness={0.9} />
      </mesh>

      {/* Front headlights */}
      {[-0.65, 0.65].map((x) => (
        <group key={x} position={[x, 0.4, 1.77]}>
          <mesh>
            <boxGeometry args={[0.42, 0.1, 0.08]} />
            <meshStandardMaterial
              color="#DDF6FF"
              emissive="#49C8FF"
              emissiveIntensity={4}
            />
          </mesh>
        </group>
      ))}

      {/* Rear lights */}
      {[-0.65, 0.65].map((x) => (
        <mesh key={x} position={[x, 0.4, -1.77]}>
          <boxGeometry args={[0.42, 0.09, 0.08]} />
          <meshStandardMaterial
            color="#FF183D"
            emissive="#FF002B"
            emissiveIntensity={3}
          />
        </mesh>
      ))}

      {/* Wheels */}
      <Wheel position={[-0.98, -0.02, 1.05]} />
      <Wheel position={[0.98, -0.02, 1.05]} />
      <Wheel position={[-0.98, -0.02, -1.05]} />
      <Wheel position={[0.98, -0.02, -1.05]} />

      {/* Front bumper */}
      <mesh position={[0, 0.05, 1.82]}>
        <boxGeometry args={[1.8, 0.16, 0.22]} />
        <meshStandardMaterial color="#080C14" metalness={0.7} />
      </mesh>

      {/* Rear spoiler */}
      <mesh position={[0, 0.95, -1.65]}>
        <boxGeometry args={[1.8, 0.08, 0.28]} />
        <meshStandardMaterial color="#05080E" metalness={0.8} />
      </mesh>

    </group>
  );
}
