import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const MODEL_CONFIG = {
  posX: 0,
  posY: 0,
  posZ: 0,
  rotX: -0.49,
  rotY: -2.03,
  rotZ: -0.28,
  scale: 20,
  modelColor: "#281719",
  applyColor: true,
};

export default function Camcorder(props) {
  const { scene } = useGLTF("/models/camera_with_tripod.glb");

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
        }
        if (MODEL_CONFIG.applyColor) {
          if (!child.userData.customMaterial) {
            child.userData.customMaterial = child.material.clone();
          }
          child.userData.customMaterial.color.set(MODEL_CONFIG.modelColor);
          child.material = child.userData.customMaterial;
        } else {
          child.material = child.userData.originalMaterial;
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={MODEL_CONFIG.scale}
      rotation={[MODEL_CONFIG.rotX, MODEL_CONFIG.rotY, MODEL_CONFIG.rotZ]}
      position={[MODEL_CONFIG.posX, MODEL_CONFIG.posY, MODEL_CONFIG.posZ]}
      {...props}
    />
  );
}

useGLTF.preload("/models/camera_with_tripod.glb");