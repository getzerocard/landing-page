import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Squircle } from '@squircle-js/react';

interface ReadWhyLinkProps {
  href?: string;
  className?: string;
}

export const ReadWhyLink: React.FC<ReadWhyLinkProps> = ({ 
  href = '#', 
  className = '' 
}) => {
  return (
    <Link href={href}>
      <div
        //cornerRadius={10}
        //cornerSmoothing={1}
        className={`inline-flex rounded-[10px] flex-row justify-center items-center py-2 px-2 gap-2.5 bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05),inset_0px_1px_1px_rgba(129,129,129,0.15)] transition-all hover:shadow-[0px_2px_4px_rgba(0,0,0,0.1),inset_0px_1px_1px_rgba(129,129,129,0.15)] hover:translate-y-[-2px] cursor-pointer ${className}`}
      >
        <span className="font-['SF_Pro_Display'] font-normal text-[16px] leading-[93%] text-[#797979] text-right">
          Read why we built zerocard here
        </span>
        <div className="flex flex-row justify-end items-start w-[17.51px] h-[17.51px] flex-none order-1">
          <Image 
            src="/assets/images/arrow-up.svg"
            alt="arrow-up"
            width={17.51}
            height={17.51}
          />
        </div>
      </div>
    </Link>
  );
};

export default ReadWhyLink; 