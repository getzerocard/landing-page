import React from 'react';

interface SubheadlineTextProps {
  children: React.ReactNode;
  className?: string;
}

export const SubheadlineText: React.FC<SubheadlineTextProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <p className={`w-full max-w-[500px] px-4 sm:px-0 font-['SF_Pro_Display'] font-medium text-[16px] sm:text-[20px] leading-[120%] text-center text-[#919191] ${className}`}>
      {children}
    </p>
  );
};

export default SubheadlineText; 