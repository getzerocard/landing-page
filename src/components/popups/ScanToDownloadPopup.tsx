import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import QRCodeStyling from 'qr-code-styling';

interface ScanToDownloadPopupProps {
  className?: string;
}

export const ScanToDownloadPopup: React.FC<ScanToDownloadPopupProps> = ({ className = '' }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;
    
    // Clear previous QR code if any
    if (qrRef.current.firstChild) {
      qrRef.current.removeChild(qrRef.current.firstChild);
    }
    
    const qrCode = new QRCodeStyling({
      width: 135,
      height: 135,
      type: 'svg',
      data: 'https://testflight.apple.com/join/Bm7Pr72p',
      image: '/assets/images/zerologo-black.svg',
      dotsOptions: {
        color: '#1F1F1F',
        type: 'dots'
      },
      backgroundOptions: {
        color: '#ECECEC',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
        imageSize: 0.5
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#1F1F1F'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#1F1F1F',
      },
      qrOptions: {
        errorCorrectionLevel: 'H'
      }
    });
    
    qrCode.append(qrRef.current);
  }, []);

  return (
    // Outer container: positioned absolutely, handles rotation, base shadow/bg
    <div 
      className={`absolute flex flex-col justify-center items-start p-[8px_8px_10px] gap-[5.48px] w-[163.18px] bg-white shadow-[0px_1px_10px_rgba(0,0,0,0.1)] rounded-[15px] ${className}`}
      style={{ transform: 'rotate(3.34deg)' }} 
    >
      {/* Inner Frame for Image */}
      <div className="flex flex-row justify-center items-center p-[8px_4px] gap-[4.57px] w-full h-[151.19px] bg-[#ECECEC] shadow-[0px_0.456731px_0.456731px_rgba(0,0,0,0.05)] rounded-[10px] self-stretch flex-none order-0">
        {/* QR Code Container */}
        <div 
          ref={qrRef}
          className="box-border w-[133.82px] h-[135.19px] rounded-[9.13462px] flex-none order-0 flex items-center justify-center"
        />
      </div>

      {/* Bottom Section: Text + Logos */}
      <div className="flex flex-row justify-between items-center p-[0px_4px] gap-[10px] w-full h-[21.91px] self-stretch flex-none order-1">
        {/* Text: "Available on" */}
        <span className="font-['SF_Pro_Display'] font-medium text-[16px] leading-[120%] text-[#9A9A9A] flex-none order-0 flex-grow-0">
          Available on
        </span>

        {/* Logos Frame */}
        <div className="flex flex-row items-center p-0 gap-[10px] w-[46px] h-[21.91px] flex-none order-1 flex-grow-0">
          {/* Apple Logo */}
          <Image 
            src="/assets/images/apple-logo.svg" 
            alt="Apple App Store"
            width={18} // from CSS
            height={21.91} // from CSS
            className="flex-none order-0 flex-grow-0"
          />
          {/* Google Play Logo */}
          <Image 
            src="/assets/images/google-play-logo.svg" 
            alt="Google Play Store"
            width={18} // from CSS
            height={19.64} // from CSS
            className="flex-none order-1 flex-grow-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ScanToDownloadPopup; 