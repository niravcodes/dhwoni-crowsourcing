import React, { useState } from "react";
import Admin from "./components/Admin";
import AppBody from "./components/AppBody";
import Player from "./components/Player";
import Recorder from "./components/Recorder";
import Listen from "./components/Listen"
import Tabs from "./components/Tabs";
import "./style.css";

function App() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ width: 330, margin: "80px auto" }}>
      <Tabs
        tab={tab}
        onTabChange={(x) => {
          setLoading(false);
          setTab(x);
        }}
      />
      <AppBody loading={loading}>
        {tab === 0 && <Recorder onLoading={(l) => setLoading(l)} />}
        {tab === 1 && <Player onLoading={(l) => setLoading(l)} />}
        {tab === 2 && <Admin onLoading={(l) => setLoading(l)} />}
        {tab === 3 && <Listen onLoading={l => setLoading(l)} />}
      </AppBody>
      <div style={{ textAlign: "center", marginTop: 30, fontSize: 16 }}><a href="https://niravko.com/">niravko</a></div>
    </div>
  );
}

export default App;
