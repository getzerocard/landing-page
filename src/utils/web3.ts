import { ethers } from 'ethers';
import { hashEmail } from './claimSignature';

// Base Network Configuration
export const BASE_MAINNET = {
  chainId: 8453,
  name: 'Base',
  rpcUrl: 'https://mainnet.base.org',
  explorerUrl: 'https://basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  }
};

export const BASE_SEPOLIA = {
  chainId: 84532,
  name: 'Base Sepolia',
  rpcUrl: 'https://sepolia.base.org',
  explorerUrl: 'https://sepolia.basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  }
};

// Smart Contract ABI (minimal interface for claiming)
const REWARD_CLAIM_ABI = [
  'function claimReward(bytes32 emailHash, address walletAddress, uint256 nonce, bytes signature) external',
  'function hasClaimed(bytes32) external view returns (bool)',
  'function usedNonces(uint256) external view returns (bool)',
  'function getBalance() external view returns (uint256)',
  'function hasEmailClaimed(bytes32 emailHash) external view returns (bool)',
  'function isNonceUsed(uint256 nonce) external view returns (bool)',
  'event RewardClaimed(bytes32 indexed emailHash, address indexed recipient, uint256 amount, uint256 nonce)'
];

/**
 * Get Base network RPC provider
 */
export function getBaseProvider(): ethers.JsonRpcProvider {
  const rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || BASE_MAINNET.rpcUrl;
  return new ethers.JsonRpcProvider(rpcUrl);
}

/**
 * Get the reward claim contract instance
 */
export function getRewardClaimContract(
  providerOrSigner?: ethers.Provider | ethers.Signer
): ethers.Contract {
  const contractAddress = process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    throw new Error('USDC contract address not configured');
  }

  const provider = providerOrSigner || getBaseProvider();
  return new ethers.Contract(contractAddress, REWARD_CLAIM_ABI, provider);
}

/**
 * Check if an email has already claimed
 * @param email The email address to check
 * @returns True if the email has claimed
 */
export async function hasEmailClaimed(email: string): Promise<boolean> {
  try {
    const contract = getRewardClaimContract();
    const emailHash = hashEmail(email);
    return await contract.hasEmailClaimed(emailHash);
  } catch (error) {
    console.error('Error checking claim status:', error);
    throw error;
  }
}

/**
 * Check if a nonce has been used
 * @param nonce The nonce to check
 * @returns True if the nonce has been used
 */
export async function isNonceUsed(nonce: number): Promise<boolean> {
  try {
    const contract = getRewardClaimContract();
    return await contract.isNonceUsed(nonce);
  } catch (error) {
    console.error('Error checking nonce status:', error);
    throw error;
  }
}

/**
 * Get the contract's USDC balance
 * @returns The balance in USDC (formatted as string)
 */
export async function getContractBalance(): Promise<string> {
  try {
    const contract = getRewardClaimContract();
    const balance = await contract.getBalance();
    // USDC has 6 decimals
    return ethers.formatUnits(balance, 6);
  } catch (error) {
    console.error('Error getting contract balance:', error);
    throw error;
  }
}

/**
 * Claim USDC reward (client-side, no private key needed)
 * @param email The user's email address
 * @param walletAddress The recipient wallet address
 * @param claimCode The claim code from booth staff (format: "signature:nonce")
 * @returns Transaction hash
 */
