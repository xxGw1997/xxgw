import React from "react";

import EraseTextWrap from "./EraseTextWrap";

import "./EraseText.css";

const EraseText = ({ text }: { text: string }) => {
  return (
    <EraseTextWrap>
      <p>{text}</p>
      <p className="absolute inset-0">
        <span className="erase-font">{text}</span>
      </p>
    </EraseTextWrap>
  );
};

export default EraseText;
