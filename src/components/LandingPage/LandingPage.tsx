import { useEffect, useState } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import { ConfettiParticles } from "./ConfettiParticles";
import "./LandingPage.css";

export default function LandingPage() {
  const [showTitle, setShowTitle] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSettled, setConfettiSettled] = useState(false);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 1800);

    const titleTimer = setTimeout(() => {
      setShowTitle(false);
    }, 2500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const handleConfettiSettled = () => {
    setConfettiSettled(true);
  };

  return (
    <main className="landing-page-container">
      {/* Animated Brand Title */}
      <AnimatedTitle show={showTitle} />

      {/* Confetti Animation */}
      {showConfetti && <ConfettiParticles onSettled={handleConfettiSettled} />}

      {/* Placeholder Quote */}
      {confettiSettled && (
        <div className="landing-quote">
          <p className="landing-quote-text">What do you want to do with your life?</p>
        </div>
      )}
    </main>
  );
}

