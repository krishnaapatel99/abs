import { useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function KeyLight() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "#FF98A2");



  return (
    <rectAreaLight
      // ref={light}
      position={[-4.7, 0.0, 2.7]}
      rotation={[-1.98, -0.17, 0.75]}
      width={4.2}
      height={3.1}
      intensity={50.0}
      color="#FF98A2"
    />
  );
}
// -7.0,3.9,8.9,-1.18.-0.39,-0.21,,19.0,5.0,5.0