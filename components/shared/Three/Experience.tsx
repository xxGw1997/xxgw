"use client";

import { OrbitControls } from "@react-three/drei";
import React from "react";
import { YwxModel } from "./Ywx";
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <Canvas
      style={{ width: "600px", height: "600px" }}
      shadows
      camera={{ position: [0, 4, 3], fov: 30 }}
    >
      <OrbitControls />
      <group position-y={-1}>
        <YwxModel />
      </group>

      <ambientLight intensity={1} />
    </Canvas>
  );
};

export default Experience;
