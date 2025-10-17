import React from 'react';
import Image from 'next/image';

interface CenteredLogoProps {
  className?: string;
}

/**
 * Component to display the logo centered horizontally
 */
export const CenteredLogo: React.FC<CenteredLogoProps> = ({ className = '' }) => {
  return (
    <div className={`w-full flex justify-center pt-12 sm:pt-16 md:pt-20 ${className}`}>
      <Image 
        src="/assets/images/logo.svg"
        alt="Logo"
        width={181} 
        height={43}
        priority
      />
    </div>
  );
};

export default CenteredLogo; 