"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { flushSync } from "react-dom";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) return "";

  const toggleTheme = async () => {
    // @ts-ignore
    const transition = await document.startViewTransition(() => {
      flushSync(() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {},
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <MdOutlineLightMode size={24} />
        ) : (
          <MdOutlineDarkMode size={24} />
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
