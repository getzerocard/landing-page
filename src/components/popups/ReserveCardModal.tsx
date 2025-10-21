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

      console.log('Submitting email:', email);
      
      // Collect device information and IP address
      const deviceInfo = collectDeviceInfo();
      const ipInfo = await getIPInfo();
      
      // Add email to Firestore with device and IP information
      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase(),
        timestamp: new Date(),
        deviceInfo,
        ipInfo,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
      console.log('Email submitted successfully to Firestore with device info.');

      // Get current waitlist count (simplified)
      const querySnapshot = await getDocs(collection(db, 'waitlist'));
      const count = querySnapshot.size;
      setWaitlistNumber(count);
      console.log('Waitlist number:', count);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to submit email. Please try again.');
      console.log('Email submission failed:', err);
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
      .catch(err => {
        console.error('Failed to copy text: ', err);
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
                  Thanks 🎉 you're number {waitlistNumber || '...'} on the waitlist
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