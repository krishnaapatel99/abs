import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function BloomEffect() {
  

  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        intensity={0.93}
        luminanceThreshold={0.00}
        luminanceSmoothing={0.72}
      />
    </EffectComposer>
  );
}