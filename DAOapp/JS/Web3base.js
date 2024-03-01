const CoreAddress = "0xd4170cDeb046B7203d3Db1367698Ab387Be4ad5F";
const VotingAddress = "0x1c3364661A40815315E0318B065BF0BeE4564788";
const CLDaddress = "0x0C9986e9A0d4d3A16752fc6129afD8690B8dB6B9";
let HENSname;
let account;
let netID;
let LoggedIn = false;

if (localStorage.getItem("ClassicDAOLogin") === "true") {
    loginWithEth();
}

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
            DAOcore = new window.web3.eth.Contract(window.CoreABI, CoreAddress);
            DAOvoting = new window.web3.eth.Contract(window.VotingABI, VotingAddress);
            account = accountarray[0];
            console.log('Logged In')
            LoggedIn = true;
            await GetHENS();
            await RemoveOverlay();

            localStorage.setItem("ClassicDAOLogin", "true");
            
            return(true)
        } 
        else { 
            alert("No ETHER Wallet available")
        }
    }
}

async function getID(){
    netID = await web3.eth.getChainId();
    return(netID);
}

async function GetCurrentProposal(){
    let OngoingProposal = await DAOvoting.methods.CurrentOngoingVote().call();
    OngoingProposalID = parseInt(OngoingProposal.toString());
    OngoingProposal = [];
    
    OngoingProposal.push(await DAOcore.methods.Proposals(OngoingProposalID).call());
    OngoingProposal.push(await DAOcore.methods.ProposalInfos(OngoingProposalID).call());
    OngoingProposal.push(await DAOvoting.methods.VotingInstances(OngoingProposalID).call());

    return OngoingProposal;
}

async function RemoveOverlay(){
    console.log("Removing Overlay");
    document.getElementById("overlay").style.display = "none";
    document.getElementById("ButtonLink").href = "Profile.html";
    document.getElementById("body").style.overflow = "visible";
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

function timeLeft(unixTime) {
    unixTime = parseInt(unixTime.toString())
    let timeLeft = unixTime - Math.floor(Date.now() / 1000);
    let days = Math.floor(timeLeft / (24 * 60 * 60));
    timeLeft -= days * 24 * 60 * 60;
    let hours = Math.floor(timeLeft / (60 * 60));
    timeLeft -= hours * 60 * 60;
    let minutes = Math.floor(timeLeft / 60);
    return days + " days " + hours + " hours";
}

function ToDateAndTime(unixTime) {
    unixTime = parseInt(unixTime.toString())
    let date = new Date(unixTime * 1000);
    let options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
}