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
    <p className={`w-[500px] font-['SF_Pro_Display'] font-medium text-[20px] leading-[120%] text-center text-[#919191] ${className}`}>
      {children}
    </p>
  );
};

export default SubheadlineText; 