//TreasuryCLD Balance and TreasuryETC balance set ids
async function runCodeWhenLoggedIn() {
    while (!LoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Waiting for login");
    }

    UpdateTokenBalances();
    
    console.log("Logged in");
}

async function UpdateTokenBalances(){
    let TreasuryCLD = await CLDtoken.methods.balanceOf(TreasuryAddress).call();
    let TreasuryETC = await web3.eth.getBalance(TreasuryAddress);
    
    document.getElementById("TreasuryCLD").innerText = formatNumber(web3.utils.fromWei(TreasuryCLD, 'ether'));
    document.getElementById("TreasuryETC").innerText = formatNumber(web3.utils.fromWei(TreasuryETC, 'ether'));

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

runCodeWhenLoggedIn();