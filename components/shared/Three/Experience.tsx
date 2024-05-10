"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import React from "react";
import { YwxModel } from "./Ywx";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

const Experience = () => {
  return (
    <Canvas
      style={{ width: "600px", height: "600px" }}
      shadows
      camera={{ position: [0, 1, 4], fov: 30 }}
    >
      <color attach="background" args={["#ececec"]} />
      <OrbitControls />
      <Sky />
      <Environment preset="warehouse" environmentIntensity={0.9} />
      <group position-y={-1}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <YwxModel />
      </group>
      {/* <Arena /> */}
    </Canvas>
  );
};

function Arena() {
  const { camera } = useThree();
  const {
    x: CameraX,
    y: CameraY,
    z: CameraZ,
  } = useControls("Camera Position", {
    x: { value: 0, step: 1 },
    y: { value: 1, step: 1 },
    z: { value: 4, step: 1 },
  });

  useFrame(() => {
    camera.position.x = CameraX;
    camera.position.y = CameraY;
    camera.position.z = CameraZ;
  });

  return <></>;
}

export default Experience;
