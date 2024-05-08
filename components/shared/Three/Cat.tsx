"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";

function MeshComponent() {
  const catFile = "/assets/models/bicolor_cat/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, catFile);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function Cat() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-[600px] w-[600px]">
        <OrbitControls />
        <ambientLight position={[1, 1, 1]} intensity={2} />
        <pointLight position={[3, 3, 3]} intensity={10} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}
