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
  const currencies = [
    'cash',
    'naira',      // Nigeria (Africa)
    'cedis',      // Ghana (Africa)
    'shilling',   // Kenya (Africa)
    'dollar',     // USA/Global
    'euro',       // Europe
    'pounds',     // UK
    'rupees',     // India (APAC)
    'yen',        // Japan (APAC)
    'yuan',       // China (APAC)
    'peso',       // Philippines/Mexico (APAC/LATAM)
    'baht',       // Thailand (APAC)
    'won',        // South Korea (APAC)
    'real',       // Brazil (LATAM)
    'sol',        // Peru (LATAM)
    'franc'       // Switzerland
  ];

  return (
    <div className={`w-full max-w-[500px] px-4 sm:px-0 mx-auto pt-8 sm:pt-24 md:pt-32 flex flex-col items-center gap-4 sm:gap-6 ${className}`}>
      {/* Read why link component */}
      <ReadWhyLink href="https://paragraph.com/@dayofolajin/why-we-built-zerocard" />

      {/* Headline */}
      <h1 className="w-full sm:w-[408px] font-['SF_Pro_Display'] font-semibold text-[40px] sm:text-[64px] leading-[110%] sm:leading-[100%] text-center text-[#1F1F1F]">
        Spend crypto like{' '}
        <span className="inline-block min-h-[44px] sm:min-h-[64px]">
          <TypingText texts={currencies} className="text-[#8F8F8F]" />
        </span>
      </h1>

      {/* Subheadline */}
      <SubheadlineText>
        Swipe to spend crypto, effortlessly. We handle the setup so you can enjoy the ease.
      </SubheadlineText>

      {/* Buttons Container */}
      <div className="flex justify-center sm:justify-start gap-4 mt-2 sm:mt-6 w-full sm:w-auto"> 
        <ReserveCardButton 
          onClick={onReserveCardClick}
        />
      </div>
    </div>
  );
};

export default Hero; 