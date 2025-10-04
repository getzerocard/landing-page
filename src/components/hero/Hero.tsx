import React from 'react';
import { ReserveCardButton } from '../buttons/Button';
import ReadWhyLink from './ReadWhyLink';
import TypingText from './TypingText';
import SubheadlineText from './SubheadlineText';

interface HeroProps {
  className?: string;
  onReserveCardClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ className = '', onReserveCardClick }) => {
  const currencies = ['cash', 'naira', 'cedis', 'shilling', 'dollar', 'euro', 'pounds', 'rupees', 'franc'];

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
      <div className="flex justify-center sm:justify-start gap-4 mt-6 w-full sm:w-auto"> 
        <ReserveCardButton 
          onClick={onReserveCardClick}
        />
      </div>
    </div>
  );
};

export default Hero; 