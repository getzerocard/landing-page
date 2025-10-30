import React, { useState } from 'react';
import { Button } from '../../components/buttons/Button';
import { generateClaimSignature, formatClaimCode, generateNonce, hashEmail } from '../../utils/claimSignature';
import { hasEmailClaimed, getContractBalance } from '../../utils/web3';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import QRCodeStyling from 'qr-code-styling';
import Image from 'next/image';

const BoothStaffAdmin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [contractBalance, setContractBalance] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'zerocard2024';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError(null);
      loadContractBalance();
    } else {
      setError('Invalid password');
    }
  };

  const loadContractBalance = async () => {
    try {
      const balance = await getContractBalance();
      setContractBalance(balance);
    } catch (err) {
      console.error('Error loading balance:', err);
    }
  };

  const generateQRCode = async (code: string) => {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: code,
      dotsOptions: {
        color: '#000000',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
    });

    const blob = await qrCode.getRawData('png');
    if (blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeDataUrl(reader.result as string);
      };
      reader.readAsDataURL(blob);
    }
  };

  const handleGenerateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate inputs
      if (!email || !walletAddress) {
        throw new Error('Email and wallet address are required');
      }

      // Validate email format
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Invalid email format');
      }

      // Check if email already claimed from waitlist
      const waitlistQuery = query(
        collection(db, 'waitlist'),
        where('email', '==', email.toLowerCase())
      );
      const waitlistSnapshot = await getDocs(waitlistQuery);

      if (waitlistSnapshot.empty) {
        throw new Error('Email not found in waitlist. User must join waitlist first.');
      }

      const userDoc = waitlistSnapshot.docs[0];
      const userData = userDoc.data();

      // Check if user won 1 USDC
      if (userData.gift !== '1 USDC') {
        throw new Error(`This user won "${userData.gift}", not 1 USDC. Only USDC winners can claim.`);
      }

      // Check if already claimed on blockchain
      const alreadyClaimed = await hasEmailClaimed(email);
      if (alreadyClaimed) {
        throw new Error('This email has already claimed their USDC reward');
      }

      // Check if claim code already generated for this email
      const claimCodeQuery = query(
        collection(db, 'claimCodes'),
        where('email', '==', email.toLowerCase()),
        where('used', '==', false)
      );
      const existingCodes = await getDocs(claimCodeQuery);

      if (!existingCodes.empty) {
        const existingCode = existingCodes.docs[0].data();
        const code = formatClaimCode(existingCode.signature, existingCode.nonce);
        setClaimCode(code);
        await generateQRCode(code);
        setSuccess('Claim code already exists for this email. Showing existing code.');
        return;
      }

      // Generate nonce
      const nonce = generateNonce();

      // Get admin private key
      const privateKey = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error('Admin private key not configured');
      }

      // Generate signature
      const { signature, emailHash } = await generateClaimSignature(
        email,
        walletAddress,
        nonce,
        privateKey
      );

      // Format claim code
      const code = formatClaimCode(signature, nonce);

      // Save to Firestore
      await addDoc(collection(db, 'claimCodes'), {
        email: email.toLowerCase(),
        emailHash,
        walletAddress,
        code,
        signature,
        nonce,
        generatedBy: 'booth-staff',
        generatedAt: new Date(),
        used: false
      });

      // Update waitlist record with claim code
      await updateDoc(doc(db, 'waitlist', userDoc.id), {
        claimCode: code,
        claimStatus: 'pending',
        walletAddress
      });

      // Set claim code and generate QR
      setClaimCode(code);
      await generateQRCode(code);
      
      setSuccess('Claim code generated successfully!');
      setEmail('');
      setWalletAddress('');
      
      // Refresh balance
      loadContractBalance();
    } catch (err: any) {
      setError(err.message || 'Failed to generate claim code');
      console.error('Error generating claim code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(claimCode);
    alert('Claim code copied to clipboard!');
  };

  const handleReset = () => {
    setClaimCode('');
    setQrCodeDataUrl('');
    setSuccess(null);
    setError(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] p-4">
        <div className="box-border flex flex-col items-center p-8 gap-6 bg-white shadow-lg rounded-[20px] w-full max-w-md">
          <Image 
            src="/assets/images/logo.svg" 
            alt="Zerocard Logo" 
            width={120} 
            height={28}
          />
          <h1 className="font-semibold text-2xl text-black">Booth Staff Admin</h1>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-sm text-[#919191]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="box-border p-3 bg-[#F7F7F7] rounded-[10px] font-medium text-base text-black focus:ring-2 focus:ring-[#40FF00] outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button variant="primary" type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Image 
              src="/assets/images/logo.svg" 
              alt="Zerocard Logo" 
              width={120} 
              height={28}
            />
            <h1 className="font-bold text-3xl text-black mt-4">Booth Staff Admin</h1>
            <p className="text-[#919191] mt-2">Generate USDC claim codes for winners</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#919191]">Contract Balance</p>
            <p className="font-bold text-2xl text-black">{contractBalance || '...'} USDC</p>
          </div>
        </div>

        {!claimCode ? (
          <div className="bg-white shadow-lg rounded-[20px] p-8">
            <h2 className="font-semibold text-xl text-black mb-6">Generate Claim Code</h2>
            <form onSubmit={handleGenerateCode} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-sm text-[#919191]">
                  Winner's Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="box-border p-3 bg-[#F7F7F7] rounded-[10px] font-medium text-base text-black focus:ring-2 focus:ring-[#40FF00] outline-none"
                  placeholder="winner@example.com"
                  required
                />
                <p className="text-xs text-[#919191]">Must be in waitlist and won 1 USDC</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="wallet" className="font-medium text-sm text-[#919191]">
                  Winner's Wallet Address (Base)
                </label>
                <input
                  type="text"
                  id="wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="box-border p-3 bg-[#F7F7F7] rounded-[10px] font-medium text-base text-black focus:ring-2 focus:ring-[#40FF00] outline-none"
                  placeholder="0x..."
                  required
                />
                <p className="text-xs text-[#919191]">User's Base network wallet address</p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button 
                variant="primary" 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Claim Code'}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-[20px] p-8">
            <h2 className="font-semibold text-xl text-black mb-6">Claim Code Generated</h2>
            
            {qrCodeDataUrl && (
              <div className="flex justify-center mb-6">
                <img src={qrCodeDataUrl} alt="Claim Code QR" className="rounded-lg shadow-md" />
              </div>
            )}

            <div className="bg-[#F7F7F7] rounded-[10px] p-4 mb-6">
              <p className="text-xs text-[#919191] mb-2">Claim Code:</p>
              <p className="font-mono text-sm text-black break-all">{claimCode}</p>
            </div>

            <div className="flex gap-4">
              <Button variant="secondary" onClick={handleCopyCode} className="flex-1">
                Copy Code
              </Button>
              <Button variant="primary" onClick={handleReset} className="flex-1">
                Generate Another
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Instructions for winner:</strong><br />
                1. Go to the website and claim their gift<br />
                2. Enter their wallet address<br />
                3. Paste this claim code<br />
                4. Click "Claim USDC" and sign the transaction
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothStaffAdmin;

