import { useRef } from "react";

export default function KeyLight3() {
  const light = useRef();

  const posX = -2.7;
  const posY = 18.0;
  const posZ = -6.0;
  const rotX = -0.58;
  const rotY = -3.49;
  const rotZ = 1.65;
  const width = 2.2;
  const height = 8.3;
  const intensity = 50.7;
  const color = "#ff98a2";

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