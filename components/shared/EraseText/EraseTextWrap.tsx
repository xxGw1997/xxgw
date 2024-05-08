"use client";

import React, { useRef } from "react";

const EraseTextWrap = ({ children }: { children: React.ReactNode }) => {
  const eraseWrap = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    if (eraseWrap.current) {
      const eraseFontDom = eraseWrap.current.querySelector(
        ".erase-font"
      ) as HTMLSpanElement;
      if (eraseFontDom) {
        eraseFontDom.classList.remove("erase-font");
        void eraseFontDom.offsetWidth;
        eraseFontDom && eraseFontDom.classList.add("erase-font");
      }
    }
  };

  return (
    <>
      <div ref={eraseWrap} className="indent-[2em] relative select-none">
        {children}
      </div>
      <button onClick={handleReplay}>replay</button>
    </>
  );
};

export default EraseTextWrap;
