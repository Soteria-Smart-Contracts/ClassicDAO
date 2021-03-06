const ABI = window.abi;
const contractAddress = "0x493fD82D18a17cF90a357aaD6A4c5B3D352427b0";
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
        if (netID != 3){
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
    if (amount < 0.1){
        alert("The minimum deposit amount is 0.1 ETC");
        return;
    }
    let amountwei = web3.utils.toWei(amount, 'ether'); 
    let tx = await contract.methods.DepositETC().send({from: account, value: amountwei, gas: 300000});
    console.log(tx);
}

//MAKE WITHDRAWETC FUNCTION HERE
async function WithdrawETC(){
    let amount = document.getElementById('withdrawinput').value;
    if (amount < 0.1){
        alert("The minimum withdraw amount is 0.1 ETC");
        return;
    }
    let amountwei = web3.utils.toWei(amount, 'ether');
    let tx = await contract.methods.WithdrawETC(amountwei).send({from: account, gas: 300000});
    console.log(tx);
}

async function Claim(){
    let tx = await contract.methods.WithdrawCLD().send({from: account, gas: 300000});
    console.log(tx);
}


async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}

async function getMode(){
    let modearray = await contract.methods.GetContractMode().call();
    mode = modearray;
    return(mode[0]);
}

async function getBalance(){
    let fbalance = await web3.eth.getBalance(account);
    balance = (fbalance / 10**18).toFixed(2);
    return(balance)
}

async function getETCDeposited(){
    let fdeposited = await contract.methods.GetETCdeposited(account).call();
    deposited = (fdeposited / 10**18).toFixed(2);
    return(deposited);
}

async function getTotalDeposited(){
    let ftotal = await contract.methods.Total_ETC_Deposited().call();
    totaldeposited = (ftotal / 10**18).toFixed(2);
    return(totaldeposited);
}

async function getExchangeRate(){
    await getTotalDeposited();
    if(totaldeposited == 0){
        exchangerate = 0;
        return(0);
    }
    let rate = await contract.methods.GetCurrentExchangeRate().call();
    exchangerate = (rate / 10000000000000000).toFixed(2);
    return(rate);
}