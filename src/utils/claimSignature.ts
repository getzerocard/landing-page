import { ethers } from 'ethers';

/**
 * Generate a keccak256 hash of an email address
 * @param email The email address to hash
 * @returns The keccak256 hash as a hex string
 */
export function hashEmail(email: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(email.toLowerCase().trim()));
}

/**
 * Generate the message hash for signing (matches smart contract logic)
 * @param emailHash The keccak256 hash of the email
 * @param walletAddress The recipient wallet address
 * @param nonce Unique nonce for this claim
 * @returns The message hash
 */
export function getMessageHash(
  emailHash: string,
  walletAddress: string,
  nonce: number
): string {
  return ethers.solidityPackedKeccak256(
    ['bytes32', 'address', 'uint256'],
    [emailHash, walletAddress, nonce]
  );
}

/**
 * Generate a claim signature (booth staff only - requires private key)
 * @param email The user's email address
 * @param walletAddress The recipient wallet address
 * @param nonce Unique nonce for this claim
 * @param privateKey The booth staff's private key
 * @returns The signature as a hex string
 */
export async function generateClaimSignature(
  email: string,
  walletAddress: string,
  nonce: number,
  privateKey: string
): Promise<{
  signature: string;
  emailHash: string;
  messageHash: string;
}> {
  // Create wallet from private key
  const wallet = new ethers.Wallet(privateKey);

  // Hash the email
  const emailHash = hashEmail(email);

  // Create message hash
  const messageHash = getMessageHash(emailHash, walletAddress, nonce);

  // Sign the message
  const signature = await wallet.signMessage(ethers.getBytes(messageHash));

  return {
    signature,
    emailHash,
    messageHash
  };
}

/**
 * Verify a claim signature
 * @param email The user's email address
 * @param walletAddress The recipient wallet address
 * @param nonce The nonce used
 * @param signature The signature to verify
 * @param expectedSigner The expected signer address (booth staff)
 * @returns True if signature is valid
 */
export function verifyClaimSignature(
  email: string,
  walletAddress: string,
  nonce: number,
  signature: string,
  expectedSigner: string
): boolean {
  try {
    // Hash the email
    const emailHash = hashEmail(email);

    // Create message hash
    const messageHash = getMessageHash(emailHash, walletAddress, nonce);

    // Recover the signer
    const recoveredAddress = ethers.verifyMessage(
      ethers.getBytes(messageHash),
      signature
    );

    // Compare with expected signer
    return recoveredAddress.toLowerCase() === expectedSigner.toLowerCase();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Generate a random nonce
 * @returns A random nonce as a number
 */
export function generateNonce(): number {
  return Math.floor(Math.random() * 1000000000);
}

/**
 * Format claim code for easy sharing (combines signature and nonce)
 * @param signature The signature hex string
 * @param nonce The nonce used
 * @returns A formatted claim code string
 */
export function formatClaimCode(signature: string, nonce: number): string {
  return `${signature}:${nonce}`;
}

/**
 * Parse a claim code back into signature and nonce
 * @param claimCode The formatted claim code
 * @returns Object with signature and nonce
 */
export function parseClaimCode(claimCode: string): {
  signature: string;
  nonce: number;
} {
  const [signature, nonceStr] = claimCode.split(':');
  return {
    signature: signature || '',
    nonce: parseInt(nonceStr || '0', 10)
  };
}

