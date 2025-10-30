// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title USDCRewardClaim
 * @dev Smart contract for claiming USDC rewards with signed authorization from booth staff
 * Deployed on Base network
 */
contract USDCRewardClaim is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // USDC token address on Base mainnet
    IERC20 public immutable usdcToken;
    
    // Reward amount in USDC (1 USDC = 1e6 for USDC decimals)
    uint256 public constant REWARD_AMOUNT = 1e6; // 1 USDC
    
    // Booth staff address authorized to sign claims
    address public boothStaff;
    
    // Track which email hashes have claimed
    mapping(bytes32 => bool) public hasClaimed;
    
    // Track used nonces to prevent replay attacks
    mapping(uint256 => bool) public usedNonces;
    
    // Events
    event RewardClaimed(
        bytes32 indexed emailHash,
        address indexed recipient,
        uint256 amount,
        uint256 nonce
    );
    
    event BoothStaffUpdated(address indexed oldStaff, address indexed newStaff);
    event ContractFunded(address indexed funder, uint256 amount);
    event EmergencyWithdraw(address indexed recipient, uint256 amount);
    
    /**
     * @dev Constructor
     * @param _usdcToken Address of USDC token on Base
     * @param _boothStaff Initial booth staff address
     */
    constructor(address _usdcToken, address _boothStaff) Ownable(msg.sender) {
        require(_usdcToken != address(0), "Invalid USDC address");
        require(_boothStaff != address(0), "Invalid booth staff address");
        
        usdcToken = IERC20(_usdcToken);
        boothStaff = _boothStaff;
    }
    
    /**
     * @dev Claim USDC reward with signed authorization
     * @param emailHash Keccak256 hash of user's email
     * @param walletAddress Address to receive the USDC
     * @param nonce Unique nonce for this claim
     * @param signature Signature from booth staff authorizing the claim
     */
    function claimReward(
        bytes32 emailHash,
        address walletAddress,
        uint256 nonce,
        bytes memory signature
    ) external {
        require(walletAddress != address(0), "Invalid wallet address");
        require(!hasClaimed[emailHash], "Email has already claimed");
        require(!usedNonces[nonce], "Nonce already used");
        
        // Verify signature
        bytes32 messageHash = getMessageHash(emailHash, walletAddress, nonce);
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == boothStaff, "Invalid signature");
        
        // Mark as claimed
        hasClaimed[emailHash] = true;
        usedNonces[nonce] = true;
        
        // Transfer USDC
        require(
            usdcToken.transfer(walletAddress, REWARD_AMOUNT),
            "USDC transfer failed"
        );
        
        emit RewardClaimed(emailHash, walletAddress, REWARD_AMOUNT, nonce);
    }
    
    /**
     * @dev Get the message hash for signing
     * @param emailHash Keccak256 hash of user's email
     * @param walletAddress Address to receive the USDC
     * @param nonce Unique nonce
     */
    function getMessageHash(
        bytes32 emailHash,
        address walletAddress,
        uint256 nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(emailHash, walletAddress, nonce));
    }
    
    /**
     * @dev Update booth staff address
     * @param newBoothStaff New booth staff address
     */
    function updateBoothStaff(address newBoothStaff) external onlyOwner {
        require(newBoothStaff != address(0), "Invalid booth staff address");
        address oldStaff = boothStaff;
        boothStaff = newBoothStaff;
        emit BoothStaffUpdated(oldStaff, newBoothStaff);
    }
    
    /**
     * @dev Fund the contract with USDC
     * Note: Requires prior approval of USDC transfer
     * @param amount Amount of USDC to fund (in USDC's decimals, e.g., 10e6 for 10 USDC)
     */
    function fundContract(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "USDC transfer failed"
        );
        
        emit ContractFunded(msg.sender, amount);
    }
    
    /**
     * @dev Emergency withdraw USDC from contract
     * @param amount Amount to withdraw
     * @param recipient Address to send USDC to
     */
    function emergencyWithdraw(uint256 amount, address recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 balance = usdcToken.balanceOf(address(this));
        require(balance >= amount, "Insufficient balance");
        
        require(
            usdcToken.transfer(recipient, amount),
            "USDC transfer failed"
        );
        
        emit EmergencyWithdraw(recipient, amount);
    }
    
    /**
     * @dev Get contract USDC balance
     */
    function getBalance() external view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }
    
    /**
     * @dev Check if an email has claimed
     * @param emailHash Keccak256 hash of email
     */
    function hasEmailClaimed(bytes32 emailHash) external view returns (bool) {
        return hasClaimed[emailHash];
    }
    
    /**
     * @dev Check if a nonce has been used
     * @param nonce The nonce to check
     */
    function isNonceUsed(uint256 nonce) external view returns (bool) {
        return usedNonces[nonce];
    }
}

