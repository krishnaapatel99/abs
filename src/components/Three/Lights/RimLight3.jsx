import { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function RimLight3() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "#FF98A2");

  

  return (
    <rectAreaLight
      // ref={light}
      position={[-6.6, -3.7, -1.8]}
      rotation={[-0.09, -1.83, 0.09]}
      width={1.2}
      height={2.2}
      intensity={7.8}
      color="#FF98A2"
    />
  );
}

// -7.0,4.5,7.7,-1.18,-0.39,-0.20,19.0,5.0,5.0