import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../buttons/Button';
import { db } from '../../firebase.js';
import { doc, updateDoc, collection, query, where, getDocs, runTransaction } from 'firebase/firestore';
import { IoClose } from 'react-icons/io5';
import { SocialShare } from './SocialShare';
import { executeClaimWithWallet, switchToBaseNetwork, getExplorerLink } from '../../utils/web3';
import { parseClaimCode } from '../../utils/claimSignature';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

type GiftType = '1 USDC' | '20% Off Card Fees' | 'Energy Drink' | 'Better Luck Next Time';

interface Gift {
  type: GiftType;
  icon: string;
  message: string;
  description: string;
}

const GIFTS: Record<GiftType, Gift> = {
  '1 USDC': {
    type: '1 USDC',
    icon: '💵',
    message: 'You won 1 USDC!',
    description: 'Congratulations! Your reward will be credited to your account when you order your card.'
  },
  '20% Off Card Fees': {
    type: '20% Off Card Fees',
    icon: '🎟️',
    message: 'You won 20% Off Card Fees!',
    description: 'Amazing! Enjoy 20% discount on your card fees when you order your Zerocard. Present your email at our booth to claim this reward.'
  },
  'Energy Drink': {
    type: 'Energy Drink',
    icon: '⚡',
    message: 'You won an Energy Drink!',
    description: 'Nice! Visit our booth and present your email to claim your energy drink.'
  },
  'Better Luck Next Time': {
    type: 'Better Luck Next Time',
    icon: '🎯',
    message: 'Better Luck Next Time!',
    description: 'Keep an eye out for more exciting rewards coming soon with Zerocard.'
  }
};

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  
  // USDC claim states
  const [showClaimUI, setShowClaimUI] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      // Auto-start the gift selection when modal opens
      handleSpinGift();
      setHasStarted(true);
    }
    if (!isOpen) {
      // Reset state when modal closes
      setIsSpinning(false);
      setSelectedGift(null);
      setError(null);
      setHasStarted(false);
      setShowClaimUI(false);
      setWalletAddress('');
      setClaimCode('');
      setIsClaiming(false);
      setClaimSuccess(false);
      setTxHash(null);
    }
  }, [isOpen, hasStarted]);

  const selectRandomGift = async (): Promise<GiftType> => {
    try {
      // Use a transaction to ensure accurate counting and prevent race conditions
      const giftType = await runTransaction(db, async () => {
        // Get current counts of each gift type
        const waitlistRef = collection(db, 'waitlist');
        
        const usdcQuery = query(waitlistRef, where('gift', '==', '1 USDC'));
        const cardFeesQuery = query(waitlistRef, where('gift', '==', '20% Off Card Fees'));
        const energyDrinkQuery = query(waitlistRef, where('gift', '==', 'Energy Drink'));
        
        const [usdcSnapshot, cardFeesSnapshot, energyDrinkSnapshot] = await Promise.all([
          getDocs(usdcQuery),
          getDocs(cardFeesQuery),
          getDocs(energyDrinkQuery)
        ]);
        
        const usdcCount = usdcSnapshot.size;
        const cardFeesCount = cardFeesSnapshot.size;
        const energyDrinkCount = energyDrinkSnapshot.size;
        
        // Available gifts based on limits
        const availableGifts: GiftType[] = [];
        
        if (usdcCount < 10) {
          availableGifts.push('1 USDC');
        }
        if (cardFeesCount < 5) {
          availableGifts.push('20% Off Card Fees');
        }
        if (energyDrinkCount < 50) {
          availableGifts.push('Energy Drink');
        }
        
        // If no gifts available, return "Better Luck Next Time"
        if (availableGifts.length === 0) {
          return 'Better Luck Next Time';
        }
        
        // Weight the probabilities
        // 1 USDC: 10 available (rarest - 15% chance if available)
        // 20% Off: 5 available (rare - 10% chance if available)
        // Energy Drink: 50 available (common - 75% chance if available)
        
        const weights: number[] = [];
        availableGifts.forEach(gift => {
          if (gift === '1 USDC') weights.push(15);
          else if (gift === '20% Off Card Fees') weights.push(10);
          else if (gift === 'Energy Drink') weights.push(75);
        });
        
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const random = Math.random() * totalWeight;
        
        let cumulativeWeight = 0;
        for (let i = 0; i < availableGifts.length; i++) {
          cumulativeWeight += weights[i] ?? 0;
          if (random < cumulativeWeight) {
            return availableGifts[i] ?? 'Better Luck Next Time';
          }
        }
        
        return availableGifts[0] ?? 'Better Luck Next Time';
      });
      
      return giftType ?? 'Better Luck Next Time';
    } catch (err) {
      console.error('Error selecting gift:', err);
      return 'Better Luck Next Time';
    }
  };

  const handleSpinGift = async () => {
    setIsSpinning(true);
    setError(null);

    try {
      // Simulate spinning animation (2.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Select random gift
      const giftType = await selectRandomGift();
      
      // Update user's record in Firestore
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', userEmail.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty && querySnapshot.docs[0]) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'waitlist', userDoc.id), {
          gift: giftType,
          giftAssignedAt: new Date()
        });
      }
      
      // Set the selected gift
      setSelectedGift(GIFTS[giftType]);
    } catch (err) {
      console.error('Error assigning gift:', err);
      setError('Something went wrong. Please contact support.');
      setSelectedGift(GIFTS['Better Luck Next Time']);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleClaimUSDC = async () => {
    setIsClaiming(true);
    setError(null);

    try {
      // Validate inputs
      if (!walletAddress || !claimCode) {
        throw new Error('Please enter both wallet address and claim code');
      }

      // Parse claim code
      const { signature, nonce } = parseClaimCode(claimCode);
      if (!signature || !nonce) {
        throw new Error('Invalid claim code format');
      }

      // Switch to Base network if needed
      await switchToBaseNetwork();

      // Execute claim transaction
      const receipt = await executeClaimWithWallet(
        userEmail,
        walletAddress,
        signature,
        nonce
      );

      // Update Firestore
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', userEmail.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty && querySnapshot.docs[0]) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'waitlist', userDoc.id), {
          claimStatus: 'claimed',
          claimTxHash: receipt.hash,
          claimedAt: new Date()
        });
      }

      setTxHash(receipt.hash);
      setClaimSuccess(true);
    } catch (err: any) {
      console.error('Error claiming USDC:', err);
      setError(err.message || 'Failed to claim USDC. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  const handleProceedToClaim = () => {
    setShowClaimUI(true);
  };

  if (!isOpen) return null;

  const isUSDCWinner = selectedGift?.type === '1 USDC';
  const shouldShowShare = selectedGift && selectedGift.type !== 'Better Luck Next Time';

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
            <button 
              onClick={onClose} 
              className="p-1 text-gray-600 hover:text-black"
              disabled={isSpinning}
            >
              <IoClose size={24} />
            </button>
          </div>

          {isSpinning ? (
            <>
              {/* Spinning State */}
              <div className="flex flex-col items-center justify-center gap-6 self-stretch min-h-[200px]">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Animated spinning gift box */}
                  <div className="text-7xl animate-spin-slow">
                    🎁
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold text-xl leading-6 text-black text-center">
                    Selecting your gift...
                  </p>
                  <p className="font-medium text-base leading-tight text-[#919191] text-center">
                    Hold tight! We're picking something special for you
                  </p>
                </div>
              </div>
            </>
          ) : selectedGift ? (
            <>
              {/* USDC Claim Success State */}
              {claimSuccess && txHash ? (
                <>
                  <div className="flex flex-col items-center justify-center gap-6 self-stretch">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="text-7xl">✅</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-semibold text-xl leading-6 text-black text-center">
                        USDC Claimed Successfully!
                      </p>
                      <p className="font-medium text-base leading-tight text-[#919191] text-center">
                        Your 1 USDC has been sent to your wallet.
                      </p>
                      <a 
                        href={getExplorerLink(txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#40FF00] hover:underline mt-2"
                      >
                        View transaction on Basescan →
                      </a>
                    </div>
                  </div>

                  {shouldShowShare && <SocialShare giftType={selectedGift.type} />}

                  <Button
                    variant="primary"
                    className="self-stretch"
                    onClick={onClose}
                  >
                    Continue
                  </Button>
                </>
              ) : isUSDCWinner && showClaimUI ? (
                <>
                  {/* USDC Claim Form */}
                  <div className="flex flex-col items-start gap-6 self-stretch">
                    <div className="flex flex-col items-center gap-2 self-stretch">
                      <div className="text-5xl">💵</div>
                      <p className="font-semibold text-xl leading-6 text-black text-center">
                        Claim Your 1 USDC
                      </p>
                      <p className="font-medium text-sm leading-tight text-[#919191] text-center">
                        Visit our booth to get your claim code, then enter your wallet details below
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch">
                      <label htmlFor="wallet" className="font-medium text-sm text-[#919191]">
                        Base Wallet Address
                      </label>
                      <input
                        type="text"
                        id="wallet"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="0x..."
                        className="box-border flex flex-row items-center p-3 gap-2.5 bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[10px] self-stretch font-medium text-base leading-tight text-black focus:ring-2 focus:ring-[#40FF00] focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch">
                      <label htmlFor="claimCode" className="font-medium text-sm text-[#919191]">
                        Claim Code (from booth staff)
                      </label>
                      <input
                        type="text"
                        id="claimCode"
                        value={claimCode}
                        onChange={(e) => setClaimCode(e.target.value)}
                        placeholder="Paste claim code here"
                        className="box-border flex flex-row items-center p-3 gap-2.5 bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[10px] self-stretch font-medium text-base leading-tight text-black focus:ring-2 focus:ring-[#40FF00] focus:border-transparent outline-none"
                      />
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}
                  </div>

                  <Button
                    variant="primary"
                    className="self-stretch"
                    onClick={handleClaimUSDC}
                    disabled={isClaiming}
                  >
                    {isClaiming ? 'Claiming...' : 'Claim USDC Now'}
                  </Button>
                </>
              ) : (
                <>
                  {/* Gift Revealed State */}
                  <div className="flex flex-col items-center justify-center gap-6 self-stretch">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="text-7xl animate-bounce-once">
                        {selectedGift.icon}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-semibold text-xl leading-6 text-black text-center">
                        {selectedGift.message}
                      </p>
                      <p className="font-medium text-base leading-tight text-[#919191] text-center">
                        {selectedGift.description}
                      </p>
                    </div>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                  </div>

                  {shouldShowShare && <SocialShare giftType={selectedGift.type} />}

                  {/* Action Button */}
                  {isUSDCWinner ? (
                    <Button
                      variant="primary"
                      className="self-stretch"
                      onClick={handleProceedToClaim}
                    >
                      Claim Now
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="self-stretch"
                      onClick={onClose}
                    >
                      Continue
                    </Button>
                  )}
                </>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-20px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-10px);
          }
        }

        :global(.animate-spin-slow) {
          animation: spin-slow 1s linear infinite;
        }

        :global(.animate-bounce-once) {
          animation: bounce-once 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default GiftModal;

