const CoreAddress = "0xb92b8E1CEcCbDc12bc324aaeBA616BA0103513F9";
const VotingAddress = "0x596c8CDe8E9ed77D1449ACbA3906D5a7b1EAf467";
let HENSname;
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
        if (netID != 80001){ //Change and fix
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to Ethereum Classic."); 
            alert("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic network.");
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        DAOcore = new window.web3.eth.Contract(window.CoreABI, CoreAddress);
        DAOvoting = new window.web3.eth.Contract(window.VotingABI, VotingAddress);
        account = accountarray[0];
        console.log('Logged In')
        LoggedIn = true;
        await GetHENS();
    } else { 
        alert("No ETHER Wallet available")
    }
    }
}

async function getID(){
    netID = await web3.eth.getChainId();
    return(netID);
}

async function LoadCurrentProposal(){
    let OngoingID = await DAOvoting.methods.CurrentOngoingVote().call();

    console.log(OngoingID);
}

async function GetHENS(){
    HENSname = account;
    HENSname = await hens.js.getNameOfOwner(account)
    console.log("If there is an error above, its normal and not a problem, try catch does not work for Metamask errors")

    shortAddress = account.substring(0, 7) + '...' + account.substring(account.length - 3, account.length);
    if(HENSname != ''){
        document.getElementById("buttonConnect").innerHTML = HENSname;
    }
    else{
        document.getElementById("buttonConnect").innerHTML = shortAddress;
    }

    //see if the current page is the profile page which is /profile.html or /profile, if it is display the HENS name at the nickname id
    if(window.location.pathname.includes('/Profile')) {
        document.getElementById("nickname").innerHTML = HENSname;
        //set the address id element to the short users address found in buttonConnect
        
        document.getElementById("address").innerHTML = shortAddress;
    }
}