const ABI = window.abi;
const contractAddress = "0x3d53E224Eb7a4161003a4E0D8BE8adbC9b9424e6";
let account;
let balance;
let deposited;
let totaldeposited;
let exchangerate;
let contract;
let netID;
let mode;
loginWithEth();

let accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      loginWithEth();
    }
  }, 300);

async function loginWithEth(){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = await new Web3(ethereum);
        await getID();
        if (netID != 61){
            console.log("The current Metamask/Web3 network is not Ropsten, please connect to the Ropsten test network."); //CHANGE FOR REAL CROWDSALE TO ETC
            alert("The current Metamask/Web3 network is not Ropsten, please connect to the Ropsten test network.");
            showOverlay();
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(ABI, contractAddress, window.web3);
        account = accountarray[0];
        removeOverlay();
        UpdateDetails();
        document.getElementById('WalletB').innerText = "Connected";
    } else {
        alert("No ETHER Wallet available")
    }
}



async function DepositETC(){
    let amount = document.getElementById('depositinput').value;
    if (amount < 0.001){
        alert("The minimum deposit amount is 0.001 ETC");
        return;
    }
    let amountwei = web3.utils.toWei(amount, 'ether'); 
    let tx = await contract.methods.Buy().send({from: account, value: amountwei, gas: 300000});
    console.log(tx);
}

async function GetCLDleft(){
    let CLDsold = await contract.methods.CLDsold().call();
    CLDleft = (840000000000000000000000 - CLDsold) / 1000000
    return(CLDleft);
}

async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}


async function getBalance(){
    let fbalance = await web3.eth.getBalance(account);
    balance = (fbalance / 10**18).toFixed(2);
    return(balance)
}
