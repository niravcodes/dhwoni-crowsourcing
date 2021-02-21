import React from "react";
import ButtonArray from "./ButtonArray";
import IconButton from "./IconButton";

export default function PlayButtonArray({
  onPlay = (e) => {},
  onRight = () => {},
  onWrong = () => {},
}) {
  return (
    <ButtonArray>
      <IconButton src={"/close.svg"} onClick={(e) => onWrong(e)} />
      <IconButton
        src={"/headphone.svg"}
        color="active"
        onClick={(e) => {
          onPlay(e);
        }}
        size={80}
      />
      <IconButton src={"/check.svg"} onClick={(e) => onRight(e)} />
    </ButtonArray>
  );
}
