import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;

if (!BASESCAN_API_KEY) {
  console.error('Error: BASESCAN_API_KEY not set');
  process.exit(1);
}

// Read deployment info
const deploymentPath = path.join(__dirname, 'deployment.json');
const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));

async function verifyWithHardhat() {
  console.log('🔍 Verifying contract using Hardhat...');
  console.log('📍 Contract:', deployment.contractAddress);
  console.log('   USDC:', deployment.usdcAddress);
  console.log('   Booth Staff:', deployment.boothStaff);

  const command = `npx hardhat verify --network base ${deployment.contractAddress} "${deployment.usdcAddress}" "${deployment.boothStaff}"`;
  
  console.log('\n📤 Running:', command);
  console.log('\n⏳ This may take 30-60 seconds...\n');

  try {
    const { stdout, stderr } = await execPromise(command, {
      env: {
        ...process.env,
        BASESCAN_API_KEY: BASESCAN_API_KEY
      }
    });

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    console.log('\n✅ Verification complete!');
    console.log(`🔗 https://basescan.org/address/${deployment.contractAddress}#code`);
    
  } catch (error) {
    console.error('Error during verification:', error.message);
    
    if (error.stdout) console.log('\nOutput:', error.stdout);
    if (error.stderr) console.error('\nError output:', error.stderr);
    
    if (error.message.includes('Already Verified')) {
      console.log('\n✅ Contract is already verified!');
      console.log(`🔗 https://basescan.org/address/${deployment.contractAddress}#code`);
    } else {
      console.log('\n💡 Manual verification recommended');
      console.log(`Visit: https://basescan.org/verifyContract?a=${deployment.contractAddress}`);
      console.log('\nConstructor arguments:');
      console.log(`  USDC: ${deployment.usdcAddress}`);
      console.log(`  Booth Staff: ${deployment.boothStaff}`);
    }
  }
}

verifyWithHardhat()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

