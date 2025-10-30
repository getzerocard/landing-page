import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const BASESCAN_API_URL = 'https://api.basescan.org/api';

if (!BASESCAN_API_KEY) {
  console.error('Error: BASESCAN_API_KEY not set');
  process.exit(1);
}

// Read deployment info
const deploymentPath = path.join(__dirname, 'deployment.json');
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
        '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode']
      }
    }
  }
};

async function verifyContract() {
  console.log('🔍 Verifying contract on Basescan...');
  console.log('📍 Contract:', deployment.contractAddress);

  // Encode constructor arguments
  const constructorArgs = 
    deployment.usdcAddress.slice(2).padStart(64, '0') +
    deployment.boothStaff.slice(2).padStart(64, '0');

  console.log('\n📤 Submitting verification...');

  const formData = new URLSearchParams({
    module: 'contract',
    action: 'verifysourcecode',
    contractaddress: deployment.contractAddress,
    sourceCode: JSON.stringify(standardJsonInput),
    codeformat: 'solidity-standard-json-input',
    contractname: 'contracts/USDCRewardClaim.sol:USDCRewardClaim',
    compilerversion: 'v0.8.20+commit.a1b79de6',
    constructorArguements: constructorArgs,
    apikey: BASESCAN_API_KEY
  });

  try {
    const response = await fetch(BASESCAN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const data = await response.json();
    
    console.log('📨 Response:', JSON.stringify(data, null, 2));

    if (data.status === '1') {
      const guid = data.result;
      console.log('\n✅ Verification submitted successfully!');
      console.log('📝 GUID:', guid);
      console.log('\n⏳ Waiting 30 seconds for processing...\n');
      
      // Wait for verification
      await new Promise(resolve => setTimeout(resolve, 30000));
      
      // Check status
      const statusParams = new URLSearchParams({
        module: 'contract',
        action: 'checkverifystatus',
        guid: guid,
        apikey: BASESCAN_API_KEY
      });
      
      const statusResponse = await fetch(`${BASESCAN_API_URL}?${statusParams.toString()}`);
      const statusData = await statusResponse.json();
      
      console.log('📊 Verification Status:', JSON.stringify(statusData, null, 2));
      
      if (statusData.status === '1') {
        console.log('\n✅ CONTRACT VERIFIED SUCCESSFULLY! 🎉');
        console.log(`🔗 https://basescan.org/address/${deployment.contractAddress}#code`);
      } else {
        console.log('\n⏳ Status:', statusData.result);
        console.log(`   Check: https://basescan.org/address/${deployment.contractAddress}#code`);
      }
    } else {
      console.error('\n❌ Verification failed:', data.result);
      
      if (data.result && data.result.includes('already verified')) {
        console.log('\n✅ Contract is already verified!');
        console.log(`🔗 https://basescan.org/address/${deployment.contractAddress}#code`);
      } else {
        console.log('\n💡 Try manual verification:');
        console.log(`https://basescan.org/verifyContract?a=${deployment.contractAddress}`);
        console.log('\nConstructor Args:', constructorArgs);
      }
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Manual verification:');
    console.log(`https://basescan.org/verifyContract?a=${deployment.contractAddress}`);
  }
}

verifyContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

