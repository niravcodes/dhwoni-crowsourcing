import React from "react";

let s = (size = 60) => ({
  width: size,
  height: size,
  borderRadius: size,
  border: "none",
  background: "#293747",
});
let style2 = {
  width: "50%",
  fill: "#fff",
  filter: "invert(100%)",
};
let active = {
  background: "#db364e",
};
export default function IconButton({
  src,
  onClick = () => {},
  color,
  size = 60,
  style = {},
  ...props
}) {
  return (
    <button
      style={{
        ...s(size),
        ...(color === "active" ? active : {}),
        ...style,
      }}
      {...props}
    >
      <img src={src} onClick={(e) => onClick()} style={{ ...style2 }} />
    </button>
  );
}
