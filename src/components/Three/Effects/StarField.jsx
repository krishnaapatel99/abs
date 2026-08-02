import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { onLenisReady } from '../../../lib/lenisStore'; // adjust path to match your project structure

/**
 * StarField — drop-in background star layer for your existing Canvas.
 * Tuned for a perspective camera at roughly position [0,0,20], fov 45.
*
 * - Glow: tight crisp core + short soft falloff, matching your CSS .stars
 *   rule (small dot + short drop-shadow blur), normal blending so
 *   overlapping stars don't wash into a bright fog.
 * - Ambient motion: each star wobbles independently via a per-vertex
 *   random seed + time uniform (GPU-computed, cheap regardless of count).
 * - Scroll push: listening to page scroll adds an upward "kick" to all
 *   stars, proportional to how much/fast the user just scrolled, then
 *   decays back to rest — so scrolling reads as giving the stars a shove.
 */

function useStarBuffers(count, spreadX, spreadY, zMin, zMax) {
  return useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spreadX;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      pos[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
      seed[i] = Math.random() * Math.PI * 2;
    }
    return { pos, seed };
  }, [count, spreadX, spreadY, zMin, zMax]);
}

function StarLayer({
  count, size, opacity, spreadX, spreadY, zMin, zMax,
  wobbleAmp, wobbleSpeed, pushStrength, scrollPush,
}) {
  const materialRef = useRef();
  const { pos, seed } = useStarBuffers(count, spreadX, spreadY, zMin, zMax);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state) => {
    if (!materialRef.current) return;
    if (!prefersReducedMotion) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    materialRef.current.uniforms.scrollPush.value = scrollPush.value;
  });

  const starShader = useMemo(() => {
    return {
      uniforms: {
        color: { value: new THREE.Color('#ffb8c8') },
        opacity: { value: opacity },
        pointSize: { value: size },
        time: { value: 0 },
        wobbleAmp: { value: wobbleAmp },
        wobbleSpeed: { value: wobbleSpeed },
        pushStrength: { value: pushStrength },
        scrollPush: { value: 0 },
      },
      vertexShader: `
        uniform float pointSize;
        uniform float time;
        uniform float wobbleAmp;
        uniform float wobbleSpeed;
        uniform float pushStrength;
        uniform float scrollPush;
        attribute float aSeed;

        void main() {
          vec3 p = position;
          // Independent ambient wobble per star
          p.x += sin(time * wobbleSpeed + aSeed) * wobbleAmp;
          p.y += cos(time * wobbleSpeed * 0.8 + aSeed * 1.7) * wobbleAmp;
          // Scroll kick — same push applied to every star in this layer,
          // scaled by pushStrength so layers can react differently
          p.y += scrollPush * pushStrength;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = pointSize * (700.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float core = smoothstep(0.10, 0.0, dist);
          float halo = smoothstep(0.32, 0.10, dist) * 0.45;
          float alpha = clamp(core + halo, 0.0, 1.0) * opacity;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity, size, wobbleAmp, wobbleSpeed, pushStrength]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seed, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={starShader.uniforms}
        vertexShader={starShader.vertexShader}
        fragmentShader={starShader.fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </points>
  );
}

export default function StarField() {
  const isLowEnd =
    typeof navigator !== 'undefined' && navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 4
      : false;
  const scale = isLowEnd ? 0.6 : 1;

  const spreadX = 36;
  const spreadY = 18;
  const zMin = -10;
  const zMax = 6;

  // Shared scroll-push value, mutated in place so every layer's shader
  // reads the same live number without triggering React re-renders.
  const scrollPush = useMemo(() => ({ value: 0 }), []);
  const velocityRef = useRef(0);
  const unsubscribeScrollRef = useRef(null);

  useEffect(() => {
    // Lenis is created inside useLenis.js and registered into the shared
    // lenisStore. onLenisReady fires immediately if it's already set up,
    // or waits until it is — handles either mount order safely.
    const unsubscribeReady = onLenisReady((lenis) => {
      function handleLenisScroll(e) {
        // e.velocity is Lenis's own smoothed scroll speed — no need to
        // compute a delta ourselves like with native scroll events.
        velocityRef.current += e.velocity * 0.004;
        velocityRef.current = THREE.MathUtils.clamp(velocityRef.current, -3, 3);
      }
      lenis.on('scroll', handleLenisScroll);
      unsubscribeScrollRef.current = () => lenis.off('scroll', handleLenisScroll);
    });

    return () => {
      unsubscribeReady();
      if (unsubscribeScrollRef.current) unsubscribeScrollRef.current();
    };
  }, []);

  useFrame(() => {
    // Decay the kick back to rest each frame (spring-less easing)
    velocityRef.current *= 0.9;
    scrollPush.value = velocityRef.current;
  });

  return (
    <>
      <StarLayer
        count={Math.round(80 * scale)}
        size={0.15}
        opacity={0.55}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.4}
        wobbleSpeed={0.15}
        pushStrength={0.6}
        scrollPush={scrollPush}
      />
      <StarLayer
        count={Math.round(35 * scale)}
        size={0.22}
        opacity={0.75}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.5}
        wobbleSpeed={0.2}
        pushStrength={1}
        scrollPush={scrollPush}
      />
      <StarLayer
        count={Math.round(12 * scale)}
        size={0.3}
        opacity={0.95}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.6}
        wobbleSpeed={0.25}
        pushStrength={1.4}
        scrollPush={scrollPush}
      />
    </>
  );
}

/**
 * TUNING NOTES
 * - Scroll push too weak/strong: adjust the 0.15 multiplier in
 *   handleLenisScroll (bigger = stronger kick per unit of Lenis velocity).
 * - Kick lingers too long/fades too fast: adjust the 0.9 decay factor in
 *   the top-level useFrame (closer to 1 = lingers longer, closer to 0 =
 *   snaps back faster).
 * - Want bigger/brighter stars to react more to scroll than dim ones:
 *   already set up via `pushStrength` per layer above — raise/lower those.
 * - Glow/wobble tuning: see notes from the previous version (opacity per
 *   layer, the 700.0 size constant, wobbleAmp/wobbleSpeed).
 */