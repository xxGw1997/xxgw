"use client";

import { OrbitControls } from "@react-three/drei";
import React from "react";
import { YwxModel } from "./Ywx";
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <Canvas>
      <OrbitControls />
      <YwxModel />
      <ambientLight intensity={1}/>
    </Canvas>
  );
};

export default Experience;
