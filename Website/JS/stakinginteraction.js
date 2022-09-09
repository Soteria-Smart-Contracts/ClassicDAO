let flexABI = window.flexabi;
let CLDabi = window.CLDabi;
let account;
let CLDcontract;
let CLDcontractAddress = "0x19c128C3ca3E853f3a093D946ba1c9De4Ac7b04F";
let FlexContract;
let FlexContractAddress = "0x19c128C3ca3E853f3a093D946ba1c9De4Ac7b04F";
let accountarray;
let netID;


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

//async function FlexDeposit{

//}

//async function FlexWithdraw{

//}

//async function FlexClaim{

//}

//async function FlexReinvest{

//}






async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}