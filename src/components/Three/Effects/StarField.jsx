import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { onLenisReady } from '../../../lib/lenisStore';

/**
 * StarField — drop-in background star layer for your existing Canvas.
 * Tuned for a perspective camera at roughly position [0,0,20], fov 45.
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
  wobbleAmp, wobbleSpeed, pushStrength, scrollPush, color,
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

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.opacity.value = opacity;
      materialRef.current.uniforms.pointSize.value = size;
      materialRef.current.uniforms.wobbleAmp.value = wobbleAmp;
      materialRef.current.uniforms.wobbleSpeed.value = wobbleSpeed;
      materialRef.current.uniforms.pushStrength.value = pushStrength;
    }
  }, [color, opacity, size, wobbleAmp, wobbleSpeed, pushStrength]);

  const starShader = useMemo(() => {
    return {
      uniforms: {
        color: { value: new THREE.Color(color) },
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
  }, []);

  return (
    <points key={`${count}-${spreadX}-${spreadY}-${zMin}-${zMax}`}>
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
  const baseScale = isLowEnd ? 0.6 : 1;

  const color = '#ffb8c8';
  const countScale = 1.0;
  const sizeScale = 0.5;
  const opacityScale = 2.00;
  const spreadX = 36;
  const spreadY = 18;
  const zMin = -10;
  const zMax = 6;
  const wobbleAmpScale = 1.0;
  const wobbleSpeedScale = 1.0;
  const pushStrengthScale = 1.0;

  const finalScale = baseScale * countScale;

  // Shared scroll-push value, mutated in place so every layer's shader
  // reads the same live number without triggering React re-renders.
  const scrollPush = useMemo(() => ({ value: 0 }), []);
  const velocityRef = useRef(0);
  const unsubscribeScrollRef = useRef(null);

  useEffect(() => {
    const unsubscribeReady = onLenisReady((lenis) => {
      function handleLenisScroll(e) {
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
        count={Math.max(1, Math.round(80 * finalScale))}
        size={0.15 * sizeScale}
        opacity={Math.min(1, 0.55 * opacityScale)}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.4 * wobbleAmpScale}
        wobbleSpeed={0.15 * wobbleSpeedScale}
        pushStrength={0.6 * pushStrengthScale}
        scrollPush={scrollPush}
        color={color}
      />
      <StarLayer
        count={Math.max(1, Math.round(35 * finalScale))}
        size={0.22 * sizeScale}
        opacity={Math.min(1, 0.75 * opacityScale)}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.5 * wobbleAmpScale}
        wobbleSpeed={0.2 * wobbleSpeedScale}
        pushStrength={1.0 * pushStrengthScale}
        scrollPush={scrollPush}
        color={color}
      />
      <StarLayer
        count={Math.max(1, Math.round(12 * finalScale))}
        size={0.3 * sizeScale}
        opacity={Math.min(1, 0.95 * opacityScale)}
        spreadX={spreadX}
        spreadY={spreadY}
        zMin={zMin}
        zMax={zMax}
        wobbleAmp={0.6 * wobbleAmpScale}
        wobbleSpeed={0.25 * wobbleSpeedScale}
        pushStrength={1.4 * pushStrengthScale}
        scrollPush={scrollPush}
        color={color}
      />
    </>
  );
}