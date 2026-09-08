import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Camcorder from "./Camcorder";
import KeyLight1 from "../Lights/KeyLight1";
import KeyLight2 from "../Lights/KeyLight2";
import KeyLight3 from "../Lights/KeyLight3";
import KeyLight4 from "../Lights/KeyLight4";

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// BASE OFFSET
// =============================================================================

const BASE_OFFSET = { x: -2, y: -16.3, z: -7.6 };

// =============================================================================
// SCROLL PATH — POSITION
// =============================================================================

const PATH = [
  { at: 0.00, x: 3.0, y: -11.0, z: 1.0 },
  { at: 0.04, x: 10.0, y: -0.5, z: -1.5 },
  { at: 0.34, x: 8.0, y: -0.5, z: -1.5 },
  { at: 0.40, x: 3.0, y: -0.2, z: -1.5 },
  { at: 0.85, x: -45.0, y:3.0, z: -2.0 },
];

// =============================================================================
// ROTATION — CUSTOM ROTATION CHECKPOINTS
// =============================================================================

const ROTATION_PATH = [
  { at: 0.00, rotation: 0 },
  { at: 0.04, rotation: THREE.MathUtils.degToRad(-90) },
  { at: 0.08, rotation: THREE.MathUtils.degToRad(-180) },
  { at: 0.34, rotation: THREE.MathUtils.degToRad(-450) },
  { at: 0.40, rotation: THREE.MathUtils.degToRad(-520) },
  { at: 0.85, rotation: THREE.MathUtils.degToRad(-600) },
];

// =============================================================================
// ROTATION SETTINGS
// =============================================================================

const SCROLL_ROTATION = {
  xTilt: THREE.MathUtils.degToRad(-8),
  zTilt: THREE.MathUtils.degToRad(3),
};

// =============================================================================
// IDLE AMBIENT SWAY
// =============================================================================

const IDLE_SWAY = {
  posX: { amplitude: 0.12, speed: 0.28 },
  posY: { amplitude: 0.08, speed: 0.19 },
  posZ: { amplitude: 0.04, speed: 0.23 },

  rotX: { amplitude: 0.010, speed: 0.17 },
  rotY: { amplitude: 0.025, speed: 0.22 },
  rotZ: { amplitude: 0.006, speed: 0.13 },
};

// =============================================================================
// SMOOTHNESS
// =============================================================================

const LERP_FACTOR = 0.12;

// =============================================================================
// Helper: interpolate position along PATH
// =============================================================================

function samplePath(progress) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < PATH.length - 1 && PATH[i + 1].at <= p) {
    i++;
  }
  if (i >= PATH.length - 1) {
    const last = PATH[PATH.length - 1];
    return { x: last.x, y: last.y, z: last.z };
  }
  const a = PATH[i];
  const b = PATH[i + 1];
  const segLen = b.at - a.at;
  const t = segLen > 0 ? (p - a.at) / segLen : 0;
  return {
    x: THREE.MathUtils.lerp(a.x, b.x, t),
    y: THREE.MathUtils.lerp(a.y, b.y, t),
    z: THREE.MathUtils.lerp(a.z, b.z, t),
  };
}

// =============================================================================
// Helper: interpolate rotation along ROTATION_PATH
// =============================================================================

function sampleRotation(progress) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < ROTATION_PATH.length - 1 && ROTATION_PATH[i + 1].at <= p) {
    i++;
  }
  if (i >= ROTATION_PATH.length - 1) {
    return ROTATION_PATH[ROTATION_PATH.length - 1].rotation;
  }
  const a = ROTATION_PATH[i];
  const b = ROTATION_PATH[i + 1];
  const segLen = b.at - a.at;
  const t = segLen > 0 ? (p - a.at) / segLen : 0;
  return THREE.MathUtils.lerp(a.rotation, b.rotation, t);
}

// =============================================================================
// CameraRig Component
// =============================================================================

