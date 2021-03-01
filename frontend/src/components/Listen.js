import React, { useState, useRef, useEffect } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import RecordButtonArray from "./RecordButtonArray";
import api from "../helpers/api.js";

export default function Recorder({ onLoading = () => { } }) {
    let [recording, setRecording] = useState(RecordState.NONE);
    let audioplayer = useRef(null);
    let [sentence, setSentence] = useState("Fuck you")

    return (
        <>
            {sentence}
            <AudioReactRecorder
                type="audio/mp3"
                state={recording}
                onStop={(x) => console.log(x)}
                backgroundColor="#f3f3f3"
                canvasHeight={30}
                canvasWidth="270px"
                onStop={async (x) => {
                    console.log(x);
                    // if (audioplayer.current === null) return;
                    // let audio = audioplayer.current;
                    // audio.src = x.url;
                    // audio.load();
                    // audio.play();
                    // console.log(x);
                    // console.log("recorded");

                    onLoading(true);
                    console.log("uploading");
                    let m = await api.listen({ audio: x.blob });
                    setSentence(m.data.text)
                    console.log(m)
                    console.log("DONE UPLOADING");
                    onLoading(false);
                }}
            />
            <audio ref={audioplayer} />
            <RecordButtonArray
                onRecord={(e) => {
                    if (recording === RecordState.NONE) setRecording(RecordState.START);
                    else if (recording === RecordState.START)
                        setRecording(RecordState.STOP);
                    else if (recording === RecordState.STOP)
                        setRecording(RecordState.START);
                }}
                onUpload={async (e) => {
                }}
                onReset={async (e) => {
                }}
                recording={recording === RecordState.START}
            />
        </>
    );
}
