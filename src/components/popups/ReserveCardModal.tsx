import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../buttons/Button';
import { db } from '../../firebase.js'; // Adjust path as needed
import { collection, addDoc, getDocs, query, where, limit } from 'firebase/firestore'; // Added query, where, limit
import { IoClose } from 'react-icons/io5'; // Import the close icon
import { collectDeviceInfo, getIPInfo } from '../../utils/deviceInfo';

interface ReserveCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReserveCardModal: React.FC<ReserveCardModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const shareLink = 'https://getzerocard.xyz'; // Replace with actual link if different

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setEmail('');
      setIsSubmitted(false);
      setWaitlistNumber(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      // Check if email already exists
      const q = query(collection(db, 'waitlist'), where('email', '==', email.toLowerCase()), limit(1));
      const querySnapshotExisting = await getDocs(q);

      if (!querySnapshotExisting.empty) {
        setError('You are already on our waitlist');
        setIsLoading(false);
        return;
      }
      
      // Collect device information (synchronous, always works)
      const deviceInfo = collectDeviceInfo();
      
      // Get IP info with timeout - don't block submission if it fails
      let ipInfo = { ip: 'Unknown' };
      try {
        const ipInfoPromise = getIPInfo();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        ipInfo = await Promise.race([ipInfoPromise, timeoutPromise]) as typeof ipInfo;
      } catch (ipError) {
        // IP info is optional - continue without it
        console.warn('IP info fetch failed, continuing without it:', ipError);
      }
      
      // Add email to Firestore with device and IP information
      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase(),
        timestamp: new Date(),
        deviceInfo,
        ipInfo,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });

      // Try to get approximate waitlist count (non-blocking)
      // Use a separate query that doesn't block the submission
      getDocs(collection(db, 'waitlist'))
        .then((snapshot) => {
          setWaitlistNumber(snapshot.size);
        })
        .catch((countError) => {
          // Count is optional - don't show error to user
          console.warn('Failed to get waitlist count:', countError);
        });
      
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Waitlist submission error:', err);
      
      // Provide more specific error messages
      if (err?.code === 'permission-denied') {
        setError('Permission denied. Please check your connection.');
      } else if (err?.code === 'unavailable') {
        setError('Service temporarily unavailable. Please try again.');
      } else if (err?.message?.includes('network') || err?.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Failed to submit email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        // Optional: Show a temporary "Copied!" message
        alert('Link copied to clipboard!');
      })
      .catch(() => {
        setError('Failed to copy link.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="box-border flex flex-row items-center p-6 gap-2.5 bg-[#F7F7F7] shadow-[0px_3.53px_15.87px_-3.53px_rgba(106,128,48,0.25)] rounded-[20px] w-full max-w-md sm:w-[398px] relative">
        <div className="flex flex-col items-start gap-8 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-row justify-between items-center self-stretch">
            <div className="flex flex-row items-center gap-1">
              <div className="relative w-[120px] h-[28px] flex items-center justify-center">
                <Image 
                  src="/assets/images/logo.svg" 
                  alt="Zerocard Logo" 
                  width={120} 
                  height={28} 
                  objectFit="contain" 
                />
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-gray-600 hover:text-black">
              <IoClose size={24} />
            </button>
          </div>

          {!isSubmitted ? (
            <>
              {/* Content - Initial State */}
              <div className="flex flex-col items-start gap-6 self-stretch">
                {/* Background decorative vectors - simplified or omitted for clarity */}
                <p className="font-semibold text-xl leading-6 text-black">Join our waitlist now</p>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label htmlFor="email" className="font-medium text-sm leading-tight text-[#919191]">Enter your email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    className="box-border flex flex-row items-center p-3 gap-2.5 bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[10px] self-stretch font-medium text-base leading-tight text-[#8D8D8D] focus:ring-2 focus:ring-[#40FF00] focus:border-transparent outline-none"
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
              </div>
               {/* Action Button */}
              <Button
                variant="primary"
                className="self-stretch"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Start spending'}
              </Button>
            </>
          ) : (
            <>
              {/* Content - Completed State */}
              <div className="flex flex-col items-start gap-2 self-stretch text-center sm:text-left">
                 {/* Background decorative vectors - simplified or omitted for clarity */}
                <p className="font-semibold text-xl leading-6 text-black self-stretch">
                  {waitlistNumber ? `Thanks 🎉 you're number ${waitlistNumber} on the waitlist` : 'Thanks 🎉 You\'re on the waitlist!'}
                </p>
                <p className="font-medium text-base leading-tight text-[#919191] self-stretch">
                  We are happy to spend crypto like cash alongside with you
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 self-stretch">
                <p className="font-medium text-base leading-tight text-[#919191] self-stretch">Share to friends</p>
                <div className="box-border flex flex-row justify-between items-center p-2 sm:p-3 gap-2 bg-[#EEEEEE] rounded-[10px] self-stretch w-full">
                  <span className="font-medium text-sm sm:text-base leading-tight text-[#383838] truncate">
                    {shareLink}
                  </span>
                  <button 
                    onClick={handleCopyLink}
                    className="box-border flex flex-row justify-center items-center p-1.5 sm:p-2 gap-2.5 bg-white border border-[#DADADA] rounded-full text-xs sm:text-sm text-[#929292] hover:bg-gray-50"
                  >
                    Copy
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveCardModal; 