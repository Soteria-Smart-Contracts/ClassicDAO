loginWithEth();
let LoggedIn = false;

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
        accountarray = await web3.eth.getAccounts();
        oldaccount = account;
        account = accountarray[0];
        if(oldaccount != account){
            await UpdateDetails();
        }
        document.getElementById('WalletB').innerText = HENSname;
        UpdateUnclaimed();
    } else {
        alert("No ETHER Wallet available")
    }
}