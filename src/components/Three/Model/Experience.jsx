import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Lights from "../Lights/Lights";
import Camcorder from "./Camcorder";
import ToneMapping from "../Effects/ToneMapping";
import BloomEffect from "../Effects/BloomEffect";
import StarField from "../Effects/StarField";



export default function Experience({ showModel }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45 }}
        >
          <StarField />
        </Canvas>
    
    </div>
  );
}