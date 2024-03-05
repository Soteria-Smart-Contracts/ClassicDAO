//TreasuryCLD Balance and TreasuryETC balance set ids
async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

    
    console.log("Logged in");
}

async function UpdateTokenBalances(){
    let TreasuryCLD = await CLD.methods.balanceOf(TreasuryAddress).call();
    let TreasuryETC = await web3.eth.getBalance(TreasuryAddress);
    document.getElementById("TreasuryCLD").innerText = web3.utils.fromWei(TreasuryCLD, 'ether');
    document.getElementById("TreasuryETC").innerText = web3.utils.fromWei(TreasuryETC, 'ether');
}

runCodeWhenLoggedIn();