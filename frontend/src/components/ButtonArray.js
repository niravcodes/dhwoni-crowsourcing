import React from "react";
import IconButton from "./IconButton";

let modes = {
  record: {
    mainBtn: "./micagain.svg",
    leftBtn: "./reload.svg",
    rightBtn: "./up-arrow.svg",
    recording: "./dot.svg",
  },
  play: {
    mainBtn: "/headphone.svg",
    leftBtn: "/close.svg",
    rightBtn: "/check.svg",
  },
};
export default function ButtonArray({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}
