"use client";

import {
  ContactShadows,
  Environment,
  Scroll,
  ScrollControls,
  Sky,
} from "@react-three/drei";
import React, { useState } from "react";
import { YwxModel } from "./Ywx";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Interface } from "./Interface";
import ScrollManager from "./ScrollManager";

const Scene = () => {
  return (
    <>
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
    </>
  );
};

const Experience = () => {
  const [section, setSection] = useState(0);

  return (
    <Canvas shadows camera={{ position: [0, 1, 4], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} onSelectionChange={setSection} />
        <Scene />
        <Scroll html>
          <Interface />
        </Scroll>
      </ScrollControls>
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
