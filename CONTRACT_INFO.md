# 📝 Contract Deployment Information

## 🔗 Deployed Contract Details

| Field | Value |
|-------|-------|
| **Contract Address** | `0x28cbD168c219A93CA438c46e18858F22071eF6b4` |
| **Network** | Base Mainnet |
| **Chain ID** | 8453 |
| **Compiler Version** | v0.8.20+commit.a1b79de6 |
| **Optimization** | Enabled (200 runs) |
| **License** | MIT |
| **Deployer** | `0x27cEe32550DcC30De5a23551bAF7de2f3b0b98A0` |

## 🔧 Constructor Parameters

| Parameter | Value |
|-----------|-------|
| `_usdcToken` | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (USDC on Base) |
| `_boothStaff` | `0x27cEe32550DcC30De5a23551bAF7de2f3b0b98A0` |

### Constructor Arguments (ABI-Encoded):
```
000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0
```

## 🌐 Explorer Links

- **Contract Page:** https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4
- **Verify Page:** https://basescan.org/verifyContract?a=0x28cbD168c219A93CA438c46e18858F22071eF6b4
- **Read Contract:** https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#readContract
- **Write Contract:** https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#writeContract

## 📄 Contract Source

**Location:** `/Users/mac/landing-page/contracts/USDCRewardClaim.sol`

**Dependencies:**
- `@openzeppelin/contracts/token/ERC20/IERC20.sol`
- `@openzeppelin/contracts/access/Ownable.sol`
- `@openzeppelin/contracts/utils/cryptography/ECDSA.sol`
- `@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol`

## ⚙️ Compiler Settings

```json
{
  "optimizer": {
    "enabled": true,
    "runs": 200
  },
  "evmVersion": "shanghai"
}
```

## 🎯 Quick Verification (Choose ONE method)

### Method 1: Remix IDE (EASIEST) ⭐
1. Go to https://remix.ethereum.org
2. Create `USDCRewardClaim.sol` with your contract code
3. Compile with Solidity 0.8.20
4. Use "At Address" with `0x28cbD168c219A93CA438c46e18858F22071eF6b4`
5. Right-click → Verify Contract → Basescan

### Method 2: Basescan Multi-Part Files
1. Go to verification page (link above)
2. Select "Multi-Part files"
3. Upload main contract + OpenZeppelin dependencies
4. Enter constructor arguments
5. Submit

### Method 3: Sourcify
1. Go to https://sourcify.dev
2. Select "Base" network
3. Upload contract artifacts
4. Verify automatically

## 📊 Contract State

Check current state on Basescan:
- USDC Balance: Call `getBalance()`
- Booth Staff: Call `boothStaff()`
- Check if claimed: Call `hasClaimed(bytes32 emailHash)`
- Owner: Call `owner()`

## 🔐 Admin Access

**Booth Staff Panel:** https://getzerocard.xyz/admin/booth-staff

**Admin Functions:**
- Generate claim codes
- Check contract balance
- Monitor claims
- Update booth staff address (owner only)
- Emergency withdraw (owner only)

## ✅ Deployment Status

- [x] Contract deployed successfully
- [x] Admin panel live
- [x] Frontend integrated
- [x] Gift modal functional
- [ ] Contract verified on Basescan (in progress)

---

**Last Updated:** October 30, 2025  
**Deployment Time:** 10:09:22 UTC

