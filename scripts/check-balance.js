import hre from "hardhat";

async function main() {
  const contractAddress = process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("Error: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS not set in .env.local");
    process.exit(1);
  }

  console.log("Checking contract balance...");
  console.log("Contract address:", contractAddress);

  // Get the contract instance
  const USDCRewardClaim = await hre.ethers.getContractFactory("USDCRewardClaim");
  const contract = USDCRewardClaim.attach(contractAddress);

  // Get balance
  const balance = await contract.getBalance();
  const balanceInUSDC = hre.ethers.formatUnits(balance, 6);
  const availableClaims = Math.floor(Number(balance) / 1e6);

  console.log("\n=== Contract Status ===");
  console.log("USDC Balance:", balanceInUSDC, "USDC");
  console.log("Available Claims:", availableClaims, "/ 10");
  console.log("Booth Staff:", await contract.boothStaff());
  console.log("Owner:", await contract.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