export default function CameraRig() {
  const outerRef = useRef();
  const innerRef = useRef();

  const scrollProgress = useRef(0);

  const rigScale = 1;

  // ===========================================================================
  // SCROLLTRIGGER
  // ===========================================================================

  useEffect(() => {
    let trigger = null;
    let timer = null;

    const setupTrigger = () => {
      const marker = document.getElementById("camera-rig-scroll-end");

      trigger = ScrollTrigger.create({
        start: 0,
        endTrigger: marker || document.body,
        end: marker ? "bottom top" : "max",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = THREE.MathUtils.clamp(self.progress, 0, 1);
        },
      });

      ScrollTrigger.refresh();
    };

    timer = setTimeout(setupTrigger, 200);

    return () => {
      if (timer) clearTimeout(timer);
      if (trigger) trigger.kill();
    };
  }, []);

  // ===========================================================================
  // LERP STATE — initialized to the correct starting pose, not the origin,
  // so the model doesn't visibly lerp in from (0,0,0) on mount.
  // ===========================================================================

  const initialPos = samplePath(scrollProgress.current);
  const initialRotY = sampleRotation(scrollProgress.current);

  const targetPos = useRef(
    new THREE.Vector3(
      BASE_OFFSET.x + initialPos.x,
      BASE_OFFSET.y + initialPos.y,
      BASE_OFFSET.z + initialPos.z
    )
  );

  const currentPos = useRef(
    new THREE.Vector3(
      BASE_OFFSET.x + initialPos.x,
      BASE_OFFSET.y + initialPos.y,
      BASE_OFFSET.z + initialPos.z
    )
  );

  const targetRot = useRef({
    x: SCROLL_ROTATION.xTilt,
    y: initialRotY,
    z: SCROLL_ROTATION.zTilt,
  });

  const currentRot = useRef({
    x: SCROLL_ROTATION.xTilt,
    y: initialRotY,
    z: SCROLL_ROTATION.zTilt,
  });

  // ===========================================================================
  // PER-FRAME ANIMATION
  // ===========================================================================

  useFrame((state) => {
    if (!outerRef.current || !innerRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    const sp = scrollProgress.current;

    outerRef.current.visible = sp < 0.85;

    const lf = LERP_FACTOR;

    const pathPos = samplePath(sp);

    const swayX = Math.sin(t * IDLE_SWAY.posX.speed) * IDLE_SWAY.posX.amplitude;
    const swayY = Math.sin(t * IDLE_SWAY.posY.speed + 1.3) * IDLE_SWAY.posY.amplitude;
    const swayZ = Math.sin(t * IDLE_SWAY.posZ.speed + 0.7) * IDLE_SWAY.posZ.amplitude;

    const swayRotX = Math.sin(t * IDLE_SWAY.rotX.speed + 0.5) * IDLE_SWAY.rotX.amplitude;
    const swayRotY = Math.sin(t * IDLE_SWAY.rotY.speed) * IDLE_SWAY.rotY.amplitude;
    const swayRotZ = Math.sin(t * IDLE_SWAY.rotZ.speed + 2.1) * IDLE_SWAY.rotZ.amplitude;

    targetPos.current.set(
      BASE_OFFSET.x + pathPos.x + swayX,
      BASE_OFFSET.y + pathPos.y + swayY,
      BASE_OFFSET.z + pathPos.z + swayZ
    );

    const scrollRotY = sampleRotation(sp);

    targetRot.current.x = SCROLL_ROTATION.xTilt + swayRotX;
    targetRot.current.y = scrollRotY + swayRotY;
    targetRot.current.z = SCROLL_ROTATION.zTilt + swayRotZ;

    currentPos.current.lerp(targetPos.current, lf);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRot.current.x, lf);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRot.current.y, lf);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, targetRot.current.z, lf);

    outerRef.current.position.copy(currentPos.current);
    outerRef.current.scale.setScalar(rigScale);

    innerRef.current.rotation.set(
      currentRot.current.x,
      currentRot.current.y,
      currentRot.current.z
    );
  });

  // ===========================================================================
  // JSX
  // ===========================================================================

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <Camcorder />
        <KeyLight1 />
        <KeyLight2 />
        <KeyLight3 />
        <KeyLight4 />
      </group>
    </group>
  );
}