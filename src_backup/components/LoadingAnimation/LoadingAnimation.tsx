import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./LoadingAnimation.css";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Total animation duration: 5 seconds + 1 second fade out
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <div className="loading-animation-container">
          {/* IF NOW NOT - slides in from left to top left corner */}
          <motion.h1
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.3,
            }}
            className="loading-title-top"
          >
            IF NOW NOT
          </motion.h1>

          {/* the collected proof of now or never - slides in from right, stays on right edge */}
          <motion.p
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 1.5,
            }}
            className="loading-text-middle"
          >
            a collected proof of now or never
          </motion.p>

          {/* By Meredith Heller - slides in from left to bottom left corner */}
          <motion.p
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 2.7,
            }}
            className="loading-title-bottom"
          >
            By Meredith Heller
          </motion.p>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;

