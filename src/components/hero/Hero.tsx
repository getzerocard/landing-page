import React, { useState, useEffect, useRef } from 'react';
import { StartSpendingButton, ReserveCardButton } from '../buttons/Button';
import ReadWhyLink from './ReadWhyLink';
import TypingText from './TypingText';
import SubheadlineText from './SubheadlineText';
import ScanToDownloadPopup from '../popups/ScanToDownloadPopup';

interface HeroProps {
  className?: string;
  onReserveCardClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ className = '', onReserveCardClick }) => {
  const currencies = ['cash', 'naira', 'cedis', 'shilling', 'dollar', 'euro', 'pounds', 'rupees', 'franc'];

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Start Spending');
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => {
    const newVisibility = !isPopupVisible;
    setIsPopupVisible(newVisibility);
    setButtonText(newVisibility ? 'Scan to download' : 'Start Spending');
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) // Check if click is outside button too
      ) {
        setIsPopupVisible(false);
        setButtonText('Start Spending');
      }
    }

    // Bind the event listener
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]); // Only re-run if isPopupVisible changes

  return (
    <div className={`w-full max-w-[500px] px-4 md:py-0 py-20 sm:px-0 mx-auto h-auto absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[240px] flex flex-col items-center gap-4 ${className}`}>
      {/* Read why link component */}
      <ReadWhyLink href="https://paragraph.com/@dayofolajin/why-we-built-zerocard" />

      {/* Headline */}
      <h1 className="w-full sm:w-[408px] font-['SF_Pro_Display'] font-semibold text-[40px] sm:text-[64px] leading-[100%] text-center text-[#1F1F1F]">
        Spend crypto like <TypingText texts={currencies} className="text-[#8F8F8F]" />
      </h1>

      {/* Subheadline */}
      <SubheadlineText>
        With one email we set up your wallet, send you your card and make spending crypto as easy as swiping
      </SubheadlineText>

      {/* Buttons Container */}
      <div className="relative flex gap-4 mt-6 w-full sm:w-auto"> 
        <StartSpendingButton 
          ref={buttonRef} // Attach ref to the button
          onClick={togglePopup} 
          text={buttonText}
          className="w-full sm:w-auto"
        />
        <ReserveCardButton 
          onClick={onReserveCardClick}
          className="w-full sm:w-auto"
        />

        {/* Conditionally render the Popup */}
        {isPopupVisible && (
          <div ref={popupRef}> {/* Attach ref to the popup wrapper */} 
            <ScanToDownloadPopup 
              className="absolute bottom-[calc(100%+12px)] right-[calc(100%-142px)]" // Position to the right
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero; 