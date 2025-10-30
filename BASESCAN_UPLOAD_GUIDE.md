# 🎯 Basescan Verification - Upload Guide

## Your Contract Details

**Contract Address:** `0x28cbD168c219A93CA438c46e18858F22071eF6b4`  
**Network:** Base Mainnet  
**Compiler:** v0.8.20+commit.a1b79de6

---

## 📤 Step-by-Step Upload Instructions

### 1. Go to Basescan Verification Page

Visit: **https://basescan.org/verifyContract?a=0x28cbD168c219A93CA438c46e18858F22071eF6b4**

### 2. Fill in Basic Information

**Please enter the Contract Address:**  
```
0x28cbD168c219A93CA438c46e18858F22071eF6b4
```

**Please select Compiler Type:**  
Choose: `Solidity (Standard-Json-Input)`

**Please select Compiler Version:**  
Choose: `v0.8.20+commit.a1b79de6`

**Please select Open Source License Type:**  
Choose: `3) MIT License (MIT)`

### 3. Upload Standard Input JSON

**Click "Choose File" and upload:**  
File: `standard-input.json` (located in your project root)

**OR paste the content from `standard-input.json` directly**

### 4. Enter Constructor Arguments

**Constructor Arguments ABI-encoded:**

```
000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000027cee32550dcc30de5a23551baf7de2f3b0b98a0
```

**What this means:**
- USDC Token: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Booth Staff: `0x27cEe32550DcC30De5a23551bAF7de2f3b0b98A0`

### 5. Complete Verification

Click **"Verify and Publish"**

Wait 30-60 seconds for processing.

---

## ✅ What Happens Next

Once verified successfully, you'll see:

- ✅ Green checkmark on contract page
- ✅ "Contract Source Code Verified (Exact Match)"
- ✅ **Read Contract** tab becomes available
- ✅ **Write Contract** tab for direct interaction
- ✅ Source code visible to everyone
- ✅ ABI automatically available

---

## 🔗 After Verification

Your contract page will be fully functional:

**View Contract:**  
https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#code

**Read Contract:**  
https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#readContract

**Write Contract:**  
https://basescan.org/address/0x28cbD168c219A93CA438c46e18858F22071eF6b4#writeContract

---

## 📁 Files You Need

✅ **`standard-input.json`** - Already created in project root  
✅ **Constructor arguments** - Listed above  
✅ **Contract address** - `0x28cbD168c219A93CA438c46e18858F22071eF6b4`

---

## 💡 Troubleshooting

**Error: "Compiled bytecode does not match"**
- Ensure you're using compiler version: v0.8.20+commit.a1b79de6
- Optimization must be enabled with 200 runs
- EVM version should be shanghai

**Error: "Constructor arguments invalid"**
- Copy the constructor arguments exactly as shown above
- No spaces, no "0x" prefix in the constructor arguments field

**Error: "Failed to verify"**
- Try uploading the JSON file instead of pasting
- Make sure the JSON file is valid (no syntax errors)

---

## 🎉 Your Contract is Live!

**Remember:** Your contract is already **FULLY FUNCTIONAL** even without verification!

- ✅ Deployed and operational
- ✅ Admin panel works
- ✅ Can process USDC claims
- ✅ All features active

**Verification just makes the source code public for transparency.**

---

**Ready to verify?** Upload `standard-input.json` to Basescan now! 🚀

