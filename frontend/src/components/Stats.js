import React from "react";

export default function Stats({ correct, incorrect }) {
  return (
    <div
      style={{
        width: "100%",
        height: 15,
        borderRadius: 20,
        background: "#f00",
        position: "relative",
        overflow: "hidden",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: 15,
          width: `${((correct ?? 0) / (correct ?? 0 + incorrect ?? 1)) * 100}%`,
          background: "green",
          top: 0,
          left: 0,
        }}
      ></div>
    </div>
  );
}
