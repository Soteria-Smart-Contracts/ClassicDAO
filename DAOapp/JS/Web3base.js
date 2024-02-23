const contractAddress = "0xf5c9e57e177B4F5CCfCb13b18e4154774E917401";
const ABI = window.abi;
let account;
let netID;
let LoggedIn = false;

loginWithEth();

async function loginWithEth(){
    if(LoggedIn == false){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = await new Web3(ethereum);
        await getID();
        if (netID != 61){ //Change and fix
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to Ethereum Classic."); 
            alert("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network.");
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(ABI, contractAddress);
        account = accountarray[0];
        console.log('Logged In')
        LoggedIn = true;
        displayAddress();
        GetHENS();
    } else { 
        alert("No ETHER Wallet available")
    }
    }
}

async function getID(){
    netID = await web3.eth.getChainId();
    return(netID);
}

//trim the users address to the first 5 and last 5 characters then display it at buttonConnect id
function displayAddress(){
    if(LoggedIn == true){
        let address = account;
        let shortAddress = address.substring(0, 5) + '...' + address.substring(address.length - 5, address.length);
        document.getElementById("buttonConnect").innerHTML = shortAddress;
    }
}

async function GetHENS(){
    //see if the current page is the profile page which is /profile.html or /profile, if it is display the HENS name at the nickname id
    

    HENSname = await hens.js.getNameOfOwner(account)
    if(HENSname == ''){
        HENSname = "Connected"
    }

    console.log("If there is an error above, its normal and not a problem, try catch does not work for Metamask errors")
}