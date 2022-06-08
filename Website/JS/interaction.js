const ABI = window.abi;
const contractAddress = "0x0000000000000000000000000000000000000000";
let account;
let contract;
let yourNumber;



async function loginWithEth(){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(ethereum);
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(ABI, contractAddress, window.web3);
        account = accountarray[0];
        document.getElementById('WalletB').innerText = "Connected";
    } else {
        alert("No ETHER Wallet available")
    }
    console.log(account);
    getID();
}

async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}
