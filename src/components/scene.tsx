"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Model } from "./model";

export default function Scene() {
  return (
    <>
      <p className="absolute inset-0 flex justify-center items-center text-center z-0 text-7xl sm:text-8xl lg:text-9xl">Anas Attoum</p>
      <Canvas>
        <Environment preset="city" />
        <directionalLight intensity={3} position={[0, 3, 2]} />
        <Model />
      </Canvas>
    </>
  );
}
