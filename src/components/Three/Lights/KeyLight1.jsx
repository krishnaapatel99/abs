import { useRef } from "react";

export default function KeyLight1() {
  const light = useRef();

  const posX = -10.9;
  const posY = 17.3;
  const posZ = 4.5;
  const rotX = -2.09;
  const rotY = -2.23;
  const rotZ = 0.18;
  const width = 1.8;
  const height = 5.7;
  const intensity = 47.7;
  const color = "#FF98A2";

  return (
    <rectAreaLight
      ref={light}
      position={[posX, posY, posZ]}
      rotation={[rotX, rotY, rotZ]}
      width={width}
      height={height}
      intensity={intensity}
      color={color}
    />
  );
}