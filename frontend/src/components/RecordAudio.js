import React, { useEffect, useState, useRef } from "react"
import vmsg from "vmsg"
const recorder = new vmsg.Recorder({ wasmURL: "/static/vmsg.wasm" });

export default function RecordAudio({ rec, onStop = () => { } }) {
    let [recording, setRecording] = useState(false)
    let [time, setTime] = useState(false)
    // let mediaRecorder = useRef(null)
    // let chunks = useRef([])

    useEffect(() => {
        async function m() {
            if (rec === true && recording === false) {
                console.log("STARTED")
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                setRecording(true)
                setTimeout(() => { setTime(true) }, 4000)
            }
            else if ((rec === false || time === true) && recording === true) {
                console.log("ENDED")
                let blob = await recorder.stopRecording();
                console.log("Blob", blob)
                setRecording(false)
                onStop(blob)
                setTime(false)
            }
        }
        m();
    }, [rec, time])
    return <div></div>
}