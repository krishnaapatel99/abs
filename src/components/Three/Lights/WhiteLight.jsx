import { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { RectAreaLightHelper } from "three-stdlib";

export default function WhiteLight() {
  const light = useRef();

  useHelper(light, RectAreaLightHelper, "white");



  return (
    <rectAreaLight
    //   ref={light}
      position={[-4.7,0.3,8.3]}
      rotation={[-1.98,-0.17,0.05]}
      width={2.7}
      height={3.1}
      intensity={2.1}
      color="white"
    />
  );
}
// -7.0,3.9,8.9,-1.18.-0.39,-0.21,,19.0,5.0,5.0