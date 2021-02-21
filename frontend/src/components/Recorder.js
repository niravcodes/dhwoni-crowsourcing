import React, { useState, useRef, useEffect } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import RecordButtonArray from "./RecordButtonArray";
import api from "../helpers/api.js";

export default function Recorder({ onLoading = () => {} }) {
  let [recording, setRecording] = useState(RecordState.NONE);
  let [recordedAudio, setRecordedAudio] = useState(null);
  let [sentence, setSentence] = useState(null);
  let [rerender, setRerender] = useState(false);
  let [nudgeUpload, setNudgeUpload] = useState(false);
  let audioplayer = useRef(null);
  useEffect(() => {
    async function refresh() {
      onLoading(true);
      setNudgeUpload(false);
      let s = await api.getSentence();
      onLoading(false);
      if (s) {
        setSentence(s);
      }
    }
    refresh();
  }, [rerender]);
  return (
    <>
      <div className="textReader">{sentence && sentence?.text}</div>
      <AudioReactRecorder
        type="audio/mp3"
        state={recording}
        onStop={(x) => console.log(x)}
        backgroundColor="#f3f3f3"
        canvasHeight={30}
        canvasWidth="270px"
        onStop={async (x) => {
          console.log(x);
          if (audioplayer.current === null) return;
          let audio = audioplayer.current;
          audio.src = x.url;
          audio.load();
          audio.play();
          setRecordedAudio(x);
          console.log(x);
          console.log("recorded");
          setNudgeUpload(true);
        }}
      />
      <audio ref={audioplayer} />
      <RecordButtonArray
        nudgeUpload={nudgeUpload}
        onRecord={(e) => {
          if (recording === RecordState.NONE) setRecording(RecordState.START);
          else if (recording === RecordState.START)
            setRecording(RecordState.STOP);
          else if (recording === RecordState.STOP)
            setRecording(RecordState.START);
        }}
        onUpload={async (e) => {
          console.log(recordedAudio);
          setNudgeUpload(false);
          if (recordedAudio !== undefined && recordedAudio !== null) {
            onLoading(true);
            console.log("uploading");
            let x = recordedAudio;
            await api.uploadAudio({ audio: x.blob, index: sentence.index });
            console.log("DONE UPLOADING");
            onLoading(false);
            setRecordedAudio(undefined);
            setRerender((r) => !r);
          }
        }}
        onReset={async (e) => {
          setRecordedAudio(undefined);
        }}
        recording={recording === RecordState.START}
      />
    </>
  );
}
