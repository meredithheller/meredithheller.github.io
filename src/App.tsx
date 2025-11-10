import React from "react";
import Timeline from "./components/Timeline/Timeline";
import { dummyTimelineData } from "./data/dummyTimelineData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meredith Heller</h1>
      </header>
      <main className="App-main">
        <Timeline items={dummyTimelineData} />
      </main>
    </div>
  );
}

export default App;
