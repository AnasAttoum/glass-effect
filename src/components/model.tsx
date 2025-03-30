import React from "react";
import * as THREE from 'three';
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/Addons.js";

type GLTFResult = GLTF & {
  nodes: {
    Torus002: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export function Model() {
  const { nodes, materials } = useGLTF("/glb/glass.glb") as unknown as GLTFResult;

  const { viewport } = useThree();
  return (
    <group scale={viewport.width / 4} dispose={null}>
      <group name="Scene">
        <mesh
          name="Torus002"
          castShadow
          receiveShadow
          geometry={nodes.Torus002.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/glb/glass.glb");
