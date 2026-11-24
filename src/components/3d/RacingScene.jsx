import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import ShowcaseCar from "./ShowcaseCar";

const ROAD_SPEED = 55;

function Road() {
  const markings = useRef([]);
  const arches = useRef([]);

  useFrame((_, delta) => {
    const movement = delta * ROAD_SPEED;

    // Move road markings toward the camera.
    markings.current.forEach((line) => {
      if (!line) return;

      line.position.z += movement;

      if (line.position.z > 15) {
        line.position.z = -190;
      }
    });

    // Move overhead highway structures toward the camera.
    arches.current.forEach((arch) => {
      if (!arch) return;

      arch.position.z += movement;

      if (arch.position.z > 20) {
        arch.position.z = -190;
      }
    });
  });

  return (
    <group>
      {/* MASSIVE HIGHWAY ASPHALT */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.67, -90]}
      >
        <planeGeometry args={[30, 220]} />
        <meshStandardMaterial
          color="#101722"
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* ROAD TEXTURE GLOW */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.655, -90]}
      >
        <planeGeometry args={[29, 220]} />
        <meshBasicMaterial
          color="#14243B"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* FOUR-LANE HIGHWAY MARKINGS */}
      {[-6, 0, 6].map((x, lane) =>
        Array.from({ length: 25 }).map((_, i) => (
          <mesh
            key={`${lane}-${i}`}
            ref={(el) => {
              markings.current[lane * 25 + i] = el;
            }}
            position={[x, -0.645, -i * 8]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.16, 3.8]} />
            <meshBasicMaterial color="#D7EFFF" />
          </mesh>
        ))
      )}

      {/* NEON HIGHWAY EDGE LIGHTS */}
      {[-13.5, 13.5].map((x) => (
        <group key={x}>
          <mesh
            position={[x, -0.52, -90]}
          >
            <boxGeometry args={[0.16, 0.12, 220]} />
            <meshBasicMaterial color="#087BFF" />
          </mesh>

          <mesh
            position={[x, -0.43, -90]}
          >
            <boxGeometry args={[0.045, 0.045, 220]} />
            <meshBasicMaterial
              color="#65DFFF"
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* HEAVY ROADSIDE BARRIERS */}
      {[-14.5, 14.5].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.15, -90]}>
            <boxGeometry args={[0.7, 1.5, 220]} />
            <meshStandardMaterial
              color="#202C40"
              metalness={0.8}
              roughness={0.35}
            />
          </mesh>

          <mesh position={[x, 0.9, -90]}>
            <boxGeometry args={[0.78, 0.12, 220]} />
            <meshBasicMaterial
              color="#087BFF"
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* FUTURISTIC OVERHEAD HIGHWAY ARCHES */}
      {Array.from({ length: 13 }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            arches.current[i] = el;
          }}
          position={[0, 0, -i * 15]}
        >
          {/* Left pillar */}
          <mesh position={[-14, 3.7, 0]}>
            <boxGeometry args={[0.3, 7.4, 0.35]} />
            <meshStandardMaterial
              color="#17283D"
              metalness={0.8}
            />
          </mesh>

          {/* Right pillar */}
          <mesh position={[14, 3.7, 0]}>
            <boxGeometry args={[0.3, 7.4, 0.35]} />
            <meshStandardMaterial
              color="#17283D"
              metalness={0.8}
            />
          </mesh>

          {/* Overhead beam */}
          <mesh position={[0, 7.3, 0]}>
            <boxGeometry args={[28, 0.22, 0.4]} />
            <meshStandardMaterial
              color="#203D5C"
              metalness={0.8}
            />
          </mesh>

          {/* Glowing arch lights */}
          <mesh position={[0, 7.15, 0]}>
            <boxGeometry args={[27, 0.08, 0.48]} />
            <meshBasicMaterial
              color="#168CFF"
              toneMapped={false}
            />
          </mesh>

          {/* Side light strips */}
          {[-14, 14].map((x) => (
            <mesh key={x} position={[x, 3.7, 0]}>
              <boxGeometry args={[0.08, 6.8, 0.42]} />
              <meshBasicMaterial
                color="#00BFFF"
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

const CAR_LINEUP = [
  {
    name: "BUGATTI CHIRON",
    path: "/models/bugatti_chiron.glb",
    rotation: 1.5,
  },
  {
    name: "LAMBORGHINI AVENTADOR",
    path: "/models/lamborghini_aventador.glb",
    rotation: 0,
  },
  {
    name: "MERCEDES-AMG GT",
    path: "/models/mercedes_amg.glb",
    rotation: 0,
  },
  {
    name: "ROLLS-ROYCE CULLINAN",
    path: "/models/rolls_royce.glb",
    rotation: 0,
  },
];


function RacingWorld() {
  const [activeCar, setActiveCar] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveCar((current) => (current + 1) % CAR_LINEUP.length);
  }, 8000);

  return () => clearInterval(interval);
}, []);

  const camera = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (camera.current) {
      camera.current.position.x =
        Math.sin(t * 0.25) * 0.08;

      camera.current.position.y =
        2.3 + Math.sin(t * 1.8) * 0.025;

      camera.current.lookAt(0, 0.4, -5);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[0, 2.3, 11]}
        fov={58}
      />

      <color attach="background" args={["#030711"]} />

      <fog attach="fog" args={["#030711", 35, 150]} />

      {/* Lighting */}
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 12, 8]}
        intensity={2.5}
        color="#D6EAFF"
      />

      <pointLight
        position={[-10, 4, -15]}
        intensity={45}
        color="#087BFF"
      />

      <pointLight
        position={[10, 4, -30]}
        intensity={45}
        color="#008CFF"
      />

      <pointLight
        position={[0, 5, 5]}
        intensity={25}
        color="#168CFF"
      />

      <Road />

   <Suspense fallback={null}>
  <ShowcaseCar
    key={CAR_LINEUP[activeCar].path}
    modelPath={CAR_LINEUP[activeCar].path}
    rotationOffset={CAR_LINEUP[activeCar].rotation}
  />
</Suspense>
</>
  );
}

export default function RacingScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <RacingWorld />
      </Canvas>
    </div>
  );
}
