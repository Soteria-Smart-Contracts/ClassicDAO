let flexABI = window.flexabi;
let CLDabi = window.CLDabi;
let account;
let CLDcontract;
let CLDcontractAddress = "0xfc84c3Dc9898E186aD4b85734100e951E3bcb68c";
let FlexContract;
let FlexContractAddress = "0x11Ec18Ef909AC582084114C2cA8dC3cE1b3c38C2";
let accountarray;
let CLDbal;
let FlexBal;
let Unclaimed;
let netID;
let LoggedIn = false;


let accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      loginWithEth();
    }
  }, 300);


  async function loginWithEth(){
    if(window.ethereum){
        if(LoggedIn = false){
            await ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = await new Web3(ethereum);
            LoggedIn = true;
        }
        await getID();
        if (netID != 61){
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network."); //CHANGE FOR REAL CROWDSALE TO ETC
            alert("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network.");
            showOverlay();
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        FlexContract = new window.web3.eth.Contract(flexABI, FlexContractAddress, window.web3);
        CLDcontract = new window.web3.eth.Contract(CLDabi, CLDcontractAddress, window.web3);
        account = accountarray[0];
 //       if(await FlexContract.methods.Eligibility(account).call() == false){
 //           alert("This address is not on the eligibility list for the ClassicDAO private sale. If you signed up for this sale but see this message, make sure you are using the correct wallet. If issues persist, please contact us on discord, twitter or telegram.")
 //           loginWithEth();
 //       }
        removeOverlay();
        UpdateDetails();
        document.getElementById('WalletB').innerText = "Connected";
    } else {
        alert("No ETHER Wallet available")
    }
}

// let tx = await contract.methods.Buy().send({from: account, value: amountwei, gas: 300000});

async function FlexDeposit(){
    amount = document.getElementById('depositinputleft').value;
    amountwei = amount * 1000000000000000000;

    if(await CLDcontract.methods.allowance(account, FlexContractAddress).call() < amount){
        await CLDcontract.methods.approve(FlexContractAddress, BigInt(1000000000000000000000000)).send({from: account, value: 0, gas: 300000});
    }
    
    await FlexContract.methods.Deposit(BigInt(amountwei)).send({from: account, value: 0, gas: 300000});
}

async function FlexWithdraw(){
    amount = document.getElementById('withdrawinputleft').value;
    amountwei = amount * 1000000000000000000;

    await FlexContract.methods.Withdraw(BigInt(amountwei)).send({from: account, value: 0, gas: 300000});
}

async function FlexClaim(){
    await FlexContract.methods.Claim().send({from: account, value: 0, gas: 300000});
}

async function FlexReinvest(){
    await FlexContract.methods.ReInvest().send({from: account, value: 0, gas: 300000});
}



async function getCLDbal(){
    fbal = await CLDcontract.methods.balanceOf(account).call();
    CLDbal = (fbal / 10**18).toFixed(2);
}

async function getFlexDeposited(){
    fbal = await FlexContract.methods.Deposits(account).call();
    FlexBal = (fbal / 10**18).toFixed(2);
}

async function getUnclaimed(){
    fbal = await FlexContract.methods.GetUnclaimed(account).call();
    Unclaimed = (fbal / 10**18).toFixed(5);
}


async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}