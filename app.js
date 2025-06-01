
let account;
const stakingContractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
const stakingABI = [
    {
        "inputs": [],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address","name": "user","type": "address"}],
        "name": "getUserStake",
        "outputs": [
            {"internalType": "uint256","name": "staked","type": "uint256"},
            {"internalType": "uint256","name": "reward","type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function connectWallet() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        document.getElementById("walletAddress").innerText = account.slice(0, 6) + "..." + account.slice(-4);
        fetchStakingInfo();
    } else {
        alert("Please install MetaMask!");
    }
}

async function fetchStakingInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(stakingContractAddress, stakingABI, provider);
    const [staked, reward] = await contract.getUserStake(account);
    document.getElementById("stakedAmount").innerText = "Staked: " + (staked / 1e18).toFixed(2);
    document.getElementById("earnedAmount").innerText = "Earned: " + (reward / 1e18).toFixed(2) + " LYDIA";
}

async function claimRewards() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(stakingContractAddress, stakingABI, signer);
    const tx = await contract.claimReward();
    await tx.wait();
    alert("Claim successful!");
    fetchStakingInfo();
}
