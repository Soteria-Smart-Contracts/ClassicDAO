const ABI = window.abi;
const contractAddress = "0x0000000000000000000000000000000000000000";

const abi = window.abi2;
let account;
let contract;



async function loginWithEth(){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(ethereum);
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(abi, contractAddress, window.web3);
        account = accountarray[0];
        document.getElementById('WalletB').innerText = "Connected";
    } else {x
        alert("No ETHER Wallet available")
    }
    console.log(account);
     
}