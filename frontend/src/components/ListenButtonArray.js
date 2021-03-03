import React from "react";
import ButtonArray from "./ButtonArray";
import IconButton from "./IconButton";
import "./animations.css";

export default function ListenButtonArray({
  recording,
  onRecord = () => { },
  nudgeUpload = false,
}) {
  return (
    <ButtonArray style={{ justifyContent: "center" }}>
      <IconButton
        className={nudgeUpload ? "pulse" : ""}
        src={recording ? "/dot.svg" : "/microphonegood.svg"}
        color="active"
        size={80}
        onClick={(e) => onRecord(e)}
      />
    </ButtonArray>
  );
}
