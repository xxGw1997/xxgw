"use client";

import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Scroll,
  ScrollControls,
  Sky,
} from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { YwxModel } from "./Ywx";
import { RoomModel } from "./Room";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Interface } from "./Interface";
import ScrollManager from "./ScrollManager";
import Menu from "./Menu";
import { useTheme } from "next-themes";
import { motion } from "framer-motion-3d";
import { animate, MotionConfig, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "./motionConfig";
import { Cursor } from "./Cursor";

const Scene = ({
  theme = "dark",
  section,
  menuOpened,
}: {
  theme?: string;
  menuOpened: boolean;
  section: number;
}) => {
  const { viewport } = useThree();

  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);

  useEffect(() => {
    // @ts-ignore
    animate(cameraPositionX, menuOpened ? -5 : 0, framerMotionConfig);
    // @ts-ignore
    animate(cameraLookAtX, menuOpened ? 5 : 0, framerMotionConfig);
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <Environment
        preset={theme === "dark" ? "city" : "sunset"}
        environmentIntensity={0.9}
      />
      <motion.group
        scale={[0.6, 0.6, 0.6]}
        position={[0, 0, 0]}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        <RoomModel section={section} />
      </motion.group>
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[3, 1, -18]} scale={[3, 3, 3]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[-3, -1, -11]} scale={[1.4, 1.4, 1.4]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        <group position-y={-1.5}>
          <YwxModel animation={section === 0 ? "Falling" : "Hello"} />
        </group>
      </motion.group>
    </>
  );
};

const Experience = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "#123456" : "#123456";

  return (
    <>
      <MotionConfig transition={framerMotionConfig}>
        <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 45 }}>
          <color attach="background" args={["#e6e7ff"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Scene section={section} menuOpened={menuOpened} />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
          {/* 调试 */}
          {/* <CameraControll /> */}
        </Canvas>
        <Menu
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
          onSectionChange={setSection}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
};

function CameraControll() {
  const { camera } = useThree();
  const {
    x: CameraX,
    y: CameraY,
    z: CameraZ,
    lookAtX,
    lookAtY,
    lookAtZ,
  } = useControls("Camera Position", {
    x: { value: 0, step: 1 },
    y: { value: 1, step: 1 },
    z: { value: 4, step: 1 },
    lookAtX: { value: 0, step: 0.1 },
    lookAtY: { value: 0, step: 0.1 },
    lookAtZ: { value: 0, step: 0.1 },
  });

  useFrame(() => {
    camera.position.x = CameraX;
    camera.position.y = CameraY;
    camera.position.z = CameraZ;
    camera.lookAt(lookAtX, lookAtY, lookAtZ);
  });

  return <></>;
}

export default Experience;
