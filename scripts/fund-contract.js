import hre from "hardhat";

async function main() {
  // Get contract address from environment
  const contractAddress = process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("Error: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS not set in .env.local");
    process.exit(1);
  }

  console.log("Funding contract at:", contractAddress);

  // Base mainnet USDC address
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  
  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  console.log("Funding from account:", signer.address);

  // Get USDC contract
  const USDC_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
  ];
  
  const usdcContract = new hre.ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
  
  // Check USDC balance
  const balance = await usdcContract.balanceOf(signer.address);
  console.log("Your USDC balance:", hre.ethers.formatUnits(balance, 6), "USDC");
  
  // Amount to fund (10 USDC)
  const fundAmount = hre.ethers.parseUnits("10", 6); // 10 USDC with 6 decimals
  
  if (balance < fundAmount) {
    console.error(`Error: Insufficient USDC balance. Need at least 10 USDC.`);
    process.exit(1);
  }

  // Get the contract instance
  const USDCRewardClaim = await hre.ethers.getContractFactory("USDCRewardClaim");
  const contract = USDCRewardClaim.attach(contractAddress);

  console.log("\nStep 1: Approving USDC transfer...");
  const approveTx = await usdcContract.approve(contractAddress, fundAmount);
  await approveTx.wait();
  console.log("✓ Approval confirmed");

  console.log("\nStep 2: Funding contract...");
  const fundTx = await contract.fundContract(fundAmount);
  await fundTx.wait();
  console.log("✓ Funding confirmed");

  // Check new balance
  const contractBalance = await contract.getBalance();
  console.log("\n=== Funding Complete ===");
  console.log("Contract USDC balance:", hre.ethers.formatUnits(contractBalance, 6), "USDC");
  console.log("Total rewards available:", Number(contractBalance) / 1e6, "claims");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

