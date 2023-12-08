let LoggedIn = false;
let netID = 0;
let account;
let HENSname = "Connected";

loginWithEth();

const SignupAddress = "0x7cb26f4DC1D293670c1B2eEC16942f1bF259416C";
let SignupABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "SignUp",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getSignedUpAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isSignedUp",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signUp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "signedUpAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

async function loginWithEth(){
    if(window.ethereum){
        if(LoggedIn == false){
            await ethereum.request({ method: 'eth_requestAccounts' });
            this.web3 = await new Web3(ethereum);
            LoggedIn = true;
            SignupContract = new window.web3.eth.Contract(SignupABI, SignupAddress, window.web3);
        }
        await getID();                                                                                              
        if (netID != 61){
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network."); //CHANGE FOR REAL CROWDSALE TO ETC
            alert("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network.");
            showOverlay();
            return("Failed to connect")
        }
        else{
            removeOverlay();
        }
        GetHENS();
        accountarray = await web3.eth.getAccounts();
        oldaccount = account;
        account = accountarray[0];
        document.getElementById('WalletB').innerText = HENSname;
        UpdateUnclaimed();
    } else {
        alert("No ETHER Wallet available")
    }
}

async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}

async function GetHENS(){
    HENSname = await hens.js.getNameOfOwner(account)
    if(HENSname == ''){
        HENSname = "Connected"
    }

    console.log("If there is an error above, its normal and not a problem, try catch does not work for Metamask errors")
}