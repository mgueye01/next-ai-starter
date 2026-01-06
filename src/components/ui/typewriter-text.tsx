'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  className = '',
  style = {},
  delay = 0,
  speed = 100,
  showCursor = true,
  onComplete
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorState, setShowCursorState] = useState(showCursor);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        if (!isTyping) {
          setIsTyping(true);
        }
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timer);
    } else if (isTyping) {
      setIsTyping(false);
      onComplete?.();
      
      // Hide cursor after typing is complete
      if (showCursor) {
        const cursorTimer = setTimeout(() => {
          setShowCursorState(false);
        }, 1000);
        return () => clearTimeout(cursorTimer);
      }
    }
  }, [currentIndex, text, delay, speed, isTyping, onComplete, showCursor]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {showCursorState && (
        <motion.span
          className="inline-block w-1 bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;