import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function ToneMapping() {
  const { gl } = useThree();

  const exposure = 1.45;
  const toneMappingMode = THREE.ACESFilmicToneMapping;

  useEffect(() => {
    gl.toneMapping = toneMappingMode;
    gl.toneMappingExposure = exposure;
    gl.needsUpdate = true;
  }, [gl, toneMappingMode, exposure]);

  return null;
}