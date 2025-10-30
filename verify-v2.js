import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const BASESCAN_V2_URL = 'https://api.basescan.org/v2/api';

if (!BASESCAN_API_KEY) {
  console.error('Error: BASESCAN_API_KEY not set');
  process.exit(1);
}

// Read deployment info
const deploymentPath = path.join(__dirname, 'deployment.json');
if (!fs.existsSync(deploymentPath)) {
  console.error('Error: deployment.json not found');
  process.exit(1);
}

const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));

// Read contract source
const contractPath = path.join(__dirname, 'contracts', 'USDCRewardClaim.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

// Read OpenZeppelin contracts
function readOpenZeppelinContract(importPath) {
  const ozPath = importPath.replace('@openzeppelin/contracts/', '');
  const fullPath = path.join(__dirname, 'node_modules', '@openzeppelin', 'contracts', ozPath);
  
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf8');
  }
  return null;
}

// Create standard JSON input
const standardJsonInput = {
  language: 'Solidity',
  sources: {
    'contracts/USDCRewardClaim.sol': {
      content: contractSource
    },
    '@openzeppelin/contracts/token/ERC20/IERC20.sol': {
      content: readOpenZeppelinContract('token/ERC20/IERC20.sol')
    },
    '@openzeppelin/contracts/access/Ownable.sol': {
      content: readOpenZeppelinContract('access/Ownable.sol')
    },
    '@openzeppelin/contracts/utils/Context.sol': {
      content: readOpenZeppelinContract('utils/Context.sol')
    },
    '@openzeppelin/contracts/utils/cryptography/ECDSA.sol': {
      content: readOpenZeppelinContract('utils/cryptography/ECDSA.sol')
    },
    '@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol': {
      content: readOpenZeppelinContract('utils/cryptography/MessageHashUtils.sol')
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    evmVersion: 'shanghai',
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'metadata']
      }
    }
  }
};

async function verifyContract() {
  console.log('🔍 Verifying contract on Basescan (API V2)...');
  console.log('📍 Contract:', deployment.contractAddress);

  // Encode constructor arguments
  const constructorArgs = 
    deployment.usdcAddress.slice(2).padStart(64, '0') +
    deployment.boothStaff.slice(2).padStart(64, '0');

  const requestBody = {
    chainId: '8453',
    codeformat: 'solidity-standard-json-input',
    sourceCode: JSON.stringify(standardJsonInput),
    contractaddress: deployment.contractAddress,
    contractname: 'contracts/USDCRewardClaim.sol:USDCRewardClaim',
    compilerversion: 'v0.8.20+commit.a1b79de6',
    constructorArguements: constructorArgs
  };

  try {
    console.log('\n📤 Submitting verification request...');
    
    const response = await fetch(BASESCAN_V2_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BASESCAN_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    console.log('\n📨 Response:', JSON.stringify(data, null, 2));

    if (data.status === '1' || data.message === 'OK') {
      const guid = data.result;
      console.log('\n✅ Verification submitted successfully!');
      console.log('📝 GUID:', guid);
      console.log('\n⏳ Checking verification status in 20 seconds...\n');
      
      // Wait for verification to process
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      // Check status using V2 endpoint
      const statusResponse = await fetch(
        `${BASESCAN_V2_URL}?chainId=8453&guid=${guid}`,
        {
          headers: {
            'Authorization': `Bearer ${BASESCAN_API_KEY}`
          }
        }
      );
      
      const statusData = await statusResponse.json();
      console.log('📊 Status Response:', JSON.stringify(statusData, null, 2));
      
      if (statusData.status === '1' && statusData.result === 'Pass - Verified') {
        console.log('\n✅ CONTRACT VERIFIED SUCCESSFULLY! 🎉');
        console.log(`🔗 View on Basescan: https://basescan.org/address/${deployment.contractAddress}#code`);
      } else if (statusData.result && statusData.result.includes('Pending')) {
        console.log('\n⏳ Verification still pending...');
        console.log('   This can take 1-2 minutes. Check Basescan:');
        console.log(`   https://basescan.org/address/${deployment.contractAddress}#code`);
      } else {
        console.log('\n⚠️  Verification status:', statusData.result || 'Unknown');
        console.log(`   Check manually: https://basescan.org/address/${deployment.contractAddress}#code`);
      }
    } else {
      console.error('\n❌ Verification submission failed');
      console.error('Response:', data);
      
      console.log('\n💡 Trying alternative approach...');
      console.log('Visit Basescan directly:');
      console.log(`https://basescan.org/verifyContract?a=${deployment.contractAddress}`);
      console.log('\nConstructor Arguments:');
      console.log(constructorArgs);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Manual verification recommended:');
    console.log(`https://basescan.org/verifyContract?a=${deployment.contractAddress}`);
    console.log('\nSee BASESCAN_VERIFICATION.md for detailed instructions');
  }
}

verifyContract()
  .then(() => {
    console.log('\n✨ Verification process complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

