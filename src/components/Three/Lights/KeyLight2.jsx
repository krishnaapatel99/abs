import { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function KeyLight2() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "#FF98A2");

 

  return (
    <rectAreaLight
      // ref={light}
      position={[-4.9, -0.2, 7.7]}
      rotation={[-1.79, -0.12, 1.58]}
      width={2.5}
      height={2.9}
      intensity={43.3}
      color="#FF98A2"
    />
  );
}
// -7.0,3.9,8.9,-1.18.-0.39,-0.21,,19.0,5.0,5.0