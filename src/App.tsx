import { useState, useMemo } from "react";
import Timeline from "./components/Timeline/Timeline";
import Filter from "./components/Filter/Filter";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import { dummyTimelineData } from "./data/dummyTimelineData";
import type { TimelineCategory } from "./types/timeline";
import { AiFillInstagram } from "react-icons/ai";
import { FaPinterest, FaLinkedinIn } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredItems = useMemo(() => {
    if (selectedCategory === null) {
      return dummyTimelineData;
    }
    return dummyTimelineData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <main className="App-main fade-in">
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
      )}
    </div>
  );
}

export default App;
