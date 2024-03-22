"use client";

import React, { useState } from "react";
import { RxTriangleRight, RxTriangleDown } from "react-icons/rx";

import CopyButton from "@/components/shared/CopyButton";

const Pre = (props: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { raw, style, ...rest } = props;

  const lang = rest["data-language"] || "bash";
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <pre {...rest}>
      <div className="flex justify-between px-2 pb-5">
        <div onClick={toggleCollapsed} className="cursor-pointer">
          {isCollapsed ? (
            <RxTriangleDown size={24} />
          ) : (
            <RxTriangleRight size={24} />
          )}
        </div>
        <div className="flex gap-5">
          {lang}
          <CopyButton text={props.raw} />
        </div>
      </div>
      {isCollapsed && <>{props.children}</>}
    </pre>
  );
};

export default Pre;
