let flexABI = window.flexabi;
let CLDabi = window.CLDabi;
let LockABI = window.LockABI;
let account;
let CLDcontract;
let CLDcontractAddress = "0xfc84c3Dc9898E186aD4b85734100e951E3bcb68c";
let FlexContract;
let FlexContractAddress = "0x5A98406699E2450D2b98D4f2fb1b2EaDB281076F";
let LockContractAddress = "0x00074D20e2024EEa1e8cC5b8808315cb8D419e61";
let accountarray;
let CLDbal;
let FlexBal;
let Unclaimed;
let Estimated;
let ActiveLockNum;
let Locks = [{ID:"", DepositAmount:""},{},{}];
let LocksLen;
let netID;
let PreSaleUser = false;


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
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network."); //CHANGE FOR REAL CROWDSALE TO ETC
            alert("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network.");
            showOverlay();
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        FlexContract = new window.web3.eth.Contract(flexABI, FlexContractAddress, window.web3);
        LockContract = new window.web3.eth.Contract(LockABI, LockContractAddress, window.web3);
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

async function CheckPresaleUser(){
    if(await FlexContract.methods.PreSaleUser(account).call() == true && await LockContract.methods.PreSaleUser(account).call() == true){
        PreSaleUser = true;
    }
}

//Flex Staking functions

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

//Locked Staking functions

async function getActiveLocks(){
    ActiveLockNum = await LockContract.methods.ActiveLocks(account).call();
    LocksLen = await LockContract.methods.GetActiveUserLocks(account).call();
}

async function LoadLocks(){
    if(ActiveLockNum == 0){
        return;
    }
    if(ActiveLockNum == 1){
        let IDs = [(LocksLen - 1)]
        let depo = await LockContract.methods.UserLocks(account, 0).call();
        Locks[1].ID = IDs[1];
        Locks[1].DepositAmount = depo;
    }
    if(ActiveLockNum == 2){
        IDs = [(LocksLen - 1), (LocksLen - 2)]
    }
    if(ActiveLockNum == 3){
        IDs = [(LocksLen - 1), (LocksLen - 2), (LocksLen - 3)]
    }
}

async function CreateLock(type){
    let amount = 0;
    if(type == 1){
        amount = document.getElementById('One').value;
    }
    if(type == 3){
        amount = document.getElementById('Two').value;
        console.log(amount)
    }
    if(type == 5){
        amount = document.getElementById('Three').value;
    }
    if(type == 7){
        amount = document.getElementById('Four').value;
    }
    
    if(await CLDcontract.methods.allowance(account, LockContractAddress).call() < amount){
        await CLDcontract.methods.approve(FlexContractAddress, BigInt(1000000000000000000000000)).send({from: account, value: 0, gas: 300000});
    }
    
    if(PreSaleUser = true){
        type = type + 1;
    }
    let amountwei = amount * 1000000000000000000;

    await LockContract.methods.CreateLock(type, BigInt(amountwei)).send({from: account, value: 0, gas: 300000});
}



async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}

async function getEstimated(){
    if(PreSaleUser == true){
        Estimated = ((FlexBal / 100) * 130)
    }
    else{
        Estimated = ((FlexBal / 100) * 125)
    }
}