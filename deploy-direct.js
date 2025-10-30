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
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('Error: ADMIN_PRIVATE_KEY environment variable not set');
  process.exit(1);
}

// Function to find imports
function findImports(importPath) {
  try {
    const possiblePaths = [
      path.join(__dirname, 'node_modules', importPath),
      path.join(__dirname, 'node_modules', '@openzeppelin', 'contracts', importPath.replace('@openzeppelin/contracts/', '')),
    ];

    for (const fullPath of possiblePaths) {
      if (fs.existsSync(fullPath)) {
        return { contents: fs.readFileSync(fullPath, 'utf8') };
      }
    }

    // Try direct node_modules resolution
    const modulePath = path.join(__dirname, 'node_modules', importPath);
    if (fs.existsSync(modulePath)) {
      return { contents: fs.readFileSync(modulePath, 'utf8') };
    }

    return { error: `File not found: ${importPath}` };
  } catch (error) {
    return { error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting deployment to Base...\n');

  // Read contract source
  const contractPath = path.join(__dirname, 'contracts', 'USDCRewardClaim.sol');
  const contractSource = fs.readFileSync(contractPath, 'utf8');

  console.log('📝 Compiling contract...');

  // Prepare input for solc
  const input = {
    language: 'Solidity',
    sources: {
      'USDCRewardClaim.sol': {
        content: contractSource,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode'],
        },
      },
    },
  };

  // Compile
  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  // Check for errors
  if (output.errors) {
    const errors = output.errors.filter(e => e.severity === 'error');
    if (errors.length > 0) {
      console.error('❌ Compilation errors:');
      errors.forEach(err => console.error(err.formattedMessage));
      process.exit(1);
    }
  }

  const contract = output.contracts['USDCRewardClaim.sol']['USDCRewardClaim'];
  const abi = contract.abi;
  const bytecode = contract.evm.bytecode.object;

  console.log('✅ Contract compiled successfully\n');

  // Setup provider and wallet
  console.log('🔗 Connecting to Base network...');
  const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log('📍 Deployer address:', wallet.address);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log('💰 Balance:', ethers.formatEther(balance), 'ETH');

  if (balance === 0n) {
    console.error('❌ Insufficient balance for deployment');
    process.exit(1);
  }

  // Deploy contract
  console.log('\n🎯 Deploying USDCRewardClaim...');
  console.log('   USDC Address:', USDC_ADDRESS);
  console.log('   Booth Staff:', wallet.address);

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract_instance = await factory.deploy(USDC_ADDRESS, wallet.address);

  console.log('⏳ Waiting for deployment...');
  await contract_instance.waitForDeployment();

  const contractAddress = await contract_instance.getAddress();

  console.log('\n✅ Contract deployed successfully!');
  console.log('📍 Contract Address:', contractAddress);

  // Save deployment info
  const deploymentInfo = {
    network: 'base',
    chainId: 8453,
    contractAddress,
    usdcAddress: USDC_ADDRESS,
    boothStaff: wallet.address,
    deployer: wallet.address,
    deployedAt: new Date().toISOString(),
  };

  const deploymentPath = path.join(__dirname, 'deployment.json');
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log('💾 Deployment info saved to deployment.json');

  console.log('\n📋 Next Steps:');
  console.log('1. Add to .env.local:');
  console.log(`   NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log('\n2. Verify on Basescan:');
  if (BASESCAN_API_KEY) {
    console.log(`   Visit: https://basescan.org/address/${contractAddress}#code`);
    console.log(`   Constructor Args: ${USDC_ADDRESS} ${wallet.address}`);
  }
  console.log('\n3. Fund the contract with 10 USDC');
  console.log(`   Contract needs 10 USDC (10000000 with 6 decimals)`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:');
    console.error(error);
    process.exit(1);
  });

