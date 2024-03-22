import React from "react";

export const BlockH2 = (props: any) => {
  return (
    <h2 {...props}>
      {props.children}
      <a href={`#${props.id}`} className="header-anchor">
        #
      </a>
    </h2>
  );
};
