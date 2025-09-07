import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
  texts,
  className = '',
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!texts.length) return;

    const handleTyping = () => {
      // Ensure we have a valid text to work with
      const fullText = texts[currentIndex] ?? texts[0] ?? '';
      
      if (isDeleting) {
        // Deleting effect
        setCurrentText(fullText.substring(0, currentText?.length - 1));
        setSpeed(deletingSpeed);
        
        // When fully deleted
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts?.length);
          setSpeed(typingSpeed);
        }
      } else {
        // Typing effect
        setCurrentText(fullText.substring(0, currentText?.length + 1));
        
        // When fully typed
        if (currentText === fullText) {
          // Pause at the end of the word
          setSpeed(pauseDuration);
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, speed, texts, typingSpeed, deletingSpeed, pauseDuration]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Blink every 500ms
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        {/* Blinking cursor */} 
      </span>
    </span>
  );
};

export default TypingText;