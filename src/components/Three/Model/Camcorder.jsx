import { useGLTF } from "@react-three/drei";

export default function Camcorder(props) {
  const { scene } = useGLTF("/models/camcorder.glb");

  return (
    <primitive
      object={scene}
      scale={0.4}
      rotation={[ -0.4,9.3
        ,-0.07]}
      position={[-5, -3, 4]}
      {...props}
    />
  );
}

useGLTF.preload("/models/camcorder.glb");