import hre from "hardhat";

async function main() {
  console.log("Deploying USDCRewardClaim contract to Base...");

  // Get ethers from hre
  const ethers = hre.ethers;

  // Base mainnet USDC address
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Get booth staff address from environment or use deployer
  const boothStaffAddress = process.env.BOOTH_STAFF_ADDRESS || deployer.address;
  console.log("Booth staff address:", boothStaffAddress);

  // Deploy the contract
  const USDCRewardClaim = await ethers.getContractFactory("USDCRewardClaim");
  const contract = await USDCRewardClaim.deploy(USDC_ADDRESS, boothStaffAddress);

  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log("USDCRewardClaim deployed to:", contractAddress);
  
  // Save deployment info
  console.log("\n=== Deployment Summary ===");
  console.log("Network:", hre.network.name);
  console.log("Contract Address:", contractAddress);
  console.log("USDC Token:", USDC_ADDRESS);
  console.log("Booth Staff:", boothStaffAddress);
  console.log("Owner:", deployer.address);
  
  console.log("\n=== Next Steps ===");
  console.log("1. Add this to your .env.local:");
  console.log(`   NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("\n2. Fund the contract with USDC:");
  console.log(`   npx hardhat run scripts/fund-contract.js --network ${hre.network.name}`);
  console.log("\n3. Verify the contract on Basescan:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress} "${USDC_ADDRESS}" "${boothStaffAddress}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

