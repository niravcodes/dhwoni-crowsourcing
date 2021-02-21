import React, { useEffect, useState, useRef } from "react";
import api from "../helpers/api.js";
import Stats from "./Stats.js";

export default function Admin({ onLoading = () => {} }) {
  const [sample, setSample] = useState();
  const [rerender, setRerender] = useState(false);
  const audioplayer = useRef(null);
  useEffect(() => {
    async function refresh() {
      try {
        onLoading(true);
        let data = await api.getRandomSample();
        console.log(data);
        setSample(data);
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
      <div className="textReader">{sample && sample?.text}</div>
      <Stats correct={sample?.correct} incorrect={sample?.incorrect} />
      <button onClick={() => setRerender((r) => !r)}>Next Sample</button>
    </>
  );
}
