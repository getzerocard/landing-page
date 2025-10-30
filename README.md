# ZeroCard

ZeroCard makes spending cryptocurrency as easy as using cash.

We simplify the crypto experience by:

1.  **Setting up your wallet:** Get a secure crypto wallet with just your email.
2.  **Issuing your card:** Receive a physical or virtual card linked to your wallet.
3.  **Seamless Spending:** Use your ZeroCard anywhere cards are accepted, effortlessly spending your crypto like local currency (Naira, Cedis, Shillings, and more).

No more complex conversions or high fees – just simple, straightforward crypto spending for everyday life.

**Currently focusing on bringing easy crypto spending to Nigeria, Ghana, and Kenya.**

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in your Firebase project
3. Create a `.env.local` file in the root directory with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

You can find these values in Firebase Console > Project Settings > General > Your apps.

### Installation

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## USDC Reward Claim System

The platform includes a smart contract-based USDC reward system for waitlist participants. Winners can claim their 1 USDC reward instantly using the Base blockchain.

### System Overview

- **10 USDC rewards** available (1 USDC each)
- **Smart contract** on Base network ensures secure, verifiable claims
- **Booth staff verification** prevents abuse through signed claim codes
- **Instant settlement** directly to winner's wallet

### Environment Variables

Add these to your `.env.local` file:

```bash
# Base Network Configuration
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=<deployed_contract_address>
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# Admin Configuration (Booth Staff)
ADMIN_PRIVATE_KEY=<booth_staff_wallet_private_key>
NEXT_PUBLIC_ADMIN_PRIVATE_KEY=<booth_staff_wallet_private_key>
NEXT_PUBLIC_ADMIN_PASSWORD=<admin_panel_password>

# Optional: For contract verification on Basescan
BASESCAN_API_KEY=<your_basescan_api_key>
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### Smart Contract Deployment

1. **Configure Hardhat**

Ensure your `.env.local` contains `ADMIN_PRIVATE_KEY` with the wallet private key that will deploy and manage the contract.

2. **Deploy to Base Testnet (Recommended First)**

```bash
# Deploy to Base Sepolia testnet
npx hardhat run scripts/deploy.js --network baseSepolia
```

3. **Deploy to Base Mainnet**

```bash
# Deploy to Base mainnet
npx hardhat run scripts/deploy.js --network base
```

4. **Fund the Contract**

After deployment, add the contract address to `.env.local` as `NEXT_PUBLIC_USDC_CONTRACT_ADDRESS`, then fund it with 10 USDC:

```bash
npx hardhat run scripts/fund-contract.js --network base
```

5. **Verify Contract on Basescan** (Optional)

```bash
npx hardhat verify --network base <CONTRACT_ADDRESS> "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" "<BOOTH_STAFF_ADDRESS>"
```

### Booth Staff Admin Panel

Access the admin panel at `/admin/booth-staff` to generate claim codes for winners.

**Login**: Use the password set in `NEXT_PUBLIC_ADMIN_PASSWORD`

**Workflow**:
1. Winner visits booth with email used for waitlist
2. Staff verifies winner in system (must have won "1 USDC" gift)
3. Winner provides their Base wallet address
4. Staff generates signed claim code via admin panel
5. Winner enters wallet address and claim code on website
6. Winner signs transaction with their wallet to claim USDC

### Smart Contract Details

- **Contract**: `USDCRewardClaim.sol`
- **Network**: Base (Chain ID: 8453)
- **USDC Token**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Features**:
  - Signed authorization from booth staff required
  - Each email can only claim once
  - Nonce system prevents replay attacks
  - Emergency withdraw function for admin

### Database Schema

**Firestore Collections Updated**:

**`waitlist`** collection (new fields):
- `gift`: Type of gift won (string)
- `giftAssignedAt`: Timestamp when gift was assigned
- `walletAddress`: Winner's Base wallet address (for USDC winners)
- `claimCode`: Signed claim code from booth staff
- `claimStatus`: "pending" | "claimed" | "failed"
- `claimTxHash`: Blockchain transaction hash
- `claimedAt`: Timestamp of successful claim

**`claimCodes`** collection (new):
- `email`: Winner's email
- `emailHash`: Keccak256 hash of email
- `walletAddress`: Winner's wallet address
- `code`: Formatted claim code (signature:nonce)
- `signature`: ECDSA signature from booth staff
- `nonce`: Unique nonce for this claim
- `generatedBy`: Staff identifier
- `generatedAt`: Timestamp
- `used`: Boolean flag

### Utility Scripts

Check contract balance:
```bash
npx hardhat run scripts/check-balance.js --network base
```

### Security Features

1. **Email Verification**: Only emails in waitlist with "1 USDC" gift can claim
2. **Booth Staff Signature**: Claims require cryptographic signature from authorized wallet
3. **One Claim Per Email**: Smart contract prevents duplicate claims
4. **Nonce System**: Prevents replay attacks
5. **Base Network**: Low gas fees, fast confirmations

### Social Sharing

Winners (except "Better Luck Next Time") can share their win on X (Twitter) with a pre-formatted tweet mentioning @getzerocard and @BaseWestAfrica.
