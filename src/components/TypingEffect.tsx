
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Initial delay before starting to type
    const delayTimeout = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, startTyping, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="cursor"></span>}
    </span>
  );
};

export default TypingEffect;
