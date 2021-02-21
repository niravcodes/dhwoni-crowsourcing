import React, { useEffect, useRef, useState } from "react";
import PlayButtonArray from "./PlayButtonArray";
import api from "../helpers/api.js";

export default function Player({ onLoading = () => {} }) {
  const [recording, setRecording] = useState();
  const [rerender, setRerender] = useState(false);
  const audioplayer = useRef(null);
  useEffect(() => {
    async function refresh() {
      try {
        onLoading(true);
        let data = await api.getRecording();
        console.log(data);
        setRecording(data);
        if (audioplayer.current) {
          let player = audioplayer.current;
          let audiourl = api.URL + "/" + data.audio + "/voice.mp3";
          console.log(audiourl);
          player.src = audiourl;
          player.load();
          onLoading(false);
          player.play();
        }
      } catch (e) {
        console.log(e);
        onLoading(false);
        return false;
      }
    }
    refresh();
  }, [rerender]);
  return (
    <>
      <audio ref={audioplayer}></audio>
      <div className="textReader" style={{ marginBottom: 20 }}>
        {recording && recording.text}
      </div>
      <PlayButtonArray
        onPlay={(e) => {
          if (audioplayer.current && recording) {
            let player = audioplayer.current;
            let audiourl = api.URL + "/" + recording.audio + "/voice.mp3";
            console.log(audiourl);
            player.src = audiourl;
            player.load();
            onLoading(false);
            player.play();
          }
        }}
        onRight={async (x) => {
          onLoading(true);
          console.log("sending true");
          await api.sendRecordingAccuracy(1, recording);
          setRerender((r) => !r);
          onLoading(false);
        }}
        onWrong={async (x) => {
          onLoading(true);
          console.log("sending false");
          await api.sendRecordingAccuracy(0, recording);
          setRerender((r) => !r);
          onLoading(false);
        }}
      />
    </>
  );
}
