let account;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            document.getElementById("walletAddress").innerText = account;
            document.getElementById("walletInfo").style.display = "block";
        } catch (error) {
            console.error("User denied account access or error occurred");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

document.getElementById("connectButton").addEventListener("click", connectWallet);
