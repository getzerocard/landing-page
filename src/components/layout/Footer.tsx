import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer 
      className={`w-full flex flex-col md:flex-row items-center justify-center gap-3 py-6 px-4 ${className}`}
    >
      {/* Terms of Use Link */}
      <Link href="/terms" className="flex flex-row items-center gap-0.5 group">
        <span className="font-['SF_Pro_Display'] font-medium text-[16px] leading-[120%] text-[#919191] group-hover:text-secondary transition-colors">
          Terms of use
        </span>
        {/* Arrow Icon - Note: Using the existing green arrow, styling the stroke color dynamically requires inline SVG or CSS filters */}
        <div className="w-[17.51px] h-[17.51px]">
          <Image 
            src="/assets/images/arrow-up.svg"
            alt="arrow up"
            width={17.51} 
            height={17.51}
            // The original arrow SVG uses stroke="#38E100". 
            // To change color dynamically, you might need a different SVG or approach.
          />
        </div>
      </Link>

      {/* Divider 1 - Hidden on mobile */}
      <div className="hidden md:block w-[1px] h-[23px] bg-[#BABABA]" />

      {/* Social Links Section */}
      <div className="flex flex-row items-center gap-3">
        {/* X (Twitter) Link */}
        <Link href="https://x.com/getzerocard" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-1 group">
          <div className="w-[18px] h-[18px]">
            <Image 
              src="/assets/images/X-logo.svg"
              alt="X Logo"
              width={18}
              height={18}
            />
          </div>
          <span className="font-['SF_Pro_Text'] font-medium text-[14px] leading-[22px] text-[#919191] group-hover:text-secondary transition-colors">
            X (Twitter)
          </span>
        </Link>

        {/* Reach Out Link */}
        <Link href="mailto:support@getzerocard.xyz" className="flex flex-row items-center gap-1 group">
          <div className="w-[18px] h-[18px]">
            <Image 
              src="/assets/images/email.svg"
              alt="Email Icon"
              width={18}
              height={18}
            />
          </div>
          <span className="font-['SF_Pro_Text'] font-medium text-[14px] leading-[22px] text-[#919191] group-hover:text-secondary transition-colors">
            Reach out to us
          </span>
        </Link>
      </div>

      {/* Divider 2 - Hidden on mobile */}
      <div className="hidden md:block w-[1px] h-[23px] bg-[#BABABA]" />
    </footer>
  );
};

export default Footer; 