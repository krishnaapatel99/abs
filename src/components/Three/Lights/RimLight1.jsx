import { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function RimLight1() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "#FF98A2");

 

  return (
    <rectAreaLight
      // ref={light}
      position={[-4.8, -7.4, 0.8]}
      rotation={[-1.82, 2.87, 1.13]}
      width={3.5}
      height={3.5}
      intensity={46.6}
      color="#FF98A2"
    />
  );
}

// -7.0,4.5,7.7,-1.18,-0.39,-0.20,19.0,5.0,5.0