import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CameraRig from "./CameraRig";
import ToneMapping from "../Effects/ToneMapping";
import BloomEffect from "../Effects/BloomEffect";
import StarField from "../Effects/StarField";

export default function Experience({ showModel }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -10 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <StarField />

        <Suspense fallback={null}>
          <CameraRig />
        </Suspense>

        <ToneMapping />
        <BloomEffect />
        <Preload all />

        {/* <OrbitControls ... /> */}
      </Canvas>
    </div>
  );
}