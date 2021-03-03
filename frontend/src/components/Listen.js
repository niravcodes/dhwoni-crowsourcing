import React, { useState, useRef, useEffect } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import AudioReactRecorder2 from "./RecordAudio"
import ListenButtonArray from "./ListenButtonArray";
import api from "../helpers/api.js";

export default function Recorder({ onLoading = () => { } }) {
    let [recording, setRecording] = useState(false);
    let audioplayer = useRef(null);
    let [sentence, setSentence] = useState("Record audio below")

    return (
        <>
            {sentence}
            <AudioReactRecorder2
                rec={recording}
                onStop={async (x) => {
                    setRecording(false)
                    console.log(x, "BLOB");
                    // if (audioplayer.current === null) return;
                    // let audio = audioplayer.current;
                    // audio.src = x.url;
                    // audio.load();
                    // audio.play();
                    // console.log(x);
                    // console.log("recorded");

                    onLoading(true);
                    console.log("uploading");
                    let m = await api.listen({ audio: x });
                    setSentence(m.data.text)
                    console.log(m)
                    console.log("DONE UPLOADING");
                    onLoading(false);
                }}
            />
            <audio ref={audioplayer} />
            <div style={{ marginBottom: 20 }}></div>
            <ListenButtonArray
                nudgeUpload={recording}
                onRecord={(e) => {
                    console.log(!recording ? "RECORDING" : "STOPPING")
                    if (recording) setRecording(false); else setRecording(true)
                }}
                recording={recording}
            />
        </>
    );
}
