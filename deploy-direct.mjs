import { ethers } from 'ethers';
import solc from 'solc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_RPC_URL = 'https://mainnet.base.org';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Private key from environment
const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('Error: ADMIN_PRIVATE_KEY environment variable not set');
  process.exit(1);
}

// Function to compile contract
function compileContract() {
  console.log('📝 Compiling contract...\n');

  // Read contract source
  const contractPath = path.join(__dirname, 'contracts', 'USDCRewardClaim.sol');
  const source = fs.readFileSync(contractPath, 'utf8');

  // Read OpenZeppelin contracts
  const openzeppelinPath = path.join(__dirname, 'node_modules', '@openzeppelin', 'contracts');
  
  const input = {
    language: 'Solidity',
    sources: {
      'USDCRewardClaim.sol': {
        content: source
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode']
        }
      }
    }
  };

  // Function to find imports
  function findImports(importPath) {
    try {
      if (importPath.startsWith('@openzeppelin/')) {
        const contractPath = path.join(
          __dirname,
          'node_modules',
          importPath
        );
        const content = fs.readFileSync(contractPath, 'utf8');
        return { contents: content };
      }
      return { error: 'File not found' };
    } catch (error) {
      return { error: 'File not found: ' + error.message };
    }
  }

  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  if (output.errors) {
    const errors = output.errors.filter(error => error.severity === 'error');
    if (errors.length > 0) {
      console.error('❌ Compilation errors:');
      errors.forEach(error => console.error(error.formattedMessage));
      process.exit(1);
    }
  }

  const contract = output.contracts['USDCRewardClaim.sol']['USDCRewardClaim'];
  console.log('✅ Contract compiled successfully\n');
  
  return {
    abi: contract.abi,
    bytecode: '0x' + contract.evm.bytecode.object
  };
}

// Main deployment function
async function deploy() {
  try {
    console.log('🚀 Starting deployment to Base mainnet...\n');

    // Compile contract
    const { abi, bytecode } = compileContract();

    // Setup provider and wallet
    console.log('🔗 Connecting to Base network...');
    const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    console.log('📍 Deployer address:', wallet.address);
    
    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log('💰 Balance:', ethers.formatEther(balance), 'ETH\n');

    if (balance === 0n) {
      console.error('❌ Error: Deployer wallet has no ETH for gas fees');
      process.exit(1);
    }

    // Booth staff address (same as deployer)
    const boothStaffAddress = wallet.address;
    console.log('👤 Booth staff address:', boothStaffAddress);
    console.log('🪙 USDC address:', USDC_ADDRESS, '\n');

    // Create contract factory
    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Estimate gas
    console.log('⛽ Estimating gas...');
    const deployTransaction = await contractFactory.getDeployTransaction(
      USDC_ADDRESS,
      boothStaffAddress
    );
    const gasEstimate = await provider.estimateGas(deployTransaction);
    console.log('   Estimated gas:', gasEstimate.toString());

    // Get gas price
    const feeData = await provider.getFeeData();
    console.log('   Gas price:', ethers.formatUnits(feeData.gasPrice || 0n, 'gwei'), 'gwei');
    
    const estimatedCost = gasEstimate * (feeData.gasPrice || 0n);
    console.log('   Estimated cost:', ethers.formatEther(estimatedCost), 'ETH\n');

    // Deploy
    console.log('🚀 Deploying contract...');
    const contract = await contractFactory.deploy(USDC_ADDRESS, boothStaffAddress);
    
    console.log('📤 Transaction hash:', contract.deploymentTransaction().hash);
    console.log('⏳ Waiting for confirmation...\n');

    // Wait for deployment
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ CONTRACT DEPLOYED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📋 Contract Address:', contractAddress);
    console.log('🌐 Network: Base Mainnet (Chain ID: 8453)');
    console.log('👤 Owner:', wallet.address);
    console.log('🛡️  Booth Staff:', boothStaffAddress);
    console.log('');
    console.log('🔗 View on Basescan:');
    console.log('   https://basescan.org/address/' + contractAddress);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📝 NEXT STEPS:');
    console.log('');
    console.log('1️⃣  Add to your .env.local:');
    console.log('   NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=' + contractAddress);
    console.log('');
    console.log('2️⃣  Fund the contract with 10 USDC:');
    console.log('   - Transfer 10 USDC to:', contractAddress);
    console.log('   - Or approve + call fundContract(10000000)');
    console.log('');
    console.log('3️⃣  Verify on Basescan (if BASESCAN_API_KEY is set):');
    console.log('   npx hardhat verify --network base \\');
    console.log('     ' + contractAddress + ' \\');
    console.log('     "' + USDC_ADDRESS + '" \\');
    console.log('     "' + boothStaffAddress + '"');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');

    // Save deployment info
    const deploymentInfo = {
      network: 'base',
      chainId: 8453,
      contractAddress: contractAddress,
      deployer: wallet.address,
      boothStaff: boothStaffAddress,
      usdcToken: USDC_ADDRESS,
      deployedAt: new Date().toISOString(),
      transactionHash: contract.deploymentTransaction().hash
    };

    fs.writeFileSync(
      path.join(__dirname, 'deployment-info.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('\n💾 Deployment info saved to deployment-info.json\n');

  } catch (error) {
    console.error('\n❌ Deployment failed:');
    console.error(error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    process.exit(1);
  }
}

// Run deployment
deploy();

