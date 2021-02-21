import React, { useState } from "react";
import IconButton from "./IconButton";

let style = { marginRight: 20 };
export default function Tabs({ tab, onTabChange }) {
  return (
    <div>
      <IconButton
        src="/micagain.svg"
        color={tab === 0 ? "active" : "normal"}
        style={style}
        onClick={() => {
          onTabChange(0);
        }}
      />
      <IconButton
        src="/headphone.svg"
        style={style}
        color={tab === 1 ? "active" : "normal"}
        onClick={() => {
          onTabChange(1);
        }}
      />
      <IconButton
        src="/smartphone.svg"
        style={style}
        color={tab === 2 ? "active" : "normal"}
        onClick={() => {
          onTabChange(2);
        }}
      />
    </div>
  );
}
