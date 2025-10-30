import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const USDCRewardClaimModule = buildModule("USDCRewardClaimModule", (m) => {
  // Base mainnet USDC address
  const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  
  // Get booth staff address from parameters or use deployer
  const boothStaffAddress = m.getParameter("boothStaffAddress", m.getAccount(0));

  // Deploy the contract
  const usdcRewardClaim = m.contract("USDCRewardClaim", [usdcAddress, boothStaffAddress]);

  return { usdcRewardClaim };
});

export default USDCRewardClaimModule;

