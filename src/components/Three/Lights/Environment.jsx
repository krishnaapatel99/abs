import { Environment } from "@react-three/drei";

export default function EnvironmentLight() {
  return (
    <Environment
      files="/hdri/studio_small_09_2k.hdr"
      background={false}
      environmentIntensity={0.03}
    />
  );
}