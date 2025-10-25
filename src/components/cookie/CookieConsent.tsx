import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { collectDeviceInfo, getIPInfo } from '../../utils/deviceInfo';

interface CookieConsentProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onReject
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Add a small delay for smooth entrance animation
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 100);
    }
  }, []);

  const handleAccept = async () => {
    setIsAnimating(false);
    
    try {
      // Collect device information and IP address
      const deviceInfo = collectDeviceInfo();
      const ipInfo = await getIPInfo();
      
      // Save to Firebase cookie collection
      await addDoc(collection(db, 'cookie'), {
        consent: 'accepted',
        deviceInfo,
        ipInfo,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      // Silent error handling
    }
    
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
      onAccept?.();
    }, 200);
  };

  const handleReject = async () => {
    setIsAnimating(false);
    
    try {
      // Collect device information and IP address
      const deviceInfo = collectDeviceInfo();
      const ipInfo = await getIPInfo();
      
      // Save to Firebase cookie collection
      await addDoc(collection(db, 'cookie'), {
        consent: 'rejected',
        deviceInfo,
        ipInfo,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      // Silent error handling
    }
    
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'rejected');
      setIsVisible(false);
      onReject?.();
    }, 200);
  };


  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-md transition-all duration-300 ease-out ${
      isVisible 
        ? (isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0') 
        : 'translate-y-8 opacity-0'
    }`}>
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-300 ease-out ${
        isAnimating ? 'scale-100' : 'scale-95'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/assets/images/logo.svg"
              alt="Zerocard Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Cookie Consent</h3>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            Zerocard uses cookies on your device to deliver more reliable services, improve the quality of our website, and enable personalized features.
          </p>
          <p className="text-gray-700 text-sm">
            For more information see our{' '}
            <a href="/cookie-notice" className="underline text-gray-700 hover:text-gray-900">
              Cookie Notice
            </a>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 ease-out"
          >
            Accept all
          </button>
          <button
            onClick={handleReject}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-blue-300 rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 ease-out"
          >
            Reject all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
