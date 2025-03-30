"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Model } from "./model";

export default function Scene() {
  return <Canvas>
    <Environment preset="city"/>
    <directionalLight intensity={3} position={[0,3,2]}/>
    <Model/>
  </Canvas>;
}
