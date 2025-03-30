import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/Addons.js";

type GLTFResult = GLTF & {
  nodes: {
    Torus002: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Model() {
  const mesh = useRef<THREE.Mesh | null>(null);
  const { nodes, materials } = useGLTF(
    "/glb/glass.glb"
  ) as unknown as GLTFResult;

  const { viewport } = useThree();
  const [scaleFactor, setScaleFactor] = useState(viewport.width / 4.5);

  useEffect(() => {
    const animation = () => { 
      if(mesh.current){
        mesh.current.rotation.x += 0.01
     }
     requestAnimationFrame(animation)
    }
    const handleResize = () => {
      const newScale = window.innerWidth <= 768 ? viewport.width / 2 : viewport.width / 4.5;
      setScaleFactor(newScale);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    const frameId = requestAnimationFrame(animation);

    return ()=>{
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    }
  });

  const materialProps = {
    thickness: 0.2, // Lower thickness allows better visibility
    roughness: 0.05, // Keep roughness low for a clearer effect
    transmission: 0.98, // Close to fully transparent
    ior: 1.1, // Reduce refraction for better background visibility
    chromaticAberration: 0, // No color distortion
    backside: true,
  };
  return (
    <group scale={scaleFactor} dispose={null}>
      <group name="Scene">
        <mesh
          ref={mesh}
          name="Torus002"
          castShadow
          receiveShadow
          geometry={nodes.Torus002.geometry}
          material={materials.Material}
        >
        <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/glb/glass.glb");
