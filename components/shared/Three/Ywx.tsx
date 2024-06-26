// @ts-nocheck
"use client";
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

export function YwxModel(props) {
  const { headFollow, cursorFollow, animation } = useControls({
    headFollow: false,
    cursorFollow: false,
    animation: {
      value: "Hello",
      options: ["Hello", "Falling", "Dancing"],
    },
  });

  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/models/ywx/ywx.glb");

  const { animations: actionAnimation1 } = useFBX(
    "/assets/models/animations/hello.fbx"
  );
  const { animations: actionAnimation2 } = useFBX(
    "/assets/models/animations/falling.fbx"
  );
  const { animations: actionAnimation3 } = useFBX(
    "/assets/models/animations/dancing.fbx"
  );

  actionAnimation1[0].name = "Hello";
  actionAnimation2[0].name = "Falling";
  actionAnimation3[0].name = "Dancing";

  const { actions } = useAnimations(
    [actionAnimation1[0], actionAnimation2[0], actionAnimation3[0]],
    group
  );

  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head")?.lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 2);
      group.current.getObjectByName("Head")?.lookAt(target);
    }
  });

  useEffect(() => {
    let curAnimation = animation;
    if (props.animation) {
      curAnimation = props.animation;
    }
    actions[curAnimation]?.reset().fadeIn(1).play();
    return () => {
      actions[curAnimation]?.reset().fadeOut(1);
    };
  }, [animation, props.animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/ywx/ywx.glb");
