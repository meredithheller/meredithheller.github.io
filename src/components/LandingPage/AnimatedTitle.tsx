import { useEffect, useState } from "react";
import "./AnimatedTitle.css";

interface AnimatedTitleProps {
  show: boolean;
}

export function AnimatedTitle({ show }: AnimatedTitleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`animated-title-container ${
        show && mounted ? "animated-title-visible" : "animated-title-hidden"
      }`}
    >
      <h1 className="animated-title-text">MERE AND MORE</h1>
    </div>
  );
}


