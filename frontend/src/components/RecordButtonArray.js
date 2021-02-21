import React from "react";
import ButtonArray from "./ButtonArray";
import IconButton from "./IconButton";
import "./animations.css";

export default function RecordButtonArray({
  recording,
  onReset = () => {},
  onRecord = () => {},
  onUpload = () => {},
  nudgeUpload = false,
}) {
  return (
    <ButtonArray>
      <IconButton src={"/reload.svg"} onClick={(e) => onReset(e)} />
      <IconButton
        src={recording ? "/dot.svg" : "/micagain.svg"}
        color="active"
        size={80}
        onClick={(e) => onRecord(e)}
      />
      <IconButton
        className={nudgeUpload ? "pulse" : ""}
        src={"/up-arrow.svg"}
        onClick={(e) => onUpload(e)}
      />
    </ButtonArray>
  );
}
