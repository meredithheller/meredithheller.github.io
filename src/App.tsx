import React, { useState, useMemo } from "react";
import Timeline from "./components/Timeline/Timeline";
import Filter from "./components/Filter/Filter";
import { dummyTimelineData } from "./data/dummyTimelineData";
import { TimelineCategory } from "./types/timeline";
import { AiFillInstagram } from "react-icons/ai";
import { FaPinterest, FaLinkedinIn } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === null) {
      return dummyTimelineData;
    }
    return dummyTimelineData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meredith Heller</h1>
      </header>
      <main className="App-main">
        <div className="filter-wrapper">
          <Filter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>
        <div className="timeline-wrapper">
          <Timeline items={filteredItems} />
        </div>
        <footer className="App-footer">
          <a
            href="https://www.instagram.com/meredithaheller/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <AiFillInstagram />
          </a>
          <a
            href="https://www.pinterest.com/meredithaheller/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterest />
          </a>
          <a
            href="https://www.linkedin.com/in/meredith-heller/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
