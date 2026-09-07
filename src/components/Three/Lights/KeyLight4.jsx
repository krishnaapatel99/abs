import { useRef } from "react";

export default function KeyLight4() {
  const light = useRef();

  const posX = -3.4;
  const posY = 17.7;
  const posZ = 8.0;
  const rotX = -1.99;
  const rotY = -3.93;
  const rotZ = 0.70;
  const width = 1.8;
  const height = 9.3;
  const intensity = 93.4;
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