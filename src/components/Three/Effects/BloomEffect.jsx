import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function BloomEffect() {
  const intensity = 6.93;
  const luminanceThreshold = 0.54;
  const luminanceSmoothing = 0.42;
  const mipmapBlur = true;
  const radius = 1.00;

  return (
    <EffectComposer>
      <Bloom
        mipmapBlur={mipmapBlur}
        intensity={intensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={luminanceSmoothing}
        radius={radius}
      />
    </EffectComposer>
  );
}