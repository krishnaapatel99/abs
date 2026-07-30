import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Lights from "../Lights/Lights";
import Camcorder from "./Camcorder";
import ToneMapping from "../Effects/ToneMapping";
import BloomEffect from "../Effects/BloomEffect";

function AnimatedRig() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    groupRef.current.position.x = Math.sin(t * 0.3) * 0.05;

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Lights />
      <Camcorder />
    </group>
  );
}

export default function Experience({ showModel }) {
  return (
    <div>
      {showModel && (
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
          }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ToneMapping />

          <AnimatedRig />

          <BloomEffect />
        </Canvas>
      )}
    </div>
  );
}