"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  section: number;
  onSelectionChange: Dispatch<SetStateAction<number>>;
};

const ScrollManager = ({ section, onSelectionChange }: Props) => {
  const data = useScroll() as any;
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }
  });

  return null;
};

export default ScrollManager;
