# 📝 Basescan Contract Verification Guide

## Contract Information

**Contract Address:** `0x28cbD168c219A93CA438c46e18858F22071eF6b4`  
**Network:** Base Mainnet  
**Verification URL:** https://basescan.org/verifyContract?a=0x28cbD168c219A93CA438c46e18858F22071eF6b4

## Step-by-Step Verification

### 1. Visit Basescan Verification Page

Go to: https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#code

Click **"Verify and Publish"** button

### 2. Select Verification Method

Choose: **"Via Standard Input JSON"** (Recommended)

OR

Choose: **"Via Flattened Source Code"**

---

## Method 1: Standard Input JSON (Recommended)

### Compiler Configuration

```json
{
  "language": "Solidity",
  "sources": {
    "contracts/USDCRewardClaim.sol": {
      "content": "// Paste contract source here"
    }
  },
  "settings": {
    "optimizer": {
      "enabled": true,
      "runs": 200
    },
    "evmVersion": "shanghai",
    "outputSelection": {
      "*": {
        "*": ["*"]
      }
    }
  }
}
```

### Fill in the form:

1. **Contract Address:** `0x28cbD168c219A93CA438c46e18858F22071eF6b4`

2. **Compiler Type:** Solidity (Standard-Json-Input)

3. **Compiler Version:** v0.8.20+commit.a1b79de6

4. **Open Source License:** MIT License (MIT)

5. **Standard Input JSON:** Upload the file `contracts/USDCRewardClaim.sol` or paste JSON above

6. **Constructor Arguments ABI-encoded:**
```
000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0
```

---

## Method 2: Via Flattened Source Code

### Fill in the form:

1. **Contract Address:** `0x28cbD168c219A93CA438c46e18858F22071eF6b4`

2. **Compiler Type:** Solidity (Single file)

3. **Compiler Version:** v0.8.20+commit.a1b79de6

4. **Open Source License:** MIT License (MIT)

5. **Optimization:** Yes

6. **Optimizer Runs:** 200

7. **EVM Version:** shanghai

8. **Contract Name:** USDCRewardClaim

9. **Enter the Solidity Contract Code:**

Paste the entire contract source including all OpenZeppelin imports. You need to manually copy:
- `@openzeppelin/contracts/token/ERC20/IERC20.sol`
- `@openzeppelin/contracts/access/Ownable.sol`
- `@openzeppelin/contracts/utils/cryptography/ECDSA.sol`
- `@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol`

And replace the import statements with the actual code.

10. **Constructor Arguments ABI-encoded:**
```
000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0
```

---

## Method 3: Multi-Part Files (Easiest with OpenZeppelin)

1. **Contract Address:** `0x28cbD168c219A93CA438c46e18858F22071eF6b4`

2. **Compiler Type:** Solidity (Multi-Part files)

3. **Compiler Version:** v0.8.20+commit.a1b79de6

4. **License:** MIT

5. Upload files:
   - `contracts/USDCRewardClaim.sol`
   - All OpenZeppelin contract files from `node_modules/@openzeppelin/contracts/`

6. **Constructor Arguments:**
```
000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0
```

---

## Constructor Arguments Breakdown

The constructor takes 2 parameters:

1. **USDC Token Address:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
2. **Booth Staff Address:** `0x27cEe32550DcC30De5a23551bAF7de2f3b0b98A0`

ABI-encoded (each address padded to 32 bytes):
```
0000000000000000000000008335589fcd6edb6e08f4c7c32d4f71b54bda02913  <- USDC
00000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0  <- Booth Staff
```

---

## Quick Verification via Etherscan API (Alternative)

If you prefer API verification, use this curl command:

```bash
curl -X POST \
  'https://api.basescan.org/api' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "module=contract" \
  -d "action=verifysourcecode" \
  -d "contractaddress=0x28cbD168c219A93CA438c46e18858F22071eF6b4" \
  -d "sourceCode=<FLATTENED_SOURCE>" \
  -d "codeformat=solidity-single-file" \
  -d "contractname=USDCRewardClaim" \
  -d "compilerversion=v0.8.20+commit.a1b79de6" \
  -d "optimizationUsed=1" \
  -d "runs=200" \
  -d "constructorArguements=000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0" \
  -d "evmversion=shanghai" \
  -d "licenseType=3" \
  -d "apikey=QTFY7T99QSRKHKVIUUNRH3BMZYKIVBB2S9"
```

---

## Verification Status

After submitting, Basescan will process the verification. This typically takes 30-60 seconds.

**Check Status:** https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#code

Once verified, you'll see:
- ✅ Green checkmark next to contract
- "Contract Source Code Verified"
- Ability to read/write contract directly on Basescan
- ABI available for public use

---

## Troubleshooting

**Error: "Compiled bytecode does not match"**
- Double-check compiler version: v0.8.20+commit.a1b79de6
- Ensure optimization is enabled with 200 runs
- Verify constructor arguments are correct

**Error: "Constructor arguments invalid"**
- Use the exact ABI-encoded arguments provided above
- No spaces, no 0x prefix in the arguments field

**Error: "Source code too long"**
- Use Multi-Part files method instead
- Or use Standard JSON Input method

---

## Need Help?

Contract successfully deployed and running. Verification is optional but recommended for transparency.

Even without verification, the contract is fully functional and can be interacted with via:
- Your admin panel at `/admin/booth-staff`
- Direct contract calls using ethers.js
- Frontend GiftModal for claiming

**Contract is live and ready to use!** 🎉

