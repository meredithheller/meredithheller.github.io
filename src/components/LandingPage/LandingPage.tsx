import { useEffect, useState } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import { MainContent } from "./MainContent";
import "./LandingPage.css";

export default function LandingPage() {
  const [showTitle, setShowTitle] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(false);
      setShowContent(true);
    }, 2500);

    return () => {
      clearTimeout(titleTimer);
    };
  }, []);

  return (
    <main className="landing-page-container">
      {/* Animated Brand Title */}
      <AnimatedTitle show={showTitle} />

      {/* Main Content - Personal Pitch and Tiles */}
      {showContent && <MainContent />}
    </main>
  );
}

