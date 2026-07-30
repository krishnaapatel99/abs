import { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function RimLight2() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "#FF98A2");

 
  return (
    <rectAreaLight
      // ref={light}
      position={[-5.0, -5.0, 6.4]}
      rotation={[-2.09, -3.14, 1.01]}
      width={2.3}
      height={2.4}
      intensity={18.0}
      color="#FF98A2"
    />
  );
}

// -7.0,4.5,7.7,-1.18,-0.39,-0.20,19.0,5.0,5.0