export async function claimUSDCReward(
  email: string,
  walletAddress: string,
  claimCode: string
): Promise<string> {
  try {
    // Parse claim code
    const [signature, nonceStr] = claimCode.split(':');
    if (!signature || !nonceStr) {
      throw new Error('Invalid claim code format');
    }
    
    const nonce = parseInt(nonceStr, 10);
    if (isNaN(nonce)) {
      throw new Error('Invalid nonce in claim code');
    }

    // Hash the email
    const emailHash = hashEmail(email);

    // Get contract with provider (read-only for now)
    const provider = getBaseProvider();
    const contract = getRewardClaimContract(provider);

    // Validate wallet address
    if (!ethers.isAddress(walletAddress)) {
      throw new Error('Invalid wallet address');
    }

    // Check if already claimed
    const alreadyClaimed = await contract.hasEmailClaimed(emailHash);
    if (alreadyClaimed) {
      throw new Error('This email has already claimed a reward');
    }

    // Check if nonce is already used
    const nonceUsed = await contract.isNonceUsed(nonce);
    if (nonceUsed) {
      throw new Error('This claim code has already been used');
    }

    // Prepare transaction data
    const txData = contract.interface.encodeFunctionData('claimReward', [
      emailHash,
      walletAddress,
      nonce,
      signature
    ]);

    // Return transaction data for user to sign with their wallet
    // This will be used with wallet providers like MetaMask
    return txData;
  } catch (error) {
    console.error('Error preparing claim transaction:', error);
    throw error;
  }
}

/**
 * Execute claim transaction using browser wallet (MetaMask, Coinbase Wallet, etc.)
 * This function should be called after the user connects their wallet
 * @param email The user's email address
 * @param walletAddress The recipient wallet address (should match connected wallet)
 * @param signature The signature from booth staff
 * @param nonce The nonce for this claim
 * @returns Transaction receipt
 */
export async function executeClaimWithWallet(
  email: string,
  walletAddress: string,
  signature: string,
  nonce: number
): Promise<ethers.TransactionReceipt> {
  try {
    // Check if window.ethereum is available
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No Ethereum wallet detected. Please install MetaMask or Coinbase Wallet.');
    }

    // Create provider from window.ethereum
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Request account access
    await provider.send('eth_requestAccounts', []);

    // Get signer
    const signer = await provider.getSigner();

    // Verify the signer address matches the wallet address
    const signerAddress = await signer.getAddress();
    if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new Error('Connected wallet does not match the recipient address');
    }

    // Check network
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(BASE_MAINNET.chainId)) {
      throw new Error(`Please switch to Base network (Chain ID: ${BASE_MAINNET.chainId})`);
    }

    // Get contract with signer
    const contract = getRewardClaimContract(signer);

    // Hash email
    const emailHash = hashEmail(email);

    // Execute claim transaction
    const tx = await contract.claimReward(
      emailHash,
      walletAddress,
      nonce,
      signature
    );

    console.log('Transaction submitted:', tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);

    return receipt;
  } catch (error) {
    console.error('Error executing claim:', error);
    throw error;
  }
}

/**
 * Switch to Base network in user's wallet
 */
export async function switchToBaseNetwork(): Promise<void> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum wallet detected');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${BASE_MAINNET.chainId.toString(16)}` }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to the wallet
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${BASE_MAINNET.chainId.toString(16)}`,
              chainName: BASE_MAINNET.name,
              nativeCurrency: BASE_MAINNET.nativeCurrency,
              rpcUrls: [BASE_MAINNET.rpcUrl],
              blockExplorerUrls: [BASE_MAINNET.explorerUrl],
            },
          ],
        });
      } catch (addError) {
        throw new Error('Failed to add Base network to wallet');
      }
    } else {
      throw switchError;
    }
  }
}

/**
 * Format transaction hash as explorer link
 * @param txHash The transaction hash
 * @returns The explorer URL
 */
export function getExplorerLink(txHash: string): string {
  return `${BASE_MAINNET.explorerUrl}/tx/${txHash}`;
}

/**
 * Check if user's wallet is connected
 * @returns True if wallet is connected
 */
export async function isWalletConnected(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return false;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  } catch {
    return false;
  }
}

/**
 * Get connected wallet address
 * @returns The wallet address or null if not connected
 */
export async function getConnectedAddress(): Promise<string | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return await signer.getAddress();
  } catch {
    return null;
  }
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

