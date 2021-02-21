import axios from "axios";
import blobToBase64 from "./blobToBase64";
const URL = "http://localhost:5000";
async function uploadAudio(data) {
  let b2b = await blobToBase64(data.audio);
  data.audio = b2b.replace(/^data:audio\/(wav|mp3);base64,/, "");

  try {
    await axios.post(URL + "/record", data);
  } catch (e) {
    if (e?.response?.status === 413) console.log("TOO LARGE AUDIO");
    console.log("FAILED");
  }
}

async function getSentence() {
  try {
    let m = await axios.get(URL + "/sentence");
    return m.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getRecording() {
  try {
    let m = await axios.get(URL + "/recording");
    return m.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function sendRecordingAccuracy(accuracy, recording) {
  try {
    let url = "/correct";
    if (accuracy === 0) url = "/incorrect";
    console.log(URL + url, accuracy);
    await axios.post(URL + url, { index: recording.recording_index });
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getRandomSample() {
  try {
    let data = await axios.get(URL + "/randomSample");
    return data.data;
  } catch (e) {
    return false;
  }
}

export default {
  URL,
  uploadAudio,
  getSentence,
  getRecording,
  sendRecordingAccuracy,
  getRandomSample,
};